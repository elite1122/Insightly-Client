import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaCheck, FaTimes, FaStar, FaTrashAlt, FaCrown, FaNewspaper, FaCalendarAlt, FaUser, FaEnvelope, FaEye, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../component/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import ReactPaginate from "react-paginate";
import LoadingSpinner from "../../../component/LoadingSpinner/LoadingSpinner";

const ManageArticles = () => {
    const axiosSecure = useAxiosSecure();
    const { data: articles = [], refetch, isLoading } = useQuery({
        queryKey: ["articles"],
        queryFn: async () => {
            const res = await axiosSecure.get("/articles");
            return res.data;
        },
    });

    // Pagination state
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    const pageCount = Math.ceil(articles.length / itemsPerPage);
    const displayedArticles = articles.slice(
        currentPage * itemsPerPage,
        currentPage * itemsPerPage + itemsPerPage
    );

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    // Handle actions (approve, decline, delete, premium)
    const handleApprove = async (id, isApproved) => {
        if (isApproved) {
            Swal.fire({
                icon: "info",
                title: "Already Approved",
                text: "This article is already approved!",
                confirmButtonColor: '#2563eb',
                customClass: {
                    popup: 'newspaper-alert'
                }
            });
            return;
        }

        Swal.fire({
            title: 'Approve Article?',
            text: 'This will make the article publicly visible to all users.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#16a34a',
            cancelButtonColor: '#dc2626',
            confirmButtonText: '✅ Approve Article',
            cancelButtonText: 'Cancel',
            customClass: {
                popup: 'newspaper-alert'
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.patch(`/articles/approve/${id}`);
                    Swal.fire({
                        icon: "success",
                        title: "Article Approved!",
                        text: "The article is now live and visible to all users.",
                        confirmButtonColor: '#16a34a',
                        customClass: {
                            popup: 'newspaper-alert'
                        }
                    });
                    refetch();
                } catch (error) {
                    console.error("Error approving article:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Approval Failed",
                        text: "Failed to approve article. Please try again.",
                        confirmButtonColor: '#dc2626',
                        customClass: {
                            popup: 'newspaper-alert'
                        }
                    });
                }
            }
        });
    };

    const handleDecline = async (id) => {
        Swal.fire({
            title: "📝 Decline Article",
            html: `
                <div class="text-left mb-4">
                    <p class="font-semibold text-gray-700 mb-2">Please provide a reason for declining this article:</p>
                    <p class="text-sm text-gray-600">This will help the author understand what needs to be improved.</p>
                </div>
            `,
            input: "textarea",
            inputPlaceholder: "Enter detailed reason for decline...",
            inputAttributes: {
                'class': 'newspaper-textarea'
            },
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: '❌ Decline Article',
            cancelButtonText: 'Cancel',
            customClass: {
                popup: 'newspaper-alert'
            },
            preConfirm: async (reason) => {
                if (!reason || reason.trim().length < 10) {
                    Swal.showValidationMessage("Please provide a detailed reason (at least 10 characters)!");
                    return false;
                }
                return reason;
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.patch(`/articles/decline/${id}`, { reason: result.value });
                    Swal.fire({
                        icon: "success",
                        title: "Article Declined",
                        text: "The author has been notified of the decline reason.",
                        confirmButtonColor: '#dc2626',
                        customClass: {
                            popup: 'newspaper-alert'
                        }
                    });
                    refetch();
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Decline Failed",
                        text: "Failed to decline article. Please try again.",
                        confirmButtonColor: '#dc2626',
                        customClass: {
                            popup: 'newspaper-alert'
                        }
                    });
                }
            }
        });
    };

    const handleDelete = async (id, title) => {
        Swal.fire({
            title: "🗑️ PERMANENT DELETION",
            html: `
                <div class="text-left p-4 bg-red-50 border-2 border-red-200 rounded-none mb-4">
                    <p class="font-bold text-red-800 mb-2">You are about to permanently delete:</p>
                    <p class="text-red-700 font-semibold">"${title}"</p>
                    <p class="text-red-600 text-sm mt-2">This action cannot be undone and will remove the article completely from the system.</p>
                </div>
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
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/articles/${id}`);
                    Swal.fire({
                        icon: "success",
                        title: "Article Deleted!",
                        text: "The article has been permanently removed from the system.",
                        confirmButtonColor: '#16a34a',
                        customClass: {
                            popup: 'newspaper-alert'
                        }
                    });
                    refetch();
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Deletion Failed",
                        text: "Failed to delete article. Please try again.",
                        confirmButtonColor: '#dc2626',
                        customClass: {
                            popup: 'newspaper-alert'
                        }
                    });
                }
            }
        });
    };

    const handleMakePremium = async (id, isPremium, title) => {
        if (isPremium) {
            Swal.fire({
                icon: "info",
                title: "Already Premium",
                text: "This article is already marked as premium content!",
                confirmButtonColor: '#2563eb',
                customClass: {
                    popup: 'newspaper-alert'
                }
            });
            return;
        }

        Swal.fire({
            title: '⭐ Make Premium?',
            html: `
                <div class="text-left p-4 bg-yellow-50 border-2 border-yellow-200 rounded-none mb-4">
                    <p class="font-bold text-yellow-800 mb-2">Article to be marked as Premium:</p>
                    <p class="text-yellow-700 font-semibold">"${title}"</p>
                    <p class="text-yellow-600 text-sm mt-2">Premium articles are only accessible to subscribers.</p>
                </div>
            `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#eab308',
            cancelButtonColor: '#6b7280',
            confirmButtonText: '⭐ Make Premium',
            cancelButtonText: 'Cancel',
            customClass: {
                popup: 'newspaper-alert'
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.patch(`/articles/premium/${id}`);
                    Swal.fire({
                        icon: "success",
                        title: "Premium Status Added!",
                        text: "The article is now exclusive to premium subscribers.",
                        confirmButtonColor: '#eab308',
                        customClass: {
                            popup: 'newspaper-alert'
                        }
                    });
                    refetch();
                } catch (error) {
                    console.error("Error making article premium:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Premium Update Failed",
                        text: "Failed to mark article as premium. Please try again.",
                        confirmButtonColor: '#dc2626',
                        customClass: {
                            popup: 'newspaper-alert'
                        }
                    });
                }
            }
        });
    };

    // Calculate statistics
    const approvedCount = articles.filter(article => article.isApproved).length;
    const pendingCount = articles.filter(article => !article.isApproved && !article.isDeclined).length;
    const declinedCount = articles.filter(article => article.isDeclined).length;
    const premiumCount = articles.filter(article => article.isPremium).length;

    if (isLoading) {
        return (
            <section className="bg-white min-h-screen flex items-center justify-center">
                <div className="text-center bg-white border-4 border-gray-900 p-8 newspaper-card shadow-xl">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
                    <p className="newspaper-meta text-gray-600 uppercase tracking-widest">Loading Article Database...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-white min-h-screen">
            <Helmet>
                <title>Insightly | Article Management</title>
            </Helmet>
            
            {/* Newspaper Header */}
            <div className="bg-white border-b-4 border-gray-900 mb-6 sm:mb-8">
                <div className="text-center py-4 sm:py-6">
                    <h1 className="newspaper-headline text-2xl sm:text-3xl lg:text-4xl text-gray-900 mb-2 font-black uppercase tracking-wider">
                        MANAGE ARTICLES
                    </h1>
                    <div className="flex items-center justify-center">
                        <div className="flex-1 border-t border-gray-400 max-w-16 sm:max-w-32"></div>
                        <p className="newspaper-meta text-gray-600 mx-2 sm:mx-4 uppercase tracking-widest text-xs sm:text-sm">
                            Content Management System
                        </p>
                        <div className="flex-1 border-t border-gray-400 max-w-16 sm:max-w-32"></div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    {/* Total Articles */}
                    <div className="bg-white border-4 border-gray-900 p-4 sm:p-6 newspaper-card shadow-lg relative">
                        <div className="absolute -top-2 -right-2 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-black">
                            📰
                        </div>
                        <div className="flex items-center space-x-3 sm:space-x-4">
                            <FaNewspaper className="text-2xl sm:text-3xl text-blue-600" />
                            <div>
                                <div className="text-2xl sm:text-3xl font-black text-gray-900">{articles.length}</div>
                                <div className="newspaper-meta text-xs sm:text-sm text-gray-600 uppercase tracking-wider">Total Articles</div>
                            </div>
                        </div>
                    </div>

                    {/* Approved Articles */}
                    <div className="bg-white border-4 border-gray-900 p-4 sm:p-6 newspaper-card shadow-lg relative">
                        <div className="absolute -top-2 -right-2 bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-black">
                            ✅
                        </div>
                        <div className="flex items-center space-x-3 sm:space-x-4">
                            <FaCheckCircle className="text-2xl sm:text-3xl text-green-600" />
                            <div>
                                <div className="text-2xl sm:text-3xl font-black text-gray-900">{approvedCount}</div>
                                <div className="newspaper-meta text-xs sm:text-sm text-gray-600 uppercase tracking-wider">Approved</div>
                            </div>
                        </div>
                    </div>

                    {/* Pending Articles */}
                    <div className="bg-white border-4 border-gray-900 p-4 sm:p-6 newspaper-card shadow-lg relative">
                        <div className="absolute -top-2 -right-2 bg-yellow-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-black">
                            ⏳
                        </div>
                        <div className="flex items-center space-x-3 sm:space-x-4">
                            <FaClock className="text-2xl sm:text-3xl text-yellow-600" />
                            <div>
                                <div className="text-2xl sm:text-3xl font-black text-gray-900">{pendingCount}</div>
                                <div className="newspaper-meta text-xs sm:text-sm text-gray-600 uppercase tracking-wider">Pending Review</div>
                            </div>
                        </div>
                    </div>

                    {/* Premium Articles */}
                    <div className="bg-white border-4 border-gray-900 p-4 sm:p-6 newspaper-card shadow-lg relative">
                        <div className="absolute -top-2 -right-2 bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-black">
                            ⭐
                        </div>
                        <div className="flex items-center space-x-3 sm:space-x-4">
                            <FaCrown className="text-2xl sm:text-3xl text-purple-600" />
                            <div>
                                <div className="text-2xl sm:text-3xl font-black text-gray-900">{premiumCount}</div>
                                <div className="newspaper-meta text-xs sm:text-sm text-gray-600 uppercase tracking-wider">Premium Content</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Articles Table */}
                <div className="bg-white border-4 border-gray-900 newspaper-card shadow-xl relative mb-6 sm:mb-8">
                    <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 bg-orange-600 text-white px-2 sm:px-4 py-1 sm:py-2 text-xs font-black uppercase tracking-wider transform -rotate-3">
                        ARTICLE DATABASE
                    </div>
                    
                    <div className="p-4 sm:p-6 lg:p-8">
                        <div className="text-center mb-6 sm:mb-8">
                            <h2 className="newspaper-headline text-xl sm:text-2xl lg:text-3xl text-gray-900 mb-3 sm:mb-4 font-black uppercase tracking-wider">
                                CONTENT MANAGEMENT
                            </h2>
                            <p className="newspaper-meta text-gray-600 uppercase tracking-widest text-xs sm:text-sm">
                                COMPREHENSIVE ARTICLE ADMINISTRATION
                            </p>
                        </div>

                        <div className="overflow-x-auto border-2 border-gray-300">
                            <table className="w-full">
                                <thead className="bg-gray-900 text-white">
                                    <tr>
                                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left newspaper-meta font-black uppercase tracking-wider text-xs sm:text-sm">
                                            #
                                        </th>
                                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left newspaper-meta font-black uppercase tracking-wider text-xs sm:text-sm">
                                            <div className="flex items-center space-x-2">
                                                <FaNewspaper />
                                                <span>Title</span>
                                            </div>
                                        </th>
                                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left newspaper-meta font-black uppercase tracking-wider text-xs sm:text-sm">
                                            <div className="flex items-center space-x-2">
                                                <FaUser />
                                                <span>Author</span>
                                            </div>
                                        </th>
                                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left newspaper-meta font-black uppercase tracking-wider text-xs sm:text-sm">
                                            <div className="flex items-center space-x-2">
                                                <FaEnvelope />
                                                <span>Email</span>
                                            </div>
                                        </th>
                                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left newspaper-meta font-black uppercase tracking-wider text-xs sm:text-sm">
                                            <div className="flex items-center space-x-2">
                                                <FaCalendarAlt />
                                                <span>Date</span>
                                            </div>
                                        </th>
                                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-center newspaper-meta font-black uppercase tracking-wider text-xs sm:text-sm">
                                            Status
                                        </th>
                                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-center newspaper-meta font-black uppercase tracking-wider text-xs sm:text-sm">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y-2 divide-gray-200">
                                    {displayedArticles.map((article, index) => (
                                        <tr key={article._id} className="hover:bg-gray-50 transition-colors duration-200">
                                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-black text-sm">
                                                    {currentPage * itemsPerPage + index + 1}
                                                </div>
                                            </td>
                                            <td className="px-3 sm:px-6 py-3 sm:py-4">
                                                <div className="max-w-xs">
                                                    <div className="text-sm sm:text-base font-semibold text-gray-900 truncate" title={article.title}>
                                                        {article.title}
                                                    </div>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        {article.isPremium && (
                                                            <span className="inline-flex items-center px-2 py-1 rounded-none text-xs font-black uppercase tracking-wider text-yellow-800 bg-yellow-100 border border-yellow-300">
                                                                <FaCrown className="mr-1" />
                                                                Premium
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                <div className="text-sm sm:text-base font-medium text-gray-900">{article.authorName}</div>
                                            </td>
                                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 break-all">{article.authorEmail}</div>
                                            </td>
                                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {new Date(article.postDate).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-center">
                                                {article.isApproved ? (
                                                    <div className="inline-flex items-center px-3 py-1 rounded-none text-xs font-black uppercase tracking-wider text-green-800 bg-green-100 border-2 border-green-300">
                                                        <FaCheckCircle className="mr-1" />
                                                        Approved
                                                    </div>
                                                ) : article.isDeclined ? (
                                                    <div className="inline-flex items-center px-3 py-1 rounded-none text-xs font-black uppercase tracking-wider text-red-800 bg-red-100 border-2 border-red-300">
                                                        <FaTimesCircle className="mr-1" />
                                                        Declined
                                                    </div>
                                                ) : (
                                                    <div className="inline-flex items-center px-3 py-1 rounded-none text-xs font-black uppercase tracking-wider text-yellow-800 bg-yellow-100 border-2 border-yellow-300">
                                                        <FaClock className="mr-1" />
                                                        Pending
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                                                    <button
                                                        onClick={() =>
                                                            handleApprove(article._id, article.isApproved)
                                                        }
                                                        className="inline-flex items-center px-2 py-1 border-2 border-green-600 text-green-600 bg-white hover:bg-green-600 hover:text-white transition-all duration-300 font-black uppercase tracking-wider text-xs"
                                                        title="Approve Article"
                                                    >
                                                        <FaCheck className="mr-1" />
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleDecline(article._id)}
                                                        className="inline-flex items-center px-2 py-1 border-2 border-yellow-600 text-yellow-600 bg-white hover:bg-yellow-600 hover:text-white transition-all duration-300 font-black uppercase tracking-wider text-xs"
                                                        title="Decline Article"
                                                    >
                                                        <FaTimes className="mr-1" />
                                                        Decline
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(article._id, article.title)}
                                                        className="inline-flex items-center px-2 py-1 border-2 border-red-600 text-red-600 bg-white hover:bg-red-600 hover:text-white transition-all duration-300 font-black uppercase tracking-wider text-xs"
                                                        title="Delete Article"
                                                    >
                                                        <FaTrashAlt className="mr-1" />
                                                        Delete
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleMakePremium(
                                                                article._id,
                                                                article.isPremium,
                                                                article.title
                                                            )
                                                        }
                                                        className={`inline-flex items-center px-2 py-1 border-2 transition-all duration-300 font-black uppercase tracking-wider text-xs ${
                                                            article.isPremium
                                                                ? "border-purple-600 text-purple-600 bg-purple-100"
                                                                : "border-purple-600 text-purple-600 bg-white hover:bg-purple-600 hover:text-white"
                                                        }`}
                                                        title={article.isPremium ? "Already Premium" : "Make Premium"}
                                                    >
                                                        {article.isPremium ? <FaCrown className="mr-1" /> : <FaStar className="mr-1" />}
                                                        {article.isPremium ? "Premium" : "Premium"}
                                                    </button>
                                                </div>
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
                            CONTENT MANAGEMENT INSIGHTS
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                            <div className="p-3 sm:p-4 bg-white text-gray-900 border-2 border-yellow-500">
                                <div className="text-lg sm:text-xl font-black">{articles.length}</div>
                                <div className="text-xs sm:text-sm uppercase tracking-wider">Total Articles</div>
                            </div>
                            <div className="p-3 sm:p-4 bg-white text-gray-900 border-2 border-yellow-500">
                                <div className="text-lg sm:text-xl font-black">{approvedCount}</div>
                                <div className="text-xs sm:text-sm uppercase tracking-wider">Live</div>
                            </div>
                            <div className="p-3 sm:p-4 bg-white text-gray-900 border-2 border-yellow-500">
                                <div className="text-lg sm:text-xl font-black">{pendingCount}</div>
                                <div className="text-xs sm:text-sm uppercase tracking-wider">Pending</div>
                            </div>
                            <div className="p-3 sm:p-4 bg-white text-gray-900 border-2 border-yellow-500">
                                <div className="text-lg sm:text-xl font-black">{premiumCount}</div>
                                <div className="text-xs sm:text-sm uppercase tracking-wider">Premium</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ManageArticles;
