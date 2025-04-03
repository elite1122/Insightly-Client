import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/Shared/Footer/Footer';
import Navbar from '../pages/Shared/Navbar/Navbar';

const Main = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div>
            <section 
                className={`w-full shadow-md sticky top-0 z-50 transition-colors duration-300 text-text bg-background backdrop-blur-md ${
                    isScrolled ? 'bg-opacity-80 backdrop-blur-lg' : 'bg-opacity-100'
                }`}
            >
                <nav className='max-w-[1440px] mx-auto w-11/12'>
                    <Navbar />
                </nav>
            </section>

            <section className='bg-background shadow-2xl'>
                <div className='max-w-[1440px] mx-auto w-11/12'>
                    <Outlet />
                </div>
            </section>

            <footer className='w-full bg-neutral text-neutral-content'>
                <section className='max-w-[1440px] mx-auto w-11/12'>
                    <Footer />
                </section>
            </footer>
        </div>
    );
};

export default Main;
