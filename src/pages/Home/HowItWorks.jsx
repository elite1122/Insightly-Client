import React from "react";
import SectionTitle from "../../component/SectionTitle/SectionTitle";
import { BookOpen, UserPlus, Star } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      title: "Sign Up & Explore",
      description:
        "Create your free account and gain instant access to our comprehensive news archive. Browse articles from trusted publishers worldwide and discover stories that matter to you.",
      icon: <UserPlus className="w-12 h-12 text-white" />,
    },
    {
      step: "02",
      title: "Read & Engage",
      description:
        "Dive into quality journalism with our intuitive reading interface. Save articles for later, share your favorites, and join discussions with fellow readers.",
      icon: <BookOpen className="w-12 h-12 text-white" />,
    },
    {
      step: "03",
      title: "Upgrade for Premium",
      description:
        "Unlock exclusive investigative reports, in-depth analyses, and premium features. Enjoy an ad-free experience with unlimited access to all content.",
      icon: <Star className="w-12 h-12 text-white" />,
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Newspaper-style section header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="flex-1 border-t-2 border-gray-900"></div>
            <h2 className="newspaper-headline text-3xl md:text-4xl mx-6 text-gray-900">
              HOW IT WORKS
            </h2>
            <div className="flex-1 border-t-2 border-gray-900"></div>
          </div>
          <p className="newspaper-meta text-gray-600 uppercase tracking-widest">
            Your Journey to Quality Journalism
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Connecting line background for desktop */}
            <div className="hidden lg:block absolute top-14 left-0 right-0 h-0.5 bg-gray-300 z-0"></div>
            
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative group flex flex-col"
              >
                {/* Step Number */}
                <div className="text-center mb-6 relative">
                  <div className="bg-gray-900 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto relative z-10">
                    <span className="newspaper-headline text-xl">{step.step}</span>
                  </div>
                </div>

              <div className="newspaper-card bg-white border border-gray-300 p-8 text-center relative z-10 group-hover:bg-gray-50 transition-colors duration-300 flex-1 flex flex-col min-h-[400px]">
                {/* Icon */}
                <div className="bg-gray-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-yellow-500 transition-colors duration-300">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="newspaper-subheadline text-xl md:text-2xl text-gray-900 mb-4">
                  {step.title}
                </h3>
                
                <p className="newspaper-body text-gray-600 leading-relaxed flex-1 mb-6">
                  {step.description}
                </p>

                {/* Bottom accent */}
                <div className="mt-auto pt-4 border-t border-gray-200">
                  <div className="w-12 h-1 bg-gray-900 mx-auto group-hover:bg-yellow-500 transition-colors duration-300"></div>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16 pt-12 border-t border-gray-200">
          <div className="newspaper-body text-gray-600 mb-6">
            <p>Ready to start your journey with quality journalism?</p>
          </div>
          <button className="newspaper-border bg-gray-900 text-white px-8 py-4 hover:bg-gray-800 transition-colors duration-300 uppercase tracking-wide font-semibold">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;