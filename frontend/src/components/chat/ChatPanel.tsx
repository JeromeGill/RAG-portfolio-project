'use client'

import React, { useState } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useChatbot } from '@/hooks/useChatbot';

export const ChatPanel: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const { askChatbot, isLoading, error } = useChatbot();
    
    if (messages.length === 0) {
        setMessages([
            'Chatbot: Hello! I\'ve been trained on the Undermined report by Global Witness. Ask me anything about it'
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
    <> 
        <div className="chat-messages flex relative overflow-y-scroll flex-col" style={{paddingBottom: 60}}>
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
        <ChatInput sendMessage={sendMessage} disabled={isLoading} />
    </>
    );
  };
