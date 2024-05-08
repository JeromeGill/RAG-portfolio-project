import React, { createContext } from 'react';

interface WorkspaceContextProps {
  activeWorkspace: Workspace | undefined;
  setActiveWorkspace: (workspace: Workspace) => void;
}

export const WorkspaceContext = createContext<WorkspaceContextProps | undefined>(undefined);
