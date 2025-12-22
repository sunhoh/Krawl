'use client';

import { useMemo, useState } from 'react';

import { fetchScrapeData, fetchSearchData } from '@/api/query';
import { ResultSection } from '@/component/common/ResultSection';
import BaseHead from '@/component/layout/base-head';
import BaseLayout from '@/component/layout/base-layout';
import { Engine, Metadata, SearchRankData } from '@/types/global';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'Scrape' | 'Search'>('Scrape');
  const [activePortalTab, setActivePortalTab] = useState<'G' | 'N'>('N');
  const [value, setValue] = useState<string>('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [scrapeHistory, setScrapeHistory] = useState<Metadata[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchRankData[]>([]);

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
        // const result = await fetchSerpData(trimmed, engine);
        // setSearchHistory(prev => [result, ...prev]);
        const result = await fetchSearchData(trimmed, engine);
        // TODO: API 응답 형식을 SearchRankData[]로 변환 필요
        setSearchHistory([result as unknown as SearchRankData]);
      } else {
        if (!trimmed.startsWith('http')) {
          throw new Error('올바른 URL 형식을 입력하세요. (https://...)');
        }
        const result = await fetchScrapeData(trimmed);
        setScrapeHistory(prev => [{ ...result, requestUrl: trimmed }, ...prev]);
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
        searchHistory={searchHistory}
        scrapeHistory={scrapeHistory}
      />
    </BaseLayout>
  );
}
