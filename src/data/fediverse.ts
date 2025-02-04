export interface FediverseInstance {
    domain: string;
    name: string;
    description?: string;
  }
  
  export interface FediversePlatform {
    id: string;
    name: string;
    description: string;
    defaultInstances: FediverseInstance[];
  }
  
  export const fediversePlatforms: Record<string, FediversePlatform> = {
    mastodon: {
      id: 'mastodon',
      name: 'Mastodon',
      description: 'Decentralized social networking',
      defaultInstances: [
        { domain: 'mastodon.social', name: 'Mastodon Social', description: 'The original Mastodon instance' },
        { domain: 'fosstodon.org', name: 'Fosstodon', description: 'FOSS-focused Mastodon instance' }
      ]
    },
    peertube: {
      id: 'peertube',
      name: 'PeerTube',
      description: 'Decentralized video platform',
      defaultInstances: [
        { domain: 'video.ploud.fr', name: 'Ploud', description: 'General purpose PeerTube instance' }
      ]
    },
    pixelfed: {
      id: 'pixelfed',
      name: 'Pixelfed',
      description: 'Decentralized image sharing',
      defaultInstances: [
        { domain: 'pixelfed.social', name: 'Pixelfed Social', description: 'Main Pixelfed instance' }
      ]
    }
  };