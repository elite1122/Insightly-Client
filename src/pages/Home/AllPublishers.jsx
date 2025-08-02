import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SectionTitle from "../../component/SectionTitle/SectionTitle";
import LoadingSpinner from "../../component/LoadingSpinner/LoadingSpinner";

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
        <section className="bg-white py-16 border-b-2 border-gray-200">
            <div className="max-w-7xl mx-auto px-6">
                {/* Newspaper-style section header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <div className="flex-1 border-t-2 border-gray-900 max-w-32"></div>
                        <h2 className="newspaper-headline text-3xl md:text-4xl mx-6 text-gray-900">
                            TRUSTED PUBLISHERS
                        </h2>
                        <div className="flex-1 border-t-2 border-gray-900 max-w-32"></div>
                    </div>
                    <p className="newspaper-meta text-gray-600 uppercase tracking-widest">
                        Our Network of Credible News Sources
                    </p>
                </div>

                {isLoading ? (
                    <LoadingSpinner 
                        size="medium" 
                        text="Loading publishers..." 
                        variant="newspaper"
                    />
                ) : error ? (
                    <div className="text-center">
                        <div className="newspaper-body text-red-600">
                            <p>Failed to fetch publishers. Please try again later.</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {publishers.map((publisher) => (
                            <div
                                key={publisher._id}
                                className="newspaper-card bg-white p-6 text-center group hover:shadow-xl transition-all duration-300"
                            >
                                <div className="relative mb-6">
                                    <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full overflow-hidden border-4 border-gray-900 group-hover:border-yellow-400 transition-colors duration-300">
                                        <img
                                            src={publisher.logo}
                                            alt={publisher.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-3 py-1 text-xs font-bold uppercase tracking-wide">
                                        Publisher
                                    </div>
                                </div>
                                
                                <h3 className="newspaper-subheadline text-lg text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors duration-300">
                                    {publisher.name}
                                </h3>
                                
                                <div className="newspaper-thin-divider border-gray-300 my-4"></div>
                                
                                <p className="newspaper-body text-gray-600 text-sm">
                                    Delivering reliable news and insights to our readers worldwide.
                                </p>
                                
                                <div className="mt-4 flex justify-center">
                                    <span className="newspaper-meta text-gray-500 text-xs uppercase tracking-widest">
                                        Verified Source
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Publisher Stats */}
                <div className="mt-16 bg-white newspaper-card p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="newspaper-headline text-3xl text-gray-900 mb-2">
                                {publishers.length}+
                            </div>
                            <div className="newspaper-meta text-gray-600 text-sm uppercase tracking-widest">
                                Active Publishers
                            </div>
                        </div>
                        <div>
                            <div className="newspaper-headline text-3xl text-gray-900 mb-2">
                                100%
                            </div>
                            <div className="newspaper-meta text-gray-600 text-sm uppercase tracking-widest">
                                Verified Sources
                            </div>
                        </div>
                        <div>
                            <div className="newspaper-headline text-3xl text-gray-900 mb-2">
                                24/7
                            </div>
                            <div className="newspaper-meta text-gray-600 text-sm uppercase tracking-widest">
                                Content Updates
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AllPublishers;
