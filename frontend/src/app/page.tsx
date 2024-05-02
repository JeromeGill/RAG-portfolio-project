"use client"

import { ChatPanel } from "@/components/ChatPanel";
import { useRequireAuth } from "@/hooks/useRequireAuth";

export default function Home() {
  useRequireAuth();
  
  return (
    <main className="">
      <div className="container mx-auto">

        <div className="chat-panel h-screen mx-auto max-w-2xl px-4">
          <ChatPanel />
        </div>
      </div>
    </main>
  );
}
