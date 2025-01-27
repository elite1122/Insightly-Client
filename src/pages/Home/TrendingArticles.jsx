import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../component/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";

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
        autoplaySpeed: 3000,
        arrows: true,
    };

    return (
        <section>
            <Helmet>
                <title>Insightly | Trending Articles</title>
            </Helmet>
            <div className="p-6 min-h-screen">
                <SectionTitle heading="Trending Articles"></SectionTitle>
                {isLoading ? (
                    <div className="flex justify-center items-center min-h-screen">
                        <span className="loading loading-bars loading-lg"></span>
                    </div>
                ) : trendingArticles.length > 0 ? (
                    <div className="max-w-4xl mx-auto ">
                        <Slider {...sliderSettings}>
                            {trendingArticles.map((article) => (
                                <div key={article._id} className="p-4">
                                    <Link to={`/articles/${article._id}`}>
                                        <div className="shadow-lg rounded-lg bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 border-blue-500 transform p-6">
                                            {article.image && (
                                                <img
                                                    src={article.image}
                                                    alt={article.title}
                                                    className="w-full h-64 object-cover rounded-lg mb-4"
                                                />
                                            )}
                                            <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                                            <p className="text-gray-600 mb-2">
                                                <strong>Publisher:</strong>{" "}
                                                {article.publisher || "Unknown"}
                                            </p>
                                            <p className="text-gray-600 mb-2">
                                                <strong>Views:</strong> {article.views || 0}
                                            </p>
                                            <p className="text-gray-700 mt-4 line-clamp-3">
                                                {article.description}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </Slider>
                    </div>
                ) : (
                    <div className="text-center mt-10 text-gray-600">
                        <p>No trending articles available.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default TrendingArticles;
