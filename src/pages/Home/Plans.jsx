import React from "react";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../../component/SectionTitle/SectionTitle";

const Plans = () => {
    const navigate = useNavigate();

    return (
        <section className="p-6">
            <SectionTitle heading="Choose Your Plan" subHeading="Find the perfect plan for your needs"></SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {/* Free Plan */}
                <div className="bg-gray-100 border rounded-lg shadow-lg p-6 flex flex-col justify-between h-full">
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">Free Plan</h3>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Access to basic features</li>
                            <li>Limited storage</li>
                            <li>Community support</li>
                        </ul>
                    </div>
                    <button
                        onClick={() => navigate("/subscription")}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-auto"
                    >
                        Subscribe Now
                    </button>
                </div>

                {/* Premium Plan */}
                <div className="bg-yellow-100 border rounded-lg shadow-lg p-6 flex flex-col justify-between h-full">
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">Premium Plan</h3>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Access to all features</li>
                            <li>Increased storage</li>
                            <li>Priority customer support</li>
                            <li>Advanced analytics</li>
                        </ul>
                    </div>
                    <button
                        onClick={() => navigate("/subscription")}
                        className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 mt-auto"
                    >
                        Subscribe Now
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Plans;
