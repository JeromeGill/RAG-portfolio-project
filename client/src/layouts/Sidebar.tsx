import { WorkspaceList } from "@/components/workspaces/WorkspaceList"

export const Sidebar: React.FC = () => {
    return (
        <div className="h-full w-64 bg-gray-800">
            <WorkspaceList />
        </div>
    )
}