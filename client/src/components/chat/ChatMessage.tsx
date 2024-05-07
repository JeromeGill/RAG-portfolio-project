import { cn } from "@/lib/utils"

export const ChatMessage: React.FC<{ 
  className: string,  
  message: string 
}> = ({ 
  message,
  className,
 }) => (
      <div className={cn(
        "chat-message flex  my-4",
        className
      )}>
        <p>{message}</p>
      </div>
    );

