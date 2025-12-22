export type Engine = 'google' | 'naver';

export interface Metadata {
  metadata: {
    title?: string;
    description?: string;
    favicon?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    ogSiteName?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
  };
}

export interface SearchRankData extends Record<string, unknown> {
  rank: number;
  id: string | number;
  name: string;
  isAd: boolean;
  category: string;
  reviewCount: number;
  blogReviewCount: number;
  rating: number;
  address: string;
  pcMapUrl: string;
}
