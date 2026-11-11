// Portfolio content for Simone Utili.

export const profile = {
  name: 'Simone Utili',
  monogram: 'SU',
  role: 'MSc Robotics · TU Delft',
  shortRole: 'Robotics & Control Engineer',
  email: 'simoutili@gmail.com',
  location: 'Delft, Netherlands',
  github: 'https://github.com/Simoneutili',
  linkedin: 'https://www.linkedin.com/in/simone-utili-372916166/',
  scholar: 'https://doi.org/10.1109/AIM65483.2026.11658146',
  cv: 'documents/simone-utili-cv.pdf',
  tagline: 'Bridging intelligent control systems and physically grounded robot learning.',
  bio: [
    'I am an MSc Robotics student at TU Delft and an Embodied AI Engineer at Motion1, with a background in Automation Engineering from the University of Bologna. Driven by curiosity and quick to adapt to new environments, I constantly look for unfamiliar challenges that push me to build and test ideas directly on real robots.',
    'My work lives at the intersection of intelligent control systems and physical AI. Across my experience in reinforcement learning and in imitation learning for general-purpose manipulation, my core interest is keeping learning physically grounded, connecting expressive learned policies with control, dynamics, and long-horizon planning.'
  ],
  interests: [
    'Intelligent Control Systems',
    'Physically Grounded Learning',
    'Reinforcement & Imitation Learning',
    'Physical AI & Manipulation',
    'Long-Horizon Planning'
  ],
  currentStatus: {
    kicker: 'Current Status · Open for MSc Thesis (Early 2027 · 6+ Months)',
    title: 'Looking for an MSc Thesis in Learning-Based Control, Planning & World Models',
    text: 'I am looking for a 6+ month MSc Thesis opportunity starting in early 2027. Having worked across model-based control, reinforcement learning, and imitation learning on real hardware, my goal is to tackle long-horizon tasks in general-purpose and collaborative robotics, combining learning-based control with model-based planning through learned world models.',
    pillars: [
      'Learning- & Model-Based Control',
      'World Models for Planning',
      'Long-Horizon Manipulation',
      'Collaborative Robots'
    ],
    ctaText: 'Get in touch about thesis topics'
  },
  portraits: [
    {
      src: 'assets/media/profile-g1.jpg',
      alt: 'Simone Utili operating the Unitree G1 humanoid robot at ETH Zurich',
      caption: 'Testing locomotion on the Unitree G1 at ETH Zurich'
    },
    {
      src: 'assets/media/profile-builder.jpg',
      alt: 'Simone Utili assembling and testing an autonomous mobile robot at TU Delft',
      caption: 'Prototyping mobile hardware at TU Delft'
    },
    {
      src: 'assets/media/profile-exomars.jpg',
      alt: 'Simone Utili next to the ExoMars Rosalind Franklin Rover at ESA ESTEC',
      caption: 'ExoMars Rosalind Franklin Rover at ESA ESTEC'
    }
  ]
};

export const affiliations = [];
export const highlights = [];

export const projects = [
  // ==================== HACKATHONS ====================
  {
    slug: 'liminal',
    category: 'hackathon',
    filterTags: ['hackathon', 'learning', 'hardware'],
    title: 'Liminal: Long-Horizon Bimanual Manipulation with FLUX.3-Action',
    subtitle: 'Two robot arms, one learned policy each, and a simple planner that makes them work together',
    period: 'Oct 2026',
    institution: 'Zurich Physical AI Hackathon · Black Forest Labs Track',
    award: '1st Place (BFL Track)',
    authors: '**Simone Utili**, Javier Gil, Miguel, Panagiotis',
    videoPreview: 'assets/media/liminal-presentation.mp4',
    image: 'assets/media/liminal-award-team.jpg',
    imageAlt: 'Liminal team with the XLeRobot bimanual setup at the Zurich Physical AI Hackathon',
    tags: ['FLUX.3-Action', 'XLeRobot', 'Behavior Trees', 'LoRA Fine-Tuning'],
    summary: 'Winner of the Black Forest Labs track at the Zurich Physical AI Hackathon. We got a two-arm robot to complete multi-step tasks by fine-tuning one FLUX.3-Action policy per arm and coordinating the two with a behavior tree.',
    overview: [
      'The Black Forest Labs track asked teams to test how well FLUX.3-Action, a World Action Model, works on a new robot, both out of the box and after fine-tuning. Ours was the XLeRobot, an open-source kit with two arms.',
      'Adapting a single model to drive both arms at once, with a 12-dimensional action output, would have needed more data and training time than a hackathon allows. We fine-tuned one six-dimensional model per arm instead, and taught each to notice when the other arm is in the way and to cooperate with it.'
    ],
    context: 'Zurich Physical AI Hackathon · DARE Campus, Zurich',
    repo: 'https://github.com/Javgilavi/liminal',
    website: 'https://javgilavi.github.io/liminal/',
    modelUrl: 'https://bfl.ai/models/flux-3-action',
    modelLabel: 'FLUX.3-Action',
    event: 'https://luma.com/psoyy4k5',
    demo: 'assets/media/liminal-presentation.mp4',
    demoPoster: 'assets/media/liminal-award-team.jpg',
    demoCaption: 'Project presentation and a complete multi-step task on the two-arm robot.',
    gallery: [
      { type: 'video', src: 'assets/media/liminal-presentation.mp4', poster: 'assets/media/liminal-award-team.jpg', label: 'Presentation', caption: 'Project presentation and a complete multi-step task on the two-arm robot.' },
      { type: 'video', src: 'assets/media/liminal-vr-teleop.mp4', poster: 'assets/media/liminal-vr-rig.jpg', label: 'Teleop', caption: 'Collecting demonstrations by teleoperation, then running the learned policy.' },
      { type: 'image', src: 'assets/media/liminal-closeup.jpg', label: 'Hardware', caption: 'The 3D-printed two-arm station with an overhead depth camera and wrist cameras.' },
      { type: 'image', src: 'assets/media/liminal-vr-rig.jpg', label: 'Setup', caption: 'Recording two-arm demonstrations and testing the policy from a remote machine.' },
      { type: 'image', src: 'assets/media/liminal-kickoff.jpg', label: 'Kickoff', caption: 'Day one of the Zurich Physical AI Hackathon.' }
    ],
    sections: [
      {
        heading: 'One policy per arm, one planner on top',
        text: 'Each arm runs its own fine-tuned copy of FLUX.3-Action and knows a handful of short skills. A behavior tree sits above them and decides which skill runs when. This lets the robot chain skills into longer tasks, such as holding a box lid open with one arm while the other picks up objects and places them inside.',
        points: [
          { term: 'Robot', text: 'Two SO-101 arms on a 3D-printed station, with an overhead depth camera and a camera on each wrist.' },
          { term: 'Skills', text: 'Short skills learned from teleoperated demonstrations. Each one is a small LoRA adapter on top of FLUX.3-Action.' },
          { term: 'Planner', text: 'A deterministic behavior tree that reads a task plan and decides which arm runs which skill.' },
          { term: 'Checks', text: 'A vision-language model confirms from the camera images that each step really happened, and a safety layer enforces limits and an emergency stop.' },
          { term: 'Compute', text: 'All skills were trained in parallel and served from a remote NVIDIA RTX PRO 6000.' }
        ],
        figure: {
          src: 'assets/media/liminal-architecture.png',
          label: 'System overview',
          caption: 'A behavior tree coordinates two independently fine-tuned policies, one for each arm.',
          layout: 'wide',
          size: 'side'
        }
      },
      {
        heading: 'What we learned about language models in the loop',
        text: [
          'Following the hybrid-policy experiments in the FLUX.3-Action technical report, we also tried adding a reasoning language model that steps in when a skill fails or meets a case it was not trained for.',
          'In practice it was too slow. Large reasoning models still respond far more slowly than specialized robot policies, and cost much more to run, which makes recovering from a failure in real time difficult.'
        ],
        figure: {
          src: 'assets/media/liminal-award-team.jpg',
          label: 'Team',
          caption: 'With Javier, Miguel, and Panagiotis and the two-arm robot at DARE Campus, Zurich.',
          layout: 'side',
          size: 'medium'
        }
      }
    ]
  },

  {
    slug: 'openhumanoid',
    category: 'hackathon',
    filterTags: ['hackathon', 'control', 'learning', 'hardware'],
    title: 'OpenHumanoid: Commanding a Unitree G1 Humanoid in Natural Language',
    subtitle: 'Voice, web, and WhatsApp control of a humanoid robot, built in 48 hours',
    period: 'Mar 2026',
    institution: 'ETH Robotics Club HACK2026 · Zurich',
    award: '2nd Place',
    authors: '**Simone Utili** & Team Zeta',
    videoPreview: 'assets/media/openhumanoid-simone-g1-live.mp4',
    image: 'assets/media/profile-g1.jpg',
    imageAlt: 'Simone Utili operating the Unitree G1 humanoid at ETH Robotics Club HACK2026 in Zurich',
    tags: ['Unitree G1', 'NVIDIA GR00T', 'OpenClaw', 'LiDAR SLAM'],
    summary: 'Second place at the ETH Robotics Club hackathon. In 48 hours we connected a language-model agent to the whole-body controller of a Unitree G1 humanoid, so the robot can be commanded by voice, from a web page, or over WhatsApp.',
    overview: [
      'We planned the project in two tiers. The first lets a person command the robot in plain language. An AI agent (OpenClaw, with OpenAI real-time models) receives a request by voice, web page, or WhatsApp and turns it into commands for NVIDIA\'s GR00T whole-body controller, which keeps the robot balanced while it walks and gestures.',
      'The second tier was meant to add autonomy: 3D mapping with LiDAR, path planning, and camera-based scene understanding.'
    ],
    context: 'ETH Robotics Club Hackathon (HACK2026) · ETH Hangar, Zurich',
    repo: 'https://github.com/Simoneutili/OpenHumanoid',
    demo: 'assets/media/openhumanoid-simone-g1-live.mp4',
    demoPoster: 'assets/media/profile-g1.jpg',
    demoCaption: 'Testing walking and gestures on the Unitree G1 in the ETH hangar.',
    gallery: [
      { type: 'video', src: 'assets/media/openhumanoid-simone-g1-live.mp4', poster: 'assets/media/profile-g1.jpg', label: 'G1 Live', caption: 'Testing whole-body gestures and balance on the Unitree G1 in the ETH hangar.' },
      { type: 'video', src: 'assets/media/openhumanoid-preview.mp4', poster: 'assets/media/profile-g1.jpg', label: 'Locomotion', caption: 'The G1 walking and following velocity commands.' },
      { type: 'video', src: 'assets/media/openhumanoid-arena.mp4', poster: 'assets/media/openhumanoid-ring.jpg', label: 'Arena', caption: 'The final showcase at the end of the 48 hours.' },
      { type: 'image', src: 'assets/media/profile-g1.jpg', label: 'Untethered', caption: 'Walking next to the G1 during an untethered test.' }
    ],
    sections: [
      {
        heading: 'What we delivered',
        text: 'The first tier worked end to end, and it is the system we showed in the live arena demo:',
        points: [
          { term: 'Inputs', text: 'Voice, a web page, and WhatsApp.' },
          { term: 'Agent', text: 'A fast mode on OpenAI real-time models, which answers in under half a second, and a full mode on an OpenClaw agent.' },
          { term: 'Control', text: 'An HTTP bridge passes the agent\'s commands to NVIDIA\'s GR00T whole-body controller, a neural policy that keeps the robot balanced while it walks and gestures.' },
          { term: 'Testing', text: 'Every command was checked in the MuJoCo simulator before it ran on the real Unitree G1.' }
        ],
        figure: {
          src: 'assets/media/openhumanoid-system.png',
          label: 'System overview',
          caption: 'Top: the first tier, built and run live on the robot. Bottom: the second tier we planned for mapping, navigation, perception, and manipulation.',
          layout: 'wide'
        }
      },
      {
        heading: 'What we did not finish',
        text: [
          'The second tier combined 3D mapping and localization from LiDAR (FAST-LIO and Open3D), path planning, and scene understanding with a vision-language model. The mapping already ran on its own, and we came close to validating the rest, but mounting and integrating an external ZED stereo camera on the robot became the bottleneck just before the deadline.',
          'Choosing to make a smaller system work reliably, rather than a larger one work partially, paid off in the live demo and earned us second place overall.'
        ],
        figure: {
          src: 'assets/media/openhumanoid-team-award.jpg',
          label: 'Team',
          caption: 'Team Zeta at the end of HACK2026 in Zurich.',
          layout: 'side',
          size: 'medium'
        }
      }
    ]
  },

  {
    slug: 'nursearm',
    category: 'hackathon',
    filterTags: ['hackathon', 'learning', 'hardware'],
    title: 'NurseArm: An Assistive Robot Arm for Sorting Medication',
    subtitle: 'A robot arm that sorts pills on a schedule, and what it taught us about long tasks',
    period: 'Jun 2026',
    institution: 'EuroTech × UnternehmerTUM Hackathon · Munich',
    award: '',
    authors: '**Simone Utili**, Javier Gil, Miguel, Panagiotis',
    videoPreview: 'assets/media/nursearm-preview.mp4',
    image: 'assets/media/nursearm-setup.jpg',
    imageAlt: 'NurseArm hardware setup with overhead camera, 6-DoF follower and leader arms, and pill cups in Munich',
    tags: ['Imitation Learning (ACT / SmolVLA)', 'MCP', 'SO-101 Arm', 'Teleoperation'],
    summary: 'A 48-hour healthcare hackathon project in Munich. A language-model agent schedules medication routines and asks a small robot arm to sort and hand over pills, using skills learned from human demonstrations.',
    overview: [
      'NurseArm is a tabletop assistant for medication routines. A six-joint SO-101 arm with two cameras, one above the workspace and one on the wrist, is connected to a web console, voice input, and a language-model agent.',
      'The agent never sends motor commands itself. It can only call a fixed set of skills, which keeps a language model at a safe distance from the hardware.'
    ],
    context: 'EuroTech × UnternehmerTUM Healthcare Robotics Hackathon · Munich',
    repo: 'https://github.com/Simoneutili/nursearm',
    modelUrl: 'https://arxiv.org/abs/2506.01844',
    modelLabel: 'SmolVLA',
    demo: 'assets/media/nursearm-preview.mp4',
    demoAspect: '8 / 3',
    demoPoster: 'assets/media/nursearm-setup.jpg',
    demoCaption: 'Overhead and wrist camera views of the arm sorting pills into patient cups.',
    gallery: [
      { type: 'video', src: 'assets/media/nursearm-preview.mp4', poster: 'assets/media/nursearm-setup.jpg', label: 'Rollout', caption: 'Overhead and wrist camera views while the arm picks up a pill and places it in a cup.' },
      { type: 'image', src: 'assets/media/nursearm-setup.jpg', label: 'Setup', caption: 'The tabletop setup: overhead camera, robot arm, pill cups, and the second arm used for teleoperation.' },
      { type: 'image', src: 'assets/media/nursearm-venue.jpg', label: 'Venue', caption: 'Kickoff at the UnternehmerTUM auditorium in Munich.' }
    ],
    sections: [
      {
        heading: 'What we built',
        points: [
          { term: 'Robot', text: 'A six-joint SO-101 arm with one camera above the workspace and one on the wrist.' },
          { term: 'Interface', text: 'A web console and voice input.' },
          { term: 'Agent', text: 'A language-model agent that calls skills through an MCP server instead of sending motor commands.' },
          { term: 'Skills', text: 'Medication routines triggered from a calendar, simple straight-line moves, and policies learned by imitation for sorting pills and handing them over: ACT and SmolVLA, a compact open-source VLA.' }
        ]
      },
      {
        heading: 'Collecting the data',
        text: 'We made the physical setup as clean and controlled as we could: an isolated workspace, no background clutter, fixed lighting. Then we stayed up all night and recorded nearly 200 demonstrations, guiding the robot through each one with a second arm that it copies, convinced that a clean setup would be enough for the policy to work.',
        figure: {
          src: 'assets/media/nursearm-setup.jpg',
          label: 'Setup',
          caption: 'Overhead camera, robot arm, pill cups, and the second arm used to teleoperate it.',
          layout: 'side',
          size: 'medium'
        }
      },
      {
        heading: 'What we learned',
        text: [
          'It was not enough. When we ran the learned policy, it did not succeed often enough for a reliable live demo.',
          'Did it need even cleaner data, or was the task simply too long for a single policy without breaking it into steps? In hindsight, probably the second. That open question was the most valuable thing we took home from the weekend.'
        ],
        figure: {
          src: 'assets/media/nursearm-team.jpg',
          label: 'Team',
          caption: 'With Javier, Miguel, and Panagiotis in Munich, after a night of teleoperation.',
          layout: 'side',
          size: 'small'
        }
      }
    ]
  },

  {
    slug: 'samxl-blade-climber',
    category: 'hackathon',
    filterTags: ['hackathon', 'control', 'hardware'],
    title: 'A Suction-Cup Climbing Robot for Wind-Turbine Blade Inspection',
    subtitle: 'A pneumatic robot that pulls itself up a blade, one anchor point at a time',
    period: 'Oct 2025',
    institution: 'RSA Renewable Energy Hackathon · SAM XL, TU Delft',
    award: '',
    authors: '**Simone Utili** & Team',
    videoPreview: 'assets/media/samxl-preview.mp4',
    image: 'assets/media/samxl-climber.jpg',
    imageAlt: 'Prototype of the pneumatic vacuum-adhesion climbing robot at SAM XL TU Delft',
    tags: ['Mechatronic Design', 'Pneumatics', 'Embedded Control', 'Rapid Prototyping'],
    summary: 'Built for the RSA Renewable Energy Hackathon at TU Delft. The challenge was to design a pneumatic robot that climbs a wind-turbine blade and reaches as many inspection points as possible during a live demo.',
    overview: [
      'The hackathon set a fixed challenge: build a pneumatic robot that can climb a composite wind-turbine blade and visit as many inspection points as possible during a live demonstration.',
      'Our concept was a robot that crawls up the blade using an arm with a suction cup at its tip.'
    ],
    context: 'RSA Renewable Energy Hackathon · Smart Advanced Manufacturing XL (SAM XL), TU Delft',
    repo: 'https://github.com/Simoneutili',
    demo: 'assets/media/samxl-preview.mp4',
    demoPoster: 'assets/media/samxl-climber.jpg',
    demoCaption: 'The prototype, the concept sketch, and the full-scale blade used for testing.',
    gallery: [
      { type: 'image', src: 'assets/media/samxl-climber.jpg', label: 'Prototype', caption: 'The assembled prototype: laser-cut plates, aluminum arm, pneumatic valves, and controller.' },
      { type: 'image', src: 'assets/media/samxl-gait-diagram.png', label: 'Crawling Cycle', caption: 'The four-step climbing cycle with the arm and suction cup.' },
      { type: 'image', src: 'assets/media/samxl-prototype2.jpg', label: 'Pneumatics', caption: 'Top view of the vacuum tubing, valve relays, and the two servo motors.' },
      { type: 'image', src: 'assets/media/samxl-facility.jpg', label: 'Testbed', caption: 'The full-scale wind-turbine blade in the SAM XL hall at TU Delft.' }
    ],
    sections: [
      {
        heading: 'How it climbs',
        text: [
          'The arm reaches up and its suction cup grips the blade. Using that grip as a fixed pivot, the robot pulls its body upward past the anchor point. The body then locks onto the surface, the arm lets go, swings above the body, grips again, and the cycle repeats.',
          'We built the prototype from laser-cut plates and an aluminum arm driven by two servo motors. A bank of relay-switched valves controls the vacuum, and an embedded controller runs the sequence.'
        ],
        figure: {
          src: 'assets/media/samxl-gait-diagram.png',
          label: 'Climbing cycle',
          caption: 'Anchor the suction cup, pull the body up, lock the body, swing the arm to the next point.',
          layout: 'wide'
        }
      },
      {
        heading: 'What we learned',
        text: 'The concept was promising, but turning it into a reliable prototype in 48 hours was much harder than we expected. Vacuum sealing, valve timing, and the stiffness of the arm all had to work at the same time. Building a complete pneumatic and mechanical system from scratch was still a valuable hands-on lesson.',
        figure: {
          src: 'assets/media/samxl-cad.png',
          label: 'Concept sketch',
          caption: 'The arm anchored to the surface by its suction cup, with the body below it.',
          layout: 'side',
          size: 'medium'
        }
      }
    ]
  },

  {
    slug: 'moneyheister-amr',
    category: 'hackathon',
    filterTags: ['hackathon', 'hardware'],
    title: 'A Package-Carrying Robot for a Competitive Arena',
    subtitle: 'My first hackathon: a remote-controlled robot that collects, protects, and delivers packages',
    period: 'Sep 2025',
    institution: 'RSA Hackathon · TU Delft',
    award: '',
    authors: '**Simone Utili** & Team',
    videoPreview: 'assets/media/rsa-intro-preview.mp4',
    image: 'assets/media/profile-builder.jpg',
    imageAlt: 'Simone Utili assembling the mobile robot prototype at TU Delft',
    tags: ['3D-Printed Gear Lift', 'Laser-Cut Chassis', 'Differential Drive', 'Rapid Prototyping'],
    summary: 'My first hackathon at TU Delft. We built a remote-controlled robot that collects packages from a dropper, shields them inside its chassis from rival robots, and lifts them into a receiver.',
    overview: 'The competition had a fixed goal: build a remote-controlled mobile robot that carries packages from a dropper to a receiver while protecting them from rival robots on the arena floor.',
    context: 'Robotics Student Association (RSA) Hackathon · TU Delft',
    repo: 'https://github.com/Simoneutili',
    demo: 'assets/media/rsa-intro-preview.mp4',
    demoPoster: 'assets/media/profile-builder.jpg',
    demoCaption: 'Driving the robot in a TU Delft hallway and testing the 3D-printed gear lift.',
    gallery: [
      { type: 'video', src: 'assets/media/rsa-intro-preview.mp4', poster: 'assets/media/profile-builder.jpg', label: 'Drive Test', caption: 'Driving the remote-controlled robot in a TU Delft hallway.' },
      { type: 'video', src: 'assets/media/rsa-intro-mechanism.mp4', poster: 'assets/media/profile-builder.jpg', label: 'Mechanism', caption: 'Bench test of the 3D-printed gear lift.' },
      { type: 'image', src: 'assets/media/profile-builder.jpg', label: 'Assembly', caption: 'Wiring and testing the chassis and motor drivers.' }
    ],
    sections: [
      {
        heading: 'The design',
        text: 'We built a laser-cut, differential-drive chassis around an internal lift made of 3D-printed gears. The package stays enclosed inside the robot while it drives and is then raised up to the receiver. A horizontal arm on the outside keeps opposing robots at a distance.'
      },
      {
        heading: 'What I took from it',
        text: 'This was my first hackathon, and it stays close to my heart. Beyond designing the gears and wiring the drive base, it is where I first learned to work against the clock in a team and deliver a working robot by a hard deadline.',
        figure: {
          src: 'assets/media/rsa-intro-team.jpg',
          label: 'Team',
          caption: 'Planning the mechanical layout with the team.',
          layout: 'side',
          size: 'medium'
        }
      }
    ]
  },

  // ==================== RESEARCH & ENGINEERING PROJECTS ====================
  {
    slug: 'real2sim',
    category: 'research',
    filterTags: ['research', 'control', 'learning'],
    title: 'Online Real2Sim Calibration of Velocity-Controlled Digital Twins via Reinforcement Learning',
    subtitle: 'Teaching a simulated robot arm to move like the real one',
    period: '2024 – 2026',
    institution: 'LAR · University of Bologna',
    award: 'IEEE/ASME AIM 2026',
    authors: '**Simone Utili**, Andrea Govoni, Gianluca Palli',
    videoPreview: 'assets/media/real2sim-preview.mp4',
    image: 'assets/digital-twin.jpg',
    imageAlt: 'Parallel reinforcement learning calibration of PAL TIAGo digital twins in NVIDIA Isaac Lab',
    tags: ['Reinforcement Learning', 'Curriculum Learning', 'Digital Twins', 'NVIDIA Isaac Lab'],
    summary: 'First-author paper at IEEE/ASME AIM 2026. A reinforcement learning agent tunes the joint friction and damping of a simulated robot arm until it moves like the real one, cutting the velocity mismatch by more than 80%.',
    overview: [
      'A digital twin is only useful if it behaves like the robot it copies. Many industrial and service robots are commanded through velocity or position controllers rather than motor torques, and the friction and damping inside their joints are rarely modelled exactly. The result is a gap between how the real robot and its simulated copy respond to the same command.',
      'We treat closing that gap as a learning problem. A reinforcement learning agent adjusts the joint damping and friction of a simulated PAL TIAGo arm in NVIDIA Isaac Lab until its joint velocities match those measured on the real robot.'
    ],
    highlights: [
      { value: '−86%', label: 'velocity error on sinusoidal test commands (2 Hz)' },
      { value: '−81%', label: 'velocity error on triangular test commands (2 Hz)' },
      { value: '7 joints', label: 'calibrated together on a real PAL TIAGo arm' }
    ],
    context: 'First-author paper accepted at IEEE/ASME AIM 2026 · Developed at LAR, University of Bologna',
    repo: 'https://github.com/Simoneutili/isaaclab-tiago-digitaltwin',
    paperUrl: 'https://doi.org/10.1109/AIM65483.2026.11658146',
    pdfUrl: 'documents/aim2026-real2sim-paper.pdf',
    pdfLabel: 'Accepted version (PDF)',
    demo: 'assets/media/real2sim-preview.mp4',
    demoAspect: '960 / 596',
    demoPoster: 'assets/digital-twin.jpg',
    demoCaption: 'Calibration running in NVIDIA Isaac Lab, with simulated and real joint velocities compared side by side.',
    gallery: [
      { type: 'video', src: 'assets/media/real2sim-preview.mp4', poster: 'assets/digital-twin.jpg', label: 'Calibration', caption: 'The simulated TIAGo next to the real joint velocities it is being matched to.' },
      { type: 'image', src: 'assets/media/real2sim-fleet.jpg', label: 'RL Training', caption: 'Training on many copies of the simulated robot in parallel.' },
      { type: 'image', src: 'assets/media/real2sim-architecture.png', fit: 'contain', label: 'Architecture', caption: 'The system architecture from the paper: Isaac Lab and the real robot exchange commands and joint states through a ROS 2 bridge.' }
    ],
    sections: [
      {
        heading: 'How the calibration works',
        text: [
          'The real robot and its simulated copy receive the same velocity command. A reinforcement learning agent watches both responses and, at every control step, sets two values for each joint of the simulated arm: its damping and its friction. The agent is rewarded when the simulated joint velocities move closer to the measured ones.',
          'We chose these two parameters deliberately. Masses and inertias come from the CAD model and stay accurate over the life of a robot, while friction and damping drift with wear and lubrication, so they are the main source of a growing mismatch. The simulator is treated as a black box: the method needs no analytical model of its physics and no gradients, so it does not depend on the specific robot.'
        ],
        figure: {
          src: 'assets/media/real2sim-loop.png',
          label: 'Calibration loop',
          caption: 'The same command drives the real arm and its digital twin. The agent compares the two velocity responses and adjusts the damping and friction of each simulated joint.',
          layout: 'side'
        }
      },
      {
        heading: 'A curriculum instead of everything at once',
        text: [
          'Calibrating all seven joints together from the start was unstable: each joint behaves differently, the reward is noisy, and the search space is large. We used a curriculum instead. The agent starts with a single joint, and a new joint is added each time the simulated and real velocity profiles agree closely enough (a cosine similarity above 0.90), until all seven are calibrated together.',
          'We compared two standard algorithms, SAC and PPO, with and without the curriculum. With the curriculum, the hyperparameters of each were tuned automatically over 30 trials. SAC with the curriculum learned fastest and reached the best final reward, −1.71 against −2.33 for SAC trained on all joints at once.'
        ],
        figure: {
          src: 'assets/media/real2sim-training-curves.png',
          label: 'Training',
          caption: 'Average episode reward during training. (a) All seven joints at once, with default settings. (b) With the curriculum and tuned hyperparameters. (c) Final fine-tuning of SAC, with and without the curriculum.',
          layout: 'wide'
        }
      },
      {
        heading: 'Results',
        text: [
          'We tested the calibrated twin on sinusoidal and triangular velocity commands that were not used in training, at frequencies from 0.25 to 4 Hz. Before calibration the simulated arm follows the command almost perfectly, while the real arm lags behind it, and the gap grows with frequency. After calibration the simulated joints reproduce that lag.',
          'At 2 Hz the average velocity error against the real robot fell from 0.036 to 0.005 rad/s on sinusoidal commands (about 86%) and from 0.026 to 0.005 rad/s on triangular ones (about 81%).'
        ],
        figure: {
          src: 'assets/media/real2sim-velocity-matching.png',
          label: 'Velocity matching at 2 Hz',
          caption: 'Each joint before calibration (upper rows) and after it (lower rows). Dashed blue: commanded velocity. Green: real robot. Red: simulated twin. After calibration the simulated curve follows the real one.',
          layout: 'wide'
        },
        table: {
          head: ['Frequency', 'Uncalibrated twin', 'Calibrated twin'],
          rows: [
            ['0.25 Hz', '0.004 ± 0.002', '0.002 ± 0.001'],
            ['0.5 Hz', '0.009 ± 0.003', '0.003 ± 0.001'],
            ['1 Hz', '0.019 ± 0.005', '0.004 ± 0.002'],
            ['2 Hz', '0.036 ± 0.008', '0.005 ± 0.002'],
            ['3 Hz', '0.058 ± 0.012', '0.008 ± 0.003'],
            ['4 Hz', '0.081 ± 0.016', '0.011 ± 0.004']
          ],
          caption: 'Joint-velocity error against the real robot in rad/s (mean ± standard deviation) on sinusoidal commands, averaged over seven joints and 30 rollouts.'
        }
      },
      {
        heading: 'Limits and next steps',
        text: [
          'The damping and friction values the agent settles on are not unique physical constants. Several combinations reproduce the same motion, so they are best read as equivalent parameters that absorb effects the simulator does not model. Because the agent receives the real velocities at every step, the calibration keeps adapting while the robot runs, instead of producing one fixed set of numbers.',
          'The study covers joint velocities only. The next step is to extend it to the trajectory of the end effector, for a fuller picture of the robot dynamics.'
        ]
      }
    ],
    relatedPublication: 'real2sim'
  },

  {
    slug: 'photosyntech',
    category: 'research',
    filterTags: ['research', 'control', 'hardware'],
    title: 'Photosyntech: Autonomous Greenhouse Mobile Manipulator',
    subtitle: 'A mobile robot that patrols a greenhouse, inspects each planter, and removes dead flowers',
    period: 'May – Jun 2026',
    institution: 'TU Delft · Multi-Disciplinary Project',
    award: '',
    authors: '**Simone Utili**, Calvin Hsu, Nefeli Pelekanou, Benthe Raadschelders, Mart Wevers',
    videoPreview: 'assets/media/photosyntech-flower-grab.mp4',
    image: 'assets/media/photosyntech-setup.jpg',
    imageAlt: 'Photosyntech holonomic mobile manipulator in front of flower planters at TU Delft',
    tags: ['ROS 2', 'SLAM & Navigation', 'Task Planning', 'Mobile Manipulation'],
    summary: 'A five-person TU Delft project. We turned a small omnidirectional robot with an arm into an autonomous greenhouse inspector that maps the greenhouse, decides which planters to visit, scans the plants, and removes dead flowers. I led navigation and localization.',
    overview: [
      'Photosyntech is an autonomous inspector for greenhouses. It drives itself between planters, reads the climate data of each one, counts and measures the flowers, and picks off dead ones with its arm. From a web dashboard, an operator can follow the mission, reorder the queue of planters, or take over by remote control.',
      'We built it on a MIRTE Master, a small robot with omnidirectional wheels and a five-joint arm, and added a custom 3D-printed gripper, a wrist camera, and a collection bin. The software is split into six ROS 2 modules: perception, navigation, manipulation, task planning, the operator interface, and a relay for climate data.'
    ],
    context: 'MSc Robotics Multi-Disciplinary Project (RO47007) · TU Delft',
    repo: 'https://github.com/Simoneutili/photosyntech-autonomous-greenhouse-inspector',
    demo: 'assets/media/photosyntech-flower-grab.mp4',
    demoPoster: 'assets/media/photosyntech-flower-grab.jpg',
    demoCaption: 'The real robot picks a dead flower with its custom gripper and drops it in the onboard bin.',
    gallery: [
      { type: 'video', src: 'assets/media/photosyntech-flower-grab.mp4', poster: 'assets/media/photosyntech-flower-grab.jpg', label: 'Flower Removal', caption: 'The arm and custom gripper pick a dead flower from the planter and drop it in the onboard bin.' },
      { type: 'video', src: 'assets/media/photosyntech-real-scan.mp4', poster: 'assets/media/photosyntech-scan.jpg', label: 'Planter Scan', caption: 'Close-range inspection of a planter on the real robot, followed by dead-flower removal.' },
      { type: 'video', src: 'assets/media/photosyntech-real-nav.mp4', poster: 'assets/media/photosyntech-entry.jpg', label: 'Navigation', caption: 'Driving between planters and scanning one sideways on the real robot (5× speed).' },
      { type: 'video', src: 'assets/media/photosyntech-hmi-demo.mp4', poster: 'assets/media/photosyntech-hmi-poster.jpg', label: 'Dashboard', caption: 'The operator dashboard: live map, planter queue, and climate and flower readings for each planter.' },
      { type: 'video', src: 'assets/media/photosyntech-hmi-teleop.mp4', poster: 'assets/media/photosyntech-hmi-poster.jpg', label: 'Teleoperation', caption: 'Driving the base and arm remotely from the dashboard, with live LiDAR and camera views.' },
      { type: 'video', src: 'assets/media/photosyntech-sim-scan.mp4', poster: 'assets/media/photosyntech-sim-poster.jpg', label: 'Simulation', caption: 'The sideways planter scan in simulation, with flowers detected from the wrist camera.' },
      { type: 'image', src: 'assets/media/photosyntech-setup.jpg', label: 'Arena', caption: 'The test arena at TU Delft: rows of planters with tag markers, and the robot.' },
      { type: 'image', src: 'assets/media/photosyntech-planters.jpg', label: 'Planters', caption: 'A row of planters with identification tags, pest markers, and flowers of different varieties.' }
    ],
    sections: [
      {
        heading: 'Deciding where to go',
        text: [
          'A mission controller takes the robot through the same sequence at every planter: drive to it, raise the arm, scan while moving sideways, remove any dead flowers, stow the arm. Each step is tried once and skipped if it fails, so a single missed detection never stalls the whole mission.',
          'On its first sweep the robot visits every planter along the shortest route. Once it has baseline readings, it scores each planter by how unusual its climate and flower health are, and plans the most valuable route that fits within a fixed travel budget. This is an orienteering problem, which we solve exactly as an integer linear program.'
        ],
        figure: {
          src: 'assets/media/photosyntech-mission.png',
          label: 'Mission logic',
          caption: 'Top: the mission loop. Bottom: the five steps the robot repeats at each planter.',
          layout: 'wide'
        }
      },
      {
        heading: 'Navigation and localization',
        text: [
          'This was my part of the project. The robot first builds a map of the greenhouse aisles, then localizes against that saved map during missions.',
          'Because its wheels let it move in any direction, I used a sampling-based predictive controller (MPPI) that plans sideways motion directly. The robot can slide along a planter while its wrist camera stays pointed at the plants, which a planner designed for differential-drive robots cannot do.',
          'Safety is layered. An emergency stop overrides remote control, which in turn overrides autonomous driving. A LiDAR monitor slows the robot and then stops it near obstacles, and a person detector halts it when someone comes within a meter.'
        ],
        figure: {
          src: 'assets/media/photosyntech-sim2real-nav.png',
          label: 'Simulation and real arena',
          caption: 'Top: the simulated greenhouse and the physical test arena. Bottom: the maps and cost maps the robot builds in each.',
          layout: 'wide',
          size: 'side'
        }
      },
      {
        heading: 'Inspecting plants and removing dead flowers',
        text: [
          'During each pass, the wrist camera reads the tag on the planter, which triggers a reading of its temperature, humidity, light, and soil moisture. The camera also counts flowers by color, merges detections across frames so nothing is counted twice, and estimates plant height.',
          'When the camera finds a pest marker, the nearest flower cluster is treated as wilted. The robot returns to it, lines itself up, and uses the arm to pick the stem and drop it in the bin.'
        ],
        figure: {
          src: 'assets/media/photosyntech-hardware.png',
          label: 'The robot',
          caption: 'The arm with our 3D-printed gripper and wrist camera, and the collection bin behind it.',
          layout: 'side',
          size: 'medium'
        }
      },
      {
        heading: 'From simulation to the real robot',
        text: [
          'We tested in simulation and in a physical greenhouse arena. In simulation the robot knew its position to within 4.3 cm (median) while moving and avoided every static and moving obstacle. On hardware the median error was 7.0 cm. Full missions completed 8 of 8 planters in simulation and 3 of 3 on the real robot, without a single stall.',
          'Two lessons came from the hardware. First, the four wheels responded unevenly, so the robot drifted when moving sideways or turning on the spot. Tuning the controller of each wheel individually was the most effective fix for stable localization. Second, the depth camera on the body saw less than the simulation assumed, so we moved tag and flower detection to the wrist camera. This also let the robot scan at close range without backing into narrow aisles.'
        ],
        figure: {
          src: 'assets/media/photosyntech-nav-results.png',
          label: 'Simulation versus real robot',
          caption: 'Top: position error, heading error, and obstacle avoidance. Bottom: average time spent in each step of a planter visit.',
          layout: 'wide',
          size: 'side'
        }
      }
    ]
  },

  {
    slug: 'haptic-teaching',
    category: 'research',
    filterTags: ['research', 'control', 'learning'],
    title: 'Haptic Guidance Strategies for Teleoperation-Based Learning from Demonstration',
    subtitle: 'Does force feedback help people teach robots better? A user study with 20 participants',
    period: 'Feb – Mar 2026',
    institution: 'TU Delft · Control in Human–Robot Interaction',
    award: '',
    authors: '**Simone Utili**, Francesco Marani, Lapo Veca',
    videoPreview: 'assets/media/haptic-preview.mp4',
    image: 'assets/haptic.png',
    imageAlt: 'Dual-panel Mars hull-breach teleoperation teaching interface and Haply 2DIY haptic pantograph setup',
    tags: ['Haptics', 'Learning from Demonstration', 'Gaussian Processes', 'User Study'],
    summary: 'A user study with 20 participants on whether force feedback helps people give a robot better demonstrations. Guidance that fades as the operator improves made teaching about a third faster and clearly less tiring.',
    overview: [
      'Robots can learn a task from human demonstrations. When the robot is far away, though, the person cannot guide it by hand and has to demonstrate through a remote controller instead. Our scenario was sealing a crack in the hull of a Mars station, where signals from Earth take between 3 and 23 minutes to arrive and direct real-time control is not an option.',
      'We asked whether force feedback on the controller helps people give better demonstrations, and which kind of feedback helps most.'
    ],
    context: 'Control in Human–Robot Interaction (RO47013) · TU Delft',
    repo: 'https://github.com/Simoneutili/haptic-teleoperation-teaching',
    demo: 'assets/media/haptic-preview.mp4',
    demoPoster: 'assets/media/haptic-setup.jpg',
    demoCaption: 'Recording a demonstration with the haptic device while the learned path updates on screen.',
    gallery: [
      { type: 'video', src: 'assets/media/haptic-preview.mp4', poster: 'assets/media/haptic-setup.jpg', label: 'Teleop Demo', caption: 'Recording a demonstration with the haptic device while the learned path updates on screen.' },
      { type: 'image', src: 'assets/media/haptic-setup.jpg', label: 'Setup', caption: 'The study setup: the Haply 2DIY device next to the laptop running the task.' },
      { type: 'image', src: 'assets/media/haply-2diy.png', label: 'Haply 2DIY', caption: 'The Haply 2DIY, a desktop device that measures hand position and pushes back with force.' },
      { type: 'image', src: 'assets/haptic.png', label: 'Interface', caption: 'The study interface: the crack to trace on the left, the Mars station scene and learned path on the right.' }
    ],
    sections: [
      {
        heading: 'Setup',
        text: [
          'Participants traced the crack with a Haply 2DIY, a small desktop device that both measures hand position and pushes back with force. A screen showed the crack, the demonstrations recorded so far, and the path the system had learned from them.',
          'After each demonstration, a Gaussian Process model was updated with the new path. The model gives a smooth average trajectory and also reports how uncertain it still is at each point along the crack.'
        ],
        figure: {
          src: 'assets/media/haply-2diy.png',
          label: 'Haply 2DIY',
          caption: 'The haptic device used to trace the crack.',
          layout: 'small'
        }
      },
      {
        heading: 'Five kinds of feedback',
        text: 'Each participant tried all five conditions, in a counterbalanced order, and gave ten demonstrations per condition:',
        points: [
          { term: 'No feedback', text: 'The baseline.' },
          { term: 'Virtual walls', text: 'The device resists when the hand leaves the crack.' },
          { term: 'Fixed guidance', text: 'Walls, plus a constant gentle pull toward the center of the crack.' },
          { term: 'Fading guidance', text: 'The same pull, growing weaker with each demonstration as the operator gains confidence.' },
          { term: 'Personalised guidance', text: 'A pull toward the path learned from the operator\'s own demonstrations, stronger where the model is more certain.' }
        ],
        figure: {
          src: 'assets/haptic.png',
          label: 'Study interface',
          caption: 'Left: the device and the crack to trace. Right: the Mars station scene with the recorded demonstrations and the learned path.',
          layout: 'wide',
          size: 'side'
        }
      },
      {
        heading: 'Results',
        text: [
          'Guidance toward the path helped. Walls alone did not.',
          'Fading guidance was the best all-round. The model converged in 80 seconds instead of 122 without feedback, participants rated their workload far lower (29 against 52 on the NASA-TLX scale), and they hit the walls about ten times less often.',
          'Personalised guidance produced the most consistent demonstrations. It halved the variation from one demonstration to the next and left the learned path with the least uncertainty.',
          'Virtual walls on their own gave no meaningful improvement over no feedback at all.'
        ],
        figure: {
          src: 'assets/media/haptic-results.png',
          label: 'Results by condition',
          caption: 'Left: variation between demonstrations. Center: time for the model to converge. Right: perceived workload. NH: no feedback, VW: virtual walls, CG: fixed guidance, FG: fading guidance, SG: personalised guidance.',
          layout: 'wide'
        }
      }
    ]
  },

  {
    slug: 'mobile-manipulator',
    category: 'research',
    filterTags: ['research', 'control'],
    title: 'Whole-Body Motion Planning & MPC for a Bartender Mobile Manipulator',
    subtitle: 'When does a robot need a global plan, and when is a local controller enough?',
    period: 'Nov 2025 – Jan 2026',
    institution: 'TU Delft · Planning & Decision Making',
    award: '',
    authors: '**Simone Utili**, Francesco Marani, Javier Gil, Núria Seguí',
    videoPreview: 'assets/media/barista-preview.mp4',
    image: 'assets/mobile-manipulator.png',
    imageAlt: '10-DoF Albert bartender mobile manipulator (Clearpath Boxer + Franka Panda) in PyBullet simulation',
    tags: ['Motion Planning', 'Model Predictive Control', 'Mobile Manipulation', 'PyBullet'],
    summary: 'A simulated bartender robot, a mobile base with a seven-joint arm, picks up a drink and delivers it across a busy restaurant. Following a global path raised navigation success from 74% to 96%, while the arm did just as well without one.',
    overview: 'A simulated bartender robot has to drive to the bar, pick up a bottle, carry it across a busy restaurant, and place it on a table. We used this task to study a practical question in robot motion: when is a global plan worth computing, and when is a local controller enough?',
    context: 'Planning & Decision Making (RO47005) · TU Delft',
    repo: 'https://github.com/Simoneutili/BartenderMobileManipulator',
    pdfUrl: 'documents/barista-motion-planning-report.pdf',
    pdfLabel: 'Report (PDF)',
    video: 'https://www.youtube.com/watch?v=8MRPteQAve4',
    demo: 'assets/media/barista-preview.mp4',
    demoPoster: 'assets/mobile-manipulator.png',
    demoCaption: 'The full task in simulation: drive to the bar, grasp the bottle, carry it across the room, and place it on a table.',
    gallery: [
      { type: 'video', src: 'assets/media/barista-preview.mp4', poster: 'assets/mobile-manipulator.png', label: 'Pick & Place', caption: 'The full task in simulation, from the bar to the table.' },
      { type: 'image', src: 'assets/mobile-manipulator.png', label: 'Environment', caption: 'The simulated 20 m × 10 m restaurant with a bar counter, tables, and moving obstacles.' },
      { type: 'image', src: 'assets/media/barista-robot.png', label: 'Robot', caption: 'Albert: a Clearpath Boxer base carrying a Franka Panda arm.' }
    ],
    sections: [
      {
        heading: 'The robot and the task',
        text: [
          '"Albert" is a mobile manipulator: a Clearpath Boxer wheeled base carrying a Franka Panda arm, with ten degrees of freedom in total. The restaurant is a 20 m × 10 m room with a bar counter, tables, and moving obstacles.',
          'Planning for all ten degrees of freedom at once across the whole room is impractical. We split the task into four phases (approach, grasp, transport, deliver) and move either the base or the arm in each.'
        ],
        figure: {
          src: 'assets/media/barista-robot.png',
          label: 'Albert',
          caption: 'A Clearpath Boxer base carrying a Franka Panda arm, in the simulated restaurant.',
          layout: 'side',
          size: 'medium'
        }
      },
      {
        heading: 'Two strategies, compared',
        text: 'For both the base and the arm, we compared two strategies: model predictive control (MPC) on its own, and MPC following a path from a sampling-based global planner (PRM, RRT, or RRT*). A task sequencer steps through the four phases and hands each one to the chosen planner and controller.',
        figure: {
          src: 'assets/media/bartender-architecture.png',
          label: 'Control and planning',
          caption: 'Task sequencer, global planner, and the MPC controller for the base and the arm.',
          layout: 'wide'
        }
      },
      {
        heading: 'Navigation: a global plan matters',
        text: [
          'Over 30 randomized trials, MPC on its own reached the goal 74% of the time. Counters and tables form dead ends that a local optimizer cannot escape.',
          'Adding a global path raised success to 87% with RRT, 91% with PRM, and 96% with RRT*. PRM takes longer to set up, but its roadmap can be reused for every delivery in the same room, and it produced the shortest and smoothest paths.'
        ],
        figure: {
          src: 'assets/media/bartender-global-paths.png',
          label: 'Global paths',
          caption: 'Paths from the three global planners, each followed by the base controller across the restaurant.',
          layout: 'wide'
        }
      },
      {
        heading: 'Avoiding moving obstacles',
        text: 'For moving obstacles such as people and bar stools, the controller takes their velocity into account over its prediction horizon and bends the path around them ahead of time, while keeping the motion of the base smooth.',
        figure: {
          src: 'assets/media/bartender-mpc-obstacles.png',
          label: 'Moving versus static obstacles',
          caption: 'The base trajectory when obstacles are moving (left) and when they are static (right).',
          layout: 'side'
        }
      },
      {
        heading: 'Manipulation: a global plan does not',
        text: [
          'For the arm, the picture reverses. Once the base is parked at the bar, the arm works in a small, open workspace. MPC alone already places the gripper within 1.7 cm of its target in about four seconds. Adding a global planner did not improve accuracy and cost six to seven seconds of planning time.',
          'The practical conclusion: use sampling-based planning for room-scale navigation, and plain online MPC for the arm.'
        ],
        figure: {
          src: 'assets/media/bartender-arm-ee.png',
          label: 'Arm trajectory',
          caption: 'The path of the gripper under MPC alone: approach, descend to grasp, lift, and hold.',
          layout: 'side',
          size: 'medium'
        }
      }
    ]
  }
];

export const publications = [
  {
    slug: 'real2sim',
    kind: 'Conference Paper',
    year: '2026',
    venue: 'IEEE/ASME International Conference on Advanced Intelligent Mechatronics (AIM 2026)',
    shortVenue: 'IEEE/ASME AIM 2026',
    award: 'Accepted',
    authors: '**Simone Utili**, Andrea Govoni, Gianluca Palli',
    title: 'Online Real2Sim Calibration of Velocity-Controlled Digital Twins via Reinforcement Learning',
    description: 'Online curriculum reinforcement learning framework in NVIDIA Isaac Lab that calibrates PhysX joint damping and friction parameters of a velocity-controlled 7-DoF PAL TIAGo digital twin from real-time velocity residuals.',
    contribution: 'First author · Developed from BSc thesis research at the Laboratory of Automation and Robotics (LAR), University of Bologna.',
    status: 'Accepted at IEEE/ASME AIM 2026',
    url: 'https://doi.org/10.1109/AIM65483.2026.11658146',
    pdf: 'documents/aim2026-real2sim-paper.pdf',
    repo: 'https://github.com/Simoneutili/isaaclab-tiago-digitaltwin',
    videoPreview: 'assets/media/real2sim-preview.mp4',
    image: 'assets/digital-twin.jpg',
    linkText: 'IEEE Xplore / DOI',
    citation: 'S. Utili, A. Govoni, and G. Palli, "Online Real2Sim Calibration of Velocity-Controlled Digital Twins via Reinforcement Learning," in Proc. IEEE/ASME International Conference on Advanced Intelligent Mechatronics (AIM), Genova, Italy, 2026, doi: 10.1109/AIM65483.2026.11658146.',
    bibtex: `@inproceedings{utili2026real2sim,
  author    = {Utili, Simone and Govoni, Andrea and Palli, Gianluca},
  title     = {Online Real2Sim Calibration of Velocity-Controlled Digital Twins via Reinforcement Learning},
  booktitle = {2026 IEEE/ASME International Conference on Advanced Intelligent Mechatronics (AIM)},
  year      = {2026},
  doi       = {10.1109/AIM65483.2026.11658146}
}`
  },
  {
    slug: 'collaborative-robotics',
    kind: 'Industry White Paper',
    year: '2025–2026',
    venue: 'Clust-ER MECH · Mechatronics and Motoristics Innovation Cluster (Emilia-Romagna, Italy)',
    shortVenue: 'Clust-ER MECH · Emilia-Romagna, Italy',
    award: 'Published',
    authors: 'Clust-ER MECH Working Group (Co-authored by **Simone Utili**, CRIT Research, ART-ER, UNIBO, UNIMORE, UNIFE)',
    title: 'La Robotica Collaborativa in Emilia-Romagna',
    subtitle: 'Stato dell’arte, trend globali e analisi dell’ecosistema regionale (Emilia-Romagna, Italy)',
    description: 'Empirical mapping and technical analysis of collaborative robotics adoption, safety standards, and vision integration across manufacturing enterprises and research laboratories in Emilia-Romagna, Italy.',
    contribution: 'Co-author & Research Analyst · Contributed to survey design, stakeholder interviews, and adoption analysis across Emilia-Romagna, Italy.',
    status: 'Published White Paper',
    url: 'https://mech.clust-er.it/robotica-collaborativa-in-emilia-romagna-il-nuovo-white-paper-mech/',
    pdf: 'documents/white-paper-robotica-collaborativa.pdf',
    image: 'assets/media/collaborative-robotics.jpg',
    linkText: 'Clust-ER MECH Article',
    citation: 'Clust-ER MECH, "La Robotica Collaborativa in Emilia-Romagna: Stato dell’arte, trend globali e analisi dell’ecosistema regionale," White Paper, Bologna, Emilia-Romagna, Italy, 2025–2026.',
    bibtex: `@techreport{clustermech2026cobots,
  author      = {Utili, Simone and {Clust-ER MECH Collaborative Robotics Working Group}},
  title       = {La Robotica Collaborativa in Emilia-Romagna: Stato dell'arte, trend globali e analisi dell'ecosistema regionale},
  institution = {Clust-ER MECH},
  address     = {Emilia-Romagna, Italy},
  year        = {2026}
}`
  }
];

export const experience = [
  {
    period: '2026 – Present',
    role: 'Embodied AI Engineer',
    organization: 'Motion1',
    detail: 'Robotics R&D',
    location: 'Remote',
    description: 'Developing the VLA training and RL fine-tuning stack for Unitree G1 and AgiBot G2 humanoids, combining physical and visual simulation data augmentation. Architecting modular Physical AI pipelines over open-source frameworks for agentic 3DGS digital twin reconstruction, Real2Sim dexterous skill transfer from egocentric video, and SLAM-based hand-object tracking and semantic action annotation.',
    tags: ['VLA & RL Fine-Tuning', 'Sim Data Augmentation', 'Real2Sim & 3DGS', 'Egocentric Data Pipelines']
  },
  {
    period: 'Jul – Dec 2025',
    role: 'Collaborative Robotics Research Analyst',
    organization: 'Clust-ER MECH',
    detail: 'Mechatronics & Robotics Innovation Cluster',
    location: 'Emilia-Romagna, Italy',
    description: 'Co-authored the regional white paper "La Robotica Collaborativa in Emilia-Romagna", analyzing industrial cobot adoption, safety standards, and vision integration across manufacturing enterprises and research labs in Emilia-Romagna, Italy.',
    tags: ['Collaborative Robotics', 'Industrial Automation', 'Research Analysis']
  },
  {
    period: 'Mar 2024 – Mar 2025',
    role: 'Undergraduate Robotics Researcher',
    organization: 'Laboratory of Automation and Robotics (LAR) · University of Bologna',
    detail: 'Supervisors: Prof. Gianluca Palli & Andrea Govoni',
    location: 'Bologna, Italy',
    description: 'Developed a USD digital twin of the 7-DoF PAL TIAGo manipulator in NVIDIA Isaac Sim / Isaac Lab and an online curriculum reinforcement learning (SAC / PPO) calibration pipeline to bridge the velocity-control reality gap.',
    tags: ['Reinforcement Learning', 'NVIDIA Isaac Lab', 'Digital Twins', 'ROS 2']
  }
];

export const education = [
  {
    degree: 'MSc in Robotics',
    institution: 'Delft University of Technology (TU Delft)',
    period: '2025 – Present',
    location: 'Delft, Netherlands',
    detail: 'Focus on intelligent control systems, reinforcement learning, motion planning and control, human–robot interaction, and physical AI.',
    coursework: ['Planning & Decision Making', 'Control in Human–Robot Interaction', 'Machine Learning for Robotics', 'Robot Dynamics & Control']
  },
  {
    degree: 'BSc in Automation Engineering',
    institution: 'University of Bologna',
    period: '2021 – 2025',
    location: 'Bologna, Italy',
    detail: 'Thesis at LAR: "Reinforcement Learning Calibration of a Robotic Manipulator Digital Twin in NVIDIA Isaac Sim" (Supervisors: Prof. G. Palli, A. Govoni).',
    coursework: ['Automatic Control', 'Nonlinear Systems', 'Robotics & Industrial Automation', 'Optimization']
  }
];
