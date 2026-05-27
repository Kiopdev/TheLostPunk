export interface LoreEntry {
  id: string;
  title: string;
  classification: string;
  content: string;
  corrupted: boolean;
}

export interface DevlogEntry {
  id: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
}

export interface SocialLinks {
  discord?: string;
  youtube?: string;
  twitter?: string;
  instagram?: string;
  tiktok?: string;
}
