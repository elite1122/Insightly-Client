import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUsers from "../../hooks/useUsers";
import useAuth from "../../hooks/useAuth";
import SectionTitle from "../../component/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const CheckoutForm = ({ amount, onSuccess, selectedUserId, premiumTaken }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsProcessing(true);

        if (!stripe || !elements) {
            setIsProcessing(false);
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });

        if (error) {
            setIsProcessing(false);
            Swal.fire({
                icon: "error",
                title: "Payment Failed",
                text: error.message || "An unexpected error occurred during payment confirmation. Please try again.",
                customClass: {
                    popup: 'newspaper-alert'
                }
            });
            return;
        }

        try {
            const { data } = await axiosSecure.post("/create-payment-intent", {
                amount: amount * 100, // Stripe expects amounts in cents
            });
            const clientSecret = data.clientSecret;

            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
            });

            if (confirmError) {
                setIsProcessing(false);
                Swal.fire({
                    icon: "error",
                    title: "Payment Failed",
                    text: confirmError.message || "An unexpected error occurred during payment confirmation. Please try again.",
                    customClass: {
                        popup: 'newspaper-alert'
                    }
                });
                return;
            }

            if (paymentIntent.status === "succeeded") {
                // Update subscription and role in the database
                await axiosSecure.patch(`/users/${selectedUserId}`, {
                    premiumTaken,
                    role: "premium", // Update role to "premium"
                });

                setIsProcessing(false);
                Swal.fire({
                    icon: "success",
                    title: "Welcome to Premium!",
                    text: "Your subscription is now active. Enjoy exclusive access to premium content and features.",
                    customClass: {
                        popup: 'newspaper-alert'
                    }
                });
                onSuccess();
            }
        } catch (error) {
            setIsProcessing(false);
            console.error("Payment processing error:", error);
            Swal.fire({
                icon: "error",
                title: "Payment Processing Error",
                text: error.message || "Failed to process your payment. Please try again.",
                customClass: {
                    popup: 'newspaper-alert'
                }
            });
        }
    };

    return (
        <div className="bg-white border-2 sm:border-4 border-gray-900 p-4 sm:p-6 lg:p-8 newspaper-card">
            <div className="text-center mb-4 sm:mb-6">
                <h3 className="newspaper-headline text-lg sm:text-xl text-gray-900 uppercase tracking-wider font-black mb-2">
                    Secure Payment
                </h3>
                <p className="newspaper-meta text-xs sm:text-sm text-gray-600 uppercase tracking-widest">
                    Encrypted & Protected Transaction
                </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="border-2 sm:border-4 border-gray-300 p-3 sm:p-4 bg-gray-50 rounded-none">
                    <label className="newspaper-meta text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-700 mb-2 sm:mb-3 block">
                        Card Information
                    </label>
                    <CardElement 
                        className="p-3 sm:p-4 border-2 border-gray-300 bg-white"
                        options={{
                            style: {
                                base: {
                                    fontSize: '14px',
                                    '@media (min-width: 640px)': {
                                        fontSize: '16px',
                                    },
                                    fontFamily: '"Crimson Text", serif',
                                    color: '#1f2937',
                                    '::placeholder': {
                                        color: '#6b7280',
                                    },
                                },
                            },
                        }}
                    />
                </div>
                
                <div className="border-t-2 sm:border-t-4 border-gray-900 pt-4 sm:pt-6">
                    <button
                        type="submit"
                        disabled={!stripe || isProcessing}
                        className={`w-full py-3 sm:py-4 px-4 sm:px-6 uppercase tracking-widest font-black text-sm sm:text-lg lg:text-xl border-2 sm:border-4 border-gray-900 transition-all duration-300 newspaper-button ${
                            isProcessing 
                                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                                : 'bg-gradient-to-r from-green-600 to-green-800 text-white hover:from-green-700 hover:to-green-900 transform hover:scale-105'
                        }`}
                    >
                        {isProcessing ? (
                            <div className="flex items-center justify-center">
                                <div className="relative mr-2 sm:mr-3">
                                    <div className="w-4 h-4 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-xs">💳</span>
                                    </div>
                                </div>
                                <span className="animate-pulse text-xs sm:text-base">Processing Secure Payment...</span>
                            </div>
                        ) : (
                            `Secure Payment • $${amount}`
                        )}
                    </button>
                    
                    <div className="mt-3 sm:mt-4 bg-gray-100 border-2 border-gray-300 p-2 sm:p-3 text-center">
                        <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider leading-tight">
                            🔒 SSL Encrypted • 💳 Secure Processing • ✅ Instant Activation
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
};


const Subscription = () => {
    const { user } = useAuth(); // Get the logged-in user's info
    const axiosSecure = useAxiosSecure();
    const { users } = useUsers();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [period, setPeriod] = useState("1 minute");
    const [selectedUserId, setSelectedUserId] = useState(""); // Store the logged-in user's ID
    const [amount, setAmount] = useState(2); // Default to $2

    useEffect(() => {
        if (user?.email && users.length > 0) {
            // Match the logged-in user's email with the email in the database
            const loggedInUser = users.find((dbUser) => dbUser.email === user.email);
            if (loggedInUser) {
                setSelectedUserId(loggedInUser._id.toString()); // Use _id and convert it to a string
            }
        }
    }, [user, users]);

    useEffect(() => {
        // Update the amount based on the selected period
        if (period === "1 minute") setAmount(2);
        else if (period === "5 days") setAmount(10);
        else if (period === "10 days") setAmount(15);
    }, [period]);

    const handleSuccess = () => {
        queryClient.invalidateQueries(["users"]);
        navigate('/');
    };

    const calculateExpiration = () => {
        const currentTime = new Date();
        if (period === "1 minute") {
            return new Date(currentTime.getTime() + 1 * 60 * 1000);
        } else if (period === "5 days") {
            return new Date(currentTime.getTime() + 5 * 24 * 60 * 60 * 1000);
        } else if (period === "10 days") {
            return new Date(currentTime.getTime() + 10 * 24 * 60 * 60 * 1000);
        }
    };

    const subscriptionPlans = [
        {
            value: "1 minute",
            name: "TRIAL PREMIUM",
            duration: "1 Minute",
            price: 2,
            description: "Perfect for testing premium features",
            features: ["Full Premium Access", "All Articles", "Ad-Free Experience", "Priority Support"],
            badge: "TRIAL",
            color: "blue"
        },
        {
            value: "5 days",
            name: "STANDARD PREMIUM",
            duration: "5 Days",
            price: 10,
            description: "Ideal for regular readers",
            features: ["Complete Premium Access", "Unlimited Articles", "Exclusive Content", "Expert Analysis", "Mobile App Access"],
            badge: "POPULAR",
            color: "green"
        },
        {
            value: "10 days",
            name: "EXTENDED PREMIUM",
            duration: "10 Days",
            price: 15,
            description: "Best value for dedicated readers",
            features: ["Full Premium Suite", "Unlimited Everything", "Early Access", "Premium Newsletter", "Personal Dashboard", "Archive Access"],
            badge: "BEST VALUE",
            color: "yellow"
        }
    ];

    const selectedPlan = subscriptionPlans.find(plan => plan.value === period);

    return (
        <section className="bg-white min-h-screen">
            <Helmet><title>Insightly | Premium Subscription</title></Helmet>
            
            {/* Newspaper Header */}
            <div className="bg-white border-b-4 border-gray-900 py-4 sm:py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center">
                        <h1 className="newspaper-headline text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-2">
                            PREMIUM SUBSCRIPTION
                        </h1>
                        <div className="flex items-center justify-center">
                            <div className="flex-1 border-t border-gray-400 max-w-16 sm:max-w-32"></div>
                            <p className="newspaper-meta text-gray-600 mx-2 sm:mx-4 uppercase tracking-widest text-xs sm:text-sm">
                                Upgrade Your Experience
                            </p>
                            <div className="flex-1 border-t border-gray-400 max-w-16 sm:max-w-32"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-start">
                    {/* Left Column - Subscription Plans */}
                    <div className="space-y-6 sm:space-y-8">
                        <div className="bg-white border-4 sm:border-8 border-gray-900 p-6 sm:p-8 lg:p-10 newspaper-card shadow-2xl relative">
                            <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 bg-green-600 text-white px-2 sm:px-4 py-1 sm:py-2 text-xs font-black uppercase tracking-wider transform -rotate-3">
                                PREMIUM PLANS
                            </div>
                            
                            <div className="text-center mb-6 sm:mb-8">
                                <h2 className="newspaper-headline text-xl sm:text-2xl lg:text-3xl text-gray-900 mb-4 sm:mb-6 uppercase tracking-wider font-black border-b-2 sm:border-b-4 border-gray-900 pb-3 sm:pb-4">
                                    Select Your Plan
                                </h2>
                            </div>

                            <div className="space-y-4 sm:space-y-6">
                                {subscriptionPlans.map((plan) => (
                                    <div
                                        key={plan.value}
                                        className={`border-2 sm:border-4 p-4 sm:p-6 cursor-pointer transition-all duration-300 newspaper-card relative ${
                                            period === plan.value 
                                                ? 'border-blue-600 bg-blue-50 shadow-lg' 
                                                : 'border-gray-300 bg-white hover:border-gray-500'
                                        }`}
                                        onClick={() => setPeriod(plan.value)}
                                    >
                                        <div className={`absolute -top-1 sm:-top-2 -right-1 sm:-right-2 px-2 sm:px-3 py-1 text-xs font-black uppercase tracking-wider text-white transform rotate-12 ${
                                            plan.color === 'blue' ? 'bg-blue-600' :
                                            plan.color === 'green' ? 'bg-green-600' :
                                            'bg-yellow-600'
                                        }`}>
                                            {plan.badge}
                                        </div>
                                        
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 space-y-2 sm:space-y-0">
                                            <div>
                                                <h3 className="newspaper-headline text-lg sm:text-xl font-black uppercase tracking-wider text-gray-900">
                                                    {plan.name}
                                                </h3>
                                                <p className="newspaper-meta text-xs sm:text-sm text-gray-600 uppercase tracking-widest">
                                                    {plan.duration}
                                                </p>
                                            </div>
                                            <div className="text-left sm:text-right">
                                                <div className="text-2xl sm:text-3xl font-black text-gray-900">${plan.price}</div>
                                                <div className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider">USD</div>
                                            </div>
                                        </div>
                                        
                                        <p className="text-gray-700 mb-3 sm:mb-4 font-medium text-sm sm:text-base">{plan.description}</p>
                                        
                                        <div className="space-y-1 sm:space-y-2">
                                            {plan.features.map((feature, index) => (
                                                <div key={index} className="flex items-center">
                                                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-600 rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                                                    <span className="text-xs sm:text-sm font-medium text-gray-700">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                        
                                        <div className={`mt-3 sm:mt-4 p-2 sm:p-3 border-2 text-center font-semibold text-xs sm:text-sm ${
                                            period === plan.value 
                                                ? 'border-blue-600 bg-blue-100 text-blue-800' 
                                                : 'border-gray-300 bg-gray-100 text-gray-600'
                                        }`}>
                                            {period === plan.value ? '✓ SELECTED PLAN' : 'Click to Select'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Payment Form */}
                    <div className="space-y-6 sm:space-y-8">
                        {/* Selected Plan Summary */}
                        <div className="bg-gradient-to-br from-gray-100 to-gray-200 border-2 sm:border-4 border-gray-900 p-4 sm:p-6 lg:p-8 shadow-xl">
                            <h3 className="newspaper-headline text-lg sm:text-xl lg:text-2xl text-gray-900 mb-3 sm:mb-4 uppercase tracking-wider font-black text-center">
                                Order Summary
                            </h3>
                            <div className="bg-white border-2 border-gray-700 p-4 sm:p-6">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 space-y-1 sm:space-y-0">
                                    <span className="font-bold text-base sm:text-lg">{selectedPlan?.name}</span>
                                    <span className="text-xl sm:text-2xl font-black">${selectedPlan?.price}</span>
                                </div>
                                <div className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                                    Duration: {selectedPlan?.duration}
                                </div>
                                <div className="border-t-2 border-gray-300 pt-3 sm:pt-4">
                                    <div className="flex justify-between items-center font-black text-lg sm:text-xl">
                                        <span>TOTAL:</span>
                                        <span>${amount} USD</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Form */}
                        <Elements stripe={stripePromise}>
                            <CheckoutForm
                                amount={amount}
                                onSuccess={handleSuccess}
                                selectedUserId={selectedUserId}
                                premiumTaken={calculateExpiration().toISOString()}
                            />
                        </Elements>

                        {/* Trust Indicators */}
                        <div className="bg-gray-50 border-2 border-gray-300 p-4 sm:p-6">
                            <h4 className="newspaper-meta text-center font-black uppercase tracking-wider text-gray-700 mb-3 sm:mb-4 text-xs sm:text-sm">
                                Why Choose Premium?
                            </h4>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-center">
                                <div className="p-2 sm:p-3 bg-white border border-gray-200 rounded-none hover:shadow-md transition-all duration-300">
                                    <div className="text-lg sm:text-xl lg:text-2xl mb-1 sm:mb-2">📰</div>
                                    <div className="text-xs sm:text-sm font-semibold leading-tight">Exclusive Articles</div>
                                </div>
                                <div className="p-2 sm:p-3 bg-white border border-gray-200 rounded-none hover:shadow-md transition-all duration-300">
                                    <div className="text-lg sm:text-xl lg:text-2xl mb-1 sm:mb-2">🚫</div>
                                    <div className="text-xs sm:text-sm font-semibold leading-tight">Zero Ads</div>
                                </div>
                                <div className="p-2 sm:p-3 bg-white border border-gray-200 rounded-none hover:shadow-md transition-all duration-300">
                                    <div className="text-lg sm:text-xl lg:text-2xl mb-1 sm:mb-2">⚡</div>
                                    <div className="text-xs sm:text-sm font-semibold leading-tight">Early Access</div>
                                </div>
                                <div className="p-2 sm:p-3 bg-white border border-gray-200 rounded-none hover:shadow-md transition-all duration-300">
                                    <div className="text-lg sm:text-xl lg:text-2xl mb-1 sm:mb-2">💬</div>
                                    <div className="text-xs sm:text-sm font-semibold leading-tight">Priority Support</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Subscription;
