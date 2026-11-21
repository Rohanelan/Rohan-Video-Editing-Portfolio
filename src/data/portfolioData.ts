import { Project, ServiceItem, CustomAssetsConfig } from '../types';
import { SOFTWARE_LOGOS } from './softwareLogos';

// ============================================================================
// CUSTOM ASSETS & PERSONALISED IMAGES CONFIGURATION
// ============================================================================
// You can provide your own local image paths (e.g. '/my-photo.jpg' placed in
// the public/ directory) or external image URLs (e.g. 'https://...') for any
// of the positions below.
//
// When a custom image is provided, it is displayed with proper aspect ratio,
// object-fit, and smooth hover depth.
// When left empty ('') or undefined, the system automatically falls back to
// the authentic official high-resolution vector logo or default icon.
// ============================================================================

export const CUSTOM_ASSETS: CustomAssetsConfig = {
  // 1. About Profile Image (defaults to '/rohan-profile.jpg')
  aboutProfileImage: '/rohan-profile.jpg',

  // 2. Software Arsenal Application Images
  // Paste your custom image URL or local path here (e.g. '/assets/premiere.png').
  // Leave empty ('') to display the authentic official vector application logo.
  softwareArsenalImages: {
    premiere: '',     // e.g. '/assets/premiere-custom.png' (leave empty for official logo)
    davinci: '',      // e.g. '/assets/davinci-custom.png' (leave empty for official logo)
    aftereffects: '', // e.g. '/assets/ae-custom.png' (leave empty for official logo)
    capcut: '',       // e.g. '/assets/capcut-custom.png' (leave empty for official logo)
    filmora: '',      // e.g. '/assets/filmora-custom.png' (leave empty for official logo)
    vn: '',           // e.g. '/assets/vn-custom.png' (leave empty for official logo)
  },

  // 3. Social Media Visual Images
  // Paste your personal picture or custom avatar URL here.
  // Leave empty ('') to display the authentic official React Icon logo.
  socialImages: {
    instagram: '',    // e.g. '/assets/instagram-avatar.jpg' (leave empty for official logo)
    youtube: '',      // e.g. '/assets/youtube-avatar.jpg' (leave empty for official logo)
    linkedin: '',     // e.g. '/assets/linkedin-headshot.jpg' (leave empty for official logo)
  },

  // 4. Contact Email Icon
  // Leave empty ('') to use the default envelope icon.
  contactEmailIcon: '',
};

export const HERO_DATA = {
  brandName: 'Rohan',
  brandSuffix: '',
  roleBadge: 'VIDEO EDITOR',
  headline: {
    line1: 'EDIT.',
    line2: 'DIRECT.',
    line3: 'CREATE.'
  },
  supportingText: 'Cinematic visuals. Creative storytelling. Turning raw footage into engaging visual stories through pacing, color, and narrative rhythm.',
  quickServices: [
    { id: 'video-editing', name: 'Video Editing', icon: 'Clapperboard' },
    { id: 'cinematic-editing', name: 'Cinematic Editing', icon: 'Film' },
    { id: 'color-grading', name: 'Color Grading', icon: 'Palette' },
    { id: 'sound-design', name: 'Sound Design', icon: 'Waveform' },
    { id: 'post-production', name: 'Post Production', icon: 'MonitorPlay' },
  ]
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'project-1',
    title: 'Tech Community Edit',
    category: 'Community Edit',
    clientPlaceholder: '',
    shortDesc: '',
    fullDesc: '',
    duration: '',
    year: '',
    aspectRatio: '9:16',
    resolution: '',
    frameRate: '',
    thumbnail: '/images/work/tech-community.jpg',
    externalUrl: 'https://www.instagram.com/reels/DS6c5UpEkm_/',
    tools: [],
    role: [],
  },
  {
    id: 'project-2',
    title: 'Collaboration with Roblox',
    category: 'Community Edit',
    clientPlaceholder: '',
    shortDesc: '',
    fullDesc: '',
    duration: '',
    year: '',
    aspectRatio: '9:16',
    resolution: '',
    frameRate: '',
    thumbnail: '/images/work/collaboration-roblox.jpg',
    externalUrl: 'https://www.instagram.com/reels/Dfq7ryupBb9/',
    tools: [],
    role: [],
  },
  {
    id: 'project-3',
    title: 'Creative Content',
    category: 'Community Edit',
    clientPlaceholder: '',
    shortDesc: '',
    fullDesc: '',
    duration: '',
    year: '',
    aspectRatio: '9:16',
    resolution: '',
    frameRate: '',
    thumbnail: '/images/work/creative-content.jpg',
    externalUrl: 'https://www.instagram.com/reels/DVltuXwCS4S/',
    tools: [],
    role: [],
  },
  {
    id: 'project-4',
    title: 'Cricket Edit',
    category: 'Community Edit',
    clientPlaceholder: '',
    shortDesc: '',
    fullDesc: '',
    duration: '',
    year: '',
    aspectRatio: '9:16',
    resolution: '',
    frameRate: '',
    thumbnail: '/images/work/cricket-edit.jpg',
    externalUrl: 'https://www.instagram.com/p/DIdxkUgJiiN/',
    tools: [],
    role: [],
  },
  {
    id: 'project-5',
    title: 'Football Edit',
    category: 'Community Edit',
    clientPlaceholder: '',
    shortDesc: '',
    fullDesc: '',
    duration: '',
    year: '',
    aspectRatio: '9:16',
    resolution: '',
    frameRate: '',
    thumbnail: '/images/work/football-edit.jpg',
    externalUrl: 'https://www.instagram.com/reels/DIGBxSKJYY7/',
    tools: [],
    role: [],
  },
  {
    id: 'project-6',
    title: 'Personal Shoot',
    category: 'Community Edit',
    clientPlaceholder: '',
    shortDesc: '',
    fullDesc: '',
    duration: '',
    year: '',
    aspectRatio: '9:16',
    resolution: '',
    frameRate: '',
    thumbnail: '/images/work/personal-shoot.jpg',
    externalUrl: 'https://drive.google.com/file/d/1w9grFJnHGWLuJzAvQtXNIBh94Q-kev-z/view?usp=drive_link',
    tools: [],
    role: [],
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'video-editing',
    title: 'VIDEO EDITING',
    tagline: 'Precision narrative cuts, rhythm & kinetic pacing',
    description: 'Transforming raw production footage into compelling, high-retention video stories. Every frame cut with surgical rhythm and narrative intention.',
    iconName: 'Clapperboard',
    deliverables: [
      'Multi-cam assembly & sync',
      'Pacing & narrative architecture',
      'Action match cuts & seamless continuity',
      'Strategic B-roll placement'
    ],
    toolsUsed: ['Adobe Premiere Pro', 'DaVinci Resolve'],
    turnaroundTime: '2 - 5 Days',
    highlight: true
  },
  {
    id: 'cinematic-editing',
    title: 'CINEMATIC EDITING',
    tagline: 'High-end trailers, narrative shorts & documentary cuts',
    description: 'Crafting wide-scope cinematic narratives with dramatic pauses, tense scene builds, orchestral sound layering, and seamless emotional payoffs.',
    iconName: 'Film',
    deliverables: [
      'Narrative structure & arc development',
      'Dramatic pacing & tension building',
      'Music stem re-timing & acoustic swells',
      'Anamorphic 2.39:1 & theatrical mastering'
    ],
    toolsUsed: ['Adobe Premiere Pro', 'DaVinci Resolve'],
    turnaroundTime: '3 - 7 Days',
    highlight: true
  },
  {
    id: 'color-grading',
    title: 'COLOR GRADING',
    tagline: 'Cinematic mood, shot matching & film emulation',
    description: 'Professional color science and digital intermediate pipeline. Transforming flat LOG and RAW profiles into rich, emotionally resonant cinematic grades.',
    iconName: 'Palette',
    deliverables: [
      'LOG / RAW color space conversion (ACES / DWG)',
      'Shot-to-shot color & exposure matching',
      'Custom cinematic show LUTs & film print looks',
      'Skin tone preservation & secondary relighting'
    ],
    toolsUsed: ['DaVinci Resolve'],
    turnaroundTime: '1 - 3 Days',
    highlight: true
  },
  {
    id: 'social-media-content',
    title: 'SOCIAL MEDIA VIDEO EDITING',
    tagline: 'High-retention 9:16 reels, TikToks & YouTube Shorts',
    description: 'Short-form video engineered for maximum watch time and algorithmic momentum. Hooking viewers within the first 0.8s and keeping them locked into the loop.',
    iconName: 'Smartphone',
    deliverables: [
      '0.8-second hook architecture',
      'Dynamic kinetic subtitles & caption timing',
      'Seamless loop points for recurring views',
      'Optimized 9:16 vertical 4K HDR export'
    ],
    toolsUsed: ['Adobe Premiere Pro', 'CapCut (Mobile / Desktop)'],
    turnaroundTime: '24 - 48 Hours',
    highlight: true
  },
  {
    id: 'community-content',
    title: 'COMMUNITY CONTENT',
    tagline: 'Compilations, highlight reels & fan engagement',
    description: 'Crafting high-energy community highlights, gaming compilations, and stream recaps that ignite discord servers and fanbase discussions.',
    iconName: 'Users',
    deliverables: [
      'Community clip curating & narrative arcs',
      'Memetic timing & kinetic sound cues',
      'Audio leveling & impact sync',
      'YouTube optimized thumbnail frames & chapters'
    ],
    toolsUsed: ['Adobe Premiere Pro', 'Wondershare Filmora'],
    turnaroundTime: '2 - 4 Days'
  },
  {
    id: 'sports-content',
    title: 'SPORTS CONTENT',
    tagline: 'High-adrenaline hype reels & athlete showcases',
    description: 'Capturing the raw velocity and emotion of athletic performance with dramatic speed ramps, optical flow slow-mo, and explosive audio hits.',
    iconName: 'Zap',
    deliverables: [
      'Velocity speed ramping & slow-motion pacing',
      'Dynamic player spotlights & tracking highlights',
      'Crowd reaction sound layering & stadium roar swells',
      'Hyped promo cuts for Instagram & YouTube'
    ],
    toolsUsed: ['Adobe Premiere Pro', 'VN Video Editor'],
    turnaroundTime: '2 - 4 Days'
  },
  {
    id: 'voice-enhancement',
    title: 'VOICE ENHANCEMENT',
    tagline: 'Broadcast clarity, de-noise & warm proximity tone',
    description: 'Turning muddy, echoey smartphone or boom mic recordings into radio-ready, rich studio voiceovers with warm low-end proximity and pristine highs.',
    iconName: 'Mic',
    deliverables: [
      'Room reverb & room echo de-reverberation',
      'Mouth de-click, plosive and sibilance de-essing',
      'Parametric EQ voicing for vocal richness',
      'Transparent broadcast compression'
    ],
    toolsUsed: ['Adobe Premiere Pro', 'DaVinci Resolve'],
    turnaroundTime: '24 Hours'
  }
];

export const ABOUT_DATA = {
  name: 'Rohan Sharma',
  alias: 'RohanElan',
  title: 'Video Editor',
  profilePhoto: CUSTOM_ASSETS.aboutProfileImage || '/rohan-profile.jpg',
  aboutMeTitle: 'ABOUT ME',
  bio: [
    "I'm Rohan Sharma, a video editor with a passion for visual storytelling and creative expression. I enjoy transforming ordinary footage into engaging visual experiences that capture attention and communicate a story.",
    "For me, video editing is not just about cutting clips together. It's about understanding the mood of a scene, finding the right rhythm, choosing the right transitions and bringing every element together to create something meaningful.",
    "My creative approach revolves around cinematic visuals, smooth editing, thoughtful colour grading and sound that complements the story. Whether it's a lifestyle video, cinematic sequence, social media reel or a short-form edit, I focus on making every frame feel intentional.",
    "I enjoy experimenting with different editing styles, exploring new creative techniques and constantly improving the way I tell stories through visuals.",
    "I believe the best edits are the ones that make people stop, watch and feel something."
  ],
  punchline: "Every frame has a purpose. Every cut tells a story.",
  // Exactly the 6 requested applications in the specified order with descriptions & tags
  softwareArsenal: [
    {
      id: 'premiere',
      name: 'Adobe Premiere Pro',
      category: 'Primary NLE',
      description: 'My primary editing tool for cinematic storytelling, timeline editing and seamless video assembly.',
      tags: ['Timeline Editing', 'Storytelling', 'Multi-cam'],
      customImage: SOFTWARE_LOGOS.premierePro || CUSTOM_ASSETS.softwareArsenalImages?.premiere
    },
    {
      id: 'davinci',
      name: 'DaVinci Resolve',
      category: 'Colour & Finishing',
      description: 'Used for professional colour correction, cinematic grading and final visual refinement.',
      tags: ['Colour Grading', 'Colour Correction', 'Finishing'],
      customImage: SOFTWARE_LOGOS.davinciResolve || CUSTOM_ASSETS.softwareArsenalImages?.davinci
    },
    {
      id: 'aftereffects',
      name: 'Adobe After Effects',
      category: 'Visual Effects & Titles',
      description: 'Used for visual effects, compositing, motion titles and creative enhancements.',
      tags: ['Visual Effects', 'Compositing', 'Titles'],
      customImage: SOFTWARE_LOGOS.afterEffects || CUSTOM_ASSETS.softwareArsenalImages?.aftereffects
    },
    {
      id: 'capcut',
      name: 'CapCut (Mobile / Desktop)',
      category: 'Short-Form Suite',
      description: 'Used for fast-paced social media edits, short-form content and creative transitions.',
      tags: ['Reels', 'Short-form Editing', 'Transitions'],
      customImage: SOFTWARE_LOGOS.capcut || CUSTOM_ASSETS.softwareArsenalImages?.capcut
    },
    {
      id: 'filmora',
      name: 'Wondershare Filmora',
      category: 'Creative Suite',
      description: 'A versatile editing tool for quick video projects, creative effects and efficient content production.',
      tags: ['Video Editing', 'Effects', 'Content Creation'],
      customImage: SOFTWARE_LOGOS.filmora || CUSTOM_ASSETS.softwareArsenalImages?.filmora
    },
    {
      id: 'vn',
      name: 'VN Video Editor',
      category: 'Mobile & Fast Cut',
      description: 'Used for mobile-first editing, smooth transitions and polished short-form videos.',
      tags: ['Mobile Editing', 'Transitions', 'Reels'],
      customImage: SOFTWARE_LOGOS.vnEditor || CUSTOM_ASSETS.softwareArsenalImages?.vn
    }
  ]
};

export const CONTACT_INFO = {
  email: 'rohanelanwork@gmail.com',
  timelineHeading: 'Project Delivery Timeline',
  timelineText: 'Initial consultation & project review within 12 hours. Fast delivery tailored to production scale.',
  socials: [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/rohan.sharma019/',
      handle: '@rohan.sharma019',
      platform: 'instagram'
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@Itzz_rohan19',
      handle: '@Itzz_rohan19',
      platform: 'youtube'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/rohan-sharma-021429307/',
      handle: 'Rohan Sharma',
      platform: 'linkedin'
    }
  ]
};
