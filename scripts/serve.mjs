import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { watch } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
import { spawn } from 'node:child_process';
import { root, build } from './build.mjs';

await build();
const dist = resolve(root, 'dist');
const portArg = process.argv.indexOf('--port');
const port = Number(portArg >= 0 ? process.argv[portArg + 1] : process.env.PORT || 4173);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
};

const server = createServer(async (request, response) => {
  try {
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405, { Allow: 'GET, HEAD' });
      return response.end();
    }
    let path;
    try {
      path = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    } catch {
      response.writeHead(400);
      return response.end('Bad request');
    }
    let file = resolve(dist, `.${path}`);
    if (file !== dist && !file.startsWith(dist + sep)) {
      response.writeHead(403);
      return response.end('Forbidden');
    }
    let info = await stat(file).catch(() => null);
    if (info?.isDirectory()) {
      if (!path.endsWith('/')) {
        response.writeHead(301, { Location: `${path}/` });
        return response.end();
      }
      file = resolve(file, 'index.html');
      info = await stat(file).catch(() => null);
    }
    const status = info?.isFile() ? 200 : 404;
    if (status === 404) file = resolve(dist, '404.html');
    const data = await readFile(file);
    const contentType = types[extname(file)] || 'application/octet-stream';

    const range = request.headers.range;
    if (status === 200 && range && range.startsWith('bytes=')) {
      const [startStr, endStr] = range.replace('bytes=', '').split('-');
      const start = Number.parseInt(startStr, 10) || 0;
      const end = endStr ? Math.min(Number.parseInt(endStr, 10), data.length - 1) : data.length - 1;
      if (start >= 0 && start <= end && end < data.length) {
        const chunk = data.subarray(start, end + 1);
        response.writeHead(206, {
          'Content-Type': contentType,
          'Content-Length': chunk.length,
          'Content-Range': `bytes ${start}-${end}/${data.length}`,
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'no-store',
          'X-Content-Type-Options': 'nosniff',
        });
        return response.end(request.method === 'HEAD' ? undefined : chunk);
      }
    }

    response.writeHead(status, {
      'Content-Type': contentType,
      'Content-Length': data.length,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    });
    response.end(request.method === 'HEAD' ? undefined : data);
  } catch {
    response.writeHead(500);
    response.end('Unable to serve this page.');
  }
});

server.on('error', error => {
  console.error(error.message);
  process.exitCode = 1;
});
server.listen(port, '127.0.0.1', () => console.log(`Local portfolio: http://localhost:${port}`));

if (process.argv.includes('--watch')) {
  let timer, building = false, queued = false;
  const rebuild = () => {
    if (building) {
      queued = true;
      return;
    }
    building = true;
    const child = spawn(process.execPath, ['scripts/build.mjs'], { cwd: root, stdio: 'inherit' });
    child.on('exit', () => {
      building = false;
      if (queued) {
        queued = false;
        rebuild();
      }
    });
  };
  for (const dir of ['src', 'public']) {
    watch(resolve(root, dir), { recursive: true }, () => {
      clearTimeout(timer);
      timer = setTimeout(rebuild, 150);
    });
  }
}

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
