import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import SectionTitle from "../../component/SectionTitle/SectionTitle";
import LoadingSpinner from "../../component/LoadingSpinner/LoadingSpinner";
import { Helmet } from "react-helmet-async";

const AllArticles = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPublisher, setSelectedPublisher] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);

    // Fetch user subscription data
    const { data: userInfo } = useQuery({
        queryKey: ["user", user?.email],
        queryFn: async () => {
            if (!user?.email) return null;
            const res = await axiosPublic.get(`/users/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    // Fetch articles using useQuery
    const { data: articles = [], isLoading: articlesLoading } = useQuery({
        queryKey: ["articles", searchQuery, selectedPublisher, selectedTags],
        queryFn: async () => {
            const queryParams = new URLSearchParams({
                search: searchQuery,
                publisher: selectedPublisher,
                tags: selectedTags.map((tag) => tag.value).join(","),
                status: "approved", // Only approved articles
            });
            const res = await axiosPublic.get(`/articles?${queryParams}`);
            return res.data;
        },
    });

    // Fetch publishers using useQuery
    const { data: publishers = [], isLoading: publishersLoading } = useQuery({
        queryKey: ["publishers"],
        queryFn: async () => {
            const res = await axiosPublic.get("/publishers");
            return res.data;
        },
    });

    const tagOptions = [
        "AI", "Healthcare", "Technology", "Blockchain", "Finance", "Crypto", "Energy",
        "Sustainability", "Environment", "Travel", "Adventure", "Tourism", "Cybersecurity",
        "Privacy", "Innovation", "Renewables", "Climate Change", "Policy", "Smart Cities",
        "Investment", "Economy", "Electric Vehicles", "Automation"
    ].map(tag => ({ value: tag, label: tag }));

    return (
        <section className="min-h-screen bg-white">
            <Helmet>
                <title>Insightly | All Articles</title>
            </Helmet>
            
            {/* Newspaper-style header */}
            <div className="bg-white border-b-4 border-gray-900 py-8">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center">
                        <h1 className="newspaper-headline text-4xl md:text-5xl text-gray-900 mb-2">
                            ALL ARTICLES
                        </h1>
                        <div className="flex items-center justify-center">
                            <div className="flex-1 border-t border-gray-400 max-w-32"></div>
                            <p className="newspaper-meta text-gray-600 mx-4 uppercase tracking-widest text-sm">
                                Complete News Archive
                            </p>
                            <div className="flex-1 border-t border-gray-400 max-w-32"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Enhanced Search and Filter Section */}
                <div className="bg-white newspaper-card p-6 mb-8">
                    <h3 className="newspaper-subheadline text-xl text-gray-900 mb-4">Find Your Story</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="newspaper-meta text-xs text-gray-600 uppercase tracking-wide mb-2 block">
                                Search Articles
                            </label>
                            <input
                                type="text"
                                placeholder="Enter keywords..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input input-bordered w-full newspaper-border focus:border-gray-700"
                            />
                        </div>
                        <div>
                            <label className="newspaper-meta text-xs text-gray-600 uppercase tracking-wide mb-2 block">
                                Publisher
                            </label>
                            <select
                                className="select select-bordered w-full newspaper-border focus:border-gray-700"
                                value={selectedPublisher}
                                onChange={(e) => setSelectedPublisher(e.target.value)}
                            >
                                <option value="">All Publishers</option>
                                {publishersLoading ? (
                                    <option disabled>Loading Publishers...</option>
                                ) : (
                                    publishers.map((publisher) => (
                                        <option key={publisher._id} value={publisher.name}>
                                            {publisher.name}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>
                        <div>
                            <label className="newspaper-meta text-xs text-gray-600 uppercase tracking-wide mb-2 block">
                                Categories
                            </label>
                            <Select
                                className="w-full"
                                isMulti
                                options={tagOptions}
                                value={selectedTags}
                                onChange={setSelectedTags}
                                placeholder="Select categories..."
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        border: '2px solid #1a1a1a',
                                        borderRadius: '0',
                                        minHeight: '48px'
                                    })
                                }}
                            />
                        </div>
                    </div>
                </div>

                {articlesLoading ? (
                    <LoadingSpinner 
                        size="large" 
                        text="Loading Articles..." 
                        variant="newspaper"
                        fullScreen={false}
                    />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article) => (
                            <article
                                key={article._id}
                                className="newspaper-card bg-white overflow-hidden group cursor-pointer h-full flex flex-col"
                                onClick={() => navigate(`/articles/${article._id}`)}
                            >
                                {/* Article Image */}
                                <div className="relative overflow-hidden">
                                    {article.isPremium && (
                                        <div className="absolute top-3 left-3 z-10">
                                            <span className="premium-badge">PREMIUM</span>
                                        </div>
                                    )}
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                                        <span className="newspaper-meta text-white text-xs uppercase tracking-wider">
                                            {article.publisher}
                                        </span>
                                    </div>
                                </div>

                                {/* Article Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="mb-3">
                                        <span className="newspaper-meta text-gray-500 text-xs">
                                            {new Date(article.postDate).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>

                                    <h3 className="newspaper-subheadline text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors">
                                        {article.title}
                                    </h3>

                                    <p className="newspaper-body text-gray-600 mb-4 line-clamp-3 flex-1">
                                        {article.description?.split(" ").slice(0, 15).join(" ")}...
                                    </p>

                                    {/* Article Tags */}
                                    {article.tags && article.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {article.tags.slice(0, 3).map((tag, idx) => (
                                                <span 
                                                    key={idx} 
                                                    className="bg-gray-100 text-gray-600 px-2 py-1 text-xs uppercase tracking-wider"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Article Footer */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                        <div className="newspaper-author text-gray-600 text-sm">
                                            {article.authorName || "Staff Writer"}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {article.views || 0} views
                                        </div>
                                    </div>

                                    <button
                                        className={`mt-4 w-full py-3 uppercase tracking-wide font-semibold text-sm transition-colors duration-300 ${
                                            article.isPremium && !userInfo?.premiumTaken
                                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                : "newspaper-border bg-gray-900 text-white hover:bg-gray-800"
                                        }`}
                                        disabled={article.isPremium && !userInfo?.premiumTaken}
                                    >
                                        {article.isPremium && !userInfo?.premiumTaken ? "Premium Content" : "Read Article"}
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                {/* No articles message */}
                {!articlesLoading && articles.length === 0 && (
                    <div className="text-center py-16">
                        <div className="newspaper-body text-gray-600">
                            <h3 className="newspaper-subheadline text-2xl text-gray-900 mb-4">No Articles Found</h3>
                            <p>We couldn't find any articles matching your criteria.</p>
                            <p className="text-sm mt-2">Try adjusting your search terms or filters.</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AllArticles;
