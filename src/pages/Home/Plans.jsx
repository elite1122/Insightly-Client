import React from "react";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../../component/SectionTitle/SectionTitle";

const Plans = () => {
    const navigate = useNavigate();

    return (
        <section className="bg-white py-16 border-b-2 border-gray-200">
            <div className="max-w-7xl mx-auto px-6">
                {/* Newspaper-style section header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <div className="flex-1 border-t-2 border-gray-900"></div>
                        <h2 className="newspaper-headline text-3xl md:text-4xl mx-6 text-gray-900">
                            SUBSCRIPTION PLANS
                        </h2>
                        <div className="flex-1 border-t-2 border-gray-900"></div>
                    </div>
                    <p className="newspaper-meta text-gray-600 uppercase tracking-widest">
                        Choose Your Level of Access
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Free Plan */}
                    <div className="newspaper-card bg-white overflow-hidden group h-full flex flex-col">
                        <div className="bg-gray-900 text-white p-6 text-center">
                            <h3 className="newspaper-headline text-2xl md:text-3xl mb-2">
                                FREE EDITION
                            </h3>
                            <div className="newspaper-meta text-yellow-400 text-sm uppercase tracking-widest">
                                Essential News Access
                            </div>
                            <div className="mt-4">
                                <span className="newspaper-headline text-4xl">$0</span>
                                <span className="newspaper-body text-gray-300">/month</span>
                            </div>
                        </div>

                        <div className="p-8 flex-1 flex flex-col">
                            <div className="newspaper-body space-y-4 mb-8 flex-1">
                                <div className="flex items-start space-x-3">
                                    <span className="text-green-600 font-bold text-lg">✓</span>
                                    <span>Access to daily news articles</span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="text-green-600 font-bold text-lg">✓</span>
                                    <span>Basic search functionality</span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="text-green-600 font-bold text-lg">✓</span>
                                    <span>Community discussions</span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="text-green-600 font-bold text-lg">✓</span>
                                    <span>Email newsletters</span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="text-red-600 font-bold text-lg">✗</span>
                                    <span className="text-gray-500">Premium exclusive content</span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="text-red-600 font-bold text-lg">✗</span>
                                    <span className="text-gray-500">Advanced analytics</span>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate("/subscription")}
                                className="w-full newspaper-border bg-gray-900 text-white py-4 px-6 hover:bg-gray-800 transition-colors duration-300 uppercase tracking-wide font-semibold mt-auto"
                            >
                                Start Reading Free
                            </button>
                        </div>
                    </div>

                    {/* Premium Plan */}
                    <div className="newspaper-card bg-white overflow-hidden group relative border-4 border-yellow-400 h-full flex flex-col">
                        {/* Most Popular Badge - Repositioned */}
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-6 py-2 rounded-full z-10 shadow-lg">
                            <span className="newspaper-meta text-xs font-bold uppercase tracking-widest">Most Popular</span>
                        </div>
                        
                        <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 p-6 text-center pt-8">
                            <h3 className="newspaper-headline text-2xl md:text-3xl mb-2 font-bold text-gray-900">
                                PREMIUM EDITION
                            </h3>
                            <div className="newspaper-meta text-gray-800 text-sm uppercase tracking-widest font-semibold">
                                Complete News Experience
                            </div>
                            <div className="mt-4">
                                <span className="newspaper-headline text-4xl font-bold text-gray-900">$9.99</span>
                                <span className="newspaper-body text-gray-700 font-medium">/month</span>
                            </div>
                        </div>

                        <div className="p-8 flex-1 flex flex-col">
                            <div className="newspaper-body space-y-4 mb-8 flex-1">
                                <div className="flex items-start space-x-3">
                                    <span className="text-green-600 font-bold text-lg">✓</span>
                                    <span>Everything in Free Edition</span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="text-green-600 font-bold text-lg">✓</span>
                                    <span><strong>Exclusive premium articles</strong></span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="text-green-600 font-bold text-lg">✓</span>
                                    <span>Ad-free reading experience</span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="text-green-600 font-bold text-lg">✓</span>
                                    <span>Advanced search & filters</span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="text-green-600 font-bold text-lg">✓</span>
                                    <span>Priority customer support</span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="text-green-600 font-bold text-lg">✓</span>
                                    <span>Offline reading capability</span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="text-green-600 font-bold text-lg">✓</span>
                                    <span>Detailed reading analytics</span>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate("/subscription")}
                                className="w-full newspaper-border bg-yellow-500 text-gray-900 py-4 px-6 hover:bg-yellow-400 transition-colors duration-300 uppercase tracking-wide font-semibold mt-auto"
                            >
                                Upgrade to Premium
                            </button>
                        </div>
                    </div>
                </div>

                {/* Additional Information */}
                <div className="text-center mt-12 pt-8 border-t border-gray-300">
                    <div className="newspaper-body text-gray-600 space-y-2">
                        <p>All plans include 24/7 access to breaking news and updates</p>
                        <p className="text-sm">Cancel anytime • No hidden fees • Secure payment processing</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Plans;
