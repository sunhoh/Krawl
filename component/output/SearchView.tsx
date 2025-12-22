import { DataTable } from '@/component/common/DataTable';
import { HOSPITAL_COLUMNS } from '@/configs';
import { SearchRankData } from '@/types/global';

export function SearchView({ data }: { data: SearchRankData[] }) {
  // 실제 병원 리스트 데이터 추출
  const hospitalList = Array.isArray(data) ? data : [];
  const keyword = 'Hospital Search'; // TODO: keyword prop으로 받도록 수정 필요

  // 지유의원 하이라이트 조건
  const gu = hospitalList.find((e: SearchRankData) => e.name?.includes('지유'));
  const highlightCondition = (row: SearchRankData) => gu?.id === row.id;

  return (
    <div className='flex flex-col gap-6'>
      <div className='w-full'>
        <h1 className='text-[1.5rem] font-bold'>Naver</h1>
        <div className='flex items-center gap-4 text-gray-500'>
          <p>
            Keyword: <span className='font-medium text-black'>{keyword}</span>
          </p>
        </div>
      </div>

      <DataTable
        data={hospitalList}
        columns={HOSPITAL_COLUMNS}
        highlightCondition={highlightCondition}
        emptyMessage='No hospital data found.'
      />

      {/* 분석 척도 요약 팁 */}
      <div className='mt-4 rounded-lg border border-blue-100 bg-blue-50 p-4'>
        <h4 className='mb-2 font-bold text-blue-800'>💡 순위 분석 Insight</h4>
        <ul className='ml-5 list-disc space-y-1 text-sm text-blue-700'>
          <li>
            상위 1~5위 평균 리뷰 수:
            <b>
              {Math.floor(
                hospitalList
                  .slice(0, 5)
                  .reduce(
                    (acc: number, cur: SearchRankData) => acc + cur.reviewCount,
                    0,
                  ) / 5,
              ).toLocaleString()}
              개
            </b>
          </li>
          <li>
            현재 1위({hospitalList[0]?.name}) 대비 리뷰 격차를 확인하세요.
          </li>
        </ul>
      </div>
    </div>
  );
}
