'use client';

import { useEffect, useRef, useState } from 'react';
import RecordRTC from 'recordrtc';

export default function Record() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recorderRef = useRef<RecordRTC | null>(null);

	const handleStartRecording = async () => {
    // Get the media stream
    const stream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true
    });
    setStream(stream);

    // Create the RecordRTC instance
    recorderRef.current = new RecordRTC(stream, {
      type: 'audio',
      mimeType: 'audio/wav'
    });
    recorderRef.current.startRecording();
	};

  const handleStopRecording = () => {
    if (!recorderRef.current) {
      return;
    }
    recorderRef.current.stopRecording(() => {
      setBlob(recorderRef.current!.getBlob());
    });
  };

  useEffect(() => {
    if (!audioRef.current) {
     return;
    }
    audioRef.current.srcObject = stream;
  }, [stream, audioRef]);
  
  return (
    <>
      {
        blob && (
          <audio
            src={URL.createObjectURL(blob)}
            controls
            ref={audioRef}
          />
        )
      }
      <div className="flex justify-center items-center gap-2">
        <button
          onClick={handleStartRecording}
          className="border px-2 py-1"
        >start</button>
        <button
          onClick={handleStopRecording}
          className="border px-2 py-1"
        >stop</button>
      </div>
    </>
  );
}
