
import React, { ReactNode } from 'react';
import { Header } from './Header';

interface LayoutProps {
    children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="h-screen flex flex-col">
            {/* Header */}
            <Header />
            {/* Main content */}
            <main className="container flex-1 mx-auto p-4">
                 <div className='max-w-screen-lg'>
                {children}
                </div>
            </main>
            
            {/* Footer */}
            <footer className="bg-gray-800 text-white p-4 mt-4">
                <p>&copy; 2024 Jerome Gill</p>
            </footer>
        </div>
    );
};
