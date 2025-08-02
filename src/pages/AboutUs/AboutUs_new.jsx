import { Helmet } from "react-helmet-async";
import SectionTitle from "../../component/SectionTitle/SectionTitle";

const AboutUs = () => {
    return (
        <section className="bg-white min-h-screen">
            <Helmet>
                <title>Insightly | About Us</title>
            </Helmet>
            
            {/* Newspaper Header */}
            <div className="bg-white border-b-4 border-gray-900 py-4 sm:py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center">
                        <h1 className="newspaper-headline text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-2">
                            ABOUT INSIGHTLY
                        </h1>
                        <div className="flex items-center justify-center">
                            <div className="flex-1 border-t border-gray-400 max-w-16 sm:max-w-32"></div>
                            <p className="newspaper-meta text-gray-600 mx-2 sm:mx-4 uppercase tracking-widest text-xs sm:text-sm">
                                Our Story & Mission
                            </p>
                            <div className="flex-1 border-t border-gray-400 max-w-16 sm:max-w-32"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
                {/* Mission Statement */}
                <div className="bg-white border-4 sm:border-8 border-gray-900 p-6 sm:p-8 lg:p-12 mb-8 sm:mb-16 newspaper-card shadow-2xl relative">
                    <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 bg-blue-600 text-white px-2 sm:px-4 py-1 sm:py-2 text-xs font-black uppercase tracking-wider transform -rotate-3">
                        OUR STORY
                    </div>
                    
                    <div className="text-center mb-6 sm:mb-8">
                        <h2 className="newspaper-headline text-2xl sm:text-3xl lg:text-4xl text-gray-900 mb-4 sm:mb-6 uppercase tracking-wider font-black border-b-2 sm:border-b-4 border-gray-900 pb-3 sm:pb-4">
                            Revolutionizing News
                        </h2>
                        <div className="max-w-4xl mx-auto">
                            <p className="newspaper-body text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed mb-4 sm:mb-6">
                                <span className="dropcap text-4xl sm:text-5xl lg:text-6xl float-left leading-none pr-2 pt-1 pb-1 text-gray-900 font-black">I</span>
                                nsightly represents the evolution of digital journalism, where cutting-edge technology meets timeless storytelling. Our platform bridges the gap between traditional newspaper excellence and modern digital convenience, creating an unparalleled reading experience for the contemporary audience.
                            </p>
                            <p className="newspaper-body text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                                Founded with the vision of democratizing quality journalism, we combine the credibility of established news organizations with the innovation of digital-first media companies. Every article, every feature, and every interaction is designed to inform, engage, and inspire our global community of readers.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Core Values Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-16">
                    {/* Mission Card */}
                    <div className="bg-white border-2 sm:border-4 border-gray-900 p-4 sm:p-6 lg:p-8 newspaper-card shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative">
                        <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 bg-blue-600 text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-black transform rotate-12">
                            1
                        </div>
                        <div className="text-center mb-4 sm:mb-6">
                            <div className="text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4">📰</div>
                            <h3 className="newspaper-headline text-lg sm:text-xl lg:text-2xl font-black uppercase tracking-wider text-gray-900 mb-3 sm:mb-4 border-b-2 border-gray-900 pb-2">
                                Our Mission
                            </h3>
                        </div>
                        <p className="newspaper-body text-gray-700 leading-relaxed text-center text-sm sm:text-base">
                            To revolutionize news consumption by providing a comprehensive platform that blends accuracy, speed, and user-focused experiences, making reliable news accessible to all corners of the globe.
                        </p>
                        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t-2 border-gray-300">
                            <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-1 sm:space-y-0 text-xs sm:text-sm text-gray-600">
                                <span className="font-semibold">✓ Accuracy</span>
                                <span className="font-semibold">✓ Speed</span>
                                <span className="font-semibold">✓ Accessibility</span>
                            </div>
                        </div>
                    </div>

                    {/* Vision Card */}
                    <div className="bg-white border-2 sm:border-4 border-gray-900 p-4 sm:p-6 lg:p-8 newspaper-card shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative">
                        <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 bg-green-600 text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-black transform rotate-12">
                            2
                        </div>
                        <div className="text-center mb-4 sm:mb-6">
                            <div className="text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4">🌟</div>
                            <h3 className="newspaper-headline text-lg sm:text-xl lg:text-2xl font-black uppercase tracking-wider text-gray-900 mb-3 sm:mb-4 border-b-2 border-gray-900 pb-2">
                                Our Vision
                            </h3>
                        </div>
                        <p className="newspaper-body text-gray-700 leading-relaxed text-center text-sm sm:text-base">
                            To create the go-to digital destination for news enthusiasts by combining cutting-edge technology, premium content, and intuitive design for a superior reading experience.
                        </p>
                        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t-2 border-gray-300">
                            <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-1 sm:space-y-0 text-xs sm:text-sm text-gray-600">
                                <span className="font-semibold">✓ Innovation</span>
                                <span className="font-semibold">✓ Quality</span>
                                <span className="font-semibold">✓ Excellence</span>
                            </div>
                        </div>
                    </div>

                    {/* Values Card */}
                    <div className="bg-white border-2 sm:border-4 border-gray-900 p-4 sm:p-6 lg:p-8 newspaper-card shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative sm:col-span-2 lg:col-span-1">
                        <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 bg-yellow-600 text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-black transform rotate-12">
                            3
                        </div>
                        <div className="text-center mb-4 sm:mb-6">
                            <div className="text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4">💡</div>
                            <h3 className="newspaper-headline text-lg sm:text-xl lg:text-2xl font-black uppercase tracking-wider text-gray-900 mb-3 sm:mb-4 border-b-2 border-gray-900 pb-2">
                                Our Values
                            </h3>
                        </div>
                        <p className="newspaper-body text-gray-700 leading-relaxed text-center text-sm sm:text-base">
                            Integrity, innovation, accessibility, and community engagement guide our commitment to delivering credible news and a premium user experience to every reader.
                        </p>
                        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t-2 border-gray-300">
                            <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-1 sm:space-y-0 text-xs sm:text-sm text-gray-600">
                                <span className="font-semibold">✓ Integrity</span>
                                <span className="font-semibold">✓ Community</span>
                                <span className="font-semibold">✓ Trust</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Showcase */}
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 border-2 sm:border-4 border-gray-900 p-6 sm:p-8 lg:p-12 mb-8 sm:mb-16 shadow-xl relative">
                    <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 bg-green-600 text-white px-2 sm:px-4 py-1 sm:py-2 text-xs font-black uppercase tracking-wider transform rotate-3">
                        PLATFORM FEATURES
                    </div>
                    
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="newspaper-headline text-xl sm:text-2xl lg:text-3xl text-gray-900 mb-3 sm:mb-4 uppercase tracking-wider font-black">
                            What Makes Us Different
                        </h2>
                        <p className="newspaper-meta text-gray-600 uppercase tracking-widest text-xs sm:text-sm">
                            CUTTING-EDGE TECHNOLOGY MEETS TRADITIONAL JOURNALISM
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                        <div className="text-center p-4 sm:p-6 bg-white border-2 border-gray-700 shadow-lg">
                            <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">⚡</div>
                            <h4 className="newspaper-meta font-black uppercase tracking-wider text-gray-900 mb-2 text-xs sm:text-sm">Lightning Fast</h4>
                            <p className="text-xs sm:text-sm text-gray-600">Real-time news updates delivered instantly to your device</p>
                        </div>
                        
                        <div className="text-center p-4 sm:p-6 bg-white border-2 border-gray-700 shadow-lg">
                            <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">🔒</div>
                            <h4 className="newspaper-meta font-black uppercase tracking-wider text-gray-900 mb-2 text-xs sm:text-sm">Premium Content</h4>
                            <p className="text-xs sm:text-sm text-gray-600">Exclusive articles and in-depth analysis for subscribers</p>
                        </div>
                        
                        <div className="text-center p-4 sm:p-6 bg-white border-2 border-gray-700 shadow-lg">
                            <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">📱</div>
                            <h4 className="newspaper-meta font-black uppercase tracking-wider text-gray-900 mb-2 text-xs sm:text-sm">Responsive Design</h4>
                            <p className="text-xs sm:text-sm text-gray-600">Seamless experience across all devices and platforms</p>
                        </div>
                        
                        <div className="text-center p-4 sm:p-6 bg-white border-2 border-gray-700 shadow-lg">
                            <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">🌍</div>
                            <h4 className="newspaper-meta font-black uppercase tracking-wider text-gray-900 mb-2 text-xs sm:text-sm">Global Reach</h4>
                            <p className="text-xs sm:text-sm text-gray-600">International news coverage from trusted sources worldwide</p>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-white border-4 sm:border-8 border-gray-900 p-8 sm:p-12 lg:p-16 text-center newspaper-card shadow-2xl relative">
                    <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 bg-yellow-600 text-white px-2 sm:px-4 py-1 sm:py-2 text-xs font-black uppercase tracking-wider transform -rotate-3">
                        JOIN US TODAY
                    </div>
                    
                    <div className="mb-6 sm:mb-8">
                        <h2 className="newspaper-headline text-2xl sm:text-3xl lg:text-4xl text-gray-900 mb-4 sm:mb-6 uppercase tracking-wider font-black">
                            Ready to Experience the Future of News?
                        </h2>
                        <p className="newspaper-body text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto">
                            Join thousands of readers who trust Insightly for their daily news consumption. Discover stories that matter, insights that inspire, and journalism that makes a difference.
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12">
                        <a
                            href="/allArticles"
                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 px-6 sm:px-8 uppercase tracking-widest font-black text-sm sm:text-base lg:text-xl border-2 sm:border-4 border-gray-900 transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                            Explore All Articles
                        </a>
                        <a
                            href="/subscription"
                            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white py-3 sm:py-4 px-6 sm:px-8 uppercase tracking-widest font-black text-sm sm:text-base lg:text-xl border-2 sm:border-4 border-gray-900 transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                            Upgrade to Premium
                        </a>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        <div className="p-4 sm:p-6 border-2 border-gray-300 bg-gray-50">
                            <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">📚</div>
                            <div className="newspaper-meta font-black uppercase tracking-wider text-gray-900 mb-2 text-xs sm:text-sm">Extensive Library</div>
                            <p className="text-xs sm:text-sm text-gray-600">Thousands of articles across multiple categories and topics</p>
                        </div>
                        <div className="p-4 sm:p-6 border-2 border-gray-300 bg-gray-50">
                            <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">👥</div>
                            <div className="newspaper-meta font-black uppercase tracking-wider text-gray-900 mb-2 text-xs sm:text-sm">Expert Authors</div>
                            <p className="text-xs sm:text-sm text-gray-600">Contributions from industry experts and seasoned journalists</p>
                        </div>
                        <div className="p-4 sm:p-6 border-2 border-gray-300 bg-gray-50 sm:col-span-2 lg:col-span-1">
                            <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">🚀</div>
                            <div className="newspaper-meta font-black uppercase tracking-wider text-gray-900 mb-2 text-xs sm:text-sm">Continuous Innovation</div>
                            <p className="text-xs sm:text-sm text-gray-600">Regular updates and new features to enhance your experience</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
