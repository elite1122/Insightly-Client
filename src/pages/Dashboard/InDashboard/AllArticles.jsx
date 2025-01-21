import { useQuery } from "@tanstack/react-query";
import { FaCheck, FaTimes, FaTrash, FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";

const AllArticles = () => {
    const axiosSecure = useAxiosSecure();
    const { data: articles = [], refetch } = useQuery(["articles"], async () => {
        const res = await axiosSecure.get("/articles");
        return res.data;
    });

    const [declineReason, setDeclineReason] = useState("");

    const handleApprove = async (id) => {
        await axiosSecure.patch(`/articles/approve/${id}`);
        Swal.fire("Success", "Article approved!", "success");
        refetch();
    };

    const handleDecline = async (id) => {
        Swal.fire({
            title: "Reason for Decline",
            input: "textarea",
            inputPlaceholder: "Enter reason here...",
            showCancelButton: true,
            preConfirm: (reason) => {
                setDeclineReason(reason);
            },
        }).then(async (result) => {
            if (result.isConfirmed && declineReason) {
                await axiosSecure.patch(`/articles/decline/${id}`, { reason: declineReason });
                Swal.fire("Declined", "Article declined successfully", "error");
                refetch();
            }
        });
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/articles/${id}`);
                Swal.fire("Deleted", "Article deleted successfully", "success");
                refetch();
            }
        });
    };

    const handleMakePremium = async (id) => {
        await axiosSecure.patch(`/articles/premium/${id}`);
        Swal.fire("Success", "Article marked as premium!", "success");
        refetch();
    };

    return (
        <div>
            <h2 className="text-3xl">All Articles</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Email</th>
                        <th>Posted Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map((article) => (
                        <tr key={article._id}>
                            <td>{article.title}</td>
                            <td>{article.authorName}</td>
                            <td>{article.authorEmail}</td>
                            <td>{new Date(article.date).toLocaleDateString()}</td>
                            <td>{article.status}</td>
                            <td>
                                <button onClick={() => handleApprove(article._id)} className="btn btn-success"><FaCheck /></button>
                                <button onClick={() => handleDecline(article._id)} className="btn btn-warning mx-2"><FaTimes /></button>
                                <button onClick={() => handleDelete(article._id)} className="btn btn-danger mx-2"><FaTrash /></button>
                                <button onClick={() => handleMakePremium(article._id)} className="btn btn-primary mx-2"><FaStar /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllArticles;
