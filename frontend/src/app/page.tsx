import { ChatPanel } from "@/components/ChatPanel";

export default function Home() {
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
