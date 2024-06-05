'use client';

import clsx from "clsx";
import { useRef, useState } from "react";

export default function Page() {
  const CANVAS_WIDTH = 192, CANVAS_HEIGHT = 256;
  const [isStart, setIsStart] = useState(false);
  const [reqAnimeId, setReqAnimeId] = useState(0);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const loadAudio = async (audioContext: AudioContext) => { 
    return await fetch("/audios/viper.mp3")
      .then((response) => response.arrayBuffer())
      .then((downloadedBuffer) => audioContext.decodeAudioData(downloadedBuffer));
  }

  const handleStart = async () => {
    setIsStart(true);

    // 오디오 처리를 위한 기본 인터페이스 생성
    const audioContext = new AudioContext();

    // 오디오 파일을 로드하고 디코딩
    const decodedBuffer = await loadAudio(audioContext);

    // AudioBufferSourceNode를 생성
    sourceNodeRef.current = new AudioBufferSourceNode(audioContext, { buffer: decodedBuffer, loop: false });

    // AnalyserNode를 생성
    const analyserNode = new AnalyserNode(audioContext, { fftSize: 128 });
    const dataArray = new Uint8Array(analyserNode.frequencyBinCount);
    
    // 노드들을 연결
    sourceNodeRef.current
      .connect(analyserNode)
      .connect(audioContext.destination);
    
    // 오디오 재생
    sourceNodeRef.current.start(0);

    // 애니메이션 프레임을 이용하여 캔버스에 그리기
    drawCanvas(analyserNode, dataArray);
  }

  const drawCanvas = (analyserNode: AnalyserNode, dataArray: Uint8Array) => {
    // 애니메이션 프레임을 요청
    setReqAnimeId(requestAnimationFrame(() => drawCanvas(analyserNode, dataArray)));

    // Domain Data를 가져와서 dataArray에 저장
    analyserNode.getByteTimeDomainData(dataArray);

    // 캔버스 초기화
    const canvasContext = canvasRef.current!.getContext("2d")!;
    canvasContext.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 캔버스에 진폭을 그리기
    for (let i = 0; i < dataArray.length; i += 8) {
      const value = dataArray[i] / CANVAS_HEIGHT;
      const x = i;
      const y = Math.abs(value - 0.5) * CANVAS_HEIGHT;
      canvasContext.strokeStyle = 'rgb(180, 32, 37)';
      canvasContext.fillStyle = 'rgb(180, 32, 37)';
      canvasContext.beginPath();
      canvasContext.roundRect((x * 2.5) + 18, CANVAS_HEIGHT / 2, 16, y * 1.2, [0, 0, 8, 8]);
      canvasContext.roundRect((x * 2.5) + 18, CANVAS_HEIGHT / 2, 16, -y * 1.2, [0, 0, 8, 8]);
      canvasContext.fill();
    }
  };

  const handleStop = () => {
    setIsStart(false);

    // 오디오 정지
    sourceNodeRef.current!.stop(0);

    // 애니메이션 프레임 취소
    cancelAnimationFrame(reqAnimeId!);

    //	캔버스 초기화
    const canvasContext = canvasRef.current!.getContext("2d")!;
    canvasContext.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  return (
		<div className="flex flex-col justify-center items-center h-full gap-2">
      <h1 className="font-bold">Audio analyser</h1>
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
    </div>
  );
}