import React from "react";
import SectionTitle from "../../component/SectionTitle/SectionTitle";
import { BookOpen, UserPlus, Star } from "lucide-react";

const HowItWorks = () => {
    const steps = [
        {
            title: "Sign Up & Explore",
            description:
                "Create a free account and explore a wide variety of articles from top publishers around the globe.",
            icon: <UserPlus className="w-12 h-12 text-indigo-600" />,
        },
        {
            title: "Read & Engage",
            description:
                "Browse articles, share your thoughts, and engage with a community of readers and writers.",
            icon: <BookOpen className="w-12 h-12 text-purple-600" />,
        },
        {
            title: "Upgrade for Premium",
            description:
                "Unlock exclusive premium articles and enjoy an ad-free, seamless reading experience.",
            icon: <Star className="w-12 h-12 text-yellow-500" />,
        },
    ];

    return (
        <section className="py-16 bg-gradient-to-r from-blue-100 via-purple-100 to-indigo-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 min-h-screen">
            <SectionTitle
                heading="How It Works"
                subHeading="A simple process to stay informed and enjoy premium news content"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto p-4">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-2xl shadow-lg p-6 text-center hover:scale-105 transition-transform duration-300"
                    >
                        <div className="flex justify-center mb-4">{step.icon}</div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                            {step.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;
