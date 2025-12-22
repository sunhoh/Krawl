import { JsonView } from '@/component/output/JsonView';
import { SearchView } from '@/component/output/SearchView';
import { Metadata, SearchRankData } from '@/types/global';

interface ResultSectionProps {
  activeTab: 'Scrape' | 'Search';
  searchHistory: SearchRankData[];
  scrapeHistory: Metadata[];
}

export function ResultSection({
  activeTab,
  searchHistory,
  scrapeHistory,
}: ResultSectionProps) {
  return (
    <div className='mt-8 flex w-full flex-col gap-12 px-16'>
      {activeTab === 'Search'
        ? searchHistory.map((item, index) => (
            <SearchView key={index} data={item} />
          ))
        : scrapeHistory.map((item, index) => (
            <JsonView
              key={item.scrapeId || index}
              data={item}
              value={item.requestUrl}
            />
          ))}
    </div>
  );
}
