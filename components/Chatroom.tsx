'use client';

import { useEffect, useRef } from 'react';
import { OpenVidu } from 'openvidu-browser';

export default function Chatroom() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const OV = new OpenVidu();
    const session = OV.initSession();

    session.on('streamCreated', (event) => {
      const subscriber = session.subscribe(event.stream, undefined);
      if (videoRef.current && subscriber.videos[0].video) {
        videoRef.current.appendChild(subscriber.videos[0].video);
      }
    });

    session
      .connect('https://kurento.openvidu.io:8443/?privateSecret=8092a596-c5f9-4ae0-bee3-1227a556e3ec', { clientData: 'React Client' })
      .then(() => {
        const publisher = OV.initPublisher(undefined, {
          audioSource: undefined,
          videoSource: undefined,
          publishAudio: true,
          publishVideo: true,
          resolution: '640x480',
          frameRate: 30,
          insertMode: 'APPEND',
          mirror: false,
        });

        session.publish(publisher);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay />
    </div>
  );
}
