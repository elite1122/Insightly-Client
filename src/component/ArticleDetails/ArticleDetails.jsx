import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SectionTitle from "../SectionTitle/SectionTitle";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Helmet } from "react-helmet-async";

const ArticleDetails = () => {
    const axiosPublic = useAxiosPublic();
    const { id } = useParams(); // Get the article ID from the route params
    const queryClient = useQueryClient();

    // Fetch the article details
    const { data: article, isLoading } = useQuery({
        queryKey: ["articleDetails", id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/articles/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    // Mutation to update the view count
    const updateViewCount = useMutation({
        mutationFn: async () => {
            const res = await axiosPublic.patch(`/articles/${id}/views`);
            return res.data;
        },
        // Update local cache instead of refetching
        onSuccess: () => {
            queryClient.setQueryData(["articleDetails", id], (oldData) => ({
                ...oldData,
                views: (oldData?.views || 0) + 1,
            }));
        },
        onError: (error) => {
            console.error("Failed to update view count", error);
        },
    });

    // Increment view count when the component loads
    useEffect(() => {
        if (id) {
            updateViewCount.mutate(); // Increment the view count only once
        }
    }, [id]);

    return (
        <section className="min-h-screen bg-white">
            <Helmet>
                <title>Insightly | Article Details</title>
            </Helmet>

            {isLoading ? (
                <LoadingSpinner 
                    size="large" 
                    text="Loading Article Details..." 
                    variant="newspaper"
                    fullScreen={false}
                />
            ) : (
                <div className="max-w-4xl mx-auto bg-white newspaper-card">
                    {/* Article Header */}
                    <div className="bg-gray-900 text-white p-8">
                        <div className="flex items-center justify-between mb-4">
                            <span className="newspaper-meta text-yellow-400 text-sm uppercase tracking-widest">
                                {article.publisher || "Unknown Publisher"}
                            </span>
                            {article.isPremium && (
                                <span className="premium-badge">PREMIUM</span>
                            )}
                        </div>
                        
                        <h1 className="newspaper-headline text-4xl md:text-5xl text-white mb-4 leading-tight">
                            {article.title}
                        </h1>
                        
                        <div className="flex items-center justify-between text-gray-300">
                            <div className="newspaper-author">
                                By {article.authorName || "Staff Writer"}
                            </div>
                            <div className="newspaper-meta text-sm">
                                {new Date(article.postDate).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Article Image */}
                    {article.image && (
                        <div className="relative">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-64 md:h-96 object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                                <p className="text-white text-sm opacity-90">
                                    {article.title}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Article Content */}
                    <article className="p-8 md:p-12">
                        {/* Article Meta Info */}
                        <div className="flex items-center justify-between border-b border-gray-200 pb-6 mb-8">
                            <div className="flex items-center space-x-6">
                                {article.authorPhoto && (
                                    <img
                                        src={article.authorPhoto}
                                        alt={article.authorName}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                )}
                                <div>
                                    <div className="newspaper-author text-gray-900 font-medium">
                                        {article.authorName || "Staff Writer"}
                                    </div>
                                    <div className="newspaper-meta text-gray-500 text-xs">
                                        {article.authorEmail}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="newspaper-meta text-gray-500 text-xs mb-1">
                                    VIEWS
                                </div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {article.views || 0}
                                </div>
                            </div>
                        </div>

                        {/* Article Tags */}
                        {article.tags && article.tags.length > 0 && (
                            <div className="mb-8">
                                <div className="newspaper-meta text-gray-600 text-xs mb-3 uppercase tracking-wider">
                                    Categories
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {article.tags.map((tag, idx) => (
                                        <span 
                                            key={idx} 
                                            className="bg-gray-100 text-gray-700 px-3 py-1 text-sm uppercase tracking-wide border"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Article Body */}
                        <div className="newspaper-body text-gray-800 leading-relaxed">
                            <p className="dropcap text-justify mb-6">
                                {article.description}
                            </p>
                        </div>

                        {/* Article Footer */}
                        <div className="border-t border-gray-200 pt-8 mt-12">
                            <div className="flex items-center justify-between">
                                <div className="newspaper-meta text-gray-500 text-xs uppercase tracking-widest">
                                    Published {new Date(article.postDate).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </div>
                                <div className="flex items-center space-x-4">
                                    <button className="newspaper-border bg-white text-gray-900 px-6 py-2 hover:bg-gray-100 transition-colors duration-300 text-sm uppercase tracking-wide">
                                        Share Article
                                    </button>
                                    <button className="newspaper-border bg-gray-900 text-white px-6 py-2 hover:bg-gray-800 transition-colors duration-300 text-sm uppercase tracking-wide">
                                        Save for Later
                                    </button>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Related Articles Section */}
                    <div className="bg-gray-100 p-8 border-t-4 border-gray-900">
                        <h3 className="newspaper-subheadline text-2xl text-gray-900 mb-6 text-center">
                            Related Stories
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-4 newspaper-card">
                                <div className="h-32 bg-gray-200 mb-3"></div>
                                <h4 className="newspaper-subheadline text-lg text-gray-900 mb-2">
                                    More Stories Coming Soon
                                </h4>
                                <p className="newspaper-body text-gray-600 text-sm">
                                    Stay tuned for more in-depth coverage and analysis.
                                </p>
                            </div>
                            <div className="bg-white p-4 newspaper-card">
                                <div className="h-32 bg-gray-200 mb-3"></div>
                                <h4 className="newspaper-subheadline text-lg text-gray-900 mb-2">
                                    Breaking News Updates
                                </h4>
                                <p className="newspaper-body text-gray-600 text-sm">
                                    Follow our latest coverage of developing stories.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ArticleDetails;
