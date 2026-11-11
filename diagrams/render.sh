#!/bin/bash
# Renders each diagram to a 2.5x PNG in public/assets/media/. Usage: ./render.sh
cd "$(dirname "$0")"
for f in *.html; do
  size=$(grep -o 'class="dg" style="width:[0-9]*px;height:[0-9]*px' "$f" | grep -o '[0-9]*' | paste -sd,)
  google-chrome --headless=new --disable-gpu --hide-scrollbars --no-sandbox --allow-file-access-from-files \
    --force-device-scale-factor=2.5 --window-size="$size" --virtual-time-budget=2000 \
    --screenshot="../public/assets/media/${f%.html}.png" "file://$PWD/$f" 2>/dev/null
  echo "${f%.html}.png  $size"
done
