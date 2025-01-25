import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const Layout = () => {
    return (
        <div>
            <h1>HEADER AND MORE</h1>
            <Outlet />
        </div>
    );
}

export default Layout;