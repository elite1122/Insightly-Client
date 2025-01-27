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
        <section>
            <Helmet>
                <title>Insightly | Article Details</title>
            </Helmet>
            <div className="p-6 min-h-screen">
                {isLoading ? (
                    <div className="flex justify-center items-center min-h-screen">
                        <span className="loading loading-bars loading-lg"></span>
                    </div>
                ) : (
                    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
                        <SectionTitle heading={article.title}></SectionTitle>
                        {article.image && (
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full rounded-lg mb-4"
                            />
                        )}
                        <p className="text-gray-600 mb-2">
                            <strong>Publisher:</strong> {article.publisher || "Unknown"}
                        </p>
                        <p className="text-gray-600 mb-2">
                            <strong>Views:</strong> {article.views || 0}
                        </p>
                        <p className="text-gray-700 mt-4">{article.description}</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ArticleDetails;
