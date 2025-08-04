import {NextRequest, NextResponse} from 'next/server';
import {config} from '@/config';
import {logger} from "@/logger";

export async function GET(req: NextRequest) {
  try {
    const response = await fetch(`${config.apiUri}/api/v1/categories`, {
      headers: {'x-api-key': config.apiKey},
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    logger.error("Failed to fetch data")
    return NextResponse.json({error: 'Failed to fetch data'}, {status: 500});
  }
}
