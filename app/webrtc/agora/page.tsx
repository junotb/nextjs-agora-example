'use client';

import Header from "@/components/Header";
import clsx from "clsx";
import { FormEvent, useState } from "react";

export default function Page() {
  const [isHost, setIsHost] = useState(true);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    throw new Error("Function not implemented.");

    event.preventDefault();
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
          <input type="text" id="username" className="border border-gray-700 rounded px-4 py-2 w-full" placeholder="Enter a username" required />
          <input type="text" id="channel-title" className="border border-gray-700 rounded px-4 py-2 w-full" placeholder="Enter a title" required />
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