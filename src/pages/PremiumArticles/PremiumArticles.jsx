import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SectionTitle from "../../component/SectionTitle/SectionTitle";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const PremiumArticles = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    // Fetch premium articles
    const { data: premiumArticles = [], isLoading } = useQuery({
        queryKey: ["premiumArticles"],
        queryFn: async () => {
            const res = await axiosPublic.get("/articles?status=approved");
            return res.data.filter(article => article.isPremium);  // Filter only premium articles
        },
    });

    return (
        <section>
            <Helmet>
                <title>Insightly | Premium Articles</title>
            </Helmet>
            <div className="min-h-screen bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 border-blue-500 transform shadow-lg rounded-lg p-6">
                <SectionTitle heading="Premium Articles" subHeading="Explore our premium content" />

                {isLoading ? (
                    <div className="flex justify-center items-center min-h-screen">
                        <span className="loading loading-bars loading-lg"></span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {premiumArticles.length > 0 ? (
                            premiumArticles.map((article) => (
                                <div
                                    key={article._id}
                                    className="border p-6 rounded-lg shadow-lg transition-all duration-300 flex flex-col justify-between h-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white border-yellow-500 shadow-2xl transform"
                                >
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold mt-4">{article.title}</h3>
                                        <p className="italic">{article.publisher}</p>
                                        <p className="mt-2">{article.description}</p>
                                    </div>
                                    <button
                                        className="mt-4 btn btn-accent font-bold text-lg w-full"
                                        onClick={() => navigate(`/articles/${article._id}`)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-lg font-bold text-gray-500">No premium articles available.</p>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default PremiumArticles;
