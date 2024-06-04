import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { title, enable_pstn } = await req.json();

  const agoraApiKey = process.env.AGORA_API_KEY!;
  const agoraProjectId = process.env.AGORA_PROJECT_ID!;
  const agoraApiDomain = process.env.AGORA_API_DOMAIN!;

  try {
    /*
    {
      "id": number,
      "host_pass_phrase": string,
      "viewer_pass_phrase": string,
      "channel": string,
      "title": string,
      "pstn": null
    }
    */
    const data = await fetch(`${agoraApiDomain}/v1/channel`, {
      method: 'POST',
      headers: {
        'X-API-KEY': agoraApiKey,
        'X-Project-ID': agoraProjectId,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, enable_pstn }),
    })
      .then((res) => res.json());

    return NextResponse.json({ data: data }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '교정 중에 문제가 발생했습니다.' }, { status: 500 });
  }
}