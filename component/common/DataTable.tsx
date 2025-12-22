import { TableColumn } from '@/configs';
import { cn } from '@/libs/utils';

interface DataTableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: TableColumn<T>[];
  emptyMessage?: string;
  highlightCondition?: (row: T) => boolean;
  highlightClassName?: string;
  className?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  emptyMessage = 'No data found.',
  highlightCondition,
  highlightClassName = 'bg-blue-50/30 shadow-[0_0_20px_rgba(59,130,246,0.5)] ring-2 ring-blue-500 ring-inset',
  className,
}: DataTableProps<T>) {
  const renderCell = (
    column: TableColumn<T>,
    value: unknown,
    row: T,
  ): React.ReactNode => {
    // value를 안전하게 처리
    const safeValue = value ?? '';

    // 기본 렌더링
    switch (column.key) {
      case 'rank':
        return (
          <div className='flex items-center gap-2'>
            <span className='font-medium text-zinc-600'>
              {safeValue as string}
            </span>
            {/* {'isAd' in row && row.isAd && (
              <span className='rounded bg-gray-200 px-1 text-[10px] text-gray-600'>
                AD
              </span>
            )} */}
          </div>
        );

      case 'reviewCount':
        return (
          <span>
            {typeof safeValue === 'number'
              ? (safeValue as number).toLocaleString()
              : String(safeValue)}
          </span>
        );

      case 'category':
        return (
          <span>
            {Array.isArray(safeValue)
              ? (safeValue as string[]).join(', ')
              : String(safeValue)}
          </span>
        );

      case 'pcMapUrl':
        return (
          <a
            href={String(safeValue)}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-block rounded bg-zinc-800 px-2 py-1 text-white transition hover:bg-black'
          >
            View Map
          </a>
        );

      default:
        return <span>{String(safeValue || '')}</span>;
    }
  };

  return (
    <div
      className={cn(
        'w-full overflow-hidden rounded-xl border border-gray-300 bg-white',
        className,
      )}
    >
      <div className='overflow-x-auto'>
        <table className='w-full border-collapse text-sm'>
          <thead className='bg-zinc-100 text-zinc-700'>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={String(column.key) || index}
                  className={cn('text-left font-semibold', column.width)}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={'id' in row ? String(row.id) : String(rowIndex)}
                  className={cn(
                    'border-t border-zinc-200 transition hover:bg-zinc-50',
                    'isAd' in row && Boolean(row.isAd) ? 'bg-amber-50/50' : '',
                    highlightCondition?.(row) && highlightClassName,
                  )}
                >
                  {columns.map((column, colIndex) => {
                    const value = row[column.key as keyof T];
                    const renderedValue = renderCell(column, value, row);

                    return (
                      <td
                        key={String(column.key) || colIndex}
                        className={cn(column.width, column.className)}
                      >
                        {renderedValue}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className='px-4 py-10 text-center text-gray-400'
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
