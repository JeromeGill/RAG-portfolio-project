import React, { useState } from "react";
import { WorkspaceContext } from "./WorkspaceContext";

// Mixing chatbot API call behaviour with the message log state is probably an antipattern
// Better to add react query or something as we add more api calls
export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace>();

  return (
    <WorkspaceContext.Provider value={{ activeWorkspace, setActiveWorkspace }}>
      {children}
    </WorkspaceContext.Provider>
  );
};
