import { Metadata } from '@/types/global';

interface Props {
  data: Metadata;
  value: string;
}

export const JsonView = ({ data, value }: Props) => {
  if (!data) return null;

  return (
    <>
      <div className='h-full w-full'>
        <h1 className='text-[1.5rem] font-bold'>{value}</h1>
        <div className='flex items-center gap-4'>
          <p>{data.metadata.title}</p>
          {/* <p>{new Date(data.fetchedAt).toLocaleString('ko-KR')}</p> */}
        </div>
      </div>
      <div className='w-full rounded-lg border border-[#e9ecef] bg-[#f8f9fa] p-4 shadow-inner'>
        <div className='mb-2 flex items-center justify-between border-b border-gray-200 pb-2'>
          <span className='text-xs font-bold text-gray-500 uppercase'>
            JSON
          </span>
          <button
            onClick={() =>
              navigator.clipboard.writeText(JSON.stringify(data, null, 2))
            }
            className='rounded border border-gray-300 bg-white px-2 py-1 text-[10px] hover:bg-gray-50'
          >
            Copy
          </button>
        </div>

        <pre className='overflow-x-auto font-mono text-[13px] leading-relaxed text-gray-800'>
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </>
  );
};
