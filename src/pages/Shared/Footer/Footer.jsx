import {
    FaFacebook,
    FaTwitter,
    FaYoutube,
    FaInstagram,
} from "react-icons/fa"
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white w-full">
            {/* Main Footer Content */}
            <div className="border-t-4 border-yellow-400 bg-gray-900 w-full">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    {/* Newspaper Header */}
                    <div className="text-center mb-12 border-b border-gray-700 pb-8">
                        <h2 className="newspaper-headline text-4xl md:text-5xl text-white mb-2">
                            INSIGHTLY
                        </h2>
                        <p className="newspaper-meta text-gray-400 uppercase tracking-widest text-sm">
                            Your Trusted News Source Since 2025
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        {/* Contact Information */}
                        <div className="space-y-4">
                            <h3 className="newspaper-subheadline text-xl text-yellow-400 mb-4 uppercase tracking-wide">
                                Newsroom
                            </h3>
                            <div className="space-y-3 text-gray-300">
                                <div className="flex items-start space-x-2">
                                    <span className="newspaper-meta text-xs text-gray-500 mt-1 uppercase min-w-fit">Location:</span>
                                    <span className="newspaper-body text-sm">Jhenaidah-7300, Bangladesh</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <span className="newspaper-meta text-xs text-gray-500 mt-1 uppercase min-w-fit">Phone:</span>
                                    <span className="newspaper-body text-sm">+880 175 592 6275</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <span className="newspaper-meta text-xs text-gray-500 mt-1 uppercase min-w-fit">Email:</span>
                                    <span className="newspaper-body text-sm break-all">rasheduzzamanelite@gmail.com</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <span className="newspaper-meta text-xs text-gray-500 mt-1 uppercase min-w-fit">Hours:</span>
                                    <span className="newspaper-body text-sm">9:00 AM - 5:00 PM</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-4">
                            <h3 className="newspaper-subheadline text-xl text-yellow-400 mb-4 uppercase tracking-wide">
                                Sections
                            </h3>
                            <ul className="space-y-2">
                                <li><Link to='/' className="newspaper-body text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm uppercase tracking-wide">Home</Link></li>
                                <li><Link to='/allArticles' className="newspaper-body text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm uppercase tracking-wide">All Articles</Link></li>
                                <li><Link to='/about' className="newspaper-body text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm uppercase tracking-wide">About Us</Link></li>
                                <li><Link to='/subscription' className="newspaper-body text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm uppercase tracking-wide">Subscription</Link></li>
                            </ul>
                        </div>

                        {/* Categories */}
                        <div className="space-y-4">
                            <h3 className="newspaper-subheadline text-xl text-yellow-400 mb-4 uppercase tracking-wide">
                                Categories
                            </h3>
                            <ul className="space-y-2">
                                <li className="newspaper-body text-gray-300 text-sm uppercase tracking-wide">Technology</li>
                                <li className="newspaper-body text-gray-300 text-sm uppercase tracking-wide">Finance</li>
                                <li className="newspaper-body text-gray-300 text-sm uppercase tracking-wide">Healthcare</li>
                                <li className="newspaper-body text-gray-300 text-sm uppercase tracking-wide">Environment</li>
                                <li className="newspaper-body text-gray-300 text-sm uppercase tracking-wide">Travel</li>
                            </ul>
                        </div>

                        {/* Social Media & Subscribe */}
                        <div className="space-y-6">
                            <h3 className="newspaper-subheadline text-xl text-yellow-400 mb-4 uppercase tracking-wide">
                                Connect
                            </h3>
                            
                            <div className="grid grid-cols-4 gap-3">
                                <a href="https://www.facebook.com/elite1122" target="_blank" rel="noopener noreferrer" 
                                   className="bg-gray-800 p-3 hover:bg-yellow-400 hover:text-gray-900 transition-colors duration-300 text-center">
                                    <FaFacebook className="text-lg mx-auto" />
                                </a>
                                <a href="https://x.com/rz_elite_" target="_blank" rel="noopener noreferrer"
                                   className="bg-gray-800 p-3 hover:bg-yellow-400 hover:text-gray-900 transition-colors duration-300 text-center">
                                    <FaTwitter className="text-lg mx-auto" />
                                </a>
                                <a href="https://www.youtube.com/@learnwithelite5162" target="_blank" rel="noopener noreferrer"
                                   className="bg-gray-800 p-3 hover:bg-yellow-400 hover:text-gray-900 transition-colors duration-300 text-center">
                                    <FaYoutube className="text-lg mx-auto" />
                                </a>
                                <a href="https://www.instagram.com/_rz.elite_/" target="_blank" rel="noopener noreferrer"
                                   className="bg-gray-800 p-3 hover:bg-yellow-400 hover:text-gray-900 transition-colors duration-300 text-center">
                                    <FaInstagram className="text-lg mx-auto" />
                                </a>
                            </div>

                            <div className="bg-gray-800 p-4 border border-gray-700">
                                <h4 className="newspaper-meta text-yellow-400 text-xs uppercase tracking-widest mb-2">
                                    Daily Newsletter
                                </h4>
                                <p className="newspaper-body text-gray-300 text-sm mb-3">
                                    Get the latest news delivered to your inbox.
                                </p>
                                <button className="w-full newspaper-border bg-yellow-400 text-gray-900 py-2 px-4 hover:bg-yellow-300 transition-colors duration-300 text-sm font-semibold uppercase tracking-wide">
                                    Subscribe Now
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Weather Widget */}
                    <div className="border-t border-gray-700 mt-12 pt-8">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                            <div className="bg-gray-800 p-4 text-center border border-gray-700">
                                <div className="newspaper-meta text-yellow-400 text-xs uppercase tracking-widest mb-1">Today's Weather</div>
                                <div className="newspaper-body text-white text-lg">22°C</div>
                                <div className="newspaper-body text-gray-400 text-sm">Partly Cloudy</div>
                            </div>
                            <div className="bg-gray-800 p-4 text-center border border-gray-700">
                                <div className="newspaper-meta text-yellow-400 text-xs uppercase tracking-widest mb-1">Market Update</div>
                                <div className="newspaper-body text-green-400 text-lg">+2.4%</div>
                                <div className="newspaper-body text-gray-400 text-sm">S&P 500</div>
                            </div>
                            <div className="bg-gray-800 p-4 text-center border border-gray-700">
                                <div className="newspaper-meta text-yellow-400 text-xs uppercase tracking-widest mb-1">Breaking</div>
                                <div className="newspaper-body text-red-400 text-sm">Live Updates Available</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Copyright Section */}
            <div className="bg-black border-t-2 border-yellow-400 py-8 sm:py-10 w-full relative overflow-hidden">
                {/* Decorative newspaper lines */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400"></div>
                
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
                        {/* Copyright Info */}
                        <div className="text-center lg:text-left space-y-2">
                            <div className="newspaper-meta text-gray-400 text-xs sm:text-sm uppercase tracking-widest">
                                © {new Date().getFullYear()} Insightly News
                            </div>
                            <div className="newspaper-body text-gray-500 text-xs">
                                All Rights Reserved.
                            </div>
                            <div className="flex items-center justify-center lg:justify-start space-x-2 mt-3">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span className="newspaper-meta text-gray-600 text-xs uppercase tracking-wider">
                                    Trusted News Source
                                </span>
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <div className="text-center">
                            <div className="inline-flex flex-wrap justify-center items-center space-x-1 sm:space-x-2">
                                <Link to="/privacy" className="newspaper-meta text-gray-400 hover:text-yellow-400 cursor-pointer transition-all duration-300 text-xs sm:text-sm uppercase tracking-widest px-2 sm:px-3 py-1 hover:bg-gray-900 rounded">
                                    Privacy Policy
                                </Link>
                                <span className="text-gray-600 text-xs">•</span>
                                <Link to="/terms" className="newspaper-meta text-gray-400 hover:text-yellow-400 cursor-pointer transition-all duration-300 text-xs sm:text-sm uppercase tracking-widest px-2 sm:px-3 py-1 hover:bg-gray-900 rounded">
                                    Terms of Service
                                </Link>
                                <span className="text-gray-600 text-xs">•</span>
                                <Link to="/contact" className="newspaper-meta text-gray-400 hover:text-yellow-400 cursor-pointer transition-all duration-300 text-xs sm:text-sm uppercase tracking-widest px-2 sm:px-3 py-1 hover:bg-gray-900 rounded">
                                    Contact
                                </Link>
                            </div>
                            
                            {/* Newspaper-style divider */}
                            <div className="flex items-center justify-center mt-4">
                                <div className="flex-1 border-t border-gray-700 max-w-8"></div>
                                <div className="newspaper-meta text-yellow-400 mx-3 text-xs uppercase tracking-widest">
                                    Est. 2025
                                </div>
                                <div className="flex-1 border-t border-gray-700 max-w-8"></div>
                            </div>
                        </div>

                        {/* Developer Credit */}
                        <div className="text-center lg:text-right space-y-2">
                            <div className="newspaper-meta text-gray-500 text-xs uppercase tracking-widest">
                                Crafted With Excellence
                            </div>
                            <div className="flex items-center justify-center lg:justify-end space-x-2">
                                <span className="newspaper-body text-gray-400 text-xs">Developed by</span>
                                <a 
                                    href="https://github.com/elite1122" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="newspaper-meta text-yellow-400 hover:text-yellow-300 transition-colors duration-300 text-xs sm:text-sm uppercase tracking-wider font-semibold"
                                >
                                    Rasheduzzaman Elite
                                </a>
                            </div>
                            <div className="flex items-center justify-center lg:justify-end space-x-1 mt-2">
                                <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                                <span className="newspaper-meta text-gray-600 text-xs uppercase tracking-wider">
                                    Full Stack Developer
                                </span>
                                <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom decorative border */}
                    <div className="mt-8 pt-6 border-t border-gray-800">
                        <div className="flex items-center justify-center space-x-4">
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                            </div>
                            <span className="newspaper-meta text-gray-600 text-xs uppercase tracking-widest">
                                Quality • Integrity • Innovation
                            </span>
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
                                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{animationDelay: '0.8s'}}></div>
                                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;