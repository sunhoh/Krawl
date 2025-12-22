export type SerpItem = {
  rank: number;
  title: string;
  url: string;
  domain: string;
  snippet?: string;
};

export type ResultSection = {
  total: number;
  items: SerpItem[];
};

type Results = {
  blog: ResultSection;
  web: ResultSection;
  kin: ResultSection;
};

export type SerpSnapshot = {
  keyword: string;
  engine: 'naver';
  source: 'blog' | 'web' | 'kin';
  fetchedAt: string;
  results: Results;
};
