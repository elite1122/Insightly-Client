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
        <section className="min-h-screen p-4 md:p-8 bg-background">
            <Helmet>
                <title>Insightly | Article Details</title>
            </Helmet>

            {isLoading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <span className="loading loading-bars loading-lg"></span>
                </div>
            ) : (
                <div className="w-full p-8 grid md:grid-cols-2 gap-8">
                    {/* Image Section - Left */}
                    {article.image && (
                        <div className="w-full flex justify-center items-center">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="rounded-lg shadow-md object-cover w-full h-auto max-h-96"
                            />
                        </div>
                    )}

                    {/* Content Section - Right */}
                    <div>
                        <SectionTitle heading={article.title} />
                        <div className="text-gray-600 text-sm mb-4">
                            <p>
                                <strong className="text-gray-800">Publisher:</strong> {article.publisher || "Unknown"}
                            </p>

                        </div>
                        <p className="text-gray-700 leading-relaxed mb-4">{article.description}</p>
                        <p>
                            <strong className="text-gray-800">Views:</strong> {article.views || 0}
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ArticleDetails;
