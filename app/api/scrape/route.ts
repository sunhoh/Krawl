import * as cheerio from 'cheerio';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json({ error: 'URL이 필요합니다.' }, { status: 400 });
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      throw new Error('사이트를 불러올 수 없습니다.');
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const metadata = extractMetadata($);
    return NextResponse.json(metadata);
  } catch (error) {
    console.error('Metadata fetch error:', error);
    return NextResponse.json(
      { error: '메타데이터를 추출하는 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
function extractMetadata($: cheerio.CheerioAPI) {
  const meta = (name: string) =>
    $(`meta[name="${name}"]`).attr('content') ??
    $(`meta[property="${name}"]`).attr('content');

  return {
    metadata: {
      title: $('title').text(),
      description: meta('description'),
      language: $('html').attr('lang'),
      favicon: $('link[rel="icon"]').attr('href'),

      ogTitle: meta('og:title'),
      ogDescription: meta('og:description'),
      ogImage: meta('og:image'),
      ogSiteName: meta('og:site_name'),

      twitterTitle: meta('twitter:title'),
      twitterDescription: meta('twitter:description'),
      twitterImage: meta('twitter:image'),

      robots: meta('robots'),
      canonical: $('link[rel="canonical"]').attr('href'),
    },
  };
}
