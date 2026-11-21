export type ProjectCategory = 
  | 'All' 
  | 'Cinematic Edits' 
  | 'Reels & Social Media' 
  | 'Community Edit' 
  | 'Promotional Videos' 
  | 'Creative Experiments';

export interface Project {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'All'>;
  clientPlaceholder: string;
  shortDesc: string;
  fullDesc: string;
  duration: string;
  year: string;
  aspectRatio: '16:9' | '9:16' | '2.39:1';
  resolution: string;
  frameRate: string;
  thumbnail: string;
  externalUrl?: string;
  videoPreviewUrl?: string;
  tools: string[];
  role: string[];
  colorPalette?: string[];
  beforeAfterGrade?: {
    logUrl: string;
    gradedUrl: string;
  };
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  deliverables: string[];
  toolsUsed: string[];
  turnaroundTime: string;
  highlight?: boolean;
}

export interface SoftwareArsenalItem {
  id: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  customImage?: string;
}

export interface CustomAssetsConfig {
  aboutProfileImage?: string;
  softwareArsenalImages?: {
    premiere?: string;
    davinci?: string;
    aftereffects?: string;
    capcut?: string;
    filmora?: string;
    vn?: string;
    [key: string]: string | undefined;
  };
  socialImages?: {
    instagram?: string;
    youtube?: string;
    linkedin?: string;
    [key: string]: string | undefined;
  };
  contactEmailIcon?: string;
}
