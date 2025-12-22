import { Engine } from '@/types/global';
import { SerpSnapshot } from '@/types/naver.type';

type SearchRequest = {
  keyword: string;
  engine: Engine;
};

export const fetchSearchData = async (
  keyword: string,
  engine: Engine,
): Promise<SerpSnapshot> => {
  const params = new URLSearchParams({ keyword, engine });
  const payload: SearchRequest = { keyword, engine };
  const res = await fetch(`/api/search?${params.toString()}`, {
    method: 'GET',
  });
  // const res = await fetch('/api/search', {
  //   method: 'GET',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(payload),
  // });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `Search failed: ${res.status}`);
  return data;
};
