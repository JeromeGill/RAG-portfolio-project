import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChatPanel } from './ChatPanel';
import { useChatbot } from '@/hooks/useChatbot';
import { vi } from 'vitest';

vi.mock('@/hooks/useChatbot');

describe('ChatPanel', () => {
  beforeEach(() => {
    (useChatbot as vi.Mock).mockReturnValue({
      askChatbot: vi.fn().mockResolvedValue('Chatbot response'),
      isLoading: false,
      error: null,
    });
  });

  it('renders without crashing', () => {
    render(<ChatPanel />);
    expect(screen.getByText(/Chatbot: Hello!/i)).toBeInTheDocument();
  });

  it('sends a message when the send button is clicked', async () => {
    render(<ChatPanel />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Test message' } });
    fireEvent.click(screen.getByText(/send/i));
    await waitFor(() => expect(screen.getByText(/Chatbot: Chatbot response/i)).toBeInTheDocument());
  });
});

