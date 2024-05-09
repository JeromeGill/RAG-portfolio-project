import React, { createContext } from "react";

interface ChatbotContextProps {
  messages: string[];
  setMessages: React.Dispatch<React.SetStateAction<string[]>>;
  isLoading: boolean;
  setIsLoading(value: boolean): void;
  error: null | Error;
  setError(value: null | Error): void;
  askChatbot(question: string, indexName: string): Promise<any>; // @todo type the response
}

export const ChatbotContext = createContext<ChatbotContextProps | undefined>(
  undefined,
);
