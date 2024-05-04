import React, { useState, KeyboardEvent, ChangeEvent } from 'react';

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
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleMessageSend();
    }
  };

  // Function to handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="fixed bottom-0 flex-auto bg-white border-t border-gray-200 p-4 flex items-center">
      <input
        className="flex-grow outline-none px-2 py-1"
        type="text"
        placeholder="Type your message..."
        value={message}
        disabled={disabled}
        onChange={handleChange} // Add onChange event handler
        onKeyPress={handleKeyPress}
      />
      <button
        className="ml-2 px-4 py-1 bg-blue-500 text-white rounded-lg"
        onClick={handleMessageSend}>
          Send
        </button>
    </div>
  );
};
