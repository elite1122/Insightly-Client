import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import useAuth from "../../hooks/useAuth";
import SectionTitle from "../../component/SectionTitle/SectionTitle";
import SocialLogin from "../../component/SocialLogin/SocialLogin";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../../component/LoadingSpinner/LoadingSpinner";
import useUsers from "../../hooks/useUsers";

const Register = () => {
    const axiosPublic = useAxiosPublic();
    const { refetch } = useUsers();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile, user, setUser, loading } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    // Redirect if user is already logged in
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const onSubmit = async (data) => {
        try {
            const result = await createUser(data.email, data.password);
            const loggedUser = result.user;
    
            await updateUserProfile(data.name, data.photoURL);
            
            const userInfo = {
                name: data.name,
                email: data.email,
                photo: data.photoURL,
                role: "user",
                premiumTaken: null,
            };
    
            const response = await axiosPublic.post('/users', userInfo);
            if (response.data.insertedId) {
                // Force the user state update
                setUser({
                    ...loggedUser,
                    displayName: data.name,
                    photoURL: data.photoURL,
                });
    
                refetch(); // Optional, to refresh data like articles
    
                reset();
                Swal.fire({
                    icon: 'success',
                    title: 'Account Created Successfully!',
                    text: 'Welcome to Insightly News! Your account has been created.',
                    background: '#ffffff',
                    color: '#1f2937',
                    confirmButtonColor: '#16a34a',
                    confirmButtonText: 'Get Started',
                    customClass: {
                        popup: 'border-4 border-gray-900 shadow-2xl',
                        title: 'text-xl font-black uppercase tracking-wider text-gray-900',
                        content: 'text-gray-700',
                        confirmButton: 'font-black uppercase tracking-wider px-6 py-3 border-2 border-gray-900'
                    }
                });
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <section className="bg-gray-50 min-h-screen">
            <Helmet>
                <title>Insightly | Sign Up</title>
            </Helmet>

            {/* Newspaper Header */}
            <div className="bg-white border-b-4 border-gray-900 py-4 sm:py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center">
                        <h1 className="newspaper-headline text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-900 mb-2 uppercase tracking-wider font-black">
                            JOIN INSIGHTLY TODAY
                        </h1>
                        <div className="flex items-center justify-center">
                            <div className="flex-1 border-t border-gray-400 max-w-16 sm:max-w-32"></div>
                            <p className="newspaper-meta text-gray-600 mx-2 sm:mx-4 uppercase tracking-widest text-xs sm:text-sm">
                                CREATE YOUR NEWS ACCOUNT
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
                        text="Creating your account..." 
                        variant="newspaper"
                        fullScreen={true}
                    />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                        {/* Registration Form Section */}
                        <div className="lg:col-span-2">
                            <div className="bg-white border-4 border-gray-900 p-6 sm:p-8 lg:p-10 shadow-2xl relative">
                                <div className="absolute -top-2 sm:-top-3 -left-2 sm:-left-3 bg-green-600 text-white px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-black uppercase tracking-wider transform -rotate-3">
                                    SIGN UP
                                </div>
                                
                                <div className="border-b-4 border-gray-900 pb-4 sm:pb-6 mb-6 sm:mb-8">
                                    <h2 className="newspaper-headline text-lg sm:text-xl lg:text-2xl text-gray-900 uppercase tracking-wider font-black">
                                        Create Your Account
                                    </h2>
                                    <p className="newspaper-meta text-gray-600 text-xs sm:text-sm uppercase tracking-widest mt-2">
                                        Join thousands of readers worldwide
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
                                    {/* Name Field */}
                                    <div className="space-y-2 sm:space-y-3">
                                        <label className="block newspaper-meta text-sm sm:text-base font-black uppercase tracking-wider text-gray-900">
                                            Full Name <span className="text-red-600">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                {...register("name", { required: true })}
                                                placeholder="Enter your full name"
                                                className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-900 bg-white text-gray-900 placeholder-gray-500 text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-600 transition-all duration-300"
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center">
                                                <span className="text-gray-400 text-lg sm:text-xl">👤</span>
                                            </div>
                                        </div>
                                        {errors.name && (
                                            <div className="bg-red-50 border-l-4 border-red-600 p-2 sm:p-3">
                                                <p className="text-red-700 text-xs sm:text-sm font-semibold">
                                                    ⚠️ Name is required
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Photo URL Field */}
                                    <div className="space-y-2 sm:space-y-3">
                                        <label className="block newspaper-meta text-sm sm:text-base font-black uppercase tracking-wider text-gray-900">
                                            Profile Photo URL <span className="text-red-600">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                {...register("photoURL", { required: true })}
                                                placeholder="Enter your photo URL"
                                                className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-900 bg-white text-gray-900 placeholder-gray-500 text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-600 transition-all duration-300"
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center">
                                                <span className="text-gray-400 text-lg sm:text-xl">🖼️</span>
                                            </div>
                                        </div>
                                        {errors.photoURL && (
                                            <div className="bg-red-50 border-l-4 border-red-600 p-2 sm:p-3">
                                                <p className="text-red-700 text-xs sm:text-sm font-semibold">
                                                    ⚠️ Photo URL is required
                                                </p>
                                            </div>
                                        )}
                                        <div className="bg-blue-50 border-l-4 border-blue-600 p-2 sm:p-3">
                                            <p className="text-blue-700 text-xs sm:text-sm">
                                                💡 <strong>Tip:</strong> Use a high-quality image URL for your profile picture.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Email Field */}
                                    <div className="space-y-2 sm:space-y-3">
                                        <label className="block newspaper-meta text-sm sm:text-base font-black uppercase tracking-wider text-gray-900">
                                            Email Address <span className="text-red-600">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                {...register("email", { required: true })}
                                                placeholder="Enter your email address"
                                                className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-900 bg-white text-gray-900 placeholder-gray-500 text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-600 transition-all duration-300"
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center">
                                                <span className="text-gray-400 text-lg sm:text-xl">📧</span>
                                            </div>
                                        </div>
                                        {errors.email && (
                                            <div className="bg-red-50 border-l-4 border-red-600 p-2 sm:p-3">
                                                <p className="text-red-700 text-xs sm:text-sm font-semibold">
                                                    ⚠️ Email is required
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Password Field */}
                                    <div className="space-y-2 sm:space-y-3">
                                        <label className="block newspaper-meta text-sm sm:text-base font-black uppercase tracking-wider text-gray-900">
                                            Password <span className="text-red-600">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                {...register("password", {
                                                    required: true,
                                                    minLength: 6,
                                                    maxLength: 20,
                                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                                })}
                                                placeholder="Create a strong password"
                                                className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-900 bg-white text-gray-900 placeholder-gray-500 text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-600 transition-all duration-300"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                            >
                                                {showPassword ? <FaEyeSlash className="text-lg sm:text-xl" /> : <FaEye className="text-lg sm:text-xl" />}
                                            </button>
                                        </div>
                                        
                                        {/* Password Validation Messages */}
                                        {errors.password?.type === 'required' && (
                                            <div className="bg-red-50 border-l-4 border-red-600 p-2 sm:p-3">
                                                <p className="text-red-700 text-xs sm:text-sm font-semibold">⚠️ Password is required</p>
                                            </div>
                                        )}
                                        {errors.password?.type === 'minLength' && (
                                            <div className="bg-red-50 border-l-4 border-red-600 p-2 sm:p-3">
                                                <p className="text-red-700 text-xs sm:text-sm font-semibold">⚠️ Password must be at least 6 characters</p>
                                            </div>
                                        )}
                                        {errors.password?.type === 'maxLength' && (
                                            <div className="bg-red-50 border-l-4 border-red-600 p-2 sm:p-3">
                                                <p className="text-red-700 text-xs sm:text-sm font-semibold">⚠️ Password must be less than 20 characters</p>
                                            </div>
                                        )}
                                        {errors.password?.type === 'pattern' && (
                                            <div className="bg-red-50 border-l-4 border-red-600 p-2 sm:p-3">
                                                <p className="text-red-700 text-xs sm:text-sm font-semibold">⚠️ Password must contain uppercase, lowercase, number, and special character</p>
                                            </div>
                                        )}
                                        
                                        <div className="bg-yellow-50 border-l-4 border-yellow-600 p-2 sm:p-3">
                                            <p className="text-yellow-700 text-xs sm:text-sm">
                                                🔐 <strong>Password Requirements:</strong> At least 6 characters, one uppercase, one lowercase, one number, and one special character.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-4 sm:pt-6 border-t-2 border-gray-300">
                                        <button
                                            type="submit"
                                            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 sm:py-4 px-6 sm:px-8 text-sm sm:text-base lg:text-lg font-black uppercase tracking-widest border-2 sm:border-4 border-gray-900 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden group"
                                        >
                                            <span className="relative z-10">🎉 CREATE ACCOUNT</span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                                        </button>
                                    </div>
                                </form>

                                {/* Login Link */}
                                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t-2 border-gray-300 text-center">
                                    <p className="newspaper-body text-gray-700 text-sm sm:text-base">
                                        Already have an account? 
                                        <Link to="/login" className="newspaper-meta text-blue-600 hover:text-blue-800 ml-2 uppercase tracking-wider font-black transition-colors duration-200">
                                            Sign In
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
                            {/* Benefits Card */}
                            <div className="bg-white border-4 border-gray-900 p-4 sm:p-6 shadow-xl relative">
                                <div className="absolute -top-2 -right-2 bg-green-600 text-white px-2 py-1 text-xs font-black uppercase tracking-wider transform rotate-3">
                                    BENEFITS
                                </div>
                                
                                <h3 className="newspaper-headline text-base sm:text-lg font-black uppercase tracking-wider text-gray-900 mb-3 sm:mb-4 border-b-2 border-gray-900 pb-2">
                                    Why Join Us?
                                </h3>
                                
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex items-start space-x-2 sm:space-x-3">
                                        <span className="text-blue-600 text-sm sm:text-base mt-1">📰</span>
                                        <p className="text-xs sm:text-sm text-gray-700">Access to premium articles and exclusive content</p>
                                    </div>
                                    <div className="flex items-start space-x-2 sm:space-x-3">
                                        <span className="text-green-600 text-sm sm:text-base mt-1">⚡</span>
                                        <p className="text-xs sm:text-sm text-gray-700">Real-time breaking news notifications</p>
                                    </div>
                                    <div className="flex items-start space-x-2 sm:space-x-3">
                                        <span className="text-purple-600 text-sm sm:text-base mt-1">💬</span>
                                        <p className="text-xs sm:text-sm text-gray-700">Comment and engage with community</p>
                                    </div>
                                    <div className="flex items-start space-x-2 sm:space-x-3">
                                        <span className="text-yellow-600 text-sm sm:text-base mt-1">🔖</span>
                                        <p className="text-xs sm:text-sm text-gray-700">Bookmark articles for later reading</p>
                                    </div>
                                    <div className="flex items-start space-x-2 sm:space-x-3">
                                        <span className="text-red-600 text-sm sm:text-base mt-1">📊</span>
                                        <p className="text-xs sm:text-sm text-gray-700">Personalized content recommendations</p>
                                    </div>
                                </div>
                            </div>

                            {/* Security Card */}
                            <div className="bg-white border-4 border-gray-900 p-4 sm:p-6 shadow-xl relative">
                                <div className="absolute -top-2 -right-2 bg-blue-600 text-white px-2 py-1 text-xs font-black uppercase tracking-wider transform rotate-3">
                                    SECURITY
                                </div>
                                
                                <h3 className="newspaper-headline text-base sm:text-lg font-black uppercase tracking-wider text-gray-900 mb-3 sm:mb-4 border-b-2 border-gray-900 pb-2">
                                    Your Data is Safe
                                </h3>
                                
                                <div className="space-y-2 sm:space-y-3">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                        <span className="text-xs sm:text-sm text-gray-600 font-semibold">Encryption:</span>
                                        <span className="text-sm sm:text-base font-black text-green-600">256-bit SSL</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                        <span className="text-xs sm:text-sm text-gray-600 font-semibold">Privacy:</span>
                                        <span className="text-sm sm:text-base font-black text-blue-600">GDPR Compliant</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-xs sm:text-sm text-gray-600 font-semibold">Data Storage:</span>
                                        <span className="text-sm sm:text-base font-black text-purple-600">Secure Cloud</span>
                                    </div>
                                </div>
                            </div>

                            {/* Community Card */}
                            <div className="bg-white border-4 border-gray-900 p-4 sm:p-6 shadow-xl relative">
                                <div className="absolute -top-2 -right-2 bg-purple-600 text-white px-2 py-1 text-xs font-black uppercase tracking-wider transform rotate-3">
                                    COMMUNITY
                                </div>
                                
                                <h3 className="newspaper-headline text-base sm:text-lg font-black uppercase tracking-wider text-gray-900 mb-3 sm:mb-4 border-b-2 border-gray-900 pb-2">
                                    Join Our Community
                                </h3>
                                
                                <div className="space-y-2 sm:space-y-3">
                                    <div className="text-center p-3 sm:p-4 bg-gray-50 border border-gray-300">
                                        <div className="text-lg sm:text-xl font-black text-gray-900">10,000+</div>
                                        <div className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider">Active Readers</div>
                                    </div>
                                    <div className="text-center p-3 sm:p-4 bg-gray-50 border border-gray-300">
                                        <div className="text-lg sm:text-xl font-black text-gray-900">500+</div>
                                        <div className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider">Daily Articles</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Register;
