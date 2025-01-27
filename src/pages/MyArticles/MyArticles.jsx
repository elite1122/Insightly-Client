import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import SectionTitle from "../../component/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";

const MyArticles = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { user } = useAuth();

    const { data: articles = [], isLoading, refetch } = useQuery({
        queryKey: ["myArticles", user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/articles?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const handleShowReason = (reason) => {
        Swal.fire({
            title: "Decline Reason",
            text: reason || "No reason provided",
            icon: "info",
            confirmButtonText: "OK",
        });
    };

    const deleteArticle = useMutation({
        mutationFn: async (id) => {
            const res = await axiosPublic.delete(`/articles/${id}`);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire("Deleted!", "Your article has been deleted.", "success");
            refetch();
        },
        onError: (error) => {
            Swal.fire("Error!", "Failed to delete the article.", "error");
        },
    });


    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            deleteArticle.mutate(id);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    return (
        <section>
            <Helmet>
                <title>Insightly | My Articles</title>
            </Helmet>
            <div className="min-h-screen">
            <SectionTitle heading="My Articles" subHeading="All your articles are here"></SectionTitle>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-4">#</th>
                            <th className="border p-4">Title</th>
                            <th className="border p-4">Status</th>
                            <th className="border p-4">Premium</th>
                            <th className="border p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((article, index) => (
                            <tr key={article._id} className="text-center">
                                <td className="border p-4">{index + 1}</td>
                                <td className="border p-4">{article.title}</td>
                                <td className="border p-4">
                                    {article.isApproved
                                        ? "Approved"
                                        : article.isDeclined
                                            ? <div className="flex flex-col items-center">
                                                Declined
                                                <button
                                                className="text-blue-500"
                                                onClick={() => handleShowReason(article.declineReason)}
                                            >
                                                Reason
                                            </button>
                                            </div>
                                        : "Pending"}
                                </td>
                                <td className="border p-4">{article.isPremium ? "Yes" : "No"}</td>
                                <td className="border p-4">
                                    <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 justify-center">
                                        <button
                                            className="btn btn-primary mr-2"
                                            onClick={() => navigate(`/articles/${article._id}`)}
                                        >
                                            Details
                                        </button>
                                        <button
                                            className="btn btn-warning mr-2"
                                            onClick={() => navigate(`/updateArticles/${article._id}`)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(article._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </section>
    );
};

export default MyArticles;