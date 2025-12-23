export interface TableColumn<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  key: keyof T | string;
  label: string;
  width?: string;
  className?: string;
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
