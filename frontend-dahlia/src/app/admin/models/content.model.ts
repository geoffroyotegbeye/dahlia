export interface PageContent {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaDescription: string;
  sections: PageSection[];
  lastUpdated: Date;
  author: string;
}

export interface PageSection {
  id: string;
  title: string;
  content: string;
  order: number;
  type: 'text' | 'image' | 'video' | 'gallery';
  mediaUrl?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  author: string;
  publishDate: Date;
  lastUpdated: Date;
  tags: string[];
  category: string;
  featuredImage: string;
  status: 'draft' | 'published' | 'archived';
}

export interface Fundraiser {
  id: string;
  title: string;
  description: string;
  goal: number;
  currentAmount: number;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'completed' | 'cancelled';
  images: string[];
  category: string;
}

export interface MediaItem {
  id: string;
  title: string;
  url: string;
  type: 'image' | 'video' | 'audio' | 'document';
  size: number;
  uploadDate: Date;
  tags?: string[];
  description?: string;
  alt?: string;
}
