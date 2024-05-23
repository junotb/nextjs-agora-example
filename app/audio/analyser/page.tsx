'use client';

import clsx from "clsx";
import { MouseEvent, useEffect, useRef, useState } from "react";

export default function Page() {
  const CANVAS_WIDTH = 512;
  const CANVAS_HEIGHT = 256;
  const [isStart, setIsStart] = useState(false);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const outputRef = useRef<HTMLOutputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleStart = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setIsStart(true);

    // A user interaction happened we can create the audioContext
    const audioContext = new AudioContext();

    // Load the audio the first time through, otherwise play it from the buffer
    outputRef.current!.textContent = "Loading audio…";
    
    const decodedBuffer = await fetch("/audios/viper.mp3")
      .then((response) => response.arrayBuffer())
      .then((downloadedBuffer) => audioContext.decodeAudioData(downloadedBuffer));

    // Set up the AudioBufferSourceNode
    sourceNodeRef.current = new AudioBufferSourceNode(audioContext, { buffer: decodedBuffer, loop: true });

    // Set up the AnalyserNode and 
    const analyserNode = new AnalyserNode(audioContext, { fftSize: 2048 });
    await audioContext.audioWorklet.addModule("/audios/processors/bypass-processor.js");
    const bypassNode = new AudioWorkletNode(
      audioContext,
      "bypass-processor",
    );
    
    // Connect the nodes together
    sourceNodeRef.current.connect(analyserNode);
    sourceNodeRef.current.connect(audioContext.destination);
    analyserNode.connect(bypassNode);
    bypassNode.connect(audioContext.destination);
    
    // Play the audio
    outputRef.current!.textContent = "Audio playing…";
    sourceNodeRef.current.start(0); // Play the sound now

    requestAnimationFrame(() => {
      const dataArray = new Uint8Array(analyserNode.frequencyBinCount);

      // Get the time domain data for this sample
      analyserNode.getByteTimeDomainData(dataArray);

      // Get the canvas 2d context
      const canvasContext = canvasRef.current!.getContext("2d")!;

      // Clear the canvas
      canvasContext.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw the amplitude inside the canvas
      for (let i = 0; i < dataArray.length; i++) {
        const value = dataArray[i] / 256;
        const y = CANVAS_HEIGHT - (CANVAS_HEIGHT * value);
        canvasContext.fillStyle = "black";
        canvasContext.fillRect(i, y, 1, 1);
      }
    });
  }

  const handleStop = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setIsStart(false);

    // Set up the event handler to stop playing the audio
    sourceNodeRef.current!.stop(0);
    outputRef.current!.textContent = "Audio stopped.";
  }

  return (
		<div className="flex flex-col justify-center items-center h-full gap-2">
      <h1 className="font-bold">Web Audio API examples: audio analyser</h1>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="border"
      ></canvas>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleStart}
          disabled={isStart}
          className={clsx("border px-4 py-2", { "bg-neutral-500" : isStart })}
        >Start</button>
        <button
          type="button"
          onClick={handleStop}
          disabled={!isStart}
          className={clsx("border px-4 py-2", { "bg-neutral-500" : !isStart })}
        >Stop</button>
      </div>
      <output ref={outputRef}></output>
    </div>
  );
}