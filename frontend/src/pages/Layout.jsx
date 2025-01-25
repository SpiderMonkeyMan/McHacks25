import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const Layout = () => {
    return (
        <div>
            <header>
                <div>
                    <NavLink to='/'>
                        MSS
                    </NavLink>
                    <NavLink to='/schedule'>
                        Schedule
                    </NavLink>
                </div>
            </header>
            <Outlet />
        </div>
    );
}

export default Layout;