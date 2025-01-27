import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SectionTitle from "../../component/SectionTitle/SectionTitle";

const AllPublishers = () => {
    const axiosPublic = useAxiosPublic();

    // Fetch publishers using TanStack Query
    const { data: publishers = [], isLoading, error } = useQuery({
        queryKey: ["publishers"],
        queryFn: async () => {
            const res = await axiosPublic.get("/publishers");
            return res.data;
        },
    });

    return (
        <section>
            <div className="p-6">
                <SectionTitle heading="All Publishers" subHeading="Explore a variety of publishers to suit your preferences"></SectionTitle>
                {isLoading ? (
                    <div className="flex justify-center items-center min-h-screen">
                        <span className="loading loading-bars loading-lg"></span>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500">
                        <p>Failed to fetch publishers. Please try again later.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {publishers.map((publisher) => (
                            <div
                                key={publisher._id}
                                className="bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 border-blue-500 transform rounded-lg p-4 border flex flex-col items-center text-center"
                            >
                                <img
                                    src={publisher.logo}
                                    alt={publisher.name}
                                    className="w-32 h-32 object-cover rounded-full mb-4 border border-gray-300"
                                />
                                <h3 className="text-lg font-semibold">{publisher.name}</h3>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default AllPublishers;
