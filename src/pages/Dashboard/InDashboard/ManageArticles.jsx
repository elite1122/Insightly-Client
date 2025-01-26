
import { useQuery } from "@tanstack/react-query";
import { FaCheck, FaTimes, FaStar, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../component/SectionTitle/SectionTitle";

const ManageArticles = () => {
    const axiosSecure = useAxiosSecure();
    const { data: articles = [], refetch, isLoading } = useQuery({
        queryKey: ["articles"],
        queryFn: async () => {
            const res = await axiosSecure.get("/articles");
            return res.data;
        }
    });

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

    const handleMakePremium = async (id) => {
        await axiosSecure.patch(`/articles/premium/${id}`);
        Swal.fire("Success", "Article marked as premium!", "success");
        refetch();
    };

    return (
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
                                <td className="px-4 py-2">{article.isApproved ? "Approved" : "Pending"}</td>
                                <td className="px-4 py-2">
                                    <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 gap-2 lg:justify-center">
                                        <button onClick={() => handleApprove(article._id)} className="btn btn-success"><FaCheck /></button>
                                        <button onClick={() => handleDecline(article._id)} className="btn btn-warning"><FaTimes /></button>
                                        <button onClick={() => handleDelete(article._id)} className="btn btn-danger text-red-600"><FaTrashAlt /></button>
                                        <button onClick={() => handleMakePremium(article._id)} className="btn btn-primary"><FaStar /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageArticles;
