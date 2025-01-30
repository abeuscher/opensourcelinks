// src/pages/guides/exit/[platform].tsx

import { GetStaticPaths, GetStaticProps } from 'next';

import GuideLayout from '../../../components/guides/GuideLayout';
import { loadMarkdownFile } from '../../../utils/markdownLoader';
import { useRouter } from 'next/router';

interface GuidePageProps {
  content: string;
  metadata: {
    title: string;
    description: string;
    platform: string;
    difficulty: string;
    timeRequired: string;
    lastUpdated: string;
  };
}

// Helper to convert URL-friendly names to proper platform names
const platformMap = {
  facebook: 'Facebook',
  twitter: 'Twitter/X',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
  reddit: 'Reddit',
  snapchat: 'Snapchat',
  pinterest: 'Pinterest',
  whatsapp: 'WhatsApp',
  discord: 'Discord',
  tumblr: 'Tumblr',
} as const;

type PlatformKey = keyof typeof platformMap;

export default function GuidePage({ content, metadata }: GuidePageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return <GuideLayout content={content} metadata={metadata} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Generate paths for all platforms
  const paths = Object.keys(platformMap).map(platform => ({
    params: { platform },
  }));

  return {
    paths,
    fallback: false, // Return 404 for non-existent platforms
  };
};

export const getStaticProps: GetStaticProps<GuidePageProps> = async ({ params }) => {
  try {
    const platform = params?.platform as PlatformKey;

    // Validate platform
    if (!platform || !platformMap[platform]) {
      return { notFound: true };
    }

    // Load the markdown file for this platform
    const { content, metadata } = await loadMarkdownFile(`guides/${platform}`);

    return {
      props: {
        content,
        metadata,
      },
    };
  } catch (error) {
    console.error(`Error loading guide for platform: ${params?.platform}`, error);
    return { notFound: true };
  }
};

// Add type safety for our URL parameters
declare module 'next' {
  interface StaticPaths {
    params: {
      platform: keyof typeof platformMap;
    };
  }
}
