import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../component/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../component/LoadingSpinner/LoadingSpinner";

const AddPublisher = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const {loading} = useAuth();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("image", data.publisherLogo[0]);

            // Upload image to imgbb
            const response = await axiosPublic.post(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, formData);
            const imageUrl = response.data.data.url;

            // Prepare publisher data
            const publisherData = {
                name: data.publisherName,
                logo: imageUrl,
            };

            // Send data to backend
            const res = await axiosSecure.post("/publishers", publisherData);

            if (res.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Publisher Added Successfully!",
                    text: "The new publisher has been added to the system.",
                    background: '#ffffff',
                    color: '#1f2937',
                    confirmButtonColor: '#16a34a',
                    confirmButtonText: 'Continue',
                    customClass: {
                        popup: 'border-4 border-gray-900 shadow-2xl',
                        title: 'text-xl font-black uppercase tracking-wider text-gray-900',
                        content: 'text-gray-700',
                        confirmButton: 'font-black uppercase tracking-wider px-6 py-3 border-2 border-gray-900'
                    }
                });
                reset();
            }
        } catch (error) {
            console.error("Error uploading image or submitting form", error);
            Swal.fire({
                icon: "error",
                title: "Error Adding Publisher!",
                text: "Please check your inputs and try again.",
                background: '#ffffff',
                color: '#1f2937',
                confirmButtonColor: '#dc2626',
                confirmButtonText: 'Try Again',
                customClass: {
                    popup: 'border-4 border-gray-900 shadow-2xl',
                    title: 'text-xl font-black uppercase tracking-wider text-gray-900',
                    content: 'text-gray-700',
                    confirmButton: 'font-black uppercase tracking-wider px-6 py-3 border-2 border-gray-900'
                }
            });
        }
    };

    const handleFormSubmit = async (data) => {
        await onSubmit(data);
    };

    return (
        <section className="bg-gray-50 min-h-screen">
            <Helmet><title>Insightly | Add Publisher</title></Helmet>
            
            {/* Newspaper Header */}
            <div className="bg-white border-b-4 border-gray-900 py-4 sm:py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center">
                        <h1 className="newspaper-headline text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-900 mb-2 uppercase tracking-wider font-black">
                            ADD NEW PUBLISHER
                        </h1>
                        <div className="flex items-center justify-center">
                            <div className="flex-1 border-t border-gray-400 max-w-16 sm:max-w-32"></div>
                            <p className="newspaper-meta text-gray-600 mx-2 sm:mx-4 uppercase tracking-widest text-xs sm:text-sm">
                                PUBLISHER MANAGEMENT SYSTEM
                            </p>
                            <div className="flex-1 border-t border-gray-400 max-w-16 sm:max-w-32"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
                {loading ? (
                    <LoadingSpinner 
                        size="large" 
                        text="Setting up publisher form..." 
                        variant="newspaper"
                        fullScreen={true}
                    />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                        {/* Form Section */}
                        <div className="lg:col-span-2">
                            <div className="bg-white border-4 border-gray-900 p-6 sm:p-8 lg:p-10 shadow-2xl relative">
                                <div className="absolute -top-2 sm:-top-3 -left-2 sm:-left-3 bg-blue-600 text-white px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-black uppercase tracking-wider transform -rotate-3">
                                    NEW PUBLISHER
                                </div>
                                
                                <div className="border-b-4 border-gray-900 pb-4 sm:pb-6 mb-6 sm:mb-8">
                                    <h2 className="newspaper-headline text-lg sm:text-xl lg:text-2xl text-gray-900 uppercase tracking-wider font-black">
                                        Publisher Information
                                    </h2>
                                    <p className="newspaper-meta text-gray-600 text-xs sm:text-sm uppercase tracking-widest mt-2">
                                        Complete the form below to add a new publisher
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 sm:space-y-8">
                                    {/* Publisher Name Field */}
                                    <div className="space-y-2 sm:space-y-3">
                                        <label className="block newspaper-meta text-sm sm:text-base font-black uppercase tracking-wider text-gray-900">
                                            Publisher Name <span className="text-red-600">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                {...register("publisherName", { required: "Publisher name is required" })}
                                                className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-900 bg-white text-gray-900 placeholder-gray-500 text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-600 transition-all duration-300"
                                                placeholder="Enter publisher name (e.g., CNN, BBC, Reuters)"
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center">
                                                <span className="text-gray-400 text-lg sm:text-xl">📰</span>
                                            </div>
                                        </div>
                                        {errors.publisherName && (
                                            <div className="bg-red-50 border-l-4 border-red-600 p-2 sm:p-3">
                                                <p className="text-red-700 text-xs sm:text-sm font-semibold">
                                                    ⚠️ {errors.publisherName.message}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Publisher Logo Field */}
                                    <div className="space-y-2 sm:space-y-3">
                                        <label className="block newspaper-meta text-sm sm:text-base font-black uppercase tracking-wider text-gray-900">
                                            Publisher Logo <span className="text-red-600">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                {...register("publisherLogo", { required: "Publisher logo is required" })}
                                                className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-900 bg-white text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-600 transition-all duration-300 file:mr-3 sm:file:mr-4 file:py-2 file:px-3 sm:file:px-4 file:border-0 file:bg-gray-900 file:text-white file:text-xs sm:file:text-sm file:font-black file:uppercase file:tracking-wider"
                                                accept="image/*"
                                            />
                                        </div>
                                        {errors.publisherLogo && (
                                            <div className="bg-red-50 border-l-4 border-red-600 p-2 sm:p-3">
                                                <p className="text-red-700 text-xs sm:text-sm font-semibold">
                                                    ⚠️ {errors.publisherLogo.message}
                                                </p>
                                            </div>
                                        )}
                                        <div className="bg-blue-50 border-l-4 border-blue-600 p-2 sm:p-3">
                                            <p className="text-blue-700 text-xs sm:text-sm">
                                                💡 <strong>Tip:</strong> Upload a high-quality logo (PNG/JPG) for best results. Recommended size: 200x200 pixels.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-4 sm:pt-6 border-t-2 border-gray-300">
                                        <button
                                            type="submit"
                                            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 sm:py-4 px-6 sm:px-8 text-sm sm:text-base lg:text-lg font-black uppercase tracking-widest border-2 sm:border-4 border-gray-900 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden group"
                                        >
                                            <span className="relative z-10">✨ ADD PUBLISHER</span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Info Sidebar */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Guidelines Card */}
                            <div className="bg-white border-4 border-gray-900 p-4 sm:p-6 shadow-xl relative">
                                <div className="absolute -top-2 -right-2 bg-yellow-600 text-white px-2 py-1 text-xs font-black uppercase tracking-wider transform rotate-3">
                                    GUIDELINES
                                </div>
                                
                                <h3 className="newspaper-headline text-base sm:text-lg font-black uppercase tracking-wider text-gray-900 mb-3 sm:mb-4 border-b-2 border-gray-900 pb-2">
                                    Publisher Guidelines
                                </h3>
                                
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex items-start space-x-2 sm:space-x-3">
                                        <span className="text-green-600 text-sm sm:text-base mt-1">✓</span>
                                        <p className="text-xs sm:text-sm text-gray-700">Use official publisher names (e.g., "The New York Times")</p>
                                    </div>
                                    <div className="flex items-start space-x-2 sm:space-x-3">
                                        <span className="text-green-600 text-sm sm:text-base mt-1">✓</span>
                                        <p className="text-xs sm:text-sm text-gray-700">Upload high-resolution logos (minimum 200x200px)</p>
                                    </div>
                                    <div className="flex items-start space-x-2 sm:space-x-3">
                                        <span className="text-green-600 text-sm sm:text-base mt-1">✓</span>
                                        <p className="text-xs sm:text-sm text-gray-700">Ensure logo has transparent background if possible</p>
                                    </div>
                                    <div className="flex items-start space-x-2 sm:space-x-3">
                                        <span className="text-green-600 text-sm sm:text-base mt-1">✓</span>
                                        <p className="text-xs sm:text-sm text-gray-700">Verify publisher legitimacy before adding</p>
                                    </div>
                                </div>
                            </div>

                            {/* Statistics Card */}
                            <div className="bg-white border-4 border-gray-900 p-4 sm:p-6 shadow-xl relative">
                                <div className="absolute -top-2 -right-2 bg-blue-600 text-white px-2 py-1 text-xs font-black uppercase tracking-wider transform rotate-3">
                                    STATS
                                </div>
                                
                                <h3 className="newspaper-headline text-base sm:text-lg font-black uppercase tracking-wider text-gray-900 mb-3 sm:mb-4 border-b-2 border-gray-900 pb-2">
                                    Publisher Statistics
                                </h3>
                                
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                        <span className="text-xs sm:text-sm text-gray-600 font-semibold">Total Publishers:</span>
                                        <span className="text-sm sm:text-base font-black text-gray-900">--</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                        <span className="text-xs sm:text-sm text-gray-600 font-semibold">Active Today:</span>
                                        <span className="text-sm sm:text-base font-black text-green-600">--</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-xs sm:text-sm text-gray-600 font-semibold">This Month:</span>
                                        <span className="text-sm sm:text-base font-black text-blue-600">--</span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions Card */}
                            <div className="bg-white border-4 border-gray-900 p-4 sm:p-6 shadow-xl relative">
                                <div className="absolute -top-2 -right-2 bg-green-600 text-white px-2 py-1 text-xs font-black uppercase tracking-wider transform rotate-3">
                                    ACTIONS
                                </div>
                                
                                <h3 className="newspaper-headline text-base sm:text-lg font-black uppercase tracking-wider text-gray-900 mb-3 sm:mb-4 border-b-2 border-gray-900 pb-2">
                                    Quick Actions
                                </h3>
                                
                                <div className="space-y-2 sm:space-y-3">
                                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-black uppercase tracking-wider border-2 border-gray-900 transition-all duration-300 hover:scale-105">
                                        📊 View All Publishers
                                    </button>
                                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-black uppercase tracking-wider border-2 border-gray-900 transition-all duration-300 hover:scale-105">
                                        📝 Manage Articles
                                    </button>
                                    <button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-black uppercase tracking-wider border-2 border-gray-900 transition-all duration-300 hover:scale-105">
                                        🏠 Dashboard Home
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AddPublisher;
