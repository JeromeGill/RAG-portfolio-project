import { useState } from 'react';
import { askChatbotAction } from '@/actions/chatbotActions'

export const useChatbot = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const askChatbot = async (question: string) => {
    setIsLoading(true);
    setError(null);
    try {
        console.log(JSON.stringify({ question: question }));
        const response = await askChatbotAction(question);
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
