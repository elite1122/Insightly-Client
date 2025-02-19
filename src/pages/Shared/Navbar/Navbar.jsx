import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const Navbar = () => {
    const { user, logOut, loading } = useAuth();
    const axiosPublic = useAxiosPublic();

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
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    const navOptions = (
        <>
            <div className="flex flex-col lg:flex-row gap-3">
                <NavLink to="/" className={({ isActive }) => (isActive ? "text-blue-500 font-bold border-b-4 border-b-blue-500" : "")}>
                    Home
                </NavLink>
                {user && (
                    <NavLink to="/addArticles" className={({ isActive }) => (isActive ? "text-blue-500 font-bold border-b-4 border-b-blue-500" : "")}>
                        Add Articles
                    </NavLink>
                )}
                <NavLink to="/allArticles" className={({ isActive }) => (isActive ? "text-blue-500 font-bold border-b-4 border-b-blue-500" : "")}>
                    All Articles
                </NavLink>
                {user && (
                    <>
                        <NavLink to="/subscription" className={({ isActive }) => (isActive ? "text-blue-500 font-bold border-b-4 border-b-blue-500" : "")}>
                            Subscription
                        </NavLink>
                        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "text-blue-500 font-bold border-b-4 border-b-blue-500" : "")}>
                            Dashboard
                        </NavLink>
                        <NavLink to="/myArticles" className={({ isActive }) => (isActive ? "text-blue-500 font-bold border-b-4 border-b-blue-500" : "")}>
                            My Articles
                        </NavLink>
                        {/* Conditional Premium Articles Link */}
                        {hasSubscription && (
                            <NavLink to="/premiumArticles" className={({ isActive }) => (isActive ? "text-blue-500 font-bold border-b-4 border-b-blue-500" : "")}>
                                Premium Articles
                            </NavLink>
                        )}
                    </>
                )}
            </div>
            {user?.photoURL ? (
                <div className="relative group flex flex-col lg:flex-row gap-3">
                    <Link to="/profile">
                        <div tabIndex="0" role="button" className="btn btn-ghost btn-circle avatar group">
                            <div className="w-10 rounded-full">
                                <img referrerPolicy="no-referrer" alt="User Avatar" src={user.photoURL} />
                            </div>
                            {/* Hover Display */}
                            <span className="absolute hidden group-hover:flex items-center justify-center bg-gray-800 text-white text-sm px-4 py-1 rounded-md -bottom-10 left-1/2 transform -translate-x-1/2 w-max">
                                {user.displayName}
                            </span>
                        </div>
                    </Link>
                    <button onClick={logOut} className="lg:flex btn btn-outline text-gray-700 dark:text-white">
                        Logout
                    </button>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-3">
                    <NavLink to="/login" className={({ isActive }) => (isActive ? "btn btn-primary text-white" : "btn btn-outline text-gray-700 dark:text-white")}>
                        Login
                    </NavLink>
                    <NavLink to="/register" className={({ isActive }) => (isActive ? "btn btn-primary text-white" : "btn btn-outline text-gray-700 dark:text-white")}>
                        Register
                    </NavLink>
                </div>
            )}
        </>
    );

    return (
        <div className="">
            <div className="flex justify-between w-11/12 mx-auto items-center py-3 flex-wrap">
                {/* Logo */}
                <div>
                    <Link to={"/"}>
                        <h1 className='text-2xl font-medium text-blue-600 uppercase'>
                            Insightly
                        </h1>
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="hidden lg:flex space-x-4 font-semibold lg:items-center">
                    {navOptions}
                </div>

                {/* Mobile Menu */}
                <div className="lg:hidden dropdown dropdown-end">
                    <button tabIndex="0" className="btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52">
                        {navOptions}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
