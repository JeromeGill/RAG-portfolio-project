import React from 'react';
import { useWorkspaceChange } from '@/hooks/useWorkspaceChange'; // Import your hook here

export const withWorkspaceChange = (
  WrappedComponent: React.ComponentType
) => {
  const WithWorkspaceChange: React.FC = (props) => {
    // Call the useWorkspaceChange hook
    useWorkspaceChange();

    return <WrappedComponent {...props} />;
  };

  return WithWorkspaceChange;
};
