import { NextResponse } from 'next/server';

import {
  fetchNaverBlog,
  fetchNaverKin,
  fetchNaverLocal,
  fetchNaverWeb,
} from '@/libs/serp/naver';
import { Engine } from '@/types/global';

type SerpRequest = {
  keyword: string;
  engine: Engine;
};

export async function POST(req: Request) {
  const body = (await req.json()) as SerpRequest;

  if (!body.keyword) {
    return NextResponse.json({ error: 'keyword is required' }, { status: 400 });
  }

  const engine = body.engine ?? 'naver';

  if (engine === 'naver') {
    try {
      const data = await naverPromise(body.keyword);
      return NextResponse.json(data);
    } catch (e) {
      console.error(e);
      return NextResponse.json(
        { error: 'Naver SERP fetch failed' },
        { status: 500 },
      );
    }
  }

  // 👉 Google은 다음 단계
  return NextResponse.json(
    { error: 'Google not implemented yet' },
    { status: 501 },
  );
}

export async function naverPromise(keyword: string) {
  const [blog, web, kin] = await Promise.all([
    fetchNaverBlog(keyword),
    fetchNaverWeb(keyword),
    fetchNaverKin(keyword),
    // fetchNaverLocal(keyword),
  ]);

  return {
    keyword,
    engine: 'naver',
    fetchedAt: new Date().toISOString(),
    results: {
      blog,
      web,
      kin,
    },
  };
}
