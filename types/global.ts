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
