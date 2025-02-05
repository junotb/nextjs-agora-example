"use client";

import ServiceCard from "@/components/cards/ServiceCard";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center size-full bg-gray-200">
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-xl font-bold">Web audio Api</p>
          <ServiceCard title="Audio Recorder" description="Record audio using the Web Audio API." href="/webaudio/recorder" />
        </div>
        <div className="space-y-2">
          <p className="text-xl font-bold">WebRTC Libraries</p>
          <ServiceCard title="Video Chat" description="Start a video chat using Agora WebRTC." href="/webrtc/agora" />
        </div>
      </div>
    </main>
  );
}