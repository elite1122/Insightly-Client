import { useForm } from "react-hook-form";
import { useState } from "react";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";
// import Lottie from "lottie-react";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../../component/LoadingSpinner/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const AddArticle = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset } = useForm();
    const [selectedTags, setSelectedTags] = useState([]);
    const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const axiosPublic = useAxiosPublic();

    const tagOptions = [
        { value: "AI", label: "AI" },
        { value: "Healthcare", label: "Healthcare" },
        { value: "Technology", label: "Technology" },
        { value: "Blockchain", label: "Blockchain" },
        { value: "Finance", label: "Finance" },
        { value: "Crypto", label: "Crypto" },
        { value: "Energy", label: "Energy" },
        { value: "Sustainability", label: "Sustainability" },
        { value: "Environment", label: "Environment" },
        { value: "Travel", label: "Travel" },
        { value: "Adventure", label: "Adventure" },
        { value: "Tourism", label: "Tourism" },
        { value: "Cybersecurity", label: "Cybersecurity" },
        { value: "Privacy", label: "Privacy" },
        { value: "Innovation", label: "Innovation" },
        { value: "Renewables", label: "Renewables" },
        { value: "Climate Change", label: "Climate Change" },
        { value: "Policy", label: "Policy" },
        { value: "Smart Cities", label: "Smart Cities" },
        { value: "Investment", label: "Investment" },
        { value: "Economy", label: "Economy" },
        { value: "Electric Vehicles", label: "Electric Vehicles" },
        { value: "Automation", label: "Automation" },
    ];

    // Fetch publishers using TanStack Query
    const { data: publishers = [], isLoading, error } = useQuery({
        queryKey: ["publishers"],
        queryFn: async () => {
            const res = await axiosPublic.get("/publishers");
            return res.data;
        },
    });

    // Fetch user data using TanStack Query
    const { data: fetchedUser, isLoading: userLoading, error: userError } = useQuery({
        queryKey: ["user", user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email, // Ensure the query is triggered only if the user email is available
    });

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("image", data.image[0]);

        try {
            if (userLoading || userError) {
                throw new Error("Error fetching user data.");
            }

            // Check if user is normal and has already submitted an article
            // const userArticles = await axiosPublic.get(`/articles?authorEmail=${user.email}`);
            // if (fetchedUser?.role !== "premium" && userArticles.data.length >= 1) {
            //     Swal.fire(
            //         "Limit Reached!",
            //         "As a normal user, you can only publish one article. Upgrade to premium for unlimited articles.",
            //         "warning"
            //     );
            //     return;
            // }

            const imgRes = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, formData);
            if (imgRes.data.success) {
                const newArticle = {
                    title: data.title,
                    image: imgRes.data.data.url,
                    publisher: data.publisher,
                    description: data.description,
                    tags: selectedTags.map((tag) => tag.value),
                    isPremium: false,
                    isApproved: false,
                    authorName: user.displayName,
                    authorEmail: user.email,
                    authorPhoto: user.photoURL,
                    postDate: new Date(),
                    views: 0,
                };

                await axiosPublic.post("/articles", newArticle);
                Swal.fire("Success!", "Article submitted for approval.", "success");
                reset();
                setSelectedTags([]);
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error!", error.message, "error");
        }
    };

    if (!user) {
        return <p>Please log in to add an article.</p>;
    }

    // Show loading if user data is being fetched
    if (userLoading) {
        return (
            <section className="bg-white min-h-screen">
                <Helmet>
                    <title>Insightly | Add Article</title>
                </Helmet>
                <LoadingSpinner 
                    size="large" 
                    text="Preparing Newsroom..." 
                    variant="newspaper"
                    fullScreen={false}
                />
            </section>
        );
    }

    return (
        <section className="bg-white min-h-screen">
            <Helmet>
                <title>Insightly | Add Article</title>
            </Helmet>
            
            {/* Newspaper Header */}
            <div className="bg-white border-b-4 border-gray-900 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="newspaper-headline text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4 uppercase tracking-wider font-black">
                            NEWSROOM SUBMISSION
                        </div>
                        <div className="newspaper-meta text-gray-600 uppercase tracking-widest text-sm mb-4">
                            CONTRIBUTE TO OUR EDITORIAL EXCELLENCE
                        </div>
                        <div className="border-t border-b border-gray-400 py-2">
                            <p className="text-xs text-gray-500 uppercase tracking-wider">
                                Submit your story for editorial review
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column - Animation and Info */}
                    <div className="space-y-8">
                        <div className="bg-white border-4 border-gray-900 p-8 newspaper-card">
                            <div className="text-center mb-6">
                                <div className="newspaper-headline text-2xl text-gray-900 mb-4 uppercase tracking-wider font-black">
                                    EDITORIAL GUIDELINES
                                </div>
                                <div className="w-32 h-32 mx-auto mb-6 border-2 border-gray-200 rounded-lg bg-gray-50 flex items-center justify-center relative overflow-hidden">
                                    {/* CSS Animation - Writing/Pen */}
                                    <div className="relative">
                                        <div className="w-8 h-12 bg-blue-500 rounded-full animate-write transform rotate-12 relative shadow-lg">
                                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-gray-800 rounded-full"></div>
                                            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded-full"></div>
                                        </div>
                                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-blue-300 animate-pulse animation-delay-500 rounded"></div>
                                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-400 animate-pulse animation-delay-1000 rounded"></div>
                                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-200 animate-pulse animation-delay-300 rounded"></div>
                                    </div>
                                </div>
                                <div className="newspaper-body text-gray-800 leading-relaxed space-y-4">
                                    <div className="border-l-4 border-red-600 pl-4">
                                        <h4 className="font-bold text-sm uppercase tracking-wider text-red-600 mb-2">Quality Standards</h4>
                                        <p className="text-sm">All submissions undergo rigorous editorial review to maintain our publication standards.</p>
                                    </div>
                                    <div className="border-l-4 border-blue-600 pl-4">
                                        <h4 className="font-bold text-sm uppercase tracking-wider text-blue-600 mb-2">Accuracy First</h4>
                                        <p className="text-sm">We prioritize factual accuracy and journalistic integrity in all published content.</p>
                                    </div>
                                    <div className="border-l-4 border-yellow-600 pl-4">
                                        <h4 className="font-bold text-sm uppercase tracking-wider text-yellow-600 mb-2">Timely Review</h4>
                                        <p className="text-sm">Our editorial team reviews submissions within 24-48 hours for publication consideration.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gray-50 border-2 border-gray-300 p-6">
                            <div className="w-24 h-24 mx-auto mb-4 border border-gray-300 rounded bg-white flex items-center justify-center relative overflow-hidden">
                                {/* CSS Animation - Paper Stack */}
                                <div className="relative">
                                    <div className="w-12 h-16 bg-gray-100 border border-gray-300 rounded shadow-sm absolute transform translate-y-2 animate-paper-float animation-delay-300"></div>
                                    <div className="w-12 h-16 bg-white border border-gray-400 rounded shadow-md animate-paper-float">
                                        {/* Paper lines */}
                                        <div className="mt-2 space-y-1 px-2">
                                            <div className="w-8 h-0.5 bg-gray-300 rounded"></div>
                                            <div className="w-6 h-0.5 bg-gray-300 rounded"></div>
                                            <div className="w-7 h-0.5 bg-gray-300 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="newspaper-meta text-xs uppercase tracking-widest text-gray-600 mb-2">
                                    PUBLICATION PROCESS
                                </div>
                                <div className="text-sm text-gray-700">
                                    Submit → Review → Edit → Publish
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="bg-white border-4 border-gray-900 shadow-2xl newspaper-card">
                        <div className="bg-gray-900 text-white p-6 text-center">
                            <div className="newspaper-headline text-2xl uppercase tracking-wider font-black">
                                ARTICLE SUBMISSION
                            </div>
                            <div className="newspaper-meta text-gray-300 text-sm mt-2 uppercase tracking-widest">
                                Complete all fields below
                            </div>
                        </div>
                        
                        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                            <div className="form-control">
                                <label className="newspaper-meta text-sm font-bold uppercase tracking-wider text-gray-700 mb-2 block">
                                    Article Title
                                </label>
                                <input 
                                    {...register("title", { required: true })}
                                    className="w-full border-2 border-gray-300 p-3 focus:border-gray-900 focus:outline-none newspaper-body bg-white text-gray-900"
                                    placeholder="Type article title" 
                                />
                            </div>
                            
                            <div className="form-control">
                                <label className="newspaper-meta text-sm font-bold uppercase tracking-wider text-gray-700 mb-2 block">
                                    Featured Image
                                </label>
                                <input 
                                    type="file" 
                                    {...register("image", { required: true })} 
                                    className="w-full border-2 border-gray-300 p-3 focus:border-gray-900 focus:outline-none bg-white text-gray-900 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-gray-900 file:text-white file:cursor-pointer hover:file:bg-gray-800" 
                                />
                            </div>
                            
                            <div className="form-control">
                                <label className="newspaper-meta text-sm font-bold uppercase tracking-wider text-gray-700 mb-2 block">
                                    Publisher
                                </label>
                                {isLoading ? (
                                    <div className="flex items-center space-x-2 p-3 border-2 border-gray-300 rounded bg-gray-50">
                                        <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                                        <span className="text-gray-600 text-sm">Loading publishers...</span>
                                    </div>
                                ) : error ? (
                                    <p className="text-red-600">Failed to load publishers.</p>
                                ) : (
                                    <select 
                                        {...register("publisher", { required: true })} 
                                        className="w-full border-2 border-gray-300 p-3 focus:border-gray-900 focus:outline-none newspaper-body bg-white text-gray-900"
                                    >
                                        <option value="">Select Publisher</option>
                                        {publishers.map(publisher => (
                                            <option key={publisher._id} value={publisher.name}>{publisher.name}</option>
                                        ))}
                                    </select>
                                )}
                            </div>
                            
                            <div className="form-control">
                                <label className="newspaper-meta text-sm font-bold uppercase tracking-wider text-gray-700 mb-2 block">
                                    Article Tags
                                </label>
                                <Select
                                    isMulti
                                    options={tagOptions}
                                    value={selectedTags}
                                    onChange={setSelectedTags}
                                    className="w-full"
                                    classNamePrefix="react-select"
                                    placeholder="Select relevant tags..."
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            border: '2px solid #d1d5db',
                                            '&:hover': { borderColor: '#1f2937' },
                                            '&:focus': { borderColor: '#1f2937' }
                                        })
                                    }}
                                />
                            </div>
                            
                            <div className="form-control">
                                <label className="newspaper-meta text-sm font-bold uppercase tracking-wider text-gray-700 mb-2 block">
                                    Article Content
                                </label>
                                <textarea 
                                    {...register("description", { required: true })}
                                    className="w-full border-2 border-gray-300 p-3 h-32 resize-none focus:border-gray-900 focus:outline-none newspaper-body bg-white text-gray-900"
                                    placeholder="Write your article content here..." 
                                />
                            </div>
                            
                            <div className="border-t-2 border-gray-200 pt-6">
                                <button 
                                    type="submit" 
                                    className="w-full bg-gray-900 text-white py-4 px-6 hover:bg-gray-800 transition-colors duration-300 uppercase tracking-widest font-bold border-2 border-gray-900 newspaper-button"
                                >
                                    Submit for Review
                                </button>
                                <p className="text-xs text-gray-500 text-center mt-3 uppercase tracking-wider">
                                    Articles are reviewed within 24-48 hours
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AddArticle;
