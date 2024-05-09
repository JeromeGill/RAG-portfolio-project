import { useWorkspace } from "@/contexts/workspace/useWorkspace";
import { useChatbot } from "@/contexts/chatbot";
import { useEffect } from "react";

//Propogate changes in the workspace to wherever they are needed
export const useWorkspaceChange = () => {
    const { activeWorkspace } = useWorkspace();
    const { setMessages } = useChatbot();

    const handleWorkspaceChange = () => {
        setMessages([activeWorkspace?.chatbot_introduction || 'Chatbot: Please select a workspace and let\'s get started!']);
    }

    useEffect(() => {
        handleWorkspaceChange()
    }, [activeWorkspace])
};
