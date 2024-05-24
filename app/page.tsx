'use client';

import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
  return (
		<div className="flex flex-col justify-center items-center h-full gap-2">
      <Header />
      <div className="mt-12 w-full max-w-xl h-full">
        <section className="flex flex-col gap-4 p-4">
          <h1 className="text-xl font-bold">Welcome to the home page.</h1>
        </section>
        <section className="flex flex-col gap-4 p-4">
          <h2 className="border-b py-2 text-lg font-bold">Web audio API</h2>
          <div className="grid grid-cols-2 gap-4">
            <article className="flex flex-col gap-2 border p-4">
              <h3 className="text-base font-bold">Audio analyser</h3>
              <p>Visualise the audio amplitude using the audio analyser node.</p>
              <Link href="/webaudio/analyser" className="border px-4 py-2">Go to example</Link>
            </article>
            <article className="flex flex-col gap-2 border p-4">
              <h3 className="text-base font-bold">Audio analyser</h3>
              <p>Visualise the audio amplitude using the audio analyser node.</p>
              <Link href="/webaudio/analyser" className="border px-4 py-2">Go to example</Link>
            </article>
            <article className="flex flex-col gap-2 border p-4">
              <h3 className="text-base font-bold">Audio analyser</h3>
              <p>Visualise the audio amplitude using the audio analyser node.</p>
              <Link href="/webaudio/analyser" className="border px-4 py-2">Go to example</Link>
            </article>
            <article className="flex flex-col gap-2 border p-4">
              <h3 className="text-base font-bold">Audio analyser</h3>
              <p>Visualise the audio amplitude using the audio analyser node.</p>
              <Link href="/webaudio/analyser" className="border px-4 py-2">Go to example</Link>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
}