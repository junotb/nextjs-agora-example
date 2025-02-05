import { ReactNode } from "react";
import AgoraProvider from "@/contexts/AgoraContext";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <AgoraProvider>
      {children}
    </AgoraProvider>
  );
}