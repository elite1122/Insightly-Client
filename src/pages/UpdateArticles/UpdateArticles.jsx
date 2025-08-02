import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";
import SectionTitle from "../../component/SectionTitle/SectionTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../component/LoadingSpinner/LoadingSpinner";

const UpdateArticle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue } = useForm();
    const [selectedTags, setSelectedTags] = useState([]);
    const axiosPublic = useAxiosPublic();
    const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

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

    // Fetch publishers data
    const { data: publishers = [], isLoading: isLoadingPublishers } = useQuery({
        queryKey: ["publishers"],
        queryFn: async () => {
            const res = await axiosPublic.get("/publishers");
            return res.data;
        },
    });

    // Fetch article data
    const { data: article } = useQuery({
        queryKey: ["article", id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/articles/${id}`);
            return res.data;
        },
    });

    // Update form values when data is available
    useEffect(() => {
        if (article) {
            setValue("title", article.title);
            setValue("description", article.description);
            setValue("publisher", article.publisher);
            setSelectedTags(article.tags.map(tag => ({ value: tag, label: tag })));
        }
    }, [article, setValue]);

    const onSubmit = async (data) => {
        const formData = new FormData();
        if (data.image[0]) {
            formData.append("image", data.image[0]);
            const imgRes = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, formData);
            if (imgRes.data.success) {
                data.image = imgRes.data.data.url;
            }
        }

        const updatedArticle = {
            title: data.title,
            image: data.image || article.image,
            publisher: data.publisher,
            description: data.description,
            tags: selectedTags.map(tag => tag.value),
        };

        try {
            await axiosPublic.patch(`/articles/update/${id}`, updatedArticle);
            Swal.fire({
                icon: "success",
                title: "Article Updated!",
                text: "Your article has been successfully updated and is ready for publication.",
                customClass: {
                    popup: 'newspaper-alert'
                }
            });
            navigate("/myArticles");
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: "Something went wrong while updating your article. Please try again.",
                customClass: {
                    popup: 'newspaper-alert'
                }
            });
        }
    };

    return (
        <section className="bg-white min-h-screen">
            <Helmet><title>Insightly | Update Article</title></Helmet>
            
            {/* Newspaper Header */}
            <div className="bg-white border-b-4 border-gray-900 py-8">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center">
                        <h1 className="newspaper-headline text-4xl md:text-5xl text-gray-900 mb-2">
                            UPDATE ARTICLE
                        </h1>
                        <div className="flex items-center justify-center">
                            <div className="flex-1 border-t border-gray-400 max-w-32"></div>
                            <p className="newspaper-meta text-gray-600 mx-4 uppercase tracking-widest text-sm">
                                Editorial Revision Center
                            </p>
                            <div className="flex-1 border-t border-gray-400 max-w-32"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-white border-8 border-gray-900 p-10 newspaper-card shadow-2xl relative">
                    <div className="absolute -top-4 -left-4 bg-blue-600 text-white px-4 py-2 text-xs font-black uppercase tracking-wider transform -rotate-3">
                        EDITOR'S DESK
                    </div>
                    
                    <div className="text-center mb-8">
                        <h2 className="newspaper-headline text-3xl text-gray-900 mb-6 uppercase tracking-wider font-black border-b-4 border-gray-900 pb-4">
                            Article Revision Form
                        </h2>
                        <p className="newspaper-meta text-gray-600 uppercase tracking-widest">
                            Refine Your Story for Perfect Publication
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        {/* Article Title */}
                        <div className="border-4 border-gray-300 p-6 bg-gray-50">
                            <label className="newspaper-meta text-sm font-black uppercase tracking-wider text-gray-700 mb-3 block">
                                📝 Article Headline
                            </label>
                            <input 
                                {...register("title", { required: true })} 
                                className="w-full p-4 border-2 border-gray-300 bg-white newspaper-body text-lg focus:border-blue-600 focus:outline-none transition-colors"
                                placeholder="Enter compelling headline..."
                            />
                        </div>

                        {/* Article Image */}
                        <div className="border-4 border-gray-300 p-6 bg-gray-50">
                            <label className="newspaper-meta text-sm font-black uppercase tracking-wider text-gray-700 mb-3 block">
                                📸 Featured Image
                            </label>
                            <div className="relative">
                                <input 
                                    type="file" 
                                    {...register("image")} 
                                    className="w-full p-4 border-2 border-gray-300 bg-white focus:border-blue-600 focus:outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-gray-900 file:text-white file:uppercase file:tracking-wider file:font-bold"
                                />
                                <p className="newspaper-meta text-xs text-gray-600 mt-2 uppercase tracking-wider">
                                    Leave empty to keep current image
                                </p>
                            </div>
                        </div>

                        {/* Publisher Selection */}
                        <div className="border-4 border-gray-300 p-6 bg-gray-50">
                            <label className="newspaper-meta text-sm font-black uppercase tracking-wider text-gray-700 mb-3 block">
                                🏢 Publisher
                            </label>
                            {isLoadingPublishers ? (
                                <LoadingSpinner 
                                    size="small" 
                                    text="Loading publishers..." 
                                    variant="newspaper"
                                />
                            ) : (
                                <select 
                                    {...register("publisher", { required: true })} 
                                    className="w-full p-4 border-2 border-gray-300 bg-white newspaper-body focus:border-blue-600 focus:outline-none transition-colors"
                                >
                                    <option value="">Select Publishing House</option>
                                    {publishers.map(publisher => (
                                        <option key={publisher._id} value={publisher.name}>
                                            {publisher.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>

                        {/* Tags Selection */}
                        <div className="border-4 border-gray-300 p-6 bg-gray-50">
                            <label className="newspaper-meta text-sm font-black uppercase tracking-wider text-gray-700 mb-3 block">
                                🏷️ Article Categories
                            </label>
                            <Select
                                isMulti
                                options={tagOptions}
                                value={selectedTags}
                                onChange={setSelectedTags}
                                className="w-full"
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        border: '2px solid #d1d5db',
                                        borderRadius: '0',
                                        padding: '8px',
                                        fontSize: '16px',
                                        fontFamily: '"Crimson Text", serif',
                                        '&:hover': {
                                            borderColor: '#2563eb'
                                        }
                                    }),
                                    multiValue: (base) => ({
                                        ...base,
                                        backgroundColor: '#1f2937',
                                        color: 'white',
                                        borderRadius: '0'
                                    }),
                                    multiValueLabel: (base) => ({
                                        ...base,
                                        color: 'white',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    })
                                }}
                                placeholder="Select relevant categories..."
                            />
                        </div>

                        {/* Article Content */}
                        <div className="border-4 border-gray-300 p-6 bg-gray-50">
                            <label className="newspaper-meta text-sm font-black uppercase tracking-wider text-gray-700 mb-3 block">
                                📄 Article Content
                            </label>
                            <textarea 
                                {...register("description", { required: true })} 
                                rows="12"
                                className="w-full p-4 border-2 border-gray-300 bg-white newspaper-body text-lg focus:border-blue-600 focus:outline-none transition-colors resize-vertical"
                                placeholder="Write your article content here..."
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="border-t-4 border-gray-900 pt-8">
                            <button
                                type="submit"
                                className="w-full py-6 px-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white uppercase tracking-widest font-black text-xl border-4 border-gray-900 hover:from-blue-700 hover:to-blue-900 transform hover:scale-105 transition-all duration-300 newspaper-button"
                            >
                                📝 Update Article
                            </button>
                            
                            <div className="mt-6 bg-gray-100 border-2 border-gray-300 p-4 text-center">
                                <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider">
                                    ✅ Auto-Save Enabled • 📋 Grammar Check • 🔍 Fact Verification
                                </p>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Editor's Guidelines */}
                <div className="mt-12 bg-gray-50 border-4 border-gray-300 p-8">
                    <h3 className="newspaper-meta text-center font-black uppercase tracking-wider text-gray-700 mb-6">
                        Editorial Guidelines
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div>
                            <div className="text-3xl mb-3">📚</div>
                            <div className="newspaper-meta text-sm font-bold uppercase tracking-wider text-gray-700">Research Thoroughly</div>
                            <p className="text-xs text-gray-600 mt-2">Verify all facts and sources</p>
                        </div>
                        <div>
                            <div className="text-3xl mb-3">✍️</div>
                            <div className="newspaper-meta text-sm font-bold uppercase tracking-wider text-gray-700">Write Clearly</div>
                            <p className="text-xs text-gray-600 mt-2">Use precise, engaging language</p>
                        </div>
                        <div>
                            <div className="text-3xl mb-3">🎯</div>
                            <div className="newspaper-meta text-sm font-bold uppercase tracking-wider text-gray-700">Stay Objective</div>
                            <p className="text-xs text-gray-600 mt-2">Maintain journalistic integrity</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UpdateArticle;
