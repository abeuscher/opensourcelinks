export interface SocialLink {
    platform: string;
    url: string;
  }
  
  export interface PlatformOption {
    id: string;
    name: string;
    baseUrl: string;
    description?: string;
  }
  
  export interface ShareableData {
    links: SocialLink[];
    createdAt: string;
    expiresAt?: string;
  }