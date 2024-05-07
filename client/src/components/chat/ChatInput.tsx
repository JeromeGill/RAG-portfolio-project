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
    
    <div className="relative">
      <div className="bottom-0 flex  items-center">
        <Textarea
          placeholder="Type your message..."
          value={message}
          disabled={disabled}
          className='flex-1 border-gray-300 border p-2 rounded-lg focus:outline-none'
          onChange={handleChange} // Add onChange event handler
          onKeyPress={handleKeyPress}
          style={
            {
              paddingRight: '80px'
            }
          }
        >

        </Textarea>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 pr-6">
          <Button
            onClick={handleMessageSend}
            className='text-white px-3 py-2 rounded-lg'
            >
              Send
            </Button>
          </div>
      </div>
    </div>
  );
};
