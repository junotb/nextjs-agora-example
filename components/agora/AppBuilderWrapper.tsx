'use client';

import AgoraAppBuilder from "@appbuilder/react";
import { useEffect } from "react";

export default function AppBuilderWrapper () {
  useEffect(() => {
    const initAppBuilder = async () => {
      const data = await fetch('/api/agora/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }).then(response => response.json());
      if (!data) return;

      AgoraAppBuilder.login(data.token);
    }
    initAppBuilder();
  }, []);
  
  return (
    <div className="flex w-full h-full">
      <AgoraAppBuilder.View />
    </div>
  );
};