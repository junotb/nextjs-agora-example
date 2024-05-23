'use client';

import { useEffect, useRef, useState } from 'react';
import RecordRTC from 'recordrtc';

export default function Record() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const recorderRef = useRef<RecordRTC | null>(null);

	const handleStartRecording = async () => {    
    try {
      // Get the media stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStream(stream);

      // Create the RecordRTC instance
      //recorderRef.current = new RecordRTC(stream, { type: 'audio', mimeType: 'audio/wav' });
      //recorderRef.current.startRecording();
    } catch (err) {
      console.error('Error accessing media devices:', err);
    }
	};

  const handleStopRecording = () => {
    //if (recorderRef.current && stream) {
      //recorderRef.current.stopRecording(() => {
        stream!.getTracks().forEach(track => track.stop());
        setStream(null);
      //});
    //}
  };

  useEffect(() => {
    if (audioRef.current && stream) {
      audioRef.current.srcObject = stream;
    } else if (audioRef.current) {
      audioRef.current.srcObject = null;
    }
  }, [stream]);
  
  return (
    <>
      { stream && <audio ref={audioRef} controls /> }
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
