'use client';

import clsx from "clsx";
import { MouseEvent, useRef, useState } from "react";

export default function Page() {
  const CANVAS_WIDTH = 512;
  const CANVAS_HEIGHT = 256;
  const [isStart, setIsStart] = useState(false);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const outputRef = useRef<HTMLOutputElement>(null);

  function handleStart(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();

    setIsStart(true);

    // A user interaction happened we can create the audioContext
    const audioContext = new AudioContext();

    // Load the audio the first time through, otherwise play it from the buffer
    outputRef.current!.textContent = "Loading audio…";

    fetch("/audios/viper.mp3")
      .then((response) => response.arrayBuffer())
      .then((downloadedBuffer) => audioContext.decodeAudioData(downloadedBuffer))
      .then((decodedBuffer) => {
        outputRef.current!.textContent = "Configuring audio stack…";

        // Set up the AudioBufferSourceNode
        sourceNodeRef.current = new AudioBufferSourceNode(audioContext, {
          buffer: decodedBuffer,
          loop: true,
        });

        // Set up the audio analyser and the javascript node
        const analyserNode = new AnalyserNode(audioContext);
        const javascriptNode = audioContext.createScriptProcessor(
          1024,
          1,
          1
        );

        // Connect the nodes together
        sourceNodeRef.current!.connect(audioContext.destination);
        sourceNodeRef.current!.connect(analyserNode);
        analyserNode.connect(javascriptNode);
        javascriptNode.connect(audioContext.destination);

        // Play the audio
        outputRef.current!.textContent = "Audio playing…";
        sourceNodeRef.current!.start(0); // Play the sound now

        // Set up the event handler that is triggered every time enough samples have been collected
        // then trigger the audio analysis and draw the results
        javascriptNode.onaudioprocess = () => {
          // Read the frequency values
          const amplitudeArray = new Uint8Array(
            analyserNode.frequencyBinCount
          );

          // Get the time domain data for this sample
          analyserNode.getByteTimeDomainData(amplitudeArray);

          // Draw the display when the audio is playing
          if (audioContext.state === "running") {
            // Draw the time domain in the canvas
            requestAnimationFrame(() => {
              // Get the canvas 2d context
              const canvasContext = canvasRef.current!.getContext("2d")!;

              // Clear the canvas
              canvasContext.clearRect(
                0,
                0,
                CANVAS_WIDTH,
                CANVAS_HEIGHT
              );

              // Draw the amplitude inside the canvas
              for (let i = 0; i < amplitudeArray.length; i++) {
                const value = amplitudeArray[i] / 256;
                const y = CANVAS_HEIGHT - (CANVAS_HEIGHT * value);
                canvasContext.fillStyle = "black";
                canvasContext.fillRect(i, y, 1, 1);
              }
            });
          }
        };
      })
      .catch((e) => {
        console.error(`Error: ${e}`);
      });
  }

  function handleStop(event: MouseEvent<HTMLButtonElement>): void {
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