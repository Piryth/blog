import {NextRequest, NextResponse} from "next/server";
import {config} from "@/config";

type ContactMessage = {
  name: string,
  email: string,
  message: string
}

export async function POST(req: NextRequest) {

  const data: ContactMessage = await req.json()

  try {
    const response = await fetch(`${config.apiUri}/api/v1/contact/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.apiKey
      },

      body: JSON.stringify(data),
    })

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({error: 'Failed to post data'}, {status: 500});
  }
}
