import { SearchRankData, TableColumn } from '@/types/table.type';

export const HOSPITAL_COLUMNS: TableColumn<SearchRankData>[] = [
  {
    key: 'rank',
    label: 'Rank',
    width: 'px-4 py-3',
  },
  {
    key: 'name',
    label: 'Name',
    width: 'px-4 py-3',
    className: 'font-bold text-zinc-900',
  },
  {
    key: 'reviewCount',
    label: 'Reviews',
    width: 'px-4 py-3',
    className: 'font-semibold ',
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
