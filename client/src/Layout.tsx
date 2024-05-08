
import React, { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChess } from '@fortawesome/free-solid-svg-icons/faChess'

interface LayoutProps {
    children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="h-screen flex flex-col">
            {/* Header */}
            <header className="bg-gray-800 text-white p-4 text-center">
                <h1 className="text-xl font-bold">
                    Scholars Mate <FontAwesomeIcon icon={faChess} />
                </h1>
                <sub className="text-sm">An AI driven research platform for research</sub> 
            </header>
            
            {/* Main content */}
            <main className="container max-w-screen-lg flex-1 mx-auto p-4">
                {children}
            </main>
            
            {/* Footer */}
            <footer className="bg-gray-800 text-white p-4 mt-4">
                <p>&copy; 2024 Jerome Gill</p>
            </footer>
        </div>
    );
};
