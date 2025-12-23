interface BaseLayoutProps {
  children: React.ReactNode;
  errorMsg?: string | null;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-100'>
      <main className='flex min-h-screen w-full max-w-4xl flex-col items-center border border-gray-300 py-32 sm:items-start'>
        <div className='box-border w-full border-y border-gray-300 px-4 py-8 md:px-16'>
          {children}
        </div>
      </main>
    </div>
  );
}
