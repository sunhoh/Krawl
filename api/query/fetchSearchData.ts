import { Engine } from '@/types/global';
import { SearchRankData } from '@/types/table.type';

interface SearchApiResponse {
  success: boolean;
  data: SearchRankData[];
  keyword: string;
}

export const fetchSearchData = async (
  keyword: string,
  engine: Engine,
): Promise<SearchApiResponse> => {
  const res = await fetch('/api/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ keyword, engine }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `Search failed: ${res.status}`);
  return data;
};
