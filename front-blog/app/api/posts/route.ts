import {NextRequest, NextResponse} from 'next/server';
import {config} from '@/config';

export async function GET(req: NextRequest) {
  try {
    const response = await fetch(`${config.apiUri}/api/v1/posts`, {
      headers: {'x-api-key': config.apiKey},
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({error: 'Failed to fetch data'}, {status: 500});
  }
}
