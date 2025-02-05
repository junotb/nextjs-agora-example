"use client";

import { FormEvent, useContext } from "react";
import { useRouter } from "next/navigation";
import { AgoraContext } from "@/contexts/AgoraContext";

interface CreateAgoraChannelFormProps {}

export default function CreateAgoraChannelForm({}: CreateAgoraChannelFormProps) {
  const { createChannel } = useContext(AgoraContext);
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    
    if (!title) return;

    try {
      const data = await createChannel(title);
      if (!data) return;
      
      const { host_pass_phrase, channel } = data;
      router.push(`/webrtc/agora/${channel}?phrase=${host_pass_phrase}`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="username"
        className="border border-gray-700 rounded px-4 py-2 w-full"
        placeholder="Enter a username"/>
      <input
        type="text"
        name="title"
        className="border border-gray-700 rounded px-4 py-2 w-full"
        placeholder="Enter a title"/>
      <button
        type="submit"
        className="border border-black rounded px-4 py-2 w-full hover:bg-gray-500">
        Join
      </button>
    </form>
  );
}