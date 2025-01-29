// src/utils/urlEncoder.ts

import { ShareableData, SocialLink } from '../types';

interface EncodingResult {
  success: boolean;
  data?: string;
  error?: string;
}

interface DecodingResult {
  success: boolean;
  data?: ShareableData;
  error?: string;
}

export const encodeProfileData = (links: SocialLink[]): EncodingResult => {
  try {
    const data: ShareableData = {
      links,
      createdAt: new Date().toISOString(),
    };
    
    const jsonStr = JSON.stringify(data);
    return {
      success: true,
      data: Buffer.from(jsonStr).toString('base64url')
    };
  } catch (error) {
    console.error('Error encoding profile data:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown encoding error'
    };
  }
};

export const decodeProfileData = (encoded: string): DecodingResult => {
  try {
    const jsonStr = Buffer.from(encoded, 'base64url').toString();
    const data = JSON.parse(jsonStr) as ShareableData;
    
    // Validate the decoded data structure
    if (!data.links || !Array.isArray(data.links)) {
      throw new Error('Invalid data structure: missing or invalid links array');
    }
    
    if (!data.createdAt) {
      throw new Error('Invalid data structure: missing creation timestamp');
    }

    // Validate each link in the array
    data.links.forEach((link, index) => {
      if (!link.platform || !link.url) {
        throw new Error(`Invalid link at index ${index}: missing platform or url`);
      }
    });

    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('Error decoding profile data:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown decoding error'
    };
  }
};

// Optional: Add helper function for URL safety check
export const isValidEncodedData = (encoded: string): boolean => {
  try {
    const result = decodeProfileData(encoded);
    return result.success;
  } catch {
    return false;
  }
};