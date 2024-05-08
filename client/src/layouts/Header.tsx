import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChess } from '@fortawesome/free-solid-svg-icons/faChess'
import { WorkspaceList } from "@/components/workspaces/WorkspaceList"

// @todo this isn't very responsive atm
export const Header: React.FC = () => (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center ">
        <div className="text-black absolute">
            <WorkspaceList />
        </div>
        <div className="flex-auto mx-auto text-center">
        <h1 className="text-xl font-bold">
            Scholars Mate <FontAwesomeIcon icon={faChess} />
        </h1>
        <sub className="text-sm">An AI driven research platform for exploring content archives</sub>
        </div>
    </header>
)
