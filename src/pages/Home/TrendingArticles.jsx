import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SectionTitle from "../../component/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../component/LoadingSpinner/LoadingSpinner";

const TrendingArticles = () => {
    const axiosPublic = useAxiosPublic();

    // Fetch all articles
    const { data: articles = [], isLoading } = useQuery({
        queryKey: ["articles"],
        queryFn: async () => {
            const res = await axiosPublic.get("/articles");
            return res.data;
        },
    });

    // Sort articles by views and get the top 6
    const trendingArticles = articles
        .sort((a, b) => b.views - a.views) // Sort in descending order of views
        .slice(0, 6); // Get top 6 articles

    // Settings for the slider
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true,
        dotsClass: "slick-dots newspaper-dots",
    };

    return (
        <section className="bg-white py-12 border-b-2 border-gray-200">
            <div className="max-w-7xl mx-auto px-6">
                {/* Newspaper-style section header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <div className="flex-1 border-t-2 border-gray-900"></div>
                        <h2 className="newspaper-headline text-4xl md:text-5xl mx-6 text-gray-900">
                            TRENDING NOW
                        </h2>
                        <div className="flex-1 border-t-2 border-gray-900"></div>
                    </div>
                    <p className="newspaper-meta text-gray-600 uppercase tracking-widest">
                        Most Read Stories of the Day
                    </p>
                </div>

                {isLoading ? (
                    <LoadingSpinner 
                        size="large" 
                        text="Loading trending articles..." 
                        variant="newspaper"
                    />
                ) : trendingArticles.length > 0 ? (
                    <div className="max-w-6xl mx-auto">
                        <Slider {...sliderSettings}>
                            {trendingArticles.map((article, index) => (
                                <div key={article._id} className="px-4">
                                    <div className="newspaper-card bg-white rounded-lg overflow-hidden">
                                        <div className="grid md:grid-cols-2 gap-8 p-8">
                                            {/* Image Section */}
                                            <div className="relative">
                                                {article.isPremium && (
                                                    <div className="absolute top-4 left-4 z-10">
                                                        <span className="premium-badge">PREMIUM</span>
                                                    </div>
                                                )}
                                                {index === 0 && (
                                                    <div className="absolute top-4 right-4 z-10">
                                                        <span className="bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wide">
                                                            BREAKING
                                                        </span>
                                                    </div>
                                                )}
                                                {article.image && (
                                                    <img
                                                        src={article.image}
                                                        alt={article.title}
                                                        className="w-full h-64 md:h-80 object-cover"
                                                    />
                                                )}
                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                                    <span className="newspaper-meta text-white/90 text-xs">
                                                        {article.publisher || "Unknown Publisher"}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content Section */}
                                            <div className="flex flex-col justify-center">
                                                <div className="mb-4">
                                                    <span className="newspaper-meta text-gray-500 text-sm">
                                                        {new Date(article.postDate).toLocaleDateString('en-US', { 
                                                            month: 'long', 
                                                            day: 'numeric', 
                                                            year: 'numeric' 
                                                        })}
                                                    </span>
                                                </div>
                                                
                                                <h3 className="newspaper-headline text-3xl md:text-4xl text-gray-900 mb-4 leading-tight">
                                                    {article.title}
                                                </h3>
                                                
                                                <div className="newspaper-body text-gray-700 mb-6 leading-relaxed">
                                                    <p className="dropcap">
                                                        {article.description?.substring(0, 200)}...
                                                    </p>
                                                </div>

                                                <div className="flex items-center justify-between mb-6">
                                                    <div className="newspaper-author text-gray-600">
                                                        By {article.authorName || "Staff Writer"}
                                                    </div>
                                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                        <span>{article.views || 0} views</span>
                                                        {article.tags && article.tags.length > 0 && (
                                                            <span className="flex space-x-2">
                                                                {article.tags.slice(0, 2).map((tag, idx) => (
                                                                    <span key={idx} className="bg-gray-200 px-2 py-1 rounded text-xs uppercase tracking-wide">
                                                                        {tag}
                                                                    </span>
                                                                ))}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <Link to={`/articles/${article._id}`}>
                                                    <button className="newspaper-border bg-gray-900 text-white px-8 py-3 hover:bg-gray-800 transition-colors duration-300 uppercase tracking-wide font-semibold">
                                                        Read Full Story
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                ) : (
                    <div className="text-center mt-10">
                        <div className="newspaper-body text-gray-600">
                            <p>No trending articles available at the moment.</p>
                            <p className="text-sm mt-2">Check back soon for the latest news and insights.</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default TrendingArticles;
