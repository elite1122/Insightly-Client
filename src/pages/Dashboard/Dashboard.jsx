import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaBook, FaHome, FaPlus, FaUsers, FaMinus } from "react-icons/fa";

const Dashboard = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <div className="">
            {/* Sidebar Toggle Button */}
            <button
                className="flex btn btn-outline border-none text-gray-700 p-4 text-base font-bold"
                onClick={toggleDrawer}
            >
                {isDrawerOpen ? <FaMinus /> : <FaPlus />}
            </button>

            <div className={`drawer ${isDrawerOpen ? 'drawer-open' : ''}`}>
                {/* Drawer container */}
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" checked={isDrawerOpen} readOnly />
                <div className="drawer-content flex flex-col py-4 pl-5 bg-background transform rounded-lg p-6">
                    {/* Page content here */}
                    <Outlet />
                </div>
                <div className={`drawer-side ${isDrawerOpen ? '' : 'hidden sm:block'}`}>
                    {/* Sidebar */}
                    <label
                        htmlFor="dashboard-drawer"
                        className="drawer-overlay sm:hidden"
                        onClick={toggleDrawer}
                    ></label>

                    <ul className="menu min-h-screen w-max bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 border-blue-500 transform text-base rounded-lg">
                    <li>
                        <NavLink to="/dashboard/adminHome" onClick={toggleDrawer}>
                            <FaHome /> Admin Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/allUsers" onClick={toggleDrawer}>
                            <FaUsers /> All Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manageArticles" onClick={toggleDrawer}>
                            <FaBook /> Manage Articles
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/addPublisher" onClick={toggleDrawer}>
                            <FaPlus /> Add Publisher
                        </NavLink>
                    </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
