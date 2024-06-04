'use client';

import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Page() {
  const router = useRouter();
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const token = fetch('/api/agora/token/generate', {
  }

  return (
		<div className="flex flex-col justify-center items-center h-full gap-2">
      <Header />
      <div className="flex flex-col justify-center items-center gap-4 mt-12 w-full max-w-xl h-full">
        <div className="flex flex-col gap-4 p-4">
          <h1 className="text-xl font-bold">WebRTC example: Agora</h1>
        </div>
        <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col items-center">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-4">
              <div>
                <label
                  className="text-gray-700 font-bold"
                  htmlFor="inline-full-name"
                >
                  Channel Name
                </label>
              </div>
              <div>
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  id="inline-full-name"
                  type="text"
                  name="channel"
                  placeholder="Enter channel name"
                  required
                />
              </div>
            </div>
            <div className="text-center">
              <button
                className="inline-flex items-center justify-center px-5 py-3 mt-5 text-base font-medium text-center text-white bg-gray-500 rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-gray-700 dark:focus:ring-gray-700"
              >Submit</button>
            </div>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
}