import dynamic from "next/dynamic";

const Call = dynamic(() => import("@/components/agora/Call"), {
  ssr: false
});

export default function Page({ params }: { params: { channelName: string } }) {
  const { channelName } = params;
  const appId = process.env.NEXT_PUBLIC_AGORA_APP_ID!;
  
  return (
    <main className="flex w-full flex-col">
      <p className="absolute z-10 mt-2 ml-12 text-2xl font-bold text-gray-900">{channelName}</p>
      <Call appId={appId} channelName={channelName} />
    </main>
  )
}