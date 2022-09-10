import React from 'react';
import Nav from "../components/Nav/Nav";
import {Outlet} from "react-router-dom";
import Footer from "../components/Footer/Footer";

const Layout = () => {
    return (
        <>
            <header>
                <Nav/>
            </header>
            <Outlet/>
            <Footer>
                Footer ♥
            </Footer>
        </>
    );
};

export default Layout;
