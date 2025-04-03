import React from "react";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../../component/SectionTitle/SectionTitle";

const Plans = () => {
    const navigate = useNavigate();

    return (
        <section className="p-6">
            <SectionTitle heading="Choose Your Plan" subHeading="Find the perfect plan for your needs"></SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {/* Free Plan */}
                <div className="bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 border-blue-500 transform rounded-lg shadow-lg p-6 flex flex-col justify-between h-full hover:shadow-lg hover:scale-105 transition duration-300">
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">Free Plan</h3>
                        <ul className="list-disc pl-6 mb-4 text-gray-800">
                            <li>Access to basic features</li>
                            <li>Limited storage</li>
                            <li>Community support</li>
                        </ul>
                    </div>
                    <button
                        onClick={() => navigate("/subscription")}
                        className="btn btn-primary transform hover:scale-105 transition duration-300 text-md font-semibold"
                    >
                        Subscribe Now
                    </button>
                </div>

                {/* Premium Plan */}
                <div className="bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 border-blue-500 transform rounded-lg shadow-lg p-6 flex flex-col justify-between h-full hover:shadow-lg hover:scale-105 transition duration-300">
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">Premium Plan</h3>
                        <ul className="list-disc pl-6 mb-4 text-gray-800">
                            <li>Access to all features</li>
                            <li>Increased storage</li>
                            <li>Priority customer support</li>
                            <li>Advanced analytics</li>
                        </ul>
                    </div>
                    <button
                        onClick={() => navigate("/subscription")}
                        className="btn btn-primary transform hover:scale-105 transition duration-300 text-md font-semibold"
                    >
                        Subscribe Now
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Plans;
