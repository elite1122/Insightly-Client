import React from "react";
import { Chart } from "react-google-charts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../component/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch article data
    const { data: articles = [], isLoading, isError, error } = useQuery({
        queryKey: ["articles"],
        queryFn: async () => {
            const res = await axiosSecure.get("/articles");
            return res.data;
        }
    });

    if (isLoading) {
        return <div className="text-center">Loading...</div>;
    }

    if (isError) {
        return <div className="text-center text-red-500">Error: {error.message}</div>;
    }

    // Aggregate data for charts
    const publicationCounts = articles.reduce((acc, article) => {
        acc[article.publisher] = (acc[article.publisher] || 0) + 1;
        return acc;
    }, {});

    const totalArticles = Object.values(publicationCounts).reduce((sum, count) => sum + count, 0);

    const pieChartData = [
        ["Publication", "Percentage"],
        ...Object.entries(publicationCounts).map(([name, count]) => [name, (count / totalArticles) * 100]),
    ];

    const barChartData = [
        ["Publication", "Articles"],
        ...Object.entries(publicationCounts).map(([name, count]) => [name, count]),
    ];

    const lineChartData = [
        ["Publication", "Articles"],
        ...Object.entries(publicationCounts).map(([name, count]) => [name, count]),
    ];

    // Chart options
    const pieChartOptions = {
        title: "Publication Article Distribution",
        pieHole: 0.4,
        is3D: false,
        slices: { 0: { color: "#f6a5c0" }, 1: { color: "#f6c0a5" }, 2: { color: "#a5f6a5" } },
    };

    const barChartOptions = {
        title: "Number of Articles per Publication",
        hAxis: { title: "Publications" },
        vAxis: { title: "Number of Articles" },
        bars: "vertical",
        colors: ["#a5c0f6"],
    };

    const lineChartOptions = {
        title: "Publication Articles Over Time",
        curveType: "function",
        legend: { position: "bottom" },
        colors: ["#f6a5d1"],
    };

    return (
        <section>
            <Helmet>
                <title>Insightly | Admin Home</title>
            </Helmet>
            <div className="min-h-screen">
                <SectionTitle heading="Admin Home"></SectionTitle>
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {/* Pie Chart */}
                    <div className="shadow-lg p-4 bg-white rounded-lg overflow-x-auto">
                        <h2 className="text-xl font-semibold mb-4">Pie Chart</h2>
                        <Chart
                            chartType="PieChart"
                            data={pieChartData}
                            options={pieChartOptions}
                            width="100%"
                            height="300px"
                        />
                    </div>

                    {/* Bar Chart */}
                    <div className="shadow-lg p-4 bg-white rounded-lg overflow-x-auto">
                        <h2 className="text-xl font-semibold mb-4">Bar Chart</h2>
                        <Chart
                            chartType="BarChart"
                            data={barChartData}
                            options={barChartOptions}
                            width="100%"
                            height="300px"
                        />
                    </div>

                    {/* Line Chart */}
                    <div className="shadow-lg p-4 bg-white rounded-lg overflow-x-auto">
                        <h2 className="text-xl font-semibold mb-4">Line Chart</h2>
                        <Chart
                            chartType="LineChart"
                            data={lineChartData}
                            options={lineChartOptions}
                            width="100%"
                            height="300px"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdminHome;
