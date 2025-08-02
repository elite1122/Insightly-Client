import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import SectionTitle from "../../component/SectionTitle/SectionTitle";
import LoadingSpinner from "../../component/LoadingSpinner/LoadingSpinner";
import { Helmet } from "react-helmet-async";

const MyArticles = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { user } = useAuth();

    const { data: articles = [], isLoading, refetch } = useQuery({
        queryKey: ["myArticles", user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/articles?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const handleShowReason = (reason) => {
        Swal.fire({
            title: "Article Decline Reason",
            text: reason || "No reason provided",
            icon: "info",
            confirmButtonText: "Understood",
            customClass: {
                popup: 'newspaper-alert',
                title: 'newspaper-title',
                content: 'newspaper-content'
            }
        });
    };

    const deleteArticle = useMutation({
        mutationFn: async (id) => {
            const res = await axiosPublic.delete(`/articles/${id}`);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire({
                title: "Article Deleted!",
                text: "Your article has been successfully removed from the system.",
                icon: "success",
                customClass: {
                    popup: 'newspaper-alert',
                    title: 'newspaper-title',
                    content: 'newspaper-content'
                }
            });
            refetch();
        },
        onError: (error) => {
            Swal.fire({
                title: "Deletion Failed!",
                text: "Unable to delete the article. Please try again.",
                icon: "error",
                customClass: {
                    popup: 'newspaper-alert',
                    title: 'newspaper-title',
                    content: 'newspaper-content'
                }
            });
        },
    });

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Delete Article?",
            text: "This action cannot be undone. Your article will be permanently removed.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Delete Article",
            cancelButtonText: "Keep Article",
            customClass: {
                popup: 'newspaper-alert',
                title: 'newspaper-title',
                content: 'newspaper-content'
            }
        });

        if (result.isConfirmed) {
            deleteArticle.mutate(id);
        }
    };

    if (isLoading) {
        return (
            <section className="bg-white min-h-screen">
                <Helmet><title>Insightly | My Articles</title></Helmet>
                <LoadingSpinner 
                    size="large" 
                    text="Loading Your Articles..." 
                    variant="newspaper"
                    fullScreen={false}
                />
            </section>
        );
    }

    return (
        <section className="bg-white min-h-screen">
            <Helmet>
                <title>Insightly | My Articles</title>
            </Helmet>
            
            {/* Newspaper Header */}
            <div className="bg-white border-b-4 border-gray-900 py-8">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center">
                        <h1 className="newspaper-headline text-4xl md:text-5xl text-gray-900 mb-2">
                            MY ARTICLES
                        </h1>
                        <div className="flex items-center justify-center">
                            <div className="flex-1 border-t border-gray-400 max-w-32"></div>
                            <p className="newspaper-meta text-gray-600 mx-4 uppercase tracking-widest text-sm">
                                Your Published Works
                            </p>
                            <div className="flex-1 border-t border-gray-400 max-w-32"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {articles.length === 0 ? (
                    <div className="bg-white border-8 border-gray-900 p-16 text-center newspaper-card shadow-2xl relative">
                        <div className="absolute -top-4 -left-4 bg-blue-600 text-white px-4 py-2 text-xs font-black uppercase tracking-wider transform -rotate-3">
                            GET STARTED
                        </div>
                        
                        <div className="mb-8">
                            <div className="text-6xl mb-4">📝</div>
                            <h2 className="newspaper-headline text-3xl text-gray-900 mb-4 uppercase tracking-wider font-black">
                                No Articles Yet
                            </h2>
                            <p className="newspaper-body text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                                Start your journalism journey today. Share your insights, stories, and expertise with our growing community of readers.
                            </p>
                        </div>
                        
                        <button
                            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 px-8 uppercase tracking-widest font-black text-xl border-4 border-gray-900 transition-all duration-300 hover:from-blue-700 hover:to-blue-900 transform hover:scale-105 shadow-lg"
                            onClick={() => navigate("/addArticles")}
                        >
                            Write Your First Article
                        </button>
                        
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                            <div className="p-4 border-2 border-gray-300">
                                <div className="text-2xl mb-2">✍️</div>
                                <div className="font-bold">Write</div>
                                <div className="text-sm text-gray-600">Create compelling content</div>
                            </div>
                            <div className="p-4 border-2 border-gray-300">
                                <div className="text-2xl mb-2">📰</div>
                                <div className="font-bold">Publish</div>
                                <div className="text-sm text-gray-600">Share with the world</div>
                            </div>
                            <div className="p-4 border-2 border-gray-300">
                                <div className="text-2xl mb-2">🌟</div>
                                <div className="font-bold">Engage</div>
                                <div className="text-sm text-gray-600">Connect with readers</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white border-8 border-gray-900 newspaper-card shadow-2xl relative">
                        <div className="absolute -top-4 -left-4 bg-green-600 text-white px-4 py-2 text-xs font-black uppercase tracking-wider transform -rotate-3">
                            EDITORIAL DESK
                        </div>
                        
                        <div className="p-8">
                            <div className="text-center mb-8">
                                <h2 className="newspaper-headline text-3xl text-gray-900 mb-4 uppercase tracking-wider font-black border-b-4 border-gray-900 pb-4">
                                    Article Portfolio
                                </h2>
                                <p className="newspaper-meta text-gray-600 uppercase tracking-widest">
                                    Managing {articles.length} Article{articles.length !== 1 ? 's' : ''}
                                </p>
                            </div>

                            {/* Desktop Table View */}
                            <div className="hidden lg:block overflow-x-auto">
                                <table className="w-full border-4 border-gray-900">
                                    <thead className="bg-gray-900 text-white">
                                        <tr>
                                            <th className="newspaper-meta px-6 py-4 text-left uppercase tracking-widest font-black">#</th>
                                            <th className="newspaper-meta px-6 py-4 text-left uppercase tracking-widest font-black">Article Title</th>
                                            <th className="newspaper-meta px-6 py-4 text-center uppercase tracking-widest font-black">Status</th>
                                            <th className="newspaper-meta px-6 py-4 text-center uppercase tracking-widest font-black">Premium</th>
                                            <th className="newspaper-meta px-6 py-4 text-center uppercase tracking-widest font-black">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {articles.map((article, index) => (
                                            <tr key={article._id} className="border-b-2 border-gray-300 hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 font-bold text-gray-900">{index + 1}</td>
                                                <td className="px-6 py-4">
                                                    <div className="newspaper-body font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                                                        {article.title}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {article.isApproved ? (
                                                        <span className="bg-green-100 border-2 border-green-600 text-green-800 px-3 py-1 uppercase text-xs font-black tracking-wider">
                                                            ✓ Published
                                                        </span>
                                                    ) : article.isDeclined ? (
                                                        <div className="space-y-2">
                                                            <span className="bg-red-100 border-2 border-red-600 text-red-800 px-3 py-1 uppercase text-xs font-black tracking-wider block">
                                                                ✗ Declined
                                                            </span>
                                                            <button
                                                                className="text-blue-600 hover:text-blue-800 underline text-xs font-semibold"
                                                                onClick={() => handleShowReason(article.declineReason)}
                                                            >
                                                                View Reason
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span className="bg-yellow-100 border-2 border-yellow-600 text-yellow-800 px-3 py-1 uppercase text-xs font-black tracking-wider">
                                                            ⏳ Under Review
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {article.isPremium ? (
                                                        <span className="bg-purple-100 border-2 border-purple-600 text-purple-800 px-3 py-1 uppercase text-xs font-black tracking-wider">
                                                            ⭐ Premium
                                                        </span>
                                                    ) : (
                                                        <span className="bg-gray-100 border-2 border-gray-400 text-gray-600 px-3 py-1 uppercase text-xs font-black tracking-wider">
                                                            Free
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-center space-x-2">
                                                        <button
                                                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 text-xs font-bold uppercase tracking-wider border-2 border-gray-900 transition-all hover:scale-105"
                                                            onClick={() => navigate(`/articles/${article._id}`)}
                                                        >
                                                            View
                                                        </button>
                                                        <button
                                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 text-xs font-bold uppercase tracking-wider border-2 border-gray-900 transition-all hover:scale-105"
                                                            onClick={() => navigate(`/updateArticles/${article._id}`)}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 text-xs font-bold uppercase tracking-wider border-2 border-gray-900 transition-all hover:scale-105"
                                                            onClick={() => handleDelete(article._id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Card View */}
                            <div className="lg:hidden space-y-6">
                                {articles.map((article, index) => (
                                    <div key={article._id} className="border-4 border-gray-900 bg-white p-6 newspaper-card shadow-lg">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center mb-2">
                                                    <span className="bg-gray-900 text-white px-2 py-1 text-xs font-black mr-3">#{index + 1}</span>
                                                    {article.isPremium && (
                                                        <span className="bg-purple-100 border border-purple-600 text-purple-800 px-2 py-1 text-xs font-black uppercase tracking-wider">
                                                            ⭐ Premium
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className="newspaper-body font-bold text-gray-900 mb-3">{article.title}</h3>
                                                <div className="mb-4">
                                                    {article.isApproved ? (
                                                        <span className="bg-green-100 border-2 border-green-600 text-green-800 px-3 py-1 uppercase text-xs font-black tracking-wider">
                                                            ✓ Published
                                                        </span>
                                                    ) : article.isDeclined ? (
                                                        <div className="space-y-2">
                                                            <span className="bg-red-100 border-2 border-red-600 text-red-800 px-3 py-1 uppercase text-xs font-black tracking-wider block">
                                                                ✗ Declined
                                                            </span>
                                                            <button
                                                                className="text-blue-600 hover:text-blue-800 underline text-xs font-semibold"
                                                                onClick={() => handleShowReason(article.declineReason)}
                                                            >
                                                                View Reason
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span className="bg-yellow-100 border-2 border-yellow-600 text-yellow-800 px-3 py-1 uppercase text-xs font-black tracking-wider">
                                                            ⏳ Under Review
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-col sm:flex-row gap-2">
                                            <button
                                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 text-sm font-bold uppercase tracking-wider border-2 border-gray-900 transition-all hover:scale-105"
                                                onClick={() => navigate(`/articles/${article._id}`)}
                                            >
                                                View Details
                                            </button>
                                            <button
                                                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-4 text-sm font-bold uppercase tracking-wider border-2 border-gray-900 transition-all hover:scale-105"
                                                onClick={() => navigate(`/updateArticles/${article._id}`)}
                                            >
                                                Edit Article
                                            </button>
                                            <button
                                                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 text-sm font-bold uppercase tracking-wider border-2 border-gray-900 transition-all hover:scale-105"
                                                onClick={() => handleDelete(article._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Quick Actions Section */}
                {articles.length > 0 && (
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white border-4 border-gray-900 p-6 text-center newspaper-card shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-3xl mb-4">✍️</div>
                            <h3 className="newspaper-headline text-xl font-black uppercase tracking-wider mb-2">Write New Article</h3>
                            <p className="text-gray-600 mb-4">Share your latest insights with the world</p>
                            <button
                                onClick={() => navigate("/addArticles")}
                                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 text-sm font-bold uppercase tracking-wider border-2 border-gray-900 transition-all hover:scale-105"
                            >
                                Create Article
                            </button>
                        </div>
                        
                        <div className="bg-white border-4 border-gray-900 p-6 text-center newspaper-card shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-3xl mb-4">📊</div>
                            <h3 className="newspaper-headline text-xl font-black uppercase tracking-wider mb-2">Article Analytics</h3>
                            <p className="text-gray-600 mb-4">Track your content performance</p>
                            <div className="space-y-2">
                                <div className="text-sm text-gray-600">
                                    <span className="font-bold">{articles.filter(a => a.isApproved).length}</span> Published
                                </div>
                                <div className="text-sm text-gray-600">
                                    <span className="font-bold">{articles.filter(a => !a.isApproved && !a.isDeclined).length}</span> Pending Review
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white border-4 border-gray-900 p-6 text-center newspaper-card shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-3xl mb-4">🏆</div>
                            <h3 className="newspaper-headline text-xl font-black uppercase tracking-wider mb-2">Premium Status</h3>
                            <p className="text-gray-600 mb-4">Exclusive content benefits</p>
                            <div className="text-sm text-gray-600">
                                <span className="font-bold">{articles.filter(a => a.isPremium).length}</span> Premium Articles
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default MyArticles;
