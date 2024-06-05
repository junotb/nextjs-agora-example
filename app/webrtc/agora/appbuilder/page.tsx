'use client';
import dynamic from "next/dynamic";
import Header from "@/components/Header";

const AgoraAppBuilderWraper = dynamic(() => import("@/components/agora/AppBuilderWrapper"), {
  ssr: false,
});

export default function Page() {
  return (
		<div className="flex flex-col justify-center items-center h-full gap-2">
      <Header />
      <div className="flex flex-col justify-center items-center gap-4 mt-12 w-full max-w-xl h-full">
        <div className="flex flex-col gap-4 p-4">
          <h1 className="text-xl font-bold">WebRTC example: Agora - App Builder</h1>
        </div>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col items-center">
            <AgoraAppBuilderWraper />
          </div>
        </div>
      </div>
    </div>
  );
}