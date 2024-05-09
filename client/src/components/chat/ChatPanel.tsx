import React from "react";
import { ChatMessage } from "./ChatMessage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useChatbot } from "@/contexts/chatbot";

export const ChatPanel: React.FC = () => {
  const { messages, isLoading } = useChatbot();
  // @todo automatically scroll to bottom when new messages are added, or something
  return (
    <ScrollArea
      className="flex flex-col space-y-2 bg-gray-200 p-4 rounded-lg mb-4"
      style={{ paddingBottom: 60 }}
    >
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          message={message}
          className={index % 2 == 0 ? "justify-start" : "justify-end"}
        />
      ))}
      <div>
        <LoadingSpinner hidden={!isLoading} />
      </div>
    </ScrollArea>
  );
};
