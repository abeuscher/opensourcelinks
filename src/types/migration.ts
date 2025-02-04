export interface DestinationInfo {
  username: string;
  instance: string;
}

export interface UrlPair {
  id: string;
  platform: string;
  sourceUrl: string;
  destination: DestinationInfo;
}

export interface MigrationData {
  name?: string;
  pairs: UrlPair[];
}