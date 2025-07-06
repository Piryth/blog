import { NextRequest, NextResponse } from 'next/server';
import { config } from '@/config';

type Article = {
  title: string;
  slug: string;
  description: string;
  created_at: Date;
  thumbnail_url: string | null;
};

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const response = await fetch(`${config.apiUri}/api/v1/posts/${slug}`);
    const data: Article = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
