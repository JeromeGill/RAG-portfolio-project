import React from "react";
import { getWorkspacesAction } from "@/actions/workspaceActions";
import { useQuery } from "@tanstack/react-query";
import { useToken } from "@/hooks/useToken";
import { useWorkspace } from "@/contexts/workspace/useWorkspace";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const WorkspaceList: React.FC = () => {
  const { token } = useToken();
  const { setActiveWorkspace } = useWorkspace();

  if (!token) {
    return <></>;
  }

  // @todo error handling
  const { data } = useQuery({
    queryKey: ["workspaces"],
    queryFn: () => getWorkspacesAction(token),
  });

  const handleWorkspaceChange = (workspaceId: string) => {
    if (data) {
      // @todo string ids please!
      const workspace = data.find(
        (workspace: Workspace) => workspace.id === Number(workspaceId),
      );
      if (workspace) {
        setActiveWorkspace(workspace);
      }
    }
  };

  return (
    <Select onValueChange={handleWorkspaceChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Workspace" />
      </SelectTrigger>
      <SelectContent>
        {data &&
          data.map((workspace: Workspace) => (
            <SelectItem value={String(workspace.id)} key={workspace.id}>
              {workspace.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};
