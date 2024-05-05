import { useState } from 'react';
import { askChatbotAction } from '@/actions/chatbotActions'
import { useToken } from './useToken';

export const useChatbot = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useToken();

  const askChatbot = async (question: string) => {
    setIsLoading(true);
    setError(null);
    try {
        console.log(JSON.stringify({ question: question }));

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

  return { askChatbot, isLoading, error };
};
