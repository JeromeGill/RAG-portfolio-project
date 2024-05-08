import { ChatInput, ChatPanel } from "@/components/chat";
import { ChatbotProvider } from "@/contexts/chatbot";

export function ChatbotPage() {
  return (
    <ChatbotProvider>
      <div className="flex flex-col h-full">
        <div className="flex-grow overflow-auto">
          <ChatPanel />
        </div>
        <div className="flex-shrink-0">
          <ChatInput />
        </div>
      </div>
    </ChatbotProvider>
  );
}
