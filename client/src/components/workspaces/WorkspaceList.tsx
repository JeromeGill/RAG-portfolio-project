import React from 'react';
import { getWorkspacesAction } from '@/actions/workspaceActions';
import { useQuery } from '@tanstack/react-query';
import { useToken } from '@/hooks/useToken';
import { LoadingSpinner } from '../ui/loading-spinner';
import { useWorkspace } from '@/contexts/workspace/useWorkspace';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


export const WorkspaceList: React.FC = () => {
    const { token } = useToken()
    const { activeWorkspace, setActiveWorkspace } = useWorkspace()

    if (!token) {
        return <></>
    }

    const { error, data } = useQuery(
        { 
            queryKey: ['workspaces'],
            queryFn: () => getWorkspacesAction(token)
        }
    )
    
    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <Select>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Workspace" />
        </SelectTrigger>
            <SelectContent>
                {data && data.map((workspace: Workspace) => (
                    <SelectItem
                        value={workspace.name}
                        key={workspace.id}
                        onClick={() => setActiveWorkspace(workspace)}
                    >{workspace.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
};
