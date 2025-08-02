import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUser, FaCrown, FaUsers, FaUserShield, FaUserTie, FaIdCard, FaEnvelope } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../component/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import LoadingSpinner from "../../../component/LoadingSpinner/LoadingSpinner";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    const [currentPage, setCurrentPage] = useState(0);
    const usersPerPage = 5;

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const offset = currentPage * usersPerPage;
    const currentUsers = users.slice(offset, offset + usersPerPage);
    const pageCount = Math.ceil(users.length / usersPerPage);

    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: 'Promote to Admin?',
            text: `Are you sure you want to make ${user.name} an administrator?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#16a34a',
            cancelButtonColor: '#dc2626',
            confirmButtonText: 'Yes, Promote!',
            cancelButtonText: 'Cancel',
            customClass: {
                popup: 'newspaper-alert'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
                    if (res.data.modifiedCount > 0) {
                        refetch();
                        Swal.fire({
                            icon: "success",
                            title: `Administrator Promoted!`,
                            text: `${user.name} is now an Administrator with full system access.`,
                            confirmButtonColor: '#16a34a',
                            customClass: {
                                popup: 'newspaper-alert'
                            }
                        });
                    }
                });
            }
        });
    };

    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "⚠️ PERMANENT DELETION",
            html: `
                <div class="text-left p-4 bg-red-50 border-2 border-red-200 rounded-none mb-4">
                    <p class="font-bold text-red-800 mb-2">You are about to permanently delete:</p>
                    <p class="text-red-700"><strong>Name:</strong> ${user.name}</p>
                    <p class="text-red-700"><strong>Email:</strong> ${user.email}</p>
                    <p class="text-red-700"><strong>Role:</strong> ${user.role || 'User'}</p>
                </div>
                <p class="text-gray-700 font-semibold">This action cannot be undone!</p>
            `,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "🗑️ Delete Permanently",
            cancelButtonText: "Cancel",
            customClass: {
                popup: 'newspaper-alert'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "User Deleted!",
                            text: `${user.name} has been permanently removed from the system.`,
                            icon: "success",
                            confirmButtonColor: '#16a34a',
                            customClass: {
                                popup: 'newspaper-alert'
                            }
                        });
                    }
                });
            }
        });
    };

    // Calculate user statistics
    const adminCount = users.filter(user => user.role === 'admin').length;
    const premiumCount = users.filter(user => user.role === 'premium').length;
    const regularCount = users.length - adminCount - premiumCount;

    if (isLoading) {
        return (
            <section className="bg-white min-h-screen flex items-center justify-center">
                <div className="text-center bg-white border-4 border-gray-900 p-8 newspaper-card shadow-xl">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
                    <p className="newspaper-meta text-gray-600 uppercase tracking-widest">Loading User Database...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-white min-h-screen">
            <Helmet>
                <title>Insightly | User Management</title>
            </Helmet>
            
            {/* Newspaper Header */}
            <div className="bg-white border-b-4 border-gray-900 mb-6 sm:mb-8">
                <div className="text-center py-4 sm:py-6">
                    <h1 className="newspaper-headline text-2xl sm:text-3xl lg:text-4xl text-gray-900 mb-2 font-black uppercase tracking-wider">
                        ALL USERS
                    </h1>
                    <div className="flex items-center justify-center">
                        <div className="flex-1 border-t border-gray-400 max-w-16 sm:max-w-32"></div>
                        <p className="newspaper-meta text-gray-600 mx-2 sm:mx-4 uppercase tracking-widest text-xs sm:text-sm">
                            User Management System
                        </p>
                        <div className="flex-1 border-t border-gray-400 max-w-16 sm:max-w-32"></div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    {/* Total Users */}
                    <div className="bg-white border-4 border-gray-900 p-4 sm:p-6 newspaper-card shadow-lg relative">
                        <div className="absolute -top-2 -right-2 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-black">
                            👥
                        </div>
                        <div className="flex items-center space-x-3 sm:space-x-4">
                            <FaUsers className="text-2xl sm:text-3xl text-blue-600" />
                            <div>
                                <div className="text-2xl sm:text-3xl font-black text-gray-900">{users.length}</div>
                                <div className="newspaper-meta text-xs sm:text-sm text-gray-600 uppercase tracking-wider">Total Users</div>
                            </div>
                        </div>
                    </div>

                    {/* Admin Count */}
                    <div className="bg-white border-4 border-gray-900 p-4 sm:p-6 newspaper-card shadow-lg relative">
                        <div className="absolute -top-2 -right-2 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-black">
                            👑
                        </div>
                        <div className="flex items-center space-x-3 sm:space-x-4">
                            <FaUserShield className="text-2xl sm:text-3xl text-red-600" />
                            <div>
                                <div className="text-2xl sm:text-3xl font-black text-gray-900">{adminCount}</div>
                                <div className="newspaper-meta text-xs sm:text-sm text-gray-600 uppercase tracking-wider">Administrators</div>
                            </div>
                        </div>
                    </div>

                    {/* Premium Count */}
                    <div className="bg-white border-4 border-gray-900 p-4 sm:p-6 newspaper-card shadow-lg relative">
                        <div className="absolute -top-2 -right-2 bg-yellow-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-black">
                            ⭐
                        </div>
                        <div className="flex items-center space-x-3 sm:space-x-4">
                            <FaUserTie className="text-2xl sm:text-3xl text-yellow-600" />
                            <div>
                                <div className="text-2xl sm:text-3xl font-black text-gray-900">{premiumCount}</div>
                                <div className="newspaper-meta text-xs sm:text-sm text-gray-600 uppercase tracking-wider">Premium Users</div>
                            </div>
                        </div>
                    </div>

                    {/* Regular Users */}
                    <div className="bg-white border-4 border-gray-900 p-4 sm:p-6 newspaper-card shadow-lg relative">
                        <div className="absolute -top-2 -right-2 bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-black">
                            👤
                        </div>
                        <div className="flex items-center space-x-3 sm:space-x-4">
                            <FaUser className="text-2xl sm:text-3xl text-green-600" />
                            <div>
                                <div className="text-2xl sm:text-3xl font-black text-gray-900">{regularCount}</div>
                                <div className="newspaper-meta text-xs sm:text-sm text-gray-600 uppercase tracking-wider">Regular Users</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white border-4 border-gray-900 newspaper-card shadow-xl relative mb-6 sm:mb-8">
                    <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 bg-purple-600 text-white px-2 sm:px-4 py-1 sm:py-2 text-xs font-black uppercase tracking-wider transform -rotate-3">
                        USER DATABASE
                    </div>
                    
                    <div className="p-4 sm:p-6 lg:p-8">
                        <div className="text-center mb-6 sm:mb-8">
                            <h2 className="newspaper-headline text-xl sm:text-2xl lg:text-3xl text-gray-900 mb-3 sm:mb-4 font-black uppercase tracking-wider">
                                USER MANAGEMENT
                            </h2>
                            <p className="newspaper-meta text-gray-600 uppercase tracking-widest text-xs sm:text-sm">
                                COMPREHENSIVE USER ADMINISTRATION
                            </p>
                        </div>

                        <div className="overflow-x-auto border-2 border-gray-300">
                            <table className="w-full">
                                <thead className="bg-gray-900 text-white">
                                    <tr>
                                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left newspaper-meta font-black uppercase tracking-wider text-xs sm:text-sm">
                                            <div className="flex items-center space-x-2">
                                                <span>#</span>
                                            </div>
                                        </th>
                                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left newspaper-meta font-black uppercase tracking-wider text-xs sm:text-sm">
                                            <div className="flex items-center space-x-2">
                                                <FaIdCard />
                                                <span>Photo</span>
                                            </div>
                                        </th>
                                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left newspaper-meta font-black uppercase tracking-wider text-xs sm:text-sm">
                                            <div className="flex items-center space-x-2">
                                                <FaUser />
                                                <span>Name</span>
                                            </div>
                                        </th>
                                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left newspaper-meta font-black uppercase tracking-wider text-xs sm:text-sm">
                                            <div className="flex items-center space-x-2">
                                                <FaEnvelope />
                                                <span>Email</span>
                                            </div>
                                        </th>
                                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-center newspaper-meta font-black uppercase tracking-wider text-xs sm:text-sm">
                                            <div className="flex items-center justify-center space-x-2">
                                                <FaCrown />
                                                <span>Role</span>
                                            </div>
                                        </th>
                                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-center newspaper-meta font-black uppercase tracking-wider text-xs sm:text-sm">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y-2 divide-gray-200">
                                    {currentUsers.map((user, index) => (
                                        <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-200">
                                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-black text-sm">
                                                    {offset + index + 1}
                                                </div>
                                            </td>
                                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="relative">
                                                        <img
                                                            className="h-12 w-12 sm:h-16 sm:w-16 rounded-full border-4 border-gray-300 object-cover"
                                                            src={user.photo}
                                                            alt={user.name}
                                                            onError={(e) => {
                                                                e.target.src = 'https://via.placeholder.com/64/4a5568/ffffff?text=User';
                                                            }}
                                                        />
                                                        {user.role === 'admin' && (
                                                            <div className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                                                👑
                                                            </div>
                                                        )}
                                                        {user.role === 'premium' && (
                                                            <div className="absolute -top-1 -right-1 bg-yellow-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                                                ⭐
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                <div className="text-sm sm:text-base font-semibold text-gray-900">{user.name}</div>
                                                <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">
                                                    {user.role === 'admin' ? 'ADMINISTRATOR' : user.role === 'premium' ? 'PREMIUM MEMBER' : 'STANDARD USER'}
                                                </div>
                                            </td>
                                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                <div className="text-sm sm:text-base text-gray-900 break-all">{user.email}</div>
                                            </td>
                                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-center">
                                                {user.role === "admin" ? (
                                                    <div className="inline-flex items-center px-3 py-1 rounded-none text-xs font-black uppercase tracking-wider text-red-800 bg-red-100 border-2 border-red-300">
                                                        <FaCrown className="mr-1" />
                                                        Admin
                                                    </div>
                                                ) : user.role === "premium" ? (
                                                    <div className="inline-flex items-center px-3 py-1 rounded-none text-xs font-black uppercase tracking-wider text-yellow-800 bg-yellow-100 border-2 border-yellow-300">
                                                        <FaUserTie className="mr-1" />
                                                        Premium
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => handleMakeAdmin(user)}
                                                        className="inline-flex items-center px-3 py-2 border-2 border-green-600 text-green-600 bg-white hover:bg-green-600 hover:text-white transition-all duration-300 font-black uppercase tracking-wider text-xs"
                                                        title="Promote to Admin"
                                                    >
                                                        <FaUserShield className="mr-1" />
                                                        Promote
                                                    </button>
                                                )}
                                            </td>
                                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-center">
                                                <button
                                                    onClick={() => handleDeleteUser(user)}
                                                    className="inline-flex items-center px-3 py-2 border-2 border-red-600 text-red-600 bg-white hover:bg-red-600 hover:text-white transition-all duration-300 font-black uppercase tracking-wider text-xs hover:scale-105"
                                                    title="Delete User"
                                                >
                                                    <FaTrashAlt className="mr-1" />
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {pageCount > 1 && (
                            <div className="flex justify-center mt-6 sm:mt-8">
                                <div className="bg-gray-100 border-2 border-gray-300 p-4">
                                    <ReactPaginate
                                        breakLabel="..."
                                        nextLabel="Next >"
                                        onPageChange={handlePageClick}
                                        pageRangeDisplayed={3}
                                        pageCount={pageCount}
                                        previousLabel="< Prev"
                                        renderOnZeroPageCount={null}
                                        containerClassName="flex items-center space-x-2"
                                        activeClassName="bg-blue-600 text-white px-3 py-2 border-2 border-blue-600 font-black"
                                        pageClassName="border-2 border-gray-300 hover:border-blue-500 transition-colors duration-200"
                                        pageLinkClassName="px-3 py-2 block font-semibold text-gray-700 hover:text-blue-600"
                                        previousClassName="border-2 border-gray-300 hover:border-blue-500 transition-colors duration-200"
                                        previousLinkClassName="px-3 py-2 block font-semibold text-gray-700 hover:text-blue-600"
                                        nextClassName="border-2 border-gray-300 hover:border-blue-500 transition-colors duration-200"
                                        nextLinkClassName="px-3 py-2 block font-semibold text-gray-700 hover:text-blue-600"
                                        breakClassName="px-3 py-2 text-gray-500"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Summary */}
                <div className="bg-gray-900 text-white border-4 border-yellow-500 p-4 sm:p-6 lg:p-8 newspaper-card shadow-xl relative">
                    <div className="absolute -top-2 -right-2 bg-yellow-500 text-gray-900 px-2 sm:px-3 py-1 text-xs font-black uppercase tracking-wider transform rotate-3">
                        SUMMARY
                    </div>
                    <div className="text-center">
                        <h3 className="newspaper-headline text-lg sm:text-xl lg:text-2xl text-white mb-3 sm:mb-4 font-black uppercase tracking-wider">
                            USER MANAGEMENT INSIGHTS
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                            <div className="p-3 sm:p-4 bg-white text-gray-900 border-2 border-yellow-500">
                                <div className="text-lg sm:text-xl font-black">{users.length}</div>
                                <div className="text-xs sm:text-sm uppercase tracking-wider">Total Users</div>
                            </div>
                            <div className="p-3 sm:p-4 bg-white text-gray-900 border-2 border-yellow-500">
                                <div className="text-lg sm:text-xl font-black">{adminCount}</div>
                                <div className="text-xs sm:text-sm uppercase tracking-wider">Admins</div>
                            </div>
                            <div className="p-3 sm:p-4 bg-white text-gray-900 border-2 border-yellow-500">
                                <div className="text-lg sm:text-xl font-black">{premiumCount}</div>
                                <div className="text-xs sm:text-sm uppercase tracking-wider">Premium</div>
                            </div>
                            <div className="p-3 sm:p-4 bg-white text-gray-900 border-2 border-yellow-500">
                                <div className="text-lg sm:text-xl font-black">100%</div>
                                <div className="text-xs sm:text-sm uppercase tracking-wider">Active</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AllUsers;
