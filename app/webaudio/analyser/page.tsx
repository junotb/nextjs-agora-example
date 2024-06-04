'use client';

import Header from "@/components/Header";
import clsx from "clsx";
import { useRef, useState } from "react";

export default function Page() {
  const CANVAS_WIDTH = 192, CANVAS_HEIGHT = 256;
  const [isStart, setIsStart] = useState(false);
  const [reqAnimeId, setReqAnimeId] = useState(0);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const outputRef = useRef<HTMLOutputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleStart = async () => {
    setIsStart(true);
    outputRef.current!.textContent = "Loading audio…";

    // A user interaction happened we can create the audioContext
    const audioContext = new AudioContext();

    // Load the audio the first time through, otherwise play it from the buffer    
    const decodedBuffer = await fetch("/audios/viper.mp3")
      .then((response) => response.arrayBuffer())
      .then((downloadedBuffer) => audioContext.decodeAudioData(downloadedBuffer));

    // Set up the AudioBufferSourceNode
    sourceNodeRef.current = new AudioBufferSourceNode(audioContext, { buffer: decodedBuffer, loop: false });

    // Set up the AnalyserNode
    const analyserNode = new AnalyserNode(audioContext, { fftSize: 128 });
    const dataArray = new Uint8Array(analyserNode.frequencyBinCount);
    
    // Connect the nodes together
    sourceNodeRef.current
      .connect(analyserNode)
      .connect(audioContext.destination);
    
    // Play the audio
    outputRef.current!.textContent = "Audio playing…";
    sourceNodeRef.current.start(0); // Play the sound now

    // Request Animation Frame
    drawCanvas(analyserNode, dataArray);
  }

  const drawCanvas = (analyserNode: AnalyserNode, dataArray: Uint8Array) => {
    setReqAnimeId(requestAnimationFrame(() => drawCanvas(analyserNode, dataArray)));

    // Get the time domain data for this sample
    analyserNode.getByteTimeDomainData(dataArray);

    // Clear the canvas
    const canvasContext = canvasRef.current!.getContext("2d")!;
    canvasContext.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw the amplitude inside the canvas
    for (let i = 0; i < dataArray.length; i += 8) {
      const value = dataArray[i] / CANVAS_HEIGHT;
      const x = i;
      const y = Math.abs(value - 0.5) * CANVAS_HEIGHT;
      canvasContext.strokeStyle = 'rgb(180, 32, 37)';
      canvasContext.fillStyle = 'rgb(180, 32, 37)';
      canvasContext.beginPath(); // Start a new path
      canvasContext.roundRect((x * 2.5) + 18, CANVAS_HEIGHT / 2, 16, y * 1.2, [0, 0, 8, 8]); // Draw a Rectangle
      canvasContext.roundRect((x * 2.5) + 18, CANVAS_HEIGHT / 2, 16, -y * 1.2, [0, 0, 8, 8]); // Draw a Rectangle
      canvasContext.fill(); // Render the path
    }
  };

  const handleStop = () => {
    setIsStart(false);
    outputRef.current!.textContent = "Audio stopped.";

    // Set up the event handler to stop playing the audio
    sourceNodeRef.current!.stop(0);

    // Cancel Animation Frame
    cancelAnimationFrame(reqAnimeId!);

    // Clear the canvas
    const canvasContext = canvasRef.current!.getContext("2d")!;
    canvasContext.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  return (
		<div className="flex flex-col justify-center items-center h-full gap-2">
      <Header />
      <div className="flex flex-col justify-center items-center gap-4 mt-12 w-full max-w-xl h-full">
        <h1 className="text-xl font-bold">Web Audio API examples: audio analyser</h1>
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
    </div>
  );
}