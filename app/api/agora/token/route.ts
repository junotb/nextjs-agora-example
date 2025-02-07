const APP_BUILDER_HOST = process.env.AGORA_APP_BUILDER_HOST!;
const API_KEY = process.env.AGORA_API_KEY!;
const PROJECT_ID = process.env.AGORA_PROJECT_ID!;

export async function POST(req: Request) {
  try {
    /*{"token":string,"user":{"user_id":string,"user_auid":number,"screen_auid":number}}*/
    const data = await fetch(`${APP_BUILDER_HOST}/v1/token/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY,
        'X-Project-ID': PROJECT_ID,
      },
    }).then(response => response.json());    
    if (!data) throw new Error();
    
    return Response.json({
      token: data.token
    }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({
      error: '토큰 획득에 문제가 발생했습니다.'
    }, { status: 500 });
  }
}