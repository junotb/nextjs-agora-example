'use client';

import { useRouter } from 'next/navigation';
import CreateChannelForm from '@/components/form/CreateChannelForm';

export default function Page() {
  const router = useRouter();
  
  const handleSubmit = (channel: string) => {
    router.push(`/webrtc/agora/channel/${channel}`);
  }

  return (
    <main className="flex flex-col justify-center items-center pt-12 w-full h-full">
      <CreateChannelForm onSubmit={handleSubmit} />
    </main>
  );
}