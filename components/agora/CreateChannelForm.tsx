'use client';

import { requestChannel } from '@/lib/agora';
import { FormEvent, useState } from 'react';

interface CreateChannelFormProps {
  onSubmit: (channel: string, host_pass_phrase: string, viewer_pass_phrase: string) => void;
}

const CreateChannelForm = ({ onSubmit }: CreateChannelFormProps) => {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const title = formData.get('title') as string;
      
      if (!title) {
        setError('제목을 입력해주세요.');
        return false;
      }

      const data = await requestChannel(title);
      const { channel, host_pass_phrase, viewer_pass_phrase } = data;

      onSubmit(channel, host_pass_phrase, viewer_pass_phrase);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full">
      <h1 className="text-xl font-bold">Video Call Test</h1>
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-2">
          <input
            type="text"
            name="title"
            className="border border-gray-400 focus:border-gray-700 rounded px-4 py-2 w-full"
            placeholder="채널명"/>
          <button
            type="submit"
            className="border border-gray-400 rounded px-4 py-2 w-24 hover:bg-gray-200">
            Join
          </button>
        </div>
        {error && <p className="text-red-400">{error}</p>}
      </div>
    </form>
  );
};

export default CreateChannelForm;
