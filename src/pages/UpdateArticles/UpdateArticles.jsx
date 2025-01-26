import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";
import SectionTitle from "../../component/SectionTitle/SectionTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";

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
            Swal.fire("Success!", "Article updated successfully.", "success");
            navigate("/myArticles");
        } catch (error) {
            console.error(error);
            Swal.fire("Error!", "Something went wrong.", "error");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="card w-full md:max-w-xl shadow-2xl p-10">
                <SectionTitle heading="Update Article" subHeading="Update your article details"></SectionTitle>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">Title</label>
                            <input {...register("title", { required: true })} className="input input-bordered bg-white text-black" />
                        </div>
                        <div className="form-control">
                            <label className="label">Image</label>
                            <input type="file" {...register("image")} className="input input-bordered bg-white text-black" />
                        </div>
                        <div className="form-control">
                            <label className="label">Publisher</label>
                            {isLoadingPublishers ? (
                                <p>Loading publishers...</p>
                            ) : (
                                <select {...register("publisher", { required: true })} className="select select-bordered w-full">
                                    <option value="">Select Publisher</option>
                                    {publishers.map(publisher => (
                                        <option key={publisher._id} value={publisher.name}>{publisher.name}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                        <div className="form-control">
                            <label className="label">Tags</label>
                            <Select
                                isMulti
                                options={tagOptions}
                                value={selectedTags}
                                onChange={setSelectedTags}
                                className="w-full"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">Description</label>
                            <textarea {...register("description", { required: true })} className="textarea textarea-bordered bg-white text-black" />
                        </div>
                        <div className="mt-3">
                            <button type="submit" className="btn btn-primary w-full">Update</button>
                        </div>
                    </form>
            </div>
        </div>
    );
};

export default UpdateArticle;
