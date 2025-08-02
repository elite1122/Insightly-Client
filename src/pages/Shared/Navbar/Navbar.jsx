import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAdmin from '../../../hooks/useAdmin';
import LoadingSpinner from '../../../component/LoadingSpinner/LoadingSpinner';

const Navbar = () => {
    const { user, logOut, loading } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [isAdmin] = useAdmin();

    // Fetch user subscription status using useQuery
    const { data: userData, isLoading } = useQuery({
        queryKey: ['userSubscription', user?.email], // Cache based on user email
        queryFn: async () => {
            if (!user) return null;
            const response = await axiosPublic.get(`/users/${user.email}`);
            console.log("Fetched user data:", response.data); // Debugging
            return response.data;
        },
        enabled: !!user, // Run query only if user exists
    });

    // Determine if the user has a valid subscription
    const hasSubscription = userData?.premiumTaken
        ? new Date(userData.premiumTaken) > new Date()
        : false;

    if (loading || isLoading) {
        return (
            <LoadingSpinner 
                size="large" 
                text="Loading navigation..." 
                variant="newspaper"
                fullScreen={true}
            />
        );
    }

    const navOptions = (
        <>
            <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-6">
                <NavLink to="/" className={({ isActive }) => (isActive ? "text-yellow-400 font-bold border-b-2 border-b-yellow-400 pb-1" : "text-white hover:text-yellow-400 transition-colors duration-200")}>
                    Home
                </NavLink>
                {user && (
                    <NavLink to="/addArticles" className={({ isActive }) => (isActive ? "text-yellow-400 font-bold border-b-2 border-b-yellow-400 pb-1" : "text-white hover:text-yellow-400 transition-colors duration-200")}>
                        Add Articles
                    </NavLink>
                )}
                <NavLink to="/allArticles" className={({ isActive }) => (isActive ? "text-yellow-400 font-bold border-b-2 border-b-yellow-400 pb-1" : "text-white hover:text-yellow-400 transition-colors duration-200")}>
                    All Articles
                </NavLink>
                {user && (
                    <>
                        <NavLink to="/subscription" className={({ isActive }) => (isActive ? "text-yellow-400 font-bold border-b-2 border-b-yellow-400 pb-1" : "text-white hover:text-yellow-400 transition-colors duration-200")}>
                            Subscription
                        </NavLink>
                        {isAdmin && (
                            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "text-yellow-400 font-bold border-b-2 border-b-yellow-400 pb-1" : "text-white hover:text-yellow-400 transition-colors duration-200")}>
                                Dashboard
                            </NavLink>
                        )}
                        <NavLink to="/myArticles" className={({ isActive }) => (isActive ? "text-yellow-400 font-bold border-b-2 border-b-yellow-400 pb-1" : "text-white hover:text-yellow-400 transition-colors duration-200")}>
                            My Articles
                        </NavLink>
                        {/* Conditional Premium Articles Link */}
                        {hasSubscription && (
                            <NavLink to="/premiumArticles" className={({ isActive }) => (isActive ? "text-yellow-400 font-bold border-b-2 border-b-yellow-400 pb-1" : "text-white hover:text-yellow-400 transition-colors duration-200")}>
                                Premium Articles
                            </NavLink>
                        )}
                    </>
                )}
                <NavLink to="/about" className={({ isActive }) => (isActive ? "text-yellow-400 font-bold border-b-2 border-b-yellow-400 pb-1" : "text-white hover:text-yellow-400 transition-colors duration-200")}>
                    About Us
                </NavLink>
            </div>
            {user?.photoURL ? (
                <div className="relative group flex flex-col lg:flex-row gap-2 sm:gap-3 items-center mt-2 lg:mt-0">
                    <Link to="/profile">
                        <div tabIndex="0" role="button" className="btn btn-ghost btn-circle avatar group border-2 border-yellow-400 hover:border-yellow-300 btn-sm lg:btn-md">
                            <div className="w-8 lg:w-10 rounded-full">
                                <img referrerPolicy="no-referrer" alt="User Avatar" src={user.photoURL} />
                            </div>
                            {/* Hover Display */}
                            <span className="absolute hidden group-hover:flex items-center justify-center bg-gray-800 text-white text-xs lg:text-sm px-2 lg:px-4 py-1 rounded-md -bottom-8 lg:-bottom-10 left-1/2 transform -translate-x-1/2 w-max z-10">
                                {user.displayName}
                            </span>
                        </div>
                    </Link>
                    <button onClick={logOut} className="btn btn-outline border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 btn-sm lg:btn-md text-xs lg:text-sm">
                        Logout
                    </button>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-2 sm:gap-3 mt-2 lg:mt-0">
                    <NavLink to="/login" className={({ isActive }) => (isActive ? "btn bg-yellow-400 text-gray-900 border-yellow-400 btn-sm lg:btn-md text-xs lg:text-sm" : "btn btn-outline border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 btn-sm lg:btn-md text-xs lg:text-sm")}>
                        Login
                    </NavLink>
                    <NavLink to="/register" className={({ isActive }) => (isActive ? "btn bg-yellow-400 text-gray-900 border-yellow-400 btn-sm lg:btn-md text-xs lg:text-sm" : "btn btn-outline border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 btn-sm lg:btn-md text-xs lg:text-sm")}>
                        Register
                    </NavLink>
                </div>
            )}
        </>
    );

    return (
        <div className="w-full bg-white border-b-2 sm:border-b-4 border-gray-900 shadow-lg">
            {/* Newspaper Header */}
            <div className="bg-white py-2 sm:py-3 lg:py-4">
                <div className="w-11/12 mx-auto text-center px-2">
                    <Link to={"/"}>
                        <h1 className='newspaper-headline text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-gray-900 tracking-tight'>
                            INSIGHTLY
                        </h1>
                        <p className="newspaper-meta text-gray-600 mt-1 sm:mt-2 tracking-widest text-xs sm:text-sm">
                            ESTABLISHED 2025 • YOUR TRUSTED NEWS SOURCE
                        </p>
                        <div className="border-t border-b border-gray-400 mt-2 sm:mt-3 py-1">
                            <p className="text-xs text-gray-500 uppercase tracking-wider">
                                {new Date().toLocaleDateString('en-US', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}
                            </p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Navigation Bar */}
            <div className="bg-gray-900 text-white">
                <div className="w-11/12 mx-auto px-2">
                    <div className="flex items-center justify-between py-2 sm:py-3 lg:py-4">
                        {/* Desktop Navigation Links */}
                        <div className="hidden lg:flex space-x-4 xl:space-x-8 font-semibold lg:items-center text-xs xl:text-sm uppercase tracking-wide w-full justify-center">
                            {navOptions}
                        </div>

                        {/* Mobile Menu */}
                        <div className="lg:hidden dropdown dropdown-end ml-auto">
                            <button tabIndex="0" className="btn btn-ghost text-white hover:text-yellow-400 transition-colors duration-300 btn-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                            <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-gray-800 text-white rounded-box w-64 border border-yellow-400/20 max-h-96 overflow-y-auto">
                                {navOptions}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
