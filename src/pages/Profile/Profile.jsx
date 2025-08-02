import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../component/SectionTitle/SectionTitle";
import LoadingSpinner from "../../component/LoadingSpinner/LoadingSpinner";
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
                    title: "Profile Updated Successfully!",
                    text: "Your profile information has been saved and updated.",
                    customClass: {
                        popup: 'newspaper-alert',
                        title: 'newspaper-title',
                        content: 'newspaper-content'
                    }
                });
                setEditMode(false);
                queryClient.invalidateQueries(["userProfile", user?.email]);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Update Failed",
                    text: "Unable to save your profile changes. Please try again.",
                    customClass: {
                        popup: 'newspaper-alert',
                        title: 'newspaper-title',
                        content: 'newspaper-content'
                    }
                });
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: "Failed to update profile. Please try again.",
                customClass: {
                    popup: 'newspaper-alert',
                    title: 'newspaper-title',
                    content: 'newspaper-content'
                }
            });
        }
    };

    if (isLoading) {
        return (
            <section className="bg-white min-h-screen">
                <Helmet><title>Insightly | User Profile</title></Helmet>
                <LoadingSpinner 
                    size="large" 
                    text="Loading Profile Data..." 
                    variant="newspaper"
                    fullScreen={false}
                />
            </section>
        );
    }
    
    if (isError) {
        return (
            <section className="bg-white min-h-screen">
                <Helmet><title>Insightly | User Profile</title></Helmet>
                <div className="flex justify-center items-center min-h-screen">
                    <div className="bg-white border-4 border-red-600 p-12 text-center newspaper-card shadow-xl">
                        <div className="text-6xl mb-6">⚠️</div>
                        <h2 className="newspaper-headline text-2xl text-red-600 mb-4 uppercase tracking-wider font-black">
                            Profile Load Error
                        </h2>
                        <p className="newspaper-body text-gray-600 mb-6">
                            Unable to load your profile information. Please refresh the page and try again.
                        </p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 uppercase tracking-wider font-bold border-2 border-gray-900 transition-all hover:scale-105"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-white min-h-screen">
            <Helmet><title>Insightly | User Profile</title></Helmet>
            
            {/* Newspaper Header */}
            <div className="bg-white border-b-4 border-gray-900 py-4 sm:py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center">
                        <h1 className="newspaper-headline text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-2">
                            USER PROFILE
                        </h1>
                        <div className="flex items-center justify-center">
                            <div className="flex-1 border-t border-gray-400 max-w-16 sm:max-w-32"></div>
                            <p className="newspaper-meta text-gray-600 mx-2 sm:mx-4 uppercase tracking-widest text-xs sm:text-sm">
                                Manage Your Account
                            </p>
                            <div className="flex-1 border-t border-gray-400 max-w-16 sm:max-w-32"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
                <div className="bg-white border-4 sm:border-8 border-gray-900 newspaper-card shadow-2xl relative">
                    <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 bg-blue-600 text-white px-2 sm:px-4 py-1 sm:py-2 text-xs font-black uppercase tracking-wider transform -rotate-3">
                        PROFILE SETTINGS
                    </div>
                    
                    <div className="p-6 sm:p-8 lg:p-12">
                        <div className="text-center mb-8 sm:mb-12">
                            <div className="relative inline-block">
                                <img
                                    src={formData.photo || "https://via.placeholder.com/150"}
                                    alt="User Avatar"
                                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 sm:border-4 border-gray-900 shadow-lg mx-auto"
                                />
                                <div className="absolute -bottom-1 sm:-bottom-2 -right-1 sm:-right-2 bg-green-600 text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center">
                                    <span className="text-xs font-bold">✓</span>
                                </div>
                            </div>
                            
                            {!editMode && (
                                <div className="mt-4 sm:mt-6">
                                    <h2 className="newspaper-headline text-xl sm:text-2xl lg:text-3xl text-gray-900 mb-2 uppercase tracking-wider font-black">
                                        {formData.name}
                                    </h2>
                                    <p className="newspaper-meta text-gray-600 uppercase tracking-widest text-xs sm:text-sm mb-4 sm:mb-6">
                                        Account Holder
                                    </p>
                                </div>
                            )}
                        </div>

                        {!editMode ? (
                            <div className="space-y-6 sm:space-y-8">
                                {/* Profile Information Cards */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="bg-gray-50 border-2 border-gray-300 p-4 sm:p-6">
                                        <h3 className="newspaper-meta font-black uppercase tracking-wider text-gray-900 mb-2 sm:mb-3 text-xs sm:text-sm">
                                            📧 Email Address
                                        </h3>
                                        <p className="newspaper-body text-gray-700 font-medium text-sm sm:text-base break-all">{formData.email}</p>
                                    </div>
                                    
                                    <div className="bg-gray-50 border-2 border-gray-300 p-4 sm:p-6">
                                        <h3 className="newspaper-meta font-black uppercase tracking-wider text-gray-900 mb-2 sm:mb-3 text-xs sm:text-sm">
                                            📱 Phone Number
                                        </h3>
                                        <p className="newspaper-body text-gray-700 font-medium text-sm sm:text-base">
                                            {formData.phone || "Not Provided"}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 border-2 border-gray-300 p-4 sm:p-6">
                                    <h3 className="newspaper-meta font-black uppercase tracking-wider text-gray-900 mb-2 sm:mb-3 text-xs sm:text-sm">
                                        🏠 Address
                                    </h3>
                                    <p className="newspaper-body text-gray-700 font-medium text-sm sm:text-base">
                                        {formData.address || "Not Provided"}
                                    </p>
                                </div>

                                {/* Account Status */}
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 p-4 sm:p-6">
                                    <h3 className="newspaper-meta font-black uppercase tracking-wider text-blue-900 mb-2 sm:mb-3 text-xs sm:text-sm">
                                        👤 Account Status
                                    </h3>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                                        <span className="bg-green-100 border-2 border-green-600 text-green-800 px-2 sm:px-3 py-1 uppercase text-xs font-black tracking-wider">
                                            ✓ Verified Account
                                        </span>
                                        <span className="bg-blue-100 border-2 border-blue-600 text-blue-800 px-2 sm:px-3 py-1 uppercase text-xs font-black tracking-wider">
                                            📰 Active Reader
                                        </span>
                                    </div>
                                </div>

                                <div className="text-center pt-6 sm:pt-8">
                                    <button
                                        onClick={() => setEditMode(true)}
                                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 px-6 sm:px-8 uppercase tracking-widest font-black text-base sm:text-lg lg:text-xl border-2 sm:border-4 border-gray-900 transition-all duration-300 hover:scale-105 shadow-lg"
                                    >
                                        Edit Profile Information
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6 sm:space-y-8">
                                <div className="text-center mb-6 sm:mb-8">
                                    <h2 className="newspaper-headline text-xl sm:text-2xl text-gray-900 mb-3 sm:mb-4 uppercase tracking-wider font-black border-b-2 sm:border-b-4 border-gray-900 pb-3 sm:pb-4">
                                        Edit Profile
                                    </h2>
                                    <p className="newspaper-meta text-gray-600 uppercase tracking-widest text-xs sm:text-sm">
                                        Update Your Information
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                                    {[
                                        { label: "Full Name", name: "name", type: "text", placeholder: "Enter your full name", icon: "👤" },
                                        { label: "Email Address", name: "email", type: "email", placeholder: "Your email address", disabled: true, icon: "📧" },
                                        { label: "Profile Photo URL", name: "photo", type: "text", placeholder: "Enter photo URL", icon: "📷" },
                                        { label: "Phone Number", name: "phone", type: "text", placeholder: "Enter phone number", icon: "📱" },
                                        { label: "Home Address", name: "address", type: "text", placeholder: "Enter your address", icon: "🏠" },
                                    ].map(({ label, name, type, disabled, placeholder, icon }) => (
                                        <div className="space-y-2" key={name}>
                                            <label className="newspaper-meta text-xs sm:text-sm font-black uppercase tracking-wider text-gray-700 flex items-center">
                                                <span className="mr-2">{icon}</span>
                                                {label}
                                            </label>
                                            <input
                                                type={type}
                                                name={name}
                                                value={formData[name]}
                                                onChange={handleInputChange}
                                                placeholder={placeholder}
                                                disabled={disabled}
                                                className={`w-full p-3 sm:p-4 border-2 sm:border-4 border-gray-300 focus:border-blue-600 focus:outline-none newspaper-body text-gray-900 transition-all text-sm sm:text-base ${
                                                    disabled ? "bg-gray-200 cursor-not-allowed border-gray-400" : "bg-white"
                                                }`}
                                            />
                                        </div>
                                    ))}
                                    
                                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 sm:pt-8">
                                        <button 
                                            type="submit" 
                                            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 sm:py-4 px-4 sm:px-6 uppercase tracking-widest font-black text-sm sm:text-base lg:text-lg border-2 sm:border-4 border-gray-900 transition-all duration-300 hover:scale-105"
                                        >
                                            💾 Save Changes
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={() => setEditMode(false)} 
                                            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 sm:py-4 px-4 sm:px-6 uppercase tracking-widest font-black text-sm sm:text-base lg:text-lg border-2 sm:border-4 border-gray-900 transition-all duration-300 hover:scale-105"
                                        >
                                            ✖️ Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>

                {/* Additional Profile Actions */}
                {!editMode && (
                    <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        <div className="bg-white border-2 sm:border-4 border-gray-900 p-4 sm:p-6 text-center newspaper-card shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">📝</div>
                            <h3 className="newspaper-headline text-lg sm:text-xl font-black uppercase tracking-wider mb-2">My Articles</h3>
                            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">View and manage your published articles</p>
                            <button 
                                onClick={() => window.location.href = '/myArticles'}
                                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 sm:px-4 text-xs sm:text-sm font-bold uppercase tracking-wider border-2 border-gray-900 transition-all hover:scale-105"
                            >
                                View Articles
                            </button>
                        </div>
                        
                        <div className="bg-white border-2 sm:border-4 border-gray-900 p-4 sm:p-6 text-center newspaper-card shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">⭐</div>
                            <h3 className="newspaper-headline text-lg sm:text-xl font-black uppercase tracking-wider mb-2">Premium Status</h3>
                            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Upgrade to premium membership</p>
                            <button 
                                onClick={() => window.location.href = '/subscription'}
                                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white py-2 px-3 sm:px-4 text-xs sm:text-sm font-bold uppercase tracking-wider border-2 border-gray-900 transition-all hover:scale-105"
                            >
                                View Plans
                            </button>
                        </div>
                        
                        <div className="bg-white border-2 sm:border-4 border-gray-900 p-4 sm:p-6 text-center newspaper-card shadow-lg hover:shadow-xl transition-shadow sm:col-span-2 lg:col-span-1">
                            <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">📊</div>
                            <h3 className="newspaper-headline text-lg sm:text-xl font-black uppercase tracking-wider mb-2">Account Stats</h3>
                            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">View your reading statistics</p>
                            <button 
                                className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-3 sm:px-4 text-xs sm:text-sm font-bold uppercase tracking-wider border-2 border-gray-900 transition-all hover:scale-105"
                            >
                                View Stats
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Profile;
