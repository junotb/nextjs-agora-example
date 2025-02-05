"use client";

import { requestChannel, requestToken } from "@/libs/agora";
import { createContext, ReactNode, useState } from "react";

interface AgoraContextProps {
  channel: AgoraChannel;
  token: AgoraToken;
  createChannel: (title: string) => Promise<AgoraChannel>;
  createToken: () => Promise<AgoraToken>;
};

export const AgoraContext = createContext<AgoraContextProps>({
  channel: {
    id: 0,
    host_pass_phrase: "",
    viewer_pass_phrase: "",
    channel: "",
    title: "",
    pstn: null,
  },
  token: {
    token: "",
    user: {
      user_id: "",
      user_auid: 0,
      screen_auid: 0,
    },
  },
  createChannel: async () => undefined,
  createToken: async () => undefined,
});

export default function AgoraProvider({ children }: { children: ReactNode }) {
  const [ channel, setChannel ] = useState<AgoraChannel>({
    id: 0,
    host_pass_phrase: "",
    viewer_pass_phrase: "",
    channel: "",
    title: "",
    pstn: null,
  });
  const [ token, setToken ] = useState<AgoraToken>({
    token: "",
    user: {
      user_id: "",
      user_auid: 0,
      screen_auid: 0,
    },
  });

  const createChannel = async (title: string) => {
    try {
      if (!title) throw new Error("채널 이름을 입력해주세요.");

      const newChannel = await requestChannel(title);
      setChannel(newChannel);
      return newChannel;
    } catch (error) {
      console.error(error);
      throw new Error("채널 생성에 실패했습니다.");
    }
  }

  const createToken = async () => {
    try {
      const newToken = await requestToken();
      setToken(newToken);
      return newToken;
    } catch (error) {
      console.error(error);
      throw new Error("토큰 생성에 실패했습니다.");
    }
  }
  
  return (
    <AgoraContext.Provider value={{ channel, token, createChannel, createToken }}>
      {children}
    </AgoraContext.Provider>
  );
}