import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SectionTitle from "../SectionTitle/SectionTitle";
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
        <section className="min-h-screen p-4 md:p-8">
            <Helmet>
                <title>Insightly | Article Details</title>
            </Helmet>

            {isLoading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <span className="loading loading-bars loading-lg"></span>
                </div>
            ) : (
                <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 border-blue-500 transform shadow-md rounded-lg p-6">
                    <SectionTitle heading={article.title} />

                    {article.image && (
                        <div className="w-full aspect-[16/9] overflow-hidden rounded-lg mb-6">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-600 text-sm mb-4">
                        <p>
                            <strong className="text-gray-800">Publisher:</strong> {article.publisher || "Unknown"}
                        </p>
                        <p>
                            <strong className="text-gray-800">Views:</strong> {article.views || 0}
                        </p>
                    </div>

                    <p className="text-gray-700 leading-relaxed">{article.description}</p>
                </div>
            )}
        </section>
    );
};

export default ArticleDetails;
