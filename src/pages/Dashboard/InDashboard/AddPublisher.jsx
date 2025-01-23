import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../component/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";

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
                });
                reset();
            }
        } catch (error) {
            console.error("Error uploading image or submitting form", error);
            Swal.fire({
                icon: "error",
                title: "Error adding publisher!",
            });
        }
    };

    return (
        <section>
            <Helmet><title>Insightly | Add Publisher</title></Helmet>
            <div className="min-h-screen flex justify-center items-center">
                {loading ? (
                    <div className="flex justify-center items-center min-h-screen">
                        <span className="loading loading-bars loading-lg"></span>
                    </div>
                ) : (
                    <div className="card w-full max-w-xl shadow-2xl p-10">
                        <SectionTitle heading="Add New Publisher"></SectionTitle>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Publisher Name</label>
                                <input
                                    type="text"
                                    {...register("publisherName", { required: "Publisher name is required" })}
                                    className="w-full p-2 border rounded"
                                    placeholder="Enter publisher name"
                                />
                                {errors.publisherName && <span className="text-red-500">{errors.publisherName.message}</span>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Publisher Logo</label>
                                <input
                                    type="file"
                                    {...register("publisherLogo", { required: "Publisher logo is required" })}
                                    className="w-full p-2 border rounded"
                                    accept="image/*"
                                />
                                {errors.publisherLogo && <span className="text-red-500">{errors.publisherLogo.message}</span>}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                            >
                                Add Publisher
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AddPublisher;
