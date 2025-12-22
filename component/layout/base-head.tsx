import { ArrowRight, Globe } from 'lucide-react';

import { cn } from '@/libs/utils';

interface BaseHeadProps {
  value: string;
  setValue: (value: string) => void;
  activeTab: 'Scrape' | 'Search';
  setActiveTab: (tab: 'Scrape' | 'Search') => void;
  activePortalTab: 'G' | 'N';
  setActivePortalTab: (tab: 'G' | 'N') => void;
  loading: boolean;
  setErrorMsg: (msg: string | null) => void;
  onClickRun: () => void;
  errorMsg: string | null;
}

export default function BaseHead({
  value,
  setValue,
  activeTab,
  setActiveTab,
  activePortalTab,
  setActivePortalTab,
  loading,
  setErrorMsg,
  onClickRun,
  errorMsg,
}: BaseHeadProps) {
  const tabs = ['Scrape', 'Search'] as const;
  const portal = ['G', 'N'] as const;

  const handleTabChange = (tab: 'Scrape' | 'Search') => {
    setActiveTab(tab);
    setErrorMsg(null);
  };

  return (
    <>
      <div className='flex w-full flex-col items-center gap-4 rounded-2xl border border-gray-300 bg-white py-4 shadow-md'>
        {/* URL Input Section */}
        <div className='flex w-full items-center gap-2 border-b border-gray-300 px-6 py-3'>
          <Globe className='h-4 w-4 shrink-0 text-gray-400' />
          <input
            type='text'
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && onClickRun()}
            placeholder='https://example.com'
            className='flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none'
          />

          {/* Portal Selector (only visible in Search mode) */}
          <div className='flex h-12 items-center'>
            {activeTab === 'Search' && (
              <div className='relative flex items-center rounded-2xl bg-gray-100 p-1'>
                <span
                  className='absolute top-1 bottom-1 rounded-xl bg-white shadow transition-all duration-300 ease-out'
                  style={{
                    width: '40px',
                    transform: `translateX(${portal.indexOf(activePortalTab) * 40}px)`,
                  }}
                />
                {portal.map(tab => (
                  <button
                    key={tab}
                    type='button'
                    onClick={() => setActivePortalTab(tab)}
                    className={cn(
                      'relative z-10 w-10 cursor-pointer px-3 py-2 text-sm text-gray-400 transition-colors duration-300',
                      activePortalTab === tab &&
                        (tab === 'G' ? 'text-blue-500' : 'text-green-500'),
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tab Navigation and Action Button */}
        <div className='flex w-full items-center justify-between gap-4 px-6'>
          {/* Mode Tabs */}
          <div className='relative flex items-center rounded-2xl bg-gray-100 px-1 py-1'>
            <span
              className='absolute top-1 bottom-1 rounded-2xl bg-white shadow transition-all duration-300 ease-out'
              style={{
                width: '96px',
                transform: `translateX(${tabs.indexOf(activeTab) * 96}px)`,
              }}
            />
            {tabs.map(tab => (
              <button
                key={tab}
                type='button'
                onClick={() => handleTabChange(tab)}
                className={cn(
                  'relative z-10 w-24 cursor-pointer px-4 py-2 text-sm transition-colors duration-300',
                  activeTab === tab
                    ? 'font-bold text-gray-900'
                    : 'text-gray-400 hover:text-gray-700',
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Execute Button */}
          <button
            type='button'
            onClick={onClickRun}
            disabled={loading}
            className={cn(
              'flex h-12 w-20 cursor-pointer items-center justify-center rounded-2xl transition-all duration-200',
              loading
                ? 'bg-gray-400'
                : 'bg-black hover:bg-gray-800 active:scale-95',
            )}
          >
            <ArrowRight
              className={cn('h-5 w-5 text-white', loading && 'animate-pulse')}
            />
          </button>
        </div>
      </div>
      {errorMsg && (
        <p className='mt-4 text-center text-sm text-red-500'>{errorMsg}</p>
      )}
    </>
  );
}
