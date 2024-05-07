'use client'

import React, { useState } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useChatbot } from '@/hooks/useChatbot';
import { ScrollArea } from "@/components/ui/scroll-area"
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export const ChatPanel: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const { askChatbot, isLoading, error } = useChatbot();
    
    if (messages.length === 0) {
        setMessages([
            'Chatbot: Hello! I\'ve been trained on Anastasia\'s Ecuador documents. Ask me anything about it. Spanish, english, whatever you like',
        ]);
    }

    const sendMessage = async (message: string) => {
        // @todo hook here to send the message to the backend
        console.log('Sending message:', message);
        setMessages(prevMessages => [...prevMessages, 'User: ' + message]);
        try {
            const response = await askChatbot(message)
            setMessages(prevMessages => [...prevMessages,'Chatbot: ' + response]);
        } catch (error: any) {
            setMessages(prevMessages => [...prevMessages,'Error: ' + error.message]);
        }
    };
  
    // @todo automatically scroll to bottom when new messages are added, or something
    return (
      <div className="bg-gray-200 p-4 h-full rounded-lg mb-4">
        <ScrollArea
            className="flex flex-col space-y-2"
            style={{paddingBottom: 60}}
            >
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} className={index % 2 == 0 ?  "justify-start" : "justify-end"} />
          ))}
          <div >
            <LoadingSpinner hidden={!isLoading} />
          </div>
        </ScrollArea>
        <ChatInput
          sendMessage={sendMessage}
          disabled={isLoading} 
        />
    </div>
    );
  };
