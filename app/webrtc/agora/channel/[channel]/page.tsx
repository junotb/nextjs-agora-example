'use client';

import { useEffect, useState } from 'react';
import Call from '@/components/agora/Call';
import { requestChannel, requestToken } from '@/lib/agora';

interface PageParams {
  channel: string;
}

export default function Page({ params }: { params: PageParams }) {
  const { channel } = params;
  
  const [hostPassPhrase, setHostPassPhrase] = useState<string | null>(null);
  const [viewerPassPhrase, setViewerPassPhrase] = useState<string | null>(null);

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchChannel = async () => {
      const data = await requestChannel(channel);
      const { host_pass_phrase, viewer_pass_phrase } = data;
      setHostPassPhrase(host_pass_phrase);
      setViewerPassPhrase(viewer_pass_phrase);
    }
    fetchChannel();
  }, [channel]);

  useEffect(() => {
    const fetchToken = async () => {
      const data = await requestToken();
      const { token } = data;
      setToken(token);
    }
    fetchToken();
  }, []);

  // 필수 값이 없으면 대체 UI 제공
  if (!token) {
    return (
      <main className="flex flex-col justify-center items-center pt-12 w-full h-full">
        <p className="text-gray-500">유효한 정보를 찾을 수 없습니다.</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col justify-center items-center pt-12 w-full h-full">
      <p className="text-gray-500">채널: {channel}</p>
      <Call appid={process.env.NEXT_PUBLIC_AGORA_APP_ID!} channel={channel} token={token} />
    </main>
  );
}