import React from 'react';
import TrendingArticles from './TrendingArticles';
import AllPublishers from './AllPublishers';
import Statistics from './Statistics';
import Plans from './Plans';
import SubscriptionAd from './SubscriptionAd';
import TopContributors from './TopContributorsNew';
import FrequentlyAskedQuestion from './FrequentlyAskedQuestion';
import UserTestimonials from './UserTestimonials';
import HowItWorks from './HowItWorks';

const Home = () => {
    return (
        <div className="bg-white">
            {/* Newspaper-style Hero Banner */}
            <section className="bg-white border-b-4 border-gray-900 py-4 sm:py-6 lg:py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="newspaper-quote mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg px-4">
                            "Bringing you the most comprehensive news coverage from around the globe,
                            delivered with integrity and journalistic excellence."
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 text-center">
                            <div className="bg-white border-2 sm:border-4 border-gray-900 p-4 sm:p-6 hover:bg-gray-50 hover:scale-102 hover:-translate-y-1 transform transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer animate-fadeInUp newspaper-card">
                                <div className="border-b-2 border-red-600 pb-2 mb-3 sm:mb-4">
                                    <div className="newspaper-headline text-base sm:text-lg uppercase tracking-wider mb-1 text-red-600 font-black">
                                        Breaking News
                                    </div>
                                    <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                                        LIVE UPDATES
                                    </div>
                                </div>
                                <div className="newspaper-body text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
                                    Latest updates available 24/7 from our dedicated newsroom team
                                </div>
                                <div className="mt-3 sm:mt-4 pt-3 border-t border-gray-300">
                                    <div className="text-xs text-gray-500 uppercase tracking-wider">Est. 2025</div>
                                </div>
                            </div>
                            <div className="bg-white border-2 sm:border-4 border-gray-900 p-4 sm:p-6 hover:bg-gray-50 hover:scale-102 hover:-translate-y-1 transform transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer animate-fadeInUp animation-delay-150 newspaper-card sm:col-span-2 lg:col-span-1">
                                <div className="border-b-2 border-yellow-600 pb-2 mb-3 sm:mb-4">
                                    <div className="newspaper-headline text-base sm:text-lg uppercase tracking-wider mb-1 text-yellow-600 font-black">
                                        Premium Content
                                    </div>
                                    <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                                        EXCLUSIVE REPORTS
                                    </div>
                                </div>
                                <div className="newspaper-body text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
                                    In-depth analysis and exclusive investigative stories from award-winning journalists
                                </div>
                                <div className="mt-3 sm:mt-4 pt-3 border-t border-gray-300">
                                    <div className="text-xs text-gray-500 uppercase tracking-wider">Premium Access</div>
                                </div>
                            </div>
                            <div className="bg-white border-2 sm:border-4 border-gray-900 p-4 sm:p-6 hover:bg-gray-50 hover:scale-102 hover:-translate-y-1 transform transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer animate-fadeInUp animation-delay-300 newspaper-card sm:col-span-2 lg:col-span-1">
                                <div className="border-b-2 border-blue-600 pb-2 mb-3 sm:mb-4">
                                    <div className="newspaper-headline text-base sm:text-lg uppercase tracking-wider mb-1 text-blue-600 font-black">
                                        Global Coverage
                                    </div>
                                    <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                                        WORLDWIDE NETWORK
                                    </div>
                                </div>
                                <div className="newspaper-body text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
                                    Comprehensive news from every corner of the world through our international correspondents
                                </div>
                                <div className="mt-3 sm:mt-4 pt-3 border-t border-gray-300">
                                    <div className="text-xs text-gray-500 uppercase tracking-wider">Global Reach</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <TrendingArticles></TrendingArticles>
            <AllPublishers></AllPublishers>
            <Statistics></Statistics>
            <Plans></Plans>
            <HowItWorks></HowItWorks>
            <TopContributors></TopContributors>
            <UserTestimonials></UserTestimonials>
            <FrequentlyAskedQuestion></FrequentlyAskedQuestion>
            <SubscriptionAd></SubscriptionAd>
        </div>
    );
};

export default Home;