import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../component/SectionTitle/SectionTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Placeholder } from "react-select/animated";

const Profile = () => {
    const { user, updateUserProfile } = useAuth();
    const axiosPublic = useAxiosPublic();
    const queryClient = useQueryClient();
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        photo: "",
        phone: "",
        address: "",
    });

    const { data: userData, isLoading, isError } = useQuery({
        queryKey: ["userProfile", user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    useEffect(() => {
        if (userData) {
            setFormData({
                name: userData.name || "",
                email: userData.email || "",
                photo: userData.photo || "",
                phone: userData.phone || "",
                address: userData.address || "",
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
            await updateUserProfile(formData.name, formData.photo);

            const response = await axiosPublic.patch(`/users/${user?.email}`, formData);

            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Profile Updated",
                    text: "Your profile has been updated successfully!",
                });
                setEditMode(false);
                queryClient.invalidateQueries(["userProfile", user?.email]);
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

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading profile data. Please try again.</div>;

    return (
        <section>
            <Helmet><title>Insightly | Profile</title></Helmet>
            <div className="p-6 min-h-screen">
                <div className="bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 border-blue-500 shadow-lg rounded-lg p-6">
                    <SectionTitle heading="User Profile" subHeading="View and edit your profile information." />
                    <div className="flex flex-col items-center">
                        <img
                            src={formData.photo || "https://via.placeholder.com/150"}
                            alt="User Avatar"
                            className="w-32 h-32 rounded-full mb-4 border border-gray-300"
                        />
                        {!editMode ? (
                            <>
                                <h2 className="text-lg font-semibold">{formData.name}</h2>
                                <p className="text-gray-600">{formData.email}</p>
                                <p className="text-gray-600">Phone: {formData.phone || "Not Provided"}</p>
                                <p className="text-gray-600">Address: {formData.address || "Not Provided"}</p>
                                <button
                                    onClick={() => setEditMode(true)}
                                    className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
                                >
                                    Edit Profile
                                </button>
                            </>
                        ) : (
                            <form onSubmit={handleSubmit} className="w-full mt-4">
                                {[
                                    { label: "Name", name: "name", type: "text", placeholder: "Enter your name" },
                                    { label: "Email", name: "email", type: "email", placeholder: "Your email address", disabled: true },
                                    { label: "Photo URL", name: "photo", type: "text", placeholder: "Enter photo URL" },
                                    { label: "Phone Number", name: "phone", type: "text", placeholder: "Enter phone number" },
                                    { label: "Address", name: "address", type: "text", placeholder: "Enter your address" },
                                ].map(({ label, name, type, disabled, placeholder }) => (
                                    <div className="mb-4" key={name}>
                                        <label className="block text-sm font-medium text-gray-700">{label}</label>
                                        <input
                                            type={type}
                                            name={name}
                                            value={formData[name]}
                                            onChange={handleInputChange}
                                            placeholder={placeholder}
                                            disabled={disabled}
                                            className={`w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300 ${disabled ? "bg-gray-200 cursor-not-allowed" : ""
                                                }`}
                                        />
                                    </div>
                                ))}
                                <div className="flex justify-between">
                                    <button type="submit" className="btn btn-primary">
                                        Save Changes
                                    </button>
                                    <button type="button" onClick={() => setEditMode(false)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
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
