import { useForm } from "react-hook-form";
import { useState } from "react";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";
import SectionTitle from "../../component/SectionTitle/SectionTitle";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

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

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("image", data.image[0]);

        try {
            const imgRes = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, formData);
            if (imgRes.data.success) {
                const newArticle = {
                    title: data.title,
                    image: imgRes.data.data.url,
                    publisher: data.publisher,
                    description: data.description,
                    tags: selectedTags.map(tag => tag.value),
                    isPremium: false,
                    isApproved: false,
                    authorName: user.displayName,
                    authorEmail: user.email,
                    authorPhoto: user.photoURL,
                    postDate: new Date(),
                    views: 0
                };

                await axiosPublic.post("/articles", newArticle);
                Swal.fire("Success!", "Article submitted for approval.", "success");
                reset();
                setSelectedTags([]);
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error!", "Something went wrong.", "error");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="card w-full md:max-w-xl shadow-2xl p-10">
                <SectionTitle heading="Add New Article" subHeading="Please fill up the form to add a new article"></SectionTitle>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control">
                        <label className="label">Title</label>
                        <input {...register("title", { required: true })} className="input input-bordered bg-white text-black" />
                    </div>
                    <div className="form-control">
                        <label className="label">Image</label>
                        <input type="file" {...register("image", { required: true })} className="input input-bordered bg-white text-black" />
                    </div>
                    <div className="form-control">
                        <label className="label">Publisher</label>
                        {isLoading ? (
                            <p>Loading publishers...</p>
                        ) : error ? (
                            <p className="text-red-500">Failed to load publishers.</p>
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
                    <button type="submit" className="btn btn-primary mt-3">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddArticle;
