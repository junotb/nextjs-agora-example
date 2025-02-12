'use client';

import { useState } from 'react';
import CreateChannelForm from '@/components/agora/CreateChannelForm';
import dynamic from 'next/dynamic';

const AgoraCard = dynamic(() => import('@/components/card/AgoraCard'), {
  ssr: false
});

export default function Page() {
  const [channel, setChannel] = useState<string>('');
  const [host_pass_phrase, setHostPassPhrase] = useState<string>('');
  const [viewer_pass_phrase, setViewerPassPhrase] = useState<string>('');
  
  const handleSubmit = (channel: string, host_pass_phrase: string, viewer_pass_phrase: string) => {
    setChannel(channel);
    setHostPassPhrase(host_pass_phrase);
    setViewerPassPhrase(viewer_pass_phrase);
  }

  return (
    <main className="flex flex-col justify-center items-center pt-12 w-full h-full">
      {channel
        ? <AgoraCard channel={channel} host_pass_phrase={host_pass_phrase} viewer_pass_phrase={viewer_pass_phrase} />
        : <CreateChannelForm onSubmit={handleSubmit} />}
    </main>
  );
}