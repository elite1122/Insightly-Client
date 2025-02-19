import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/Shared/Footer/Footer';
import Navbar from '../pages/Shared/Navbar/Navbar';

const Main = () => {
    return (
        <div>
            <section className='w-full shadow-md sticky top-0 z-50 transition-colors duration-300 text-black bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 border-blue-500'>
                <nav className='max-w-[1440px] mx-auto w-11/12'>
                    <Navbar></Navbar>
                </nav>
            </section>
            <div className='max-w-[1440px] mx-auto w-11/12'>
                <Outlet></Outlet>
            </div>
            <footer className='w-full bg-neutral text-neutral-content'>
                <section className='max-w-[1440px] mx-auto w-11/12'>
                    <Footer></Footer>
                </section>
            </footer>
        </div>
    );
};

export default Main;