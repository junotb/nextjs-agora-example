'use client';

import { useEffect, useRef, useState } from 'react';
import AgoraAppBuilder from '@appbuilder/react';
import { joinChannel, requestToken } from '@/lib/agora';
import { AgoraRTCProvider } from 'agora-rtc-react';

interface AgoraCardProps {
  channel: string;
  host_pass_phrase: string;
  viewer_pass_phrase: string;
}

export default function AgoraCard({ channel, host_pass_phrase, viewer_pass_phrase }: AgoraCardProps) {
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    if (!channel || !host_pass_phrase || !viewer_pass_phrase) return;

    async function fetchToken() {
      try {
        const data = await requestToken();
        if (!data) throw new Error('토큰을 받아오지 못했습니다.');
        setToken(data.token);
      } catch (error: any) {
        console.error('토큰 요청에 실패:', error.message);
        throw new Error('토큰 요청에 실패했습니다.');
      }
    }

    fetchToken();
  }, [channel, host_pass_phrase, viewer_pass_phrase]);

  useEffect(() => {
    if (!token) return;
    
    async function fetchAppBuilder() {
      try {
        console.log('Agora AppBuilder 로그인 시도:', token);
        AgoraAppBuilder.login(token);
      } catch (error: any) {
        console.error('Agora AppBuilder 로그인에 실패:', error.message);
        throw new Error('Agora AppBuilder 로그인에 실패했습니다.');
      }
    }

    fetchAppBuilder();
  }, [token]);

  if (!token) return null;

  return (
    <>{token}</>
  );
}