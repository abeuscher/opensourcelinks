interface ValidationResult {
    isValid: boolean;
    message?: string;
  }

  export const validateSourceUrl = (platform: string, url: string): ValidationResult => {
    const urlPattern = {
      facebook: /^https?:\/\/(www\.)?(facebook|fb)\.com\/([a-zA-Z0-9.]{5,})$/,
      twitter: /^https?:\/\/(www\.)?twitter\.com\/([a-zA-Z0-9_]{1,15})\/?$/,
      instagram: /^https?:\/\/(www\.)?instagram\.com\/([a-zA-Z0-9_.]{1,30})\/?$/,
      youtube: /^https?:\/\/(www\.)?youtube\.com\/(c\/|channel\/|user\/|@)?([a-zA-Z0-9_-]+)\/?$/,
      tiktok: /^https?:\/\/(www\.)?tiktok\.com\/@([a-zA-Z0-9_.]{2,24})\/?$/
    };
  
    if (!url) {
      return { isValid: false, message: 'URL is required' };
    }
  
    try {
      new URL(url);
    } catch {
      return { isValid: false, message: 'Invalid URL format' };
    }
  
    const pattern = urlPattern[platform as keyof typeof urlPattern];
    if (!pattern) {
      return { isValid: true }; // If we don't have a pattern, assume valid
    }
  
    return {
      isValid: pattern.test(url),
      message: pattern.test(url) ? undefined : `This doesn't look like a ${platform} URL`
    };
  };
  
  export const validateFediverseUsername = (username: string): ValidationResult => {
    if (!username) {
      return { isValid: false, message: 'Username is required' };
    }
  
    // Basic username validation - letters, numbers, underscores, no spaces
    const usernamePattern = /^[a-zA-Z0-9_]{1,30}$/;
    return {
      isValid: usernamePattern.test(username),
      message: usernamePattern.test(username) ? undefined : 'Invalid username format'
    };
  };