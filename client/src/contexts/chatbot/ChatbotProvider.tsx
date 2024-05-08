import React, { useState } from 'react';
import { askChatbotAction } from '@/actions/chatbotActions'
import { useToken } from '@/hooks/useToken';
import { ChatbotContext } from './ChatbotContext';



// Mixing chatbot API call behaviour with the message log state is probably an antipattern
// Better to add react query or something as we add more api calls
export const ChatbotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<null | Error>(null);
    const { token } = useToken();

    const [messages, setMessages] = useState<string[]>([
        // Default message for now @todo load this from the workspace
        'Chatbot: Hello! I\'ve been trained on Anastasia\'s Ecuador documents. Ask me anything about it. Spanish, english, whatever you like',
      ]);
    
    const askChatbot = async (question: string) => {
        setIsLoading(true);
        setError(null);
        try {
            if (!token) {
                throw new Error('No token found');
            }
            
            const response = await askChatbotAction(question, token);
            if (!response.ok) {
                throw new Error('Failed to post data');
            }
            setIsLoading(false);
            return response.json();
        } catch (error: any) {
            setIsLoading(false);
            setError(error.message);
        }
    };
  return (
    <ChatbotContext.Provider value={{ messages, setMessages, isLoading, setIsLoading, error, setError, askChatbot}}>
      {children}
    </ChatbotContext.Provider>
  );
};
