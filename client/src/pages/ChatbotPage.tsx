import { ChatInput, ChatPanel } from "@/components/chat";
import { ChatbotProvider } from "@/contexts/chatbot";
import { withWorkspaceChange } from "@/hoc/withWorkspaceChange";

export function ChatbotPage() {
  const ChatPanelWithWorkspaceChange = withWorkspaceChange(ChatPanel);

  return (
    <ChatbotProvider>
      <div className="flex flex-col h-full">
        <div className="flex-grow overflow-auto">
          <ChatPanelWithWorkspaceChange />
        </div>
        <div className="flex-shrink-0">
          <ChatInput />
        </div>
      </div>
    </ChatbotProvider>
  );
}
