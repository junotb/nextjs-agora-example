import { createChannel } from "@/lib/agora";

const APP_BUILDER_HOST = process.env.AGORA_APP_BUILDER_HOST!;
const API_KEY = process.env.AGORA_API_KEY!;
const PROJECT_ID = process.env.AGORA_PROJECT_ID!;

export async function POST(req: Request) {
  const { channelTitle, isHost } = await req.json();

  try {
    const data = await createChannel(channelTitle);    
    if (!data) throw new Error();
    
    return Response.json({
      channel: data.channel,
      phrase: (isHost) ? data.host_pass_phrase : data.viewer_pass_phrase,
    }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({
      error: '채널 획득에 문제가 발생했습니다.'
    }, { status: 500 });
  }
}