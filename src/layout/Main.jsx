import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/Shared/Footer/Footer';
import Navbar from '../pages/Shared/Navbar/Navbar';

const Main = () => {
    return (
        <div>
            <div className="fixed top-0 left-0 right-0 z-50 w-full">
                <Navbar />
            </div>

            <section className='bg-white shadow-2xl pt-[200px] sm:pt-[220px] lg:pt-[240px]'>
                <div className='max-w-[1440px] mx-auto w-11/12 px-2 sm:px-4 lg:px-6'>
                    <Outlet />
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Main;
