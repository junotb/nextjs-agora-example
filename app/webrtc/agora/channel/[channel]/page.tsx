'use client';

import { useEffect, useState } from 'react';
import { joinChannel, requestToken } from '@/lib/agora';

interface PageProps {
  params: {
    channel: string;
  };
}

export default function Page({ params }: PageProps) {
  const { channel } = params;
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    async function fetchToken() {
      try {
        const data = await requestToken();
        if (!data) throw new Error('토큰을 받아오지 못했습니다.');
        setToken(data.token);
      } catch (error) {
        console.error(error);
      }
    }

    fetchToken();
  }, []);

  useEffect(() => {
    if (!token) return;
    
    async function fetchChannel() {
      try {
        const data = await joinChannel(token!);
        if (!data) throw new Error('채널 입장에 실패했습니다.');
      } catch (error: any) {
        console.error('채널 입장에 실패:', error.response?.data || error.message);
        throw new Error('채널 입장에 실패했습니다.');
      }
    }

    fetchChannel();
  }, [token]);
  
  return (
    <main className="flex w-full flex-col">
      <p className="absolute z-10 mt-2 ml-12 text-2xl font-bold text-gray-400">{channel}</p>
    </main>
  )
}