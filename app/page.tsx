'use client';

import ArticleCard from '@/components/card/ArticleCard';

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center space-y-4 pt-12 w-full h-full">
      <div className="space-y-2">
        <p className="text-lg font-bold">Web audio</p>
        <div className="grid grid-cols-2 gap-4">
          <ArticleCard title="Audio analyser" description="Visualise the audio amplitude using the audio analyser node." href="/webaudio/analyser" />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-lg font-bold">Agora</p>
        <div className="grid grid-cols-2 gap-4">
          <ArticleCard title="Video Call" description="Start a video call using Agora WebRTC." href="/webrtc/agora" />
        </div>
      </div>
    </main>
  );
}