import { ResultSection, SerpSnapshot } from '@/types/naver.type';

export function ResultView({
  data,
  error,
}: {
  data: SerpSnapshot;
  error: string;
}) {
  if (!data || !data.engine) {
    return error ? (
      <div className='p-12 text-sm whitespace-pre-wrap text-red-600'>
        {error}
      </div>
    ) : null;
  }

  return (
    <>
      <div className='h-full w-full'>
        <h1 className='text-[1.5rem] font-bold'>
          {data?.engine?.toLocaleUpperCase() || 'SEARCH RESULT'}
        </h1>
        <div className='flex items-center gap-4 text-gray-500'>
          <p>
            <span className='font-medium text-black'>{data?.keyword}</span>
          </p>
          {data?.fetchedAt && (
            <p>{new Date(data.fetchedAt).toLocaleString('ko-KR')}</p>
          )}
        </div>
      </div>

      <div className='w-full overflow-hidden border border-gray-300'>
        {error && (
          <div className='p-4 text-sm whitespace-pre-wrap text-red-600'>
            {error}
          </div>
        )}

        {/* data.results가 있을 때만 렌더링 */}
        {data.results && (
          <pre className='flex flex-col gap-12 overflow-auto rounded-xl bg-white px-12 py-4'>
            {Object.entries(data.results).map(
              ([key, value]: [string, ResultSection]) => (
                <div key={key} className='overflow-x-auto'>
                  <div className='mb-2 flex items-center justify-between gap-4'>
                    <h3 className='text-lg font-bold'>{key.toUpperCase()}</h3>
                    <span className='text-sm text-gray-500'>
                      total: {value.total}
                    </span>
                  </div>
                  <table className='w-full border-collapse text-sm'>
                    <thead className='bg-zinc-100 text-zinc-700'>
                      <tr>
                        <th className='px-4 py-2 text-left font-medium'>
                          Rank
                        </th>
                        <th className='px-4 py-2 text-left font-medium'>
                          Title
                        </th>
                        <th className='px-4 py-2 text-left font-medium'>URL</th>
                      </tr>
                    </thead>

                    <tbody>
                      {value.items?.map(item => (
                        <tr
                          key={item.url}
                          className='border-t border-zinc-200 transition hover:bg-zinc-50'
                        >
                          <td className='px-4 py-2 text-zinc-600'>
                            {item.rank}
                          </td>
                          <td className='px-4 py-2 font-medium text-zinc-900'>
                            {item.title}
                          </td>
                          <td className='px-4 py-2 text-xs break-all text-blue-600'>
                            <a
                              href={item.url}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='hover:underline'
                            >
                              {item.url}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
            )}
          </pre>
        )}
      </div>
    </>
  );
}
