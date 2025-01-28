import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SectionTitle from "../../component/SectionTitle/SectionTitle";
import CountUp from "react-countup";

const Statistics = () => {
    const axiosPublic = useAxiosPublic();

    // Fetch user data
    const { data: users = [], isLoading, error } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosPublic.get("/users");
            return res.data;
        },
    });

    // Calculate counts
    const totalUsers = users.filter((user) => user.role !== "admin").length;
    const normalUsers = users.filter((user) => (user.role === "user")).length;
    const premiumUsers = users.filter((user) => user.role === "premium").length;

    return (
        <section>
            <div className="p-6">
                <SectionTitle heading="Platform Statistics"
                    subHeading="Discover key metrics and user activity at a glance" />
                {isLoading ? (
                    <div className="flex justify-center items-center min-h-screen">
                        <span className="loading loading-bars loading-lg"></span>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500">
                        <p>Failed to fetch user statistics. Please try again later.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {/* Total Users */}
                        <div className="bg-gradient-to-r from-teal-300 via-green-300 to-blue-300 border-teal-500 rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
                            <h3 className="text-2xl font-semibold mb-2">Total Users</h3>
                            <CountUp
                                end={totalUsers}
                                duration={2}
                                className="text-5xl font-bold text-teal-600"
                            />
                        </div>

                        {/* Normal Users */}
                        <div className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 border-yellow-500 rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
                            <h3 className="text-2xl font-semibold mb-2">Normal Users</h3>
                            <CountUp
                                end={normalUsers}
                                duration={2}
                                className="text-5xl font-bold text-yellow-600"
                            />
                        </div>

                        {/* Premium Users */}
                        <div className="bg-gradient-to-r from-purple-300 via-indigo-300 to-pink-300 border-purple-500 rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
                            <h3 className="text-2xl font-semibold mb-2">Premium Users</h3>
                            <CountUp
                                end={premiumUsers}
                                duration={2}
                                className="text-5xl font-bold text-purple-600"
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Statistics;
