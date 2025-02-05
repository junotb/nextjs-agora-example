import CreateAgoraChannelForm from "@/components/forms/CreateAgoraChannelForm";

export default function Page() {
  return (
    <main className="flex flex-col justify-center items-center size-full bg-gray-200">
      <div className="space-y-8">
        <p className="text-xl font-bold">Video Call Test</p>
        <CreateAgoraChannelForm />
      </div>
    </main>
  );
}