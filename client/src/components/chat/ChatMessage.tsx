export const ChatMessage: React.FC<{ message: string }> = ({ message }) => {
    return (
      <div className="chat-message my-4">
        <p>{message}</p>
      </div>
    );
  };
