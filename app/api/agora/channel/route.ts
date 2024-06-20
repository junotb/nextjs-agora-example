import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { title, enable_pstn } = await req.json();

  try {
    const data = await createChannel(title, enable_pstn);

    return NextResponse.json({ data: data }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '채널 생성 중에 오류가 발생했습니다.' }, { status: 500 });
  }
}