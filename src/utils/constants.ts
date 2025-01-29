import { PlatformOption } from '../types';

export const PLATFORM_OPTIONS: PlatformOption[] = [
  {
    id: 'mastodon',
    name: 'Mastodon',
    baseUrl: 'https://mastodon.social/',
    description: 'Decentralized social network'
  },
  {
    id: 'bluesky',
    name: 'Bluesky',
    baseUrl: 'https://bsky.app/',
    description: 'Decentralized social network built on the AT Protocol'
  },
  {
    id: 'threads',
    name: 'Threads',
    baseUrl: 'https://threads.net/',
    description: 'Text-based conversation app by Meta'
  },
  {
    id: 'pixelfed',
    name: 'Pixelfed',
    baseUrl: 'https://pixelfed.social/',
    description: 'Decentralized image sharing platform'
  },
  {
    id: 'lemmy',
    name: 'Lemmy',
    baseUrl: 'https://lemmy.world/',
    description: 'Link aggregation and discussion platform'
  },
  {
    id: 'kbin',
    name: 'kbin',
    baseUrl: 'https://kbin.social/',
    description: 'Content aggregation and microblogging'
  },
  {
    id: 'matrix',
    name: 'Matrix',
    baseUrl: 'https://matrix.to/#/',
    description: 'Decentralized communication network'
  }
];

export const DEFAULT_LINK: SocialLink = {
  platform: '',
  url: ''
};