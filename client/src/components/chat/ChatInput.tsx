import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { Textarea, Button } from "@/components/ui"

// Define the type for the sendMessage function
type SendMessageFunction = (message: string) => void;

// Text input component
export const ChatInput: React.FC<{ sendMessage: SendMessageFunction, disabled: boolean }> = ({ sendMessage, disabled }) => {
  const [message, setMessage] = useState<string>('');

  // Function to handle sending the message
  const handleMessageSend = () => {
    if (message.trim() !== '') {
      setMessage(''); // Clear the input field after sending the message
      sendMessage(message); // Call the sendMessage function
    }
  };

  // Function to handle Enter key press
  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      handleMessageSend();
    }
  };

  // Function to handle input change
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="fixed bottom-0 flex-auto flex items-center">
      <Textarea
        placeholder="Type your message..."
        value={message}
        disabled={disabled}
        onChange={handleChange} // Add onChange event handler
        onKeyPress={handleKeyPress}
      />
      <Button
        onClick={handleMessageSend}>
          Send
        </Button>
    </div>
  );
};
