import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChatPanel } from './ChatPanel';
import { useChatbot } from '@/hooks/useChatbot';
import { vi } from 'vitest';

vi.mock('@/hooks/useChatbot');

const mockAskChatbot = vi.fn();

describe('ChatPanel', () => {
  beforeEach(() => {
    mockAskChatbot.mockClear();
  });

  it('renders without crashing', () => {
    (useChatbot as vi.Mock).mockReturnValue({
      askChatbot: mockAskChatbot,
      isLoading: false,
    });
    render(<ChatPanel />);
    expect(screen.getByText(/Chatbot: Hello!/i)).toBeInTheDocument();
  });

  
  it('sends a message when the send button is clicked', async () => {
    mockAskChatbot.mockResolvedValue('Chatbot response');


    (useChatbot as vi.Mock).mockReturnValue({
      askChatbot: mockAskChatbot,
      isLoading: false,
    });

    render(<ChatPanel />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Test message' } });
    fireEvent.click(screen.getByText(/send/i));
    await waitFor(() => expect(screen.getByText(/Chatbot: Chatbot response/i)).toBeInTheDocument());
  });
});

