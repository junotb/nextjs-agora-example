'use client';

import { useLocalMicrophoneTrack, useLocalCameraTrack, useRemoteUsers, useRemoteAudioTracks, usePublish, useJoin, LocalVideoTrack, RemoteUser } from 'agora-rtc-react';

interface VideosProps {
  appid: string;
  channel: string;
  token: string;
}

export default function Videos({ appid, channel, token }: VideosProps) {
  const { isLoading: isLoadingMic, localMicrophoneTrack } = useLocalMicrophoneTrack();
  const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  usePublish([localMicrophoneTrack, localCameraTrack]);
  useJoin({ appid, channel, token });

  audioTracks.map((track) => track.play());
  const deviceLoading = isLoadingMic || isLoadingCam;
  if (deviceLoading)
    return (
      <div className="flex flex-col items-center pt-40">Loading devices...</div>
    );
  const unit = 'minmax(0, 1fr) ';

  return (
    <div className="flex flex-col justify-between w-full h-screen p-1">
      <div
        className={`grid gap-1 flex-1`}
        style={{
          gridTemplateColumns:
            remoteUsers.length > 9
              ? unit.repeat(4)
              : remoteUsers.length > 4
              ? unit.repeat(3)
              : remoteUsers.length > 1
              ? unit.repeat(2)
              : unit,
        }}
      >
        <LocalVideoTrack
          track={localCameraTrack}
          play={true}
          className="w-full h-full"
        />
        {remoteUsers.map((user, index) => (
          <RemoteUser key={index} user={user} />
        ))}
      </div>
    </div>
  );

}