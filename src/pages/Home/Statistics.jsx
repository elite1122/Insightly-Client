import React from "react";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../component/SectionTitle/SectionTitle";
import CountUp from "react-countup";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../component/LoadingSpinner/LoadingSpinner";

const Statistics = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch user data
    const { data: users = [], isLoading, error } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    // Calculate counts
    const totalUsers = users.filter((user) => user.role !== "admin").length;
    const normalUsers = users.filter((user) => (user.role === "user")).length;
    const premiumUsers = users.filter((user) => user.role === "premium").length;

    return (
        <section className="bg-white py-16 border-t-4 border-gray-900">
            <div className="max-w-7xl mx-auto px-6">
                {/* Newspaper-style section header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <div className="flex-1 border-t-2 border-gray-900 max-w-32"></div>
                        <h2 className="newspaper-headline text-3xl md:text-4xl mx-6 text-gray-900">
                            BY THE NUMBERS
                        </h2>
                        <div className="flex-1 border-t-2 border-gray-900 max-w-32"></div>
                    </div>
                    <p className="newspaper-meta text-gray-600 uppercase tracking-widest">
                        Platform Statistics & Community Growth
                    </p>
                </div>

                {isLoading ? (
                    <LoadingSpinner 
                        size="large" 
                        text="Loading statistics..." 
                        variant="newspaper"
                    />
                ) : error ? (
                    <div className="text-center">
                        <div className="newspaper-body text-red-600">
                            <p>Failed to fetch statistics. Please try again later.</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Total Users */}
                        <div className="newspaper-card bg-white p-8 text-center group hover:shadow-xl transition-all duration-300">
                            <div className="border-b-4 border-gray-900 pb-4 mb-6">
                                <h3 className="newspaper-meta text-gray-600 text-sm uppercase tracking-widest mb-2">
                                    Total Readers
                                </h3>
                                <div className="newspaper-headline text-5xl md:text-6xl text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                                    <CountUp end={totalUsers} duration={2.5} />
                                </div>
                            </div>
                            <p className="newspaper-body text-gray-600">
                                Active community members engaging with our content daily
                            </p>
                        </div>

                        {/* Normal Users */}
                        <div className="newspaper-card bg-white p-8 text-center group hover:shadow-xl transition-all duration-300">
                            <div className="border-b-4 border-gray-900 pb-4 mb-6">
                                <h3 className="newspaper-meta text-gray-600 text-sm uppercase tracking-widest mb-2">
                                    Free Subscribers
                                </h3>
                                <div className="newspaper-headline text-5xl md:text-6xl text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                                    <CountUp end={normalUsers} duration={2.5} />
                                </div>
                            </div>
                            <p className="newspaper-body text-gray-600">
                                Readers enjoying our free daily news and updates
                            </p>
                        </div>

                        {/* Premium Users */}
                        <div className="newspaper-card bg-white p-8 text-center group hover:shadow-xl transition-all duration-300 relative">
                            <div className="absolute top-4 right-4">
                                <span className="premium-badge text-xs">PREMIUM</span>
                            </div>
                            <div className="border-b-4 border-yellow-500 pb-4 mb-6">
                                <h3 className="newspaper-meta text-gray-600 text-sm uppercase tracking-widest mb-2">
                                    Premium Members
                                </h3>
                                <div className="newspaper-headline text-5xl md:text-6xl text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">
                                    <CountUp end={premiumUsers} duration={2.5} />
                                </div>
                            </div>
                            <p className="newspaper-body text-gray-600">
                                Subscribers with access to exclusive content and features
                            </p>
                        </div>
                    </div>
                )}

                {/* Additional Statistics */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-gray-200 pt-12">
                    <div className="text-center">
                        <div className="newspaper-headline text-2xl text-gray-900 mb-2">24/7</div>
                        <div className="newspaper-meta text-gray-600 text-xs uppercase tracking-widest">News Coverage</div>
                    </div>
                    <div className="text-center">
                        <div className="newspaper-headline text-2xl text-gray-900 mb-2">50+</div>
                        <div className="newspaper-meta text-gray-600 text-xs uppercase tracking-widest">Categories</div>
                    </div>
                    <div className="text-center">
                        <div className="newspaper-headline text-2xl text-gray-900 mb-2">2025</div>
                        <div className="newspaper-meta text-gray-600 text-xs uppercase tracking-widest">Established</div>
                    </div>
                    <div className="text-center">
                        <div className="newspaper-headline text-2xl text-gray-900 mb-2">∞</div>
                        <div className="newspaper-meta text-gray-600 text-xs uppercase tracking-widest">Stories to Tell</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Statistics;
