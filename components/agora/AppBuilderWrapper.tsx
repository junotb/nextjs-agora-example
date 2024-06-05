'use client';

import AgoraAppBuilder from "@appbuilder/react";
import { useEffect } from "react";

export default function AppBuilderWrapper () {
  useEffect(() => {
    const initAppBuilder = async () => {
      const token = await fetch('/api/agora/token/generate', {
        method: 'POST',
      })
        .then((res) => res.json())
        .then((data) => data.token);

      AgoraAppBuilder.login(token);
    }
    initAppBuilder();
  }, []);
  
  return (
    <div className="flex w-full h-full">
      <AgoraAppBuilder.View />
    </div>
  );
};