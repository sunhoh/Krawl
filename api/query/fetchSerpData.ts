import { Engine } from '@/types/global';
import { SerpSnapshot } from '@/types/naver.type';

type SerpRequest = {
  keyword: string;
  engine: Engine;
};

export const fetchSerpData = async (
  keyword: string,
  engine: Engine,
): Promise<SerpSnapshot> => {
  const payload: SerpRequest = { keyword, engine };
  const res = await fetch('/api/serp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `Search failed: ${res.status}`);
  return data;
};
