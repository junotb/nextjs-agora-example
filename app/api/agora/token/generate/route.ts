import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const agoraApiKey = process.env.AGORA_API_KEY!;
  const agoraProjectId = process.env.AGORA_PROJECT_ID!;
  const agoraApiDomain = process.env.AGORA_API_DOMAIN!;

  try {
    /*
    "token": string,
    "user": {
      "user_id": string,
      "user_auid": number,
      "screen_auid": number
    }
    */
    const data = await fetch(`${agoraApiDomain}/v1/token/generate`, {
      method: 'POST',
      headers: {
        'X-API-KEY': agoraApiKey,
        'X-Project-ID': agoraProjectId,
        'Content-Type': 'application/json'
      },
    })
      .then((res) => res.json());

    return NextResponse.json({ token: data.token }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '교정 중에 문제가 발생했습니다.' }, { status: 500 });
  }
}