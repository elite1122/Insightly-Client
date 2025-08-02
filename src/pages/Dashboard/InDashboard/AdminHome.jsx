import React from "react";
import { Chart } from "react-google-charts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../component/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import { FaNewspaper, FaChartPie, FaChartBar, FaChartLine, FaUsers, FaBookOpen, FaClock } from "react-icons/fa";

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
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
                    <p className="newspaper-meta text-gray-600 uppercase tracking-widest">Loading Dashboard...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center bg-red-50 border-4 border-red-600 p-8 newspaper-card">
                    <p className="text-red-600 font-bold text-lg">Error: {error.message}</p>
                </div>
            </div>
        );
    }

    // Aggregate data for charts
    const publicationCounts = articles.reduce((acc, article) => {
        acc[article.publisher] = (acc[article.publisher] || 0) + 1;
        return acc;
    }, {});

    const totalArticles = Object.values(publicationCounts).reduce((sum, count) => sum + count, 0);
    const totalPublications = Object.keys(publicationCounts).length;

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

    // Enhanced Chart options with newspaper colors
    const pieChartOptions = {
        title: "Publication Article Distribution",
        titleTextStyle: {
            fontName: 'Crimson Text',
            fontSize: 18,
            bold: true,
            color: '#1f2937'
        },
        pieHole: 0.4,
        is3D: false,
        colors: ['#dc2626', '#2563eb', '#16a34a', '#ca8a04', '#9333ea', '#c2410c'],
        backgroundColor: 'transparent',
        legend: {
            textStyle: {
                fontName: 'Crimson Text',
                fontSize: 12,
                color: '#374151'
            }
        }
    };

    const barChartOptions = {
        title: "Number of Articles per Publication",
        titleTextStyle: {
            fontName: 'Crimson Text',
            fontSize: 18,
            bold: true,
            color: '#1f2937'
        },
        hAxis: { 
            title: "Publications",
            titleTextStyle: { fontName: 'Crimson Text', fontSize: 14, color: '#374151' },
            textStyle: { fontName: 'Crimson Text', fontSize: 12, color: '#6b7280' }
        },
        vAxis: { 
            title: "Number of Articles",
            titleTextStyle: { fontName: 'Crimson Text', fontSize: 14, color: '#374151' },
            textStyle: { fontName: 'Crimson Text', fontSize: 12, color: '#6b7280' }
        },
        bars: "vertical",
        colors: ["#2563eb"],
        backgroundColor: 'transparent'
    };

    const lineChartOptions = {
        title: "Publication Articles Over Time",
        titleTextStyle: {
            fontName: 'Crimson Text',
            fontSize: 18,
            bold: true,
            color: '#1f2937'
        },
        curveType: "function",
        legend: { 
            position: "bottom",
            textStyle: { fontName: 'Crimson Text', fontSize: 12, color: '#374151' }
        },
        colors: ["#dc2626"],
        backgroundColor: 'transparent',
        hAxis: {
            textStyle: { fontName: 'Crimson Text', fontSize: 12, color: '#6b7280' }
        },
        vAxis: {
            textStyle: { fontName: 'Crimson Text', fontSize: 12, color: '#6b7280' }
        }
    };

    return (
        <section className="bg-white min-h-screen">
            <Helmet>
                <title>Insightly | Admin Dashboard</title>
            </Helmet>
            
            {/* Newspaper Header */}
            <div className="bg-white border-b-4 border-gray-900 mb-6 sm:mb-8">
                <div className="text-center py-4 sm:py-6">
                    <h1 className="newspaper-headline text-2xl sm:text-3xl lg:text-4xl text-gray-900 mb-2 font-black uppercase tracking-wider">
                        ADMIN HOME
                    </h1>
                    <div className="flex items-center justify-center">
                        <div className="flex-1 border-t border-gray-400 max-w-16 sm:max-w-32"></div>
                        <p className="newspaper-meta text-gray-600 mx-2 sm:mx-4 uppercase tracking-widest text-xs sm:text-sm">
                            Welcome to Admin Home
                        </p>
                        <div className="flex-1 border-t border-gray-400 max-w-16 sm:max-w-32"></div>
                    </div>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
                <div className="bg-white border-4 border-gray-900 p-4 sm:p-6 newspaper-card shadow-lg relative">
                    <div className="absolute -top-2 -right-2 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-black">
                        📊
                    </div>
                    <div className="flex items-center space-x-3 sm:space-x-4">
                        <FaBookOpen className="text-2xl sm:text-3xl text-blue-600" />
                        <div>
                            <div className="text-2xl sm:text-3xl font-black text-gray-900">{totalArticles}</div>
                            <div className="newspaper-meta text-xs sm:text-sm text-gray-600 uppercase tracking-wider">Total Articles</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border-4 border-gray-900 p-4 sm:p-6 newspaper-card shadow-lg relative">
                    <div className="absolute -top-2 -right-2 bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-black">
                        📰
                    </div>
                    <div className="flex items-center space-x-3 sm:space-x-4">
                        <FaNewspaper className="text-2xl sm:text-3xl text-green-600" />
                        <div>
                            <div className="text-2xl sm:text-3xl font-black text-gray-900">{totalPublications}</div>
                            <div className="newspaper-meta text-xs sm:text-sm text-gray-600 uppercase tracking-wider">Publications</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border-4 border-gray-900 p-4 sm:p-6 newspaper-card shadow-lg relative sm:col-span-2 lg:col-span-1">
                    <div className="absolute -top-2 -right-2 bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-black">
                        ⚡
                    </div>
                    <div className="flex items-center space-x-3 sm:space-x-4">
                        <FaClock className="text-2xl sm:text-3xl text-purple-600" />
                        <div>
                            <div className="text-2xl sm:text-3xl font-black text-gray-900">Live</div>
                            <div className="newspaper-meta text-xs sm:text-sm text-gray-600 uppercase tracking-wider">System Status</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="space-y-6 sm:space-y-8">
                <div className="text-center mb-6 sm:mb-8">
                    <h2 className="newspaper-headline text-xl sm:text-2xl lg:text-3xl text-gray-900 mb-3 sm:mb-4 font-black uppercase tracking-wider">
                        ANALYTICS DASHBOARD
                    </h2>
                    <p className="newspaper-meta text-gray-600 uppercase tracking-widest text-xs sm:text-sm">
                        COMPREHENSIVE DATA VISUALIZATION
                    </p>
                </div>

                <div className="grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    {/* Pie Chart */}
                    <div className="bg-white border-4 border-gray-900 p-4 sm:p-6 newspaper-card shadow-xl relative overflow-hidden">
                        <div className="absolute -top-2 -left-2 bg-red-600 text-white px-2 sm:px-3 py-1 text-xs font-black uppercase tracking-wider transform -rotate-3">
                            PIE CHART
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6 mt-4">
                            <FaChartPie className="text-lg sm:text-xl text-red-600" />
                            <h3 className="newspaper-headline text-base sm:text-lg font-black uppercase tracking-wider text-gray-900">
                                Distribution Analysis
                            </h3>
                        </div>
                        <div className="border-2 border-gray-300 p-2 sm:p-3 bg-gray-50">
                            <Chart
                                chartType="PieChart"
                                data={pieChartData}
                                options={pieChartOptions}
                                width="100%"
                                height="300px"
                            />
                        </div>
                        <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-red-50 border-2 border-red-200">
                            <p className="text-xs sm:text-sm text-red-700 font-semibold uppercase tracking-wider text-center">
                                Publication Article Distribution
                            </p>
                        </div>
                    </div>

                    {/* Bar Chart */}
                    <div className="bg-white border-4 border-gray-900 p-4 sm:p-6 newspaper-card shadow-xl relative overflow-hidden">
                        <div className="absolute -top-2 -left-2 bg-blue-600 text-white px-2 sm:px-3 py-1 text-xs font-black uppercase tracking-wider transform -rotate-3">
                            BAR CHART
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6 mt-4">
                            <FaChartBar className="text-lg sm:text-xl text-blue-600" />
                            <h3 className="newspaper-headline text-base sm:text-lg font-black uppercase tracking-wider text-gray-900">
                                Volume Comparison
                            </h3>
                        </div>
                        <div className="border-2 border-gray-300 p-2 sm:p-3 bg-gray-50">
                            <Chart
                                chartType="BarChart"
                                data={barChartData}
                                options={barChartOptions}
                                width="100%"
                                height="300px"
                            />
                        </div>
                        <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-blue-50 border-2 border-blue-200">
                            <p className="text-xs sm:text-sm text-blue-700 font-semibold uppercase tracking-wider text-center">
                                Number of Articles per Publication
                            </p>
                        </div>
                    </div>

                    {/* Line Chart */}
                    <div className="bg-white border-4 border-gray-900 p-4 sm:p-6 newspaper-card shadow-xl relative overflow-hidden lg:col-span-2 xl:col-span-1">
                        <div className="absolute -top-2 -left-2 bg-green-600 text-white px-2 sm:px-3 py-1 text-xs font-black uppercase tracking-wider transform -rotate-3">
                            LINE CHART
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6 mt-4">
                            <FaChartLine className="text-lg sm:text-xl text-green-600" />
                            <h3 className="newspaper-headline text-base sm:text-lg font-black uppercase tracking-wider text-gray-900">
                                Trend Analysis
                            </h3>
                        </div>
                        <div className="border-2 border-gray-300 p-2 sm:p-3 bg-gray-50">
                            <Chart
                                chartType="LineChart"
                                data={lineChartData}
                                options={lineChartOptions}
                                width="100%"
                                height="300px"
                            />
                        </div>
                        <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-green-50 border-2 border-green-200">
                            <p className="text-xs sm:text-sm text-green-700 font-semibold uppercase tracking-wider text-center">
                                Publication Articles Over Time
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Summary */}
                <div className="bg-gray-900 text-white border-4 border-yellow-500 p-4 sm:p-6 lg:p-8 newspaper-card shadow-xl relative">
                    <div className="absolute -top-2 -right-2 bg-yellow-500 text-gray-900 px-2 sm:px-3 py-1 text-xs font-black uppercase tracking-wider transform rotate-3">
                        SUMMARY
                    </div>
                    <div className="text-center">
                        <h3 className="newspaper-headline text-lg sm:text-xl lg:text-2xl text-white mb-3 sm:mb-4 font-black uppercase tracking-wider">
                            DASHBOARD INSIGHTS
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                            <div className="p-3 sm:p-4 bg-white text-gray-900 border-2 border-yellow-500">
                                <div className="text-lg sm:text-xl font-black">{totalArticles}</div>
                                <div className="text-xs sm:text-sm uppercase tracking-wider">Articles Managed</div>
                            </div>
                            <div className="p-3 sm:p-4 bg-white text-gray-900 border-2 border-yellow-500">
                                <div className="text-lg sm:text-xl font-black">{totalPublications}</div>
                                <div className="text-xs sm:text-sm uppercase tracking-wider">Active Publishers</div>
                            </div>
                            <div className="p-3 sm:p-4 bg-white text-gray-900 border-2 border-yellow-500">
                                <div className="text-lg sm:text-xl font-black">100%</div>
                                <div className="text-xs sm:text-sm uppercase tracking-wider">System Uptime</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdminHome;
