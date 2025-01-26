import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-gray-800 text-white p-4 shadow-md">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => 
                            `text-lg font-bold ${isActive ? 'underline' : ''}`
                        }
                    >
                        MSS
                    </NavLink>
                    <nav className="space-x-4">
                        <NavLink 
                            to="/schedule" 
                            className={({ isActive }) => 
                                `text-lg font-medium ${isActive ? 'underline' : ''}`
                            }
                        >
                            Schedule
                        </NavLink>
                    </nav>
                </div>
            </header>
            <main className="flex-grow bg-gray-100">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
