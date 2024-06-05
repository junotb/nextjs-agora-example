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
      <div className="flex flex-col justify-center items-center gap-4 pt-12 w-full max-w-xl h-full">
        <div className="flex flex-col gap-4 h-full">
          <div className="flex flex-col items-center h-full" suppressHydrationWarning={true}>
            <AgoraAppBuilderWraper />
          </div>
        </div>
      </div>
    </div>
  );
}