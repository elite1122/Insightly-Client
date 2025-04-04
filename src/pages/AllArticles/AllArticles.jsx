import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import SectionTitle from "../../component/SectionTitle/SectionTitle";
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
        <section>
            <Helmet>
                <title>Insightly | All Articles</title>
            </Helmet>
            <div className="min-h-screen bg-background transform rounded-lg p-6">
                <SectionTitle heading="All Articles" subHeading="See all the articles here" />
                <div className="flex gap-4 mb-6 justify-between flex-col lg:flex-row">
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input input-bordered w-full md:w-1/3"
                    />
                    <select
                        className="select select-bordered w-full md:w-1/4"
                        value={selectedPublisher}
                        onChange={(e) => setSelectedPublisher(e.target.value)}
                    >
                        <option value="">All Publishers</option>
                        {publishersLoading ? (
                            <option disabled>Loading...</option>
                        ) : (
                            publishers.map((publisher) => (
                                <option key={publisher._id} value={publisher.name}>
                                    {publisher.name}
                                </option>
                            ))
                        )}
                    </select>
                    <Select
                        className="w-full md:w-1/3"
                        isMulti
                        options={tagOptions}
                        value={selectedTags}
                        onChange={setSelectedTags}
                        placeholder="Filter by tags"
                    />
                </div>

                {articlesLoading ? (
                    <div className="flex justify-center items-center">
                        <span className="loading loading-bars loading-lg"></span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles.map((article) => (
                            <div
                                key={article._id}
                                className={`border p-6 rounded-lg shadow-lg transition-all duration-300 flex flex-col justify-between h-full ${article.isPremium
                                    ? " text-gray-800 shadow-2xl transform"
                                    : " text-gray-800 shadow-2xl transform"
                                }`}
                            >
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold mt-4">{article.title}</h3>
                                    <p className="italic">{article.publisher}</p>
                                    <p className="mt-2">{article.description?.split(" ").slice(0, 10).join(" ")}...</p>
                                </div>
                                <button
                                    className="mt-4 btn btn-primary font-semibold text-md w-full"
                                    onClick={() => navigate(`/articles/${article._id}`)}
                                    disabled={article.isPremium && !userInfo?.premiumTaken}
                                >
                                    {article.isPremium && !userInfo?.premiumTaken ? "Premium Content" : "View Details"}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default AllArticles;
