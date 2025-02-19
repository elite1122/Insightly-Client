import React from "react";
import SectionTitle from "../../component/SectionTitle/SectionTitle";
import { BookOpen, UserPlus, Star } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      title: "Sign Up & Explore",
      description:
        "Create a free account and explore a wide variety of articles from top publishers around the globe.",
      icon: <UserPlus className="w-16 h-16 text-indigo-600" />,
    },
    {
      title: "Read & Engage",
      description:
        "Browse articles, share your thoughts, and engage with a community of readers and writers.",
      icon: <BookOpen className="w-16 h-16 text-purple-600" />,
    },
    {
      title: "Upgrade for Premium",
      description:
        "Unlock exclusive premium articles and enjoy an ad-free, seamless reading experience.",
      icon: <Star className="w-16 h-16 text-yellow-500" />,
    },
  ];

  return (
    <section className="">
      <div className="p-6">
        <SectionTitle
          heading="How It Works"
          subHeading="A simple process to stay informed and enjoy premium news content"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 border-blue-500 transform rounded-lg p-6 border text-center shadow-md hover:shadow-lg hover:scale-105 transition duration-300"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="dark:text-gray-700 italic mt-2">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;