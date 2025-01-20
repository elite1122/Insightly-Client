import { FaBook, FaPlus, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {

    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-green-400">
                <ul className="menu p-4">
                    <li>
                        <NavLink to="/dashboard/allUsers">
                            <FaUsers></FaUsers>
                            All Users</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/allArticles">
                            <FaBook></FaBook>
                            All Articles</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/addPublisher">
                            <FaPlus></FaPlus>
                            Add Publisher</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;