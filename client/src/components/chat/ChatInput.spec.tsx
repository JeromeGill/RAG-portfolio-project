import { render, screen, fireEvent } from '@testing-library/react';
import { ChatInput } from './ChatInput';

describe('ChatInput', () => {
  const sendMessageMock = vi.fn();

  beforeEach(() => {
    render(<ChatInput sendMessage={sendMessageMock} disabled={false} />);
  });

  it('renders the input and send button', () => {
    expect(screen.getByPlaceholderText('Type your message...')).toBeInTheDocument();
    expect(screen.getByText('Send')).toBeInTheDocument();
  });

  it('calls sendMessage when the send button is clicked', () => {
    fireEvent.change(screen.getByPlaceholderText('Type your message...'), { target: { value: 'Test message' } });
    fireEvent.click(screen.getByText('Send'));
    expect(sendMessageMock).toHaveBeenCalledWith('Test message');
  });
});
