import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

    const handleGoogleSignIn = async () => {
        try {
            const result = await googleSignIn();
            const user = result.user;

            if (user?.photoURL) {
                // Upload image to imgbb
                const formData = new FormData();
                formData.append("image", user.photoURL);
                const imgRes = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, formData);

                if (imgRes.data.success) {
                    const userInfo = {
                        email: user.email,
                        name: user.displayName,
                        photo: imgRes.data.data.url,
                        role: "user",
                        premiumTaken: null,
                    };

                    await axiosPublic.post("/users", userInfo);
                    navigate("/");
                }
            }
        } catch (error) {
            console.error("Google sign-in error:", error);
        }
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Professional Divider */}
            <div className="flex items-center">
                <div className="flex-1 border-t-2 border-gray-300"></div>
                <span className="newspaper-meta text-gray-500 mx-3 sm:mx-4 text-xs sm:text-sm uppercase tracking-widest bg-white px-2 sm:px-3">
                    OR CONTINUE WITH
                </span>
                <div className="flex-1 border-t-2 border-gray-300"></div>
            </div>

            {/* Enhanced Google Sign-in Button */}
            <div className="w-full">
                <button 
                    onClick={handleGoogleSignIn} 
                    className="group w-full bg-white hover:bg-gray-50 text-gray-900 py-4 sm:py-5 px-6 sm:px-8 border-4 border-gray-900 hover:border-blue-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden"
                >
                    {/* Background Animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    
                    {/* Button Content */}
                    <div className="relative z-10 flex items-center justify-center space-x-3 sm:space-x-4">
                        {/* Google Icon with Enhanced Styling */}
                        <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full border-2 border-gray-200 group-hover:border-blue-400 transition-all duration-300 group-hover:scale-110">
                            <FcGoogle className="text-xl sm:text-2xl" />
                        </div>
                        
                        {/* Text Content */}
                        <div className="text-left">
                            <div className="newspaper-meta text-sm sm:text-base lg:text-lg font-black uppercase tracking-wider text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                                🚀 Continue with Google
                            </div>
                            <div className="newspaper-body text-xs sm:text-sm text-gray-600 group-hover:text-blue-600 transition-colors duration-300 mt-1">
                                Fast, secure, and trusted sign-in
                            </div>
                        </div>
                        
                        {/* Arrow Icon */}
                        <div className="ml-auto transform group-hover:translate-x-1 transition-transform duration-300">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                    
                    {/* Security Badge */}
                    <div className="absolute -top-1 -right-1 bg-green-600 text-white px-1 sm:px-2 py-0.5 sm:py-1 text-xs font-black uppercase tracking-wider transform rotate-12 shadow-lg">
                        SECURE
                    </div>
                </button>
                
                {/* Additional Info */}
                <div className="mt-3 sm:mt-4 text-center">
                    <p className="newspaper-body text-xs sm:text-sm text-gray-600">
                        🔒 <strong>Protected by Google</strong> - Your data is safe with us
                    </p>
                    <div className="flex items-center justify-center space-x-4 sm:space-x-6 mt-2 sm:mt-3">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs text-gray-500 uppercase tracking-wider">SSL ENCRYPTED</span>
                        </div>
                        <div className="flex items-center space-x-1 sm:space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-xs text-gray-500 uppercase tracking-wider">GDPR COMPLIANT</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SocialLogin;
