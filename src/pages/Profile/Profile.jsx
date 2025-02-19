import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../component/SectionTitle/SectionTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Profile = () => {
    const { user, updateUserProfile } = useAuth();
    const axiosPublic = useAxiosPublic();
    const queryClient = useQueryClient();
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        photo: "",
    });

    // Fetch user data with useQuery using queryKey and queryFn
    const { data: userData, isLoading, isError } = useQuery({
        queryKey: ["userProfile", user?.email],  // Same queryKey
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user?.email}`); // Same queryFn
            return res.data;
        },
        enabled: !!user?.email,  // Only run query if user email exists
    });


    useEffect(() => {
        if (userData) {
            setFormData({
                name: userData.name || "",
                email: userData.email || "",
                photo: userData.photo || "",
            });
        }
    }, [userData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Update the Firebase profile
            await updateUserProfile(formData.name, formData.photo);

            // Update data in the backend
            const response = await axiosPublic.patch(`/users/${user?.email}`, {
                name: formData.name,
                photo: formData.photo,
            });

            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Profile Updated",
                    text: "Your profile has been updated successfully!",
                });
                setEditMode(false);
                queryClient.invalidateQueries(["userProfile", user?.email]); // Invalidate and refetch the query
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Update Failed",
                    text: "Failed to update profile in the database. Please try again.",
                });
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to update profile. Please try again.",
            });
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading profile data. Please try again.</div>;
    }

    return (
        <section>
            <Helmet><title>Insightly | Profile</title></Helmet>
            <div className="p-6 min-h-screen">
                <div className="max-w-2xl mx-auto bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 border-blue-500 transform shadow-lg rounded-lg p-6">
                    <SectionTitle heading="User Profile" subHeading="Here you can edit your information"></SectionTitle>
                    <div className="flex flex-col items-center">
                        <img
                            src={formData.photo || "https://via.placeholder.com/150"}
                            alt="User Avatar"
                            className="w-32 h-32 rounded-full mb-4"
                        />
                        {!editMode ? (
                            <>
                                <h2 className="text-lg font-semibold">{formData.name}</h2>
                                <p className="text-gray-600">{formData.email}</p>
                                <button
                                    onClick={() => setEditMode(true)}
                                    className="mt-4 btn btn-primary"
                                >
                                    Edit Profile
                                </button>
                            </>
                        ) : (
                            <form onSubmit={handleSubmit} className="w-full mt-4">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled
                                        className="w-full mt-1 p-2 border rounded bg-gray-200 cursor-not-allowed"
                                    />
                                    <p className="text-sm text-gray-500">
                                        Email cannot be changed.
                                    </p>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Photo URL
                                    </label>
                                    <input
                                        type="text"
                                        name="photo"
                                        value={formData.photo}
                                        onChange={handleInputChange}
                                        className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEditMode(false)}
                                        className="btn btn-error"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
