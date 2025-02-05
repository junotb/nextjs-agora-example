import { useContext, useEffect } from "react";
import AgoraRTC, { LocalUser, RemoteUser, useIsConnected, useJoin, useLocalMicrophoneTrack, useLocalCameraTrack, usePublish, useRemoteUser, AgoraRTCProvider, useRemoteUsers } from "agora-rtc-react";
import { AgoraContext } from "@/contexts/AgoraContext";

const APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID;

export default function Page() {
  const { channel, token, createToken } = useContext(AgoraContext);
  const { isLoading: isLoadingMic, localMicrophoneTrack } = useLocalMicrophoneTrack();
  const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
  
  useEffect(() => {
    const fetchTokenAndJoin = async () => {
      const newToken = await createToken();
      if (channel && newToken) {
        useJoin({ appid: APP_ID!, channel: channel?.channel, token: newToken.token });
      }
    };
    fetchTokenAndJoin();
  }, []);

  const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  const remoteUsers = useRemoteUsers();
  
  return (
    <AgoraRTCProvider client={client}>
      <LocalUser
        audioTrack={localMicrophoneTrack}
        videoTrack={localCameraTrack}
        cameraOn={!isLoadingCam}
        micOn={!isLoadingMic}
        className="w-full h-full"/>
      {remoteUsers.map((user, index) => <RemoteUser key={index} user={user} />)}
    </AgoraRTCProvider>
  )
}