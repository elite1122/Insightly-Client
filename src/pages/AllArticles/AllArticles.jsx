import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SectionTitle from "../../component/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";

const AllArticles = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPublisher, setSelectedPublisher] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);

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
            <div className="min-h-screen bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 border-blue-500 transform shadow-lg rounded-lg p-6">
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
                        {articles
                            .filter(article =>
                                article.title.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((article) => (
                                <div
                                    key={article._id}
                                    className={`border p-6 rounded-lg shadow-lg transition-all duration-300 flex flex-col justify-between h-full ${article.isPremium
                                            ? "bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white border-yellow-500 shadow-2xl transform"
                                            : "bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 text-white border-blue-500 shadow-lg transform"
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
                                        <p className="mt-2">{article.description}</p>
                                    </div>
                                    <button
                                        className="mt-4 btn btn-accent font-bold text-lg w-full"
                                        onClick={() => navigate(`/articles/${article._id}`)}
                                    >
                                        View Details
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
