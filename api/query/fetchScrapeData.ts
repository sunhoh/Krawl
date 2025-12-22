import { SerpSnapshot } from '@/types/naver.type';

// : Promise<any>
export const fetchScrapeData = async (url: string) => {
  const res = await fetch(`/api/scrape?url=${encodeURIComponent(url)}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `Scrape failed: ${res.status}`);
  return data;
};
