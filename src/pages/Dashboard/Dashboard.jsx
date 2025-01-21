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
                className="flex btn btn-outline border-none text-gray-700 mt-4 ml-4 text-base font-bold"
                onClick={toggleDrawer}
            >
                {isDrawerOpen ? <FaMinus /> : <FaPlus />}
            </button>

            <div className={`drawer ${isDrawerOpen ? 'drawer-open' : ''}`}>
                {/* Drawer container */}
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" checked={isDrawerOpen} readOnly />
                <div className="drawer-content flex flex-col py-4 pl-5">
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

                    <ul className="menu min-h-screen w-max bg-green-500 text-base">
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
                        <NavLink to="/dashboard/allArticles" onClick={toggleDrawer}>
                            <FaBook /> All Articles
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
