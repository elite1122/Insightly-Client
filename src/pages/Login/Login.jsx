import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import SocialLogin from "../../component/SocialLogin/SocialLogin";
import useAuth from "../../hooks/useAuth";
import SectionTitle from "../../component/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../component/LoadingSpinner/LoadingSpinner";

const Login = () => {
    const { signIn, user, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const redirectToPage = () => {
        const redirectTo = location.state?.from?.pathname || "/";
        navigate(redirectTo, { replace: true });
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const password = form.password.value;

        signIn(email, password)
            .then(() => {
                form.reset();
                Swal.fire({
                    icon: "success",
                    title: "Login Successful!",
                    text: "Welcome back to Insightly News.",
                    background: '#ffffff',
                    color: '#1f2937',
                    confirmButtonColor: '#16a34a',
                    confirmButtonText: 'Continue',
                    customClass: {
                        popup: 'border-4 border-gray-900 shadow-2xl',
                        title: 'text-xl font-black uppercase tracking-wider text-gray-900',
                        content: 'text-gray-700',
                        confirmButton: 'font-black uppercase tracking-wider px-6 py-3 border-2 border-gray-900'
                    }
                });
                redirectToPage();
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed!",
                    text: error.message,
                    background: '#ffffff',
                    color: '#1f2937',
                    confirmButtonColor: '#dc2626',
                    confirmButtonText: 'Try Again',
                    customClass: {
                        popup: 'border-4 border-gray-900 shadow-2xl',
                        title: 'text-xl font-black uppercase tracking-wider text-gray-900',
                        content: 'text-gray-700',
                        confirmButton: 'font-black uppercase tracking-wider px-6 py-3 border-2 border-gray-900'
                    }
                });
            });
    };

    // 🔥 Quick Login Handler
    const handleQuickLogin = (role) => {
        const credentials = {
            user: { email: "partho@gmail.com", password: "123Aa!" },
            admin: { email: "test@gmail.com", password: "123Aa!" },
        };

        const { email, password } = credentials[role];
        setEmail(email);

        signIn(email, password)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: `${role === "admin" ? "Admin" : "User"} Login Successful!`,
                    text: `Welcome ${role === "admin" ? "Admin" : "User"}! You have been logged in successfully.`,
                    background: '#ffffff',
                    color: '#1f2937',
                    confirmButtonColor: '#16a34a',
                    confirmButtonText: 'Continue',
                    customClass: {
                        popup: 'border-4 border-gray-900 shadow-2xl',
                        title: 'text-xl font-black uppercase tracking-wider text-gray-900',
                        content: 'text-gray-700',
                        confirmButton: 'font-black uppercase tracking-wider px-6 py-3 border-2 border-gray-900'
                    }
                });
                redirectToPage();
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Quick Login Failed!",
                    text: error.message,
                    background: '#ffffff',
                    color: '#1f2937',
                    confirmButtonColor: '#dc2626',
                    confirmButtonText: 'Try Again',
                    customClass: {
                        popup: 'border-4 border-gray-900 shadow-2xl',
                        title: 'text-xl font-black uppercase tracking-wider text-gray-900',
                        content: 'text-gray-700',
                        confirmButton: 'font-black uppercase tracking-wider px-6 py-3 border-2 border-gray-900'
                    }
                });
            });
    };

    return (
        <section className="bg-gray-50 min-h-screen">
            <Helmet><title>Insightly | Sign In</title></Helmet>
            
            {/* Newspaper Header */}
            <div className="bg-white border-b-4 border-gray-900 py-4 sm:py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center">
                        <h1 className="newspaper-headline text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-900 mb-2 uppercase tracking-wider font-black">
                            SIGN IN TO INSIGHTLY
                        </h1>
                        <div className="flex items-center justify-center">
                            <div className="flex-1 border-t border-gray-400 max-w-16 sm:max-w-32"></div>
                            <p className="newspaper-meta text-gray-600 mx-2 sm:mx-4 uppercase tracking-widest text-xs sm:text-sm">
                                ACCESS YOUR NEWS ACCOUNT
                            </p>
                            <div className="flex-1 border-t border-gray-400 max-w-16 sm:max-w-32"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
                {loading ? (
                    <LoadingSpinner 
                        size="large" 
                        text="Signing you in..." 
                        variant="newspaper"
                        fullScreen={true}
                    />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                        {/* Login Form Section */}
                        <div className="lg:col-span-2">
                            <div className="bg-white border-4 border-gray-900 p-6 sm:p-8 lg:p-10 shadow-2xl relative">
                                <div className="absolute -top-2 sm:-top-3 -left-2 sm:-left-3 bg-blue-600 text-white px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-black uppercase tracking-wider transform -rotate-3">
                                    SIGN IN
                                </div>
                                
                                <div className="border-b-4 border-gray-900 pb-4 sm:pb-6 mb-6 sm:mb-8">
                                    <h2 className="newspaper-headline text-lg sm:text-xl lg:text-2xl text-gray-900 uppercase tracking-wider font-black">
                                        Welcome Back
                                    </h2>
                                    <p className="newspaper-meta text-gray-600 text-xs sm:text-sm uppercase tracking-widest mt-2">
                                        Access your personalized news experience
                                    </p>
                                </div>

                                {/* Quick Login Buttons */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                                    <button
                                        onClick={() => handleQuickLogin("user")}
                                        className="bg-green-600 hover:bg-green-700 text-white py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm lg:text-base font-black uppercase tracking-widest border-2 border-gray-900 transition-all duration-300 hover:scale-105 shadow-lg"
                                    >
                                        🔓 Quick Login as User
                                    </button>
                                    <button
                                        onClick={() => handleQuickLogin("admin")}
                                        className="bg-purple-600 hover:bg-purple-700 text-white py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm lg:text-base font-black uppercase tracking-widest border-2 border-gray-900 transition-all duration-300 hover:scale-105 shadow-lg"
                                    >
                                        👑 Quick Login as Admin
                                    </button>
                                </div>

                                {/* Divider */}
                                <div className="flex items-center mb-6 sm:mb-8">
                                    <div className="flex-1 border-t-2 border-gray-300"></div>
                                    <span className="newspaper-meta text-gray-500 mx-3 sm:mx-4 text-xs sm:text-sm uppercase tracking-widest">OR LOGIN MANUALLY</span>
                                    <div className="flex-1 border-t-2 border-gray-300"></div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                                    {/* Email Field */}
                                    <div className="space-y-2 sm:space-y-3">
                                        <label className="block newspaper-meta text-sm sm:text-base font-black uppercase tracking-wider text-gray-900">
                                            Email Address <span className="text-red-600">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                name="email"
                                                type="email"
                                                placeholder="Enter your email address"
                                                className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-900 bg-white text-gray-900 placeholder-gray-500 text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-600 transition-all duration-300"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center">
                                                <span className="text-gray-400 text-lg sm:text-xl">📧</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Password Field */}
                                    <div className="space-y-2 sm:space-y-3">
                                        <label className="block newspaper-meta text-sm sm:text-base font-black uppercase tracking-wider text-gray-900">
                                            Password <span className="text-red-600">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                name="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter your password"
                                                className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-900 bg-white text-gray-900 placeholder-gray-500 text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-600 transition-all duration-300"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                            >
                                                {showPassword ? <FaEyeSlash className="text-lg sm:text-xl" /> : <FaEye className="text-lg sm:text-xl" />}
                                            </button>
                                        </div>
                                        <div className="text-right">
                                            <Link to="/forgot-password" className="newspaper-meta text-xs sm:text-sm text-blue-600 hover:text-blue-800 uppercase tracking-wider transition-colors duration-200">
                                                Forgot Password?
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-4 sm:pt-6 border-t-2 border-gray-300">
                                        <button
                                            type="submit"
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 px-6 sm:px-8 text-sm sm:text-base lg:text-lg font-black uppercase tracking-widest border-2 sm:border-4 border-gray-900 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden group"
                                        >
                                            <span className="relative z-10">🔐 SIGN IN TO ACCOUNT</span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                                        </button>
                                    </div>
                                </form>

                                {/* Register Link */}
                                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t-2 border-gray-300 text-center">
                                    <p className="newspaper-body text-gray-700 text-sm sm:text-base">
                                        Don't have an account? 
                                        <Link to="/register" className="newspaper-meta text-blue-600 hover:text-blue-800 ml-2 uppercase tracking-wider font-black transition-colors duration-200">
                                            Register Now
                                        </Link>
                                    </p>
                                </div>

                                {/* Social Login */}
                                <div className="mt-6 sm:mt-8">
                                    <SocialLogin />
                                </div>
                            </div>
                        </div>

                        {/* Info Sidebar */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Welcome Message */}
                            <div className="bg-white border-4 border-gray-900 p-4 sm:p-6 shadow-xl relative">
                                <div className="absolute -top-2 -right-2 bg-yellow-600 text-white px-2 py-1 text-xs font-black uppercase tracking-wider transform rotate-3">
                                    WELCOME
                                </div>
                                
                                <h3 className="newspaper-headline text-base sm:text-lg font-black uppercase tracking-wider text-gray-900 mb-3 sm:mb-4 border-b-2 border-gray-900 pb-2">
                                    Access Your World
                                </h3>
                                
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex items-start space-x-2 sm:space-x-3">
                                        <span className="text-blue-600 text-sm sm:text-base mt-1">📰</span>
                                        <p className="text-xs sm:text-sm text-gray-700">Personalized news feed tailored to your interests</p>
                                    </div>
                                    <div className="flex items-start space-x-2 sm:space-x-3">
                                        <span className="text-green-600 text-sm sm:text-base mt-1">🔒</span>
                                        <p className="text-xs sm:text-sm text-gray-700">Premium articles and exclusive content access</p>
                                    </div>
                                    <div className="flex items-start space-x-2 sm:space-x-3">
                                        <span className="text-purple-600 text-sm sm:text-base mt-1">⚡</span>
                                        <p className="text-xs sm:text-sm text-gray-700">Real-time breaking news notifications</p>
                                    </div>
                                    <div className="flex items-start space-x-2 sm:space-x-3">
                                        <span className="text-yellow-600 text-sm sm:text-base mt-1">💬</span>
                                        <p className="text-xs sm:text-sm text-gray-700">Comment and engage with the community</p>
                                    </div>
                                </div>
                            </div>

                            {/* Features Card */}
                            <div className="bg-white border-4 border-gray-900 p-4 sm:p-6 shadow-xl relative">
                                <div className="absolute -top-2 -right-2 bg-green-600 text-white px-2 py-1 text-xs font-black uppercase tracking-wider transform rotate-3">
                                    FEATURES
                                </div>
                                
                                <h3 className="newspaper-headline text-base sm:text-lg font-black uppercase tracking-wider text-gray-900 mb-3 sm:mb-4 border-b-2 border-gray-900 pb-2">
                                    Member Benefits
                                </h3>
                                
                                <div className="space-y-2 sm:space-y-3">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                        <span className="text-xs sm:text-sm text-gray-600 font-semibold">Article Bookmarks:</span>
                                        <span className="text-sm sm:text-base font-black text-green-600">Unlimited</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                        <span className="text-xs sm:text-sm text-gray-600 font-semibold">Daily Articles:</span>
                                        <span className="text-sm sm:text-base font-black text-blue-600">Unlimited</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-xs sm:text-sm text-gray-600 font-semibold">Premium Access:</span>
                                        <span className="text-sm sm:text-base font-black text-purple-600">Available</span>
                                    </div>
                                </div>
                            </div>

                            {/* Help Card */}
                            <div className="bg-white border-4 border-gray-900 p-4 sm:p-6 shadow-xl relative">
                                <div className="absolute -top-2 -right-2 bg-red-600 text-white px-2 py-1 text-xs font-black uppercase tracking-wider transform rotate-3">
                                    HELP
                                </div>
                                
                                <h3 className="newspaper-headline text-base sm:text-lg font-black uppercase tracking-wider text-gray-900 mb-3 sm:mb-4 border-b-2 border-gray-900 pb-2">
                                    Need Assistance?
                                </h3>
                                
                                <div className="space-y-2 sm:space-y-3">
                                    <button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-black uppercase tracking-wider border-2 border-gray-900 transition-all duration-300 hover:scale-105">
                                        📞 Contact Support
                                    </button>
                                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-black uppercase tracking-wider border-2 border-gray-900 transition-all duration-300 hover:scale-105">
                                        ❓ View FAQ
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Login;
