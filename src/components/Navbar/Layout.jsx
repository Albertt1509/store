import React from "react";
import Navbar from "./Navbar";

import { Outlet } from 'react-router-dom'
import Footer from "./Footer";
const Layout = () => {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <Outlet />
            </div>
            <Footer />
        </>

    )
}

export default Layout;
