'use client';

import { useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import AgoraCard from '@/components/card/AgoraCard';

export default function Page() {
  const { channel } = useParams<Record<string, string>>();
  const searchParams = useSearchParams();

  // useMemo를 활용하여 searchParams 값 캐싱
  const hostPassPhrase = useMemo(() => searchParams.get('host_pass_phrase') ?? '', [searchParams]);
  const viewerPassPhrase = useMemo(() => searchParams.get('viewer_pass_phrase') ?? '', [searchParams]);

  // 필수 값이 없으면 대체 UI 제공
  if (!channel || !hostPassPhrase || !viewerPassPhrase) {
    return (
      <main className="flex flex-col justify-center items-center pt-12 w-full h-full">
        <p className="text-gray-500">유효한 정보를 찾을 수 없습니다.</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col justify-center items-center pt-12 w-full h-full" aria-live="polite">
      <AgoraCard channel={channel} host_pass_phrase={hostPassPhrase} viewer_pass_phrase={viewerPassPhrase} />
    </main>
  );
}