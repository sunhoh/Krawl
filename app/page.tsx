'use client';

import { useMemo, useState } from 'react';

import { fetchScrapeData, fetchSearchData } from '@/api/query';
import { ResultSection } from '@/component/common/ResultSection';
import BaseHead from '@/component/layout/base-head';
import BaseLayout from '@/component/layout/base-layout';
import { Engine, Metadata } from '@/types/global';
import { SearchRankData } from '@/types/table.type';

interface SearchApiResponse {
  success: boolean;
  data: SearchRankData[];
  keyword: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'Scrape' | 'Search'>('Scrape');
  const [activePortalTab, setActivePortalTab] = useState<'G' | 'N'>('N');
  const [value, setValue] = useState<string>('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [scrapeHistory, setScrapeHistory] = useState<
    (Metadata & { requestUrl: string; scrapeId?: string })[]
  >([]);
  const [searchHistory, setSearchHistory] = useState<SearchApiResponse>();

  const engine: Engine = useMemo(
    () => (activePortalTab === 'N' ? 'naver' : 'google'),
    [activePortalTab],
  );

  async function onClickRun() {
    const trimmed = value.trim();
    setErrorMsg(null);

    if (!trimmed) return;

    setLoading(true);

    try {
      if (activeTab === 'Search') {
        const result = await fetchSearchData(trimmed, engine);
        setSearchHistory(result);
      } else {
        const requestUrl = `https://${trimmed}`;
        if (!trimmed.includes('.')) {
          throw new Error('올바른 도메인 형식을 입력하세요. (예: example.com)');
        }
        const result = await fetchScrapeData(requestUrl);
        setScrapeHistory(prev => [
          { ...result, requestUrl: requestUrl },
          ...prev,
        ]);
      }
      setValue('');
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : '오류가 발생했습니다.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <BaseLayout>
      <div className='mb-12 text-center text-4xl font-bold'>
        <h1></h1>
      </div>
      <BaseHead
        value={value}
        setValue={setValue}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activePortalTab={activePortalTab}
        setActivePortalTab={setActivePortalTab}
        loading={loading}
        setErrorMsg={setErrorMsg}
        onClickRun={onClickRun}
        errorMsg={errorMsg}
      />
      <ResultSection
        activeTab={activeTab}
        loading={loading}
        data={activeTab === 'Search' ? searchHistory : scrapeHistory}
      />
    </BaseLayout>
  );
}
