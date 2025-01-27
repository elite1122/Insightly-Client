import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../component/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import ReactPaginate from "react-paginate";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    const [currentPage, setCurrentPage] = useState(0);
    const usersPerPage = 5;

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const offset = currentPage * usersPerPage;
    const currentUsers = users.slice(offset, offset + usersPerPage);
    const pageCount = Math.ceil(users.length / usersPerPage);

    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an Admin Now!`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    };

    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: `${user.name} has been removed.`,
                            icon: "success",
                        });
                    }
                });
            }
        });
    };

    return (
        <section>
            <Helmet>
                <title>Insightly | All Users</title>
            </Helmet>
            <div className="min-h-screen">
                <div className="mb-3">
                    <SectionTitle heading="All Users"></SectionTitle>
                    {isLoading && (
                        <div className="flex justify-center items-center">
                            <span className="loading loading-bars loading-lg"></span>
                        </div>
                    )}
                    <h2 className="text-xl">Total Users: {users.length}</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="table-auto table-striped w-full text-center">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">#</th>
                                <th className="px-4 py-2">Photo</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Role</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user, index) => (
                                <tr key={user._id}>
                                    <th className="px-4 py-2">{offset + index + 1}</th>
                                    <td className="px-4 py-2">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user.photo}
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">{user.name}</td>
                                    <td className="px-4 py-2">{user.email}</td>
                                    <td className="px-4 py-2">
                                        {user.role === "admin" ? (
                                            "Admin"
                                        ) : (
                                            <button
                                                onClick={() => handleMakeAdmin(user)}
                                                className="btn btn-lg bg-opacity-0 border-none shadow-none"
                                            >
                                                <FaUser />
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleDeleteUser(user)}
                                            className="btn btn-ghost btn-lg"
                                        >
                                            <FaTrashAlt className="text-red-600" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center mt-4">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="Next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="< Prev"
                        renderOnZeroPageCount={null}
                        containerClassName="pagination"
                        activeClassName="bg-blue-500 text-white px-3 py-1 rounded"
                        pageClassName="px-2 py-1 mx-1 rounded border"
                        previousClassName="px-3 py-1 mx-1 border rounded"
                        nextClassName="px-3 py-1 mx-1 border rounded"
                    />
                </div>
            </div>
        </section>
    );
};

export default AllUsers;
