'use client';

import { useRouter } from 'next/navigation';
import CreateChannelForm from '@/components/form/CreateChannelForm';

export default function Page() {
  const router = useRouter();
  
  const handleSubmit = (channel: string, host_pass_phrase: string, viewer_pass_phrase: string) => {
    router.push(`/webrtc/agora/channel/${channel}?host_pass_phrase=${host_pass_phrase}&viewer_pass_phrase=${viewer_pass_phrase}`);
  }

  return (
    <main className="flex flex-col justify-center items-center pt-12 w-full h-full">
      <CreateChannelForm onSubmit={handleSubmit} />
    </main>
  );
}