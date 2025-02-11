'use client';

import Header from "@/components/Header";
import { requestChannel } from "@/lib/agora";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Page() {
  const [isHost, setIsHost] = useState(true);
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const title = formData.get('title') as string;
      
      if (!title) return;

      const data = await requestChannel(title);
      const { channel, host_pass_phrase, viewer_pass_phrase } = data;

      router.push(`/webrtc/agora/appbuilder?channel=${channel}`);
    } catch (error) {
      console.error(error);
    }
  }

  function handleClick(isTrue: boolean) {
    setIsHost(isTrue);
  }

  return (
		<div className="flex flex-col justify-center items-center h-full gap-2">
      <Header />
      <div className="flex flex-col justify-center items-center gap-4 mt-12 w-full max-w-xl h-full">
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full">
          <h1 className="text-xl font-bold">Video Call Test</h1>
          <input
            type="text"
            name="username"
            className="border border-gray-700 rounded px-4 py-2 w-full"
            placeholder="Enter a username"
            required
          />
          <input
            type="text"
            name="title"
            className="border border-gray-700 rounded px-4 py-2 w-full"
            placeholder="Enter a title"
            required
          />
          <div className="flex justify-center items-center gap-2 w-full">
            <button
              type="button"
              onClick={() => handleClick(true)}
              className={clsx("border border-black rounded px-4 py-2 w-full hover:bg-gray-500", { "bg-gray-500 text-white" : isHost })}
            >Host</button>
            <button
              type="button"
              onClick={() => handleClick(false)}
              className={clsx("border border-black rounded px-4 py-2 w-full hover:bg-gray-500", { "bg-gray-500 text-white" : !isHost })}
            >Viewer</button>
          </div>
          <button
            type="submit"
            className="border border-black rounded px-4 py-2 w-full hover:bg-gray-500"
          >Join</button>
        </form>
      </div>
    </div>
  );
}