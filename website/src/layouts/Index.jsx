import React from 'react'
import { Outlet } from "react-router-dom";
import Header from '../sections/Header';
import Footer from '../sections/Footer';


export default function Dashboard() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}
