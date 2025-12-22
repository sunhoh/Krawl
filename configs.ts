import { SearchRankData } from './types/global';

export const configs = {
  GU: '사적인 아름다움 지유의원',
  GU_ILSAN: '사적인 아름다움지유의원 일산점',
  LUHO: '루호성형외과',
};

// Table Column Configuration
export interface TableColumn<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  key: keyof T | string;
  label: string;
  width?: string;
  className?: string;
}

export const HOSPITAL_COLUMNS: TableColumn<SearchRankData>[] = [
  {
    key: 'rank',
    label: 'Rank',
    width: 'px-4 py-3',
  },
  {
    key: 'name',
    label: 'Hospital Name',
    width: 'px-4 py-3',
    className: 'font-bold text-zinc-900',
  },
  {
    key: 'reviewCount',
    label: 'Reviews',
    width: 'px-4 py-3',
    className: 'font-semibold text-blue-600',
  },
  {
    key: 'category',
    label: 'Category',
    width: 'px-4 py-3',
    className: 'text-zinc-500',
  },
  {
    key: 'address',
    label: 'Address',
    width: 'max-w-[200px] truncate px-4 py-3',
    className: 'text-zinc-500',
  },
  {
    key: 'pcMapUrl',
    label: 'Link',
    width: 'px-4 py-3',
  },
];
