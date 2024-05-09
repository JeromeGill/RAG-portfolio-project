// ChatInput.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ChatInput } from './ChatInput';
import { ChatbotProvider } from '@/contexts/chatbot';

const askChatbot = vi.fn();

vi.mock('@/contexts/chatbot/useChatbot', () => ({
  useChatbot: () => ({
    setMessages: vi.fn(),
    setIsLoading: vi.fn(),
    askChatbot:askChatbot,
    isLoading: false,
  }),
}));

describe('ChatInput', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText } = render(
      <ChatbotProvider>
        <ChatInput />
      </ChatbotProvider>
    );

    expect(getByPlaceholderText('Type your message...')).toBeInTheDocument();
  });

  it('Doesn\' call askChatbot when send button is clicked with no message', () => {
    const { getByTestId } = render(
      <ChatbotProvider>
        <ChatInput />
      </ChatbotProvider>
    );

    fireEvent.click(getByTestId('ci-send-button'));
    expect(askChatbot).not.toBeCalled();
  });
  
  it('calls askChatbot when send button is clicked', () => {
    const { getByTestId } = render(
      <ChatbotProvider>
        <ChatInput />
      </ChatbotProvider>
    );

    const textarea = getByTestId('ci-message-area') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'Test message' } });

    expect(textarea.value).toBe('Test message');
    fireEvent.click(getByTestId('ci-send-button'));
    expect(askChatbot).toHaveBeenCalled();
  });
});
