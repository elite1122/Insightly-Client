import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaBook, FaHome, FaPlus, FaUsers, FaMinus, FaNewspaper, FaChartBar, FaCog } from "react-icons/fa";

const Dashboard = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Newspaper-style Header */}
            <div className="bg-white border-b-4 border-gray-900 shadow-lg">
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                        <button
                            className="flex items-center justify-center p-2 sm:p-3 bg-blue-600 text-white border-2 border-gray-900 hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                            onClick={toggleDrawer}
                        >
                            {isDrawerOpen ? <FaMinus className="text-sm sm:text-base" /> : <FaPlus className="text-sm sm:text-base" />}
                        </button>
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <FaNewspaper className="text-xl sm:text-2xl text-gray-900" />
                            <div>
                                <h1 className="newspaper-headline text-lg sm:text-xl lg:text-2xl text-gray-900 font-black uppercase tracking-wider">
                                    ADMIN CONTROL PANEL
                                </h1>
                                <p className="newspaper-meta text-xs sm:text-sm text-gray-600 uppercase tracking-widest">
                                    INSIGHTLY MANAGEMENT SYSTEM
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="hidden sm:flex items-center space-x-2">
                        <div className="bg-green-600 text-white px-3 py-1 text-xs font-black uppercase tracking-wider transform rotate-2">
                            ADMIN ACCESS
                        </div>
                    </div>
                </div>
            </div>

            <div className={`drawer ${isDrawerOpen ? 'drawer-open' : ''}`}>
                {/* Drawer container */}
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" checked={isDrawerOpen} readOnly />
                <div className="drawer-content flex flex-col p-4 sm:p-6 lg:p-8 bg-gray-100">
                    {/* Page content here */}
                    <Outlet />
                </div>
                <div className={`drawer-side ${isDrawerOpen ? '' : 'hidden sm:block'}`}>
                    {/* Newspaper-style Sidebar */}
                    <label
                        htmlFor="dashboard-drawer"
                        className="drawer-overlay sm:hidden"
                        onClick={toggleDrawer}
                    ></label>

                    <div className="min-h-screen w-64 sm:w-72 bg-white border-r-4 border-gray-900 shadow-xl">
                        {/* Sidebar Header */}
                        <div className="bg-gray-900 text-white p-4 sm:p-6 border-b-4 border-yellow-500">
                            <div className="text-center">
                                <FaChartBar className="text-2xl sm:text-3xl mx-auto mb-2 sm:mb-3 text-yellow-500" />
                                <h2 className="newspaper-headline text-lg sm:text-xl font-black uppercase tracking-wider">
                                    NAVIGATION
                                </h2>
                                <p className="newspaper-meta text-xs text-gray-300 uppercase tracking-widest">
                                    ADMIN TOOLS
                                </p>
                            </div>
                        </div>

                        {/* Navigation Menu */}
                        <ul className="menu p-0 space-y-1">
                            <li>
                                <NavLink 
                                    to="/dashboard/adminHome" 
                                    onClick={toggleDrawer}
                                    className={({ isActive }) => 
                                        `flex items-center space-x-3 p-4 sm:p-5 border-b-2 border-gray-200 transition-all duration-300 hover:bg-blue-50 hover:border-blue-500 group ${
                                            isActive ? 'bg-blue-600 text-white border-blue-600' : 'text-gray-700 hover:text-blue-600'
                                        }`
                                    }
                                >
                                    <FaHome className="text-lg sm:text-xl group-hover:scale-110 transition-transform duration-300" />
                                    <div>
                                        <div className="newspaper-meta font-black uppercase tracking-wider text-sm sm:text-base">
                                            Admin Home
                                        </div>
                                        <div className="text-xs opacity-75">Dashboard Overview</div>
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/dashboard/allUsers" 
                                    onClick={toggleDrawer}
                                    className={({ isActive }) => 
                                        `flex items-center space-x-3 p-4 sm:p-5 border-b-2 border-gray-200 transition-all duration-300 hover:bg-green-50 hover:border-green-500 group ${
                                            isActive ? 'bg-green-600 text-white border-green-600' : 'text-gray-700 hover:text-green-600'
                                        }`
                                    }
                                >
                                    <FaUsers className="text-lg sm:text-xl group-hover:scale-110 transition-transform duration-300" />
                                    <div>
                                        <div className="newspaper-meta font-black uppercase tracking-wider text-sm sm:text-base">
                                            All Users
                                        </div>
                                        <div className="text-xs opacity-75">User Management</div>
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/dashboard/manageArticles" 
                                    onClick={toggleDrawer}
                                    className={({ isActive }) => 
                                        `flex items-center space-x-3 p-4 sm:p-5 border-b-2 border-gray-200 transition-all duration-300 hover:bg-purple-50 hover:border-purple-500 group ${
                                            isActive ? 'bg-purple-600 text-white border-purple-600' : 'text-gray-700 hover:text-purple-600'
                                        }`
                                    }
                                >
                                    <FaBook className="text-lg sm:text-xl group-hover:scale-110 transition-transform duration-300" />
                                    <div>
                                        <div className="newspaper-meta font-black uppercase tracking-wider text-sm sm:text-base">
                                            Manage Articles
                                        </div>
                                        <div className="text-xs opacity-75">Content Control</div>
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/dashboard/addPublisher" 
                                    onClick={toggleDrawer}
                                    className={({ isActive }) => 
                                        `flex items-center space-x-3 p-4 sm:p-5 border-b-2 border-gray-200 transition-all duration-300 hover:bg-yellow-50 hover:border-yellow-500 group ${
                                            isActive ? 'bg-yellow-600 text-white border-yellow-600' : 'text-gray-700 hover:text-yellow-600'
                                        }`
                                    }
                                >
                                    <FaPlus className="text-lg sm:text-xl group-hover:scale-110 transition-transform duration-300" />
                                    <div>
                                        <div className="newspaper-meta font-black uppercase tracking-wider text-sm sm:text-base">
                                            Add Publisher
                                        </div>
                                        <div className="text-xs opacity-75">Publisher Management</div>
                                    </div>
                                </NavLink>
                            </li>
                        </ul>

                        {/* Sidebar Footer */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gray-900 text-white p-4 border-t-4 border-yellow-500">
                            <div className="text-center">
                                <FaCog className="text-lg mx-auto mb-2 text-yellow-500 animate-spin-slow" />
                                <p className="text-xs newspaper-meta uppercase tracking-widest">
                                    System Status: Active
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
