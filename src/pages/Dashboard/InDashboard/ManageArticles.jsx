
import { useQuery } from "@tanstack/react-query";
import { FaCheck, FaTimes, FaStar, FaTrashAlt, FaCrown } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../component/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";

const ManageArticles = () => {
    const axiosSecure = useAxiosSecure();
    const { data: articles = [], refetch, isLoading } = useQuery({
        queryKey: ["articles"],
        queryFn: async () => {
            const res = await axiosSecure.get("/articles");
            return res.data;
        }
    });

    const handleApprove = async (id, isApproved) => {
        if (isApproved) {
            Swal.fire("Info", "This article is already approved!", "info");
            return;
        }

        try {
            await axiosSecure.patch(`/articles/approve/${id}`);
            Swal.fire("Success", "Article approved!", "success");
            refetch();
        } catch (error) {
            console.error("Error approving article:", error);
            Swal.fire("Error", "Failed to approve article. Please try again.", "error");
        }
    };

    const handleDecline = async (id) => {
        Swal.fire({
            title: "Reason for Decline",
            input: "textarea",
            inputPlaceholder: "Enter reason here...",
            showCancelButton: true,
            preConfirm: async (reason) => {
                if (!reason) {
                    Swal.showValidationMessage("Reason is required!");
                    return false;
                }
                return reason;
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.patch(`/articles/decline/${id}`, { reason: result.value });
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

    const handleMakePremium = async (id, isPremium) => {
        if (isPremium) {
            Swal.fire("Info", "This article is already premium!", "info");
            return;
        }

        try {
            await axiosSecure.patch(`/articles/premium/${id}`);
            Swal.fire("Success", "Article marked as premium!", "success");
            refetch();
        } catch (error) {
            console.error("Error making article premium:", error);
            Swal.fire("Error", "Failed to mark article as premium. Please try again.", "error");
        }
    };


    return (
        <section>
            <Helmet>
                <title>Insightly | Manage Articles</title>
            </Helmet>
            <div className="min-h-screen">
                <div className="mb-3">
                    <SectionTitle heading="Manage Articles"></SectionTitle>
                    {isLoading && <div className="flex justify-center items-center"><span className="loading loading-bars loading-lg"></span></div>}
                </div>
                <div className="overflow-x-auto">
                    <table className="table-auto table-striped w-full text-center">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">#</th>
                                <th className="px-4 py-2">Title</th>
                                <th className="px-4 py-2">Author</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Posted Date</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.map((article, index) => (
                                <tr key={article._id}>
                                    <th className="px-4 py-2">{index + 1}</th>
                                    <td className="px-4 py-2">{article.title}</td>
                                    <td className="px-4 py-2">{article.authorName}</td>
                                    <td className="px-4 py-2">{article.authorEmail}</td>
                                    <td className="px-4 py-2">{new Date(article.postDate).toLocaleDateString()}</td>
                                    <td className="px-4 py-2">
                                        {article.isApproved
                                            ? "Approved"
                                            : article.isDeclined
                                                ? "Declined"
                                                : "Pending"}
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 gap-2 lg:justify-center">
                                            <button onClick={() => handleApprove(article._id, article.isApproved)} className="btn btn-success"><FaCheck /></button>
                                            <button onClick={() => handleDecline(article._id)} className="btn btn-warning"><FaTimes /></button>
                                            <button onClick={() => handleDelete(article._id)} className="btn btn-danger text-red-600"><FaTrashAlt /></button>
                                            <button
                                                onClick={() => handleMakePremium(article._id, article.isPremium)}
                                                className={`btn btn-primary ${article.isPremium ? "bg-orange-400 border-none hover:bg-orange-500" : ""
                                                    }`}
                                            >
                                                {article.isPremium ? <FaCrown /> : <FaStar />}
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

export default ManageArticles;
