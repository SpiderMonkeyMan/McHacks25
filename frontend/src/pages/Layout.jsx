import React, { useContext } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LoginContext } from './LoginContext';

const Layout = () => {
    const { username, setUsername } = useContext(LoginContext);

    const handleLogout = () => {
        const confirmed = window.confirm('Are you sure you want to log out?');
        if (confirmed) {
            setUsername('');
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-red-900 text-white p-4 shadow-md">
                <div className="flex items-center justify-between w-full px-4">
                    {/* Left aligned MSS */}
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => 
                            `text-lg font-bold ${isActive ? 'underline' : ''}`
                        }
                    >
                        McGill Schedule Sharer
                    </NavLink>
                    {/* Right aligned buttons */}
                    <nav className="ml-auto space-x-4">
                        <NavLink 
                            to="/schedule" 
                            className={({ isActive }) => 
                                `text-lg font-medium ${isActive ? 'underline' : ''}`
                            }
                        >
                            Schedule
                        </NavLink>
                        <NavLink 
                            to={username ? "/" : "/login"} 
                            className={({ isActive }) => 
                                `text-lg font-medium ${isActive ? 'underline' : ''}`
                            }
                            onClick={(e) => {
                                if (username) {
                                    e.preventDefault();
                                    const confirmed = window.confirm('Are you sure you want to log out?');
                                    if (confirmed) {
                                        setUsername('');
                                    }
                                }
                            }}
                        >
                            {username ? 'Log Out' : 'Log In'}
                        </NavLink>
                    </nav>
                </div>
            </header>
            <main className="flex-grow bg-gray-100">
                <Outlet />
            </main>
            <footer className="bg-red-900 text-gray-300 p-6">
                <div className="max-w-4xl mx-auto text-center">
                    <p>&copy; 2025 McGill Schedule Sharer. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
