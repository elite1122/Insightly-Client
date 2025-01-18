import { Link, NavLink } from 'react-router-dom';
import logo from '../../../assets/insightly.png'

const Navbar = () => {

    const navOptions = <>
        <NavLink
            to="/"
            className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold border-0 border-b-blue-500 lg:border-b-4" : ""
            }
        >
            Home
        </NavLink>
        <NavLink
            to="/addArticles"
            className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold border-0 border-b-blue-500 lg:border-b-4" : ""
            }
        >
            Add Articles
        </NavLink>
        <NavLink
            to="/subscription"
            className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold border-0 border-b-blue-500 lg:border-b-4" : ""
            }
        >
            Subscription
        </NavLink>
        <NavLink
            to="/dashboard"
            className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold border-0 border-b-blue-500 lg:border-b-4" : ""
            }
        >
            Dashboard
        </NavLink>
        <NavLink
            to="/myArticles"
            className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold border-0 border-b-blue-500 lg:border-b-4" : ""
            }
        >
            My Articles
        </NavLink>
        <NavLink
            to="/premiumArticles"
            className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold border-0 border-b-blue-500 lg:border-b-4" : ""
            }
        >
            Premium Articles
        </NavLink>
        <NavLink
            to="/login"
            className={({ isActive }) =>
                isActive
                    ? "hidden lg:flex btn btn-primary text-white"
                    : "hidden lg:flex btn btn-outline text-gray-700 dark:text-white"
            }
        >
            Login
        </NavLink>
        <NavLink
            to="/register"
            className={({ isActive }) =>
                isActive
                    ? "hidden lg:flex btn btn-primary text-white"
                    : "hidden lg:flex btn btn-outline text-gray-700 dark:text-white"
            }
        >
            Register
        </NavLink>
    </>

    return (
        <div className='shadow-md sticky top-0 z-50 transition-colors duration-300 bg-white text-black'>
            <div className="flex justify-between w-11/12 mx-auto items-center py-3 flex-wrap">
                {/* Logo */}
                <div>
                    <Link to={'/'}>
                        <img
                            className="w-16 h-12 btn"
                            src={logo}
                            alt="" />
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="hidden lg:flex space-x-4 font-semibold lg:items-center">
                    {navOptions}
                </div>

                {/* Mobile Menu */}
                <div className="lg:hidden dropdown dropdown-end">
                    <button tabIndex="0" className="btn btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-5 w-5 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </button>
                    <ul
                        tabIndex="0"
                        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52"
                    >
                        {navOptions}

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;