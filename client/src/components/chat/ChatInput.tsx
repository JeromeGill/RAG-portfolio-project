import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { Textarea, Button } from "@/components/ui"
import { useChatbot } from '@/contexts/chatbot';


// Text input component
// This renders as a text area with a send button
export const ChatInput: React.FC = () => {
  // The unsent message in the textbox
  const [message, setMessage] = useState<string>('');

  // The chat history that has been sent and recived by the chatbot
  const { setMessages, setIsLoading, askChatbot, isLoading } = useChatbot();
  
  // This is probably an anti-pattern, but it's a quick way to get the loading spinner to show
  // @todo handle API calls with react-query or something
  setIsLoading(isLoading);

  // Function to handle sending the message
  const handleMessageSend = async () => {
    if (message.trim() !== '') {
      setMessage(''); // Clear the input field after sending the message
      setMessages(prevMessages => [...prevMessages, 'User: ' + message]);
      try {
          // @todo load the index name from the workspace
          const response = await askChatbot(message, 'default')
          setMessages(prevMessages => [...prevMessages,'Chatbot: ' + response]);
      } catch (error: any) {
          setMessages(prevMessages => [...prevMessages,'Error: ' + error.message]);
      }
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
        <Textarea
          data-testid="ci-message-area"
          placeholder="Type your message..."
          value={message}
          disabled={isLoading}
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
            data-testid="ci-send-button"
            onClick={handleMessageSend}
            className='text-white px-3 py-2 rounded-lg'
            >Send</Button>
        </div>
    </div>
  );
};
