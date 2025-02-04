import {
  Facebook,
  Instagram,
  LinkedIn,
  MusicVideo,
  PhotoCamera,
  Pinterest,
  Reddit,
  Twitter,
  WhatsApp,
  YouTube
} from '@mui/icons-material';

import { NavItem } from '../types/navigation';

export const mainNavItems: NavItem[] = [
  { 
    text: 'Create Migration Link',
    url: '/create'
  },
  {
    text: 'How to Exit...',
    url: '#',
    children: [
      {
        text: '...Facebook',
        url: '/guides/exit/facebook',
        icon: Facebook
      },
      {
        text: '...Instagram',
        url: '/guides/exit/instagram',
        icon: Instagram
      },
      {
        text: '...LinkedIn',
        url: '/guides/exit/linkedin',
        icon: LinkedIn
      },
      {
        text: '...Twitter/X',
        url: '/guides/exit/twitter',
        icon: Twitter
      },
      {
        text: '...TikTok',
        url: '/guides/exit/tiktok',
        icon: MusicVideo
      },
      {
        text: '...LinkedIn',
        url: '/guides/exit/linkedin',
        icon: LinkedIn
      },
      {
        text: '...YouTube',
        url: '/guides/exit/youtube',
        icon: YouTube
      },
      {
        text: '...Reddit',
        url: '/guides/exit/reddit',
        icon: Reddit
      },
      {
        text: '...Snapchat',
        url: '/guides/exit/snapchat',
        icon: PhotoCamera
      },
      {
        text: '...Pinterest',
        url: '/guides/exit/pinterest',
        icon: Pinterest
      },
      {
        text: '...WhatsApp',
        url: '/guides/exit/whatsapp',
        icon: WhatsApp
      },
    ]
  }
];

export const footerNavItems: NavItem[] = [
  { text: 'About', url: '/about' },
  { text: 'Privacy', url: '/privacy' },
  { text: 'GitHub', url: 'https://github.com/abeuscher/opensourcelinks' },
];