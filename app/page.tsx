'use client';

import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
  return (
		<div className="flex flex-col justify-center items-center h-full gap-2">
      <Header />
      <div className="mt-12 w-full max-w-xl h-full">
        <div className="flex flex-col gap-4 p-4">
          <h1 className="text-xl font-bold">Welcome to the home page.</h1>
        </div>
        <div className="flex flex-col gap-4 p-4">
          <h2 className="border-b py-2 text-lg font-bold">Web audio</h2>
          <div className="grid grid-cols-2 gap-4">
            <article className="flex flex-col gap-2 border p-4">
              <h3 className="text-base font-bold">Audio analyser</h3>
              <p>Visualise the audio amplitude using the audio analyser node.</p>
              <Link href="/webaudio/analyser" className="border px-4 py-2">Go to example</Link>
            </article>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-4">
          <h2 className="border-b py-2 text-lg font-bold">Agora</h2>
          <div className="grid grid-cols-2 gap-4">
            <article className="flex flex-col gap-2 border p-4">
              <h3 className="text-base font-bold">Video Chat</h3>
              <p>Start a video chat using Agora WebRTC.</p>
              <Link href="/webrtc/agora" className="border px-4 py-2">Go to example</Link>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}