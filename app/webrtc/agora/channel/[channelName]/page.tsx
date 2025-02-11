export default function Page({ params }: { params: { channelName: string } }) {
  const { channelName } = params;
  const appId = process.env.NEXT_PUBLIC_AGORA_APP_ID!;
  
  return (
    <main className="flex w-full flex-col">
      <p className="absolute z-10 mt-2 ml-12 text-2xl font-bold text-gray-900">{channelName}</p>
      <p className="absolute z-10 mt-2 mr-12 text-2xl font-bold text-gray-900">{appId}</p>
    </main>
  )
}