import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChatPanel } from './ChatPanel';
import { useChatbot } from '@/hooks/useChatbot';
import { vi } from 'vitest';

vi.mock('@/hooks/useChatbot');

describe('ChatPanel', () => {
  beforeEach(() => {
    (useChatbot as vi.Mock).mockClear();
  });

  it('renders without crashing', () => {
    render(<ChatPanel />);
    expect(screen.getByText(/Chatbot: Hello!/i)).toBeInTheDocument();
  });

  it('displays loading spinner when isLoading is true', () => {
    (useChatbot as vi.Mock).mockReturnValue({
      isLoading: true,
    });
    render(<ChatPanel />);
    expect(screen.getByRole('status')).toHaveClass('hidden');
  });
  
  it('sends a message when the send button is clicked', async () => {
    (useChatbot as vi.Mock).mockReturnValue({
      askChatbot: vi.fn().mockResolvedValue('Chatbot response'),
      isLoading: false,
      error: null,
    });
    render(<ChatPanel />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Test message' } });
    fireEvent.click(screen.getByText(/send/i));
    await waitFor(() => expect(screen.getByText(/Chatbot: Chatbot response/i)).toBeInTheDocument());
  });
});

