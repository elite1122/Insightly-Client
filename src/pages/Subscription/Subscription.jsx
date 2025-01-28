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

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });

        if (error) {
            // console.error("Payment error:", error);
            Swal.fire({
                icon: "error",
                title: "Payment Failed",
                text: error.message || "An unexpected error occurred during payment confirmation. Please try again.",
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
                // console.error("Payment confirmation error:", confirmError);
                Swal.fire({
                    icon: "error",
                    title: "Payment Failed",
                    text: confirmError.message || "An unexpected error occurred during payment confirmation. Please try again.",
                });
                return;
            }

            if (paymentIntent.status === "succeeded") {
                // Update subscription and role in the database
                await axiosSecure.patch(`/users/${selectedUserId}`, {
                    premiumTaken,
                    role: "premium", // Update role to "premium"
                });

                Swal.fire({
                    icon: "success",
                    title: "Payment Successful",
                    text: "Your subscription is now active, and your account is upgraded to premium.",
                });
                onSuccess();
            }
        } catch (error) {
            console.error("Payment processing error:", error);
            Swal.fire({
                icon: "error",
                title: "An Error Occurred",
                text: error.message || "Failed to process your payment. Please try again.",
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <CardElement className="p-2 border rounded" />
            <button
                type="submit"
                disabled={!stripe}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
            >
                Pay ${amount}
            </button>
        </form>
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

    return (
        <section className="min-h-screen bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 border-yellow-500 shadow-2xl transform">
            <Helmet><title>Insightly | Subscription</title></Helmet>
            {/* Banner */}
            <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-center py-10 mb-8 shadow-lg">
                <SectionTitle heading="Upgrade to Premium" subHeading="Enjoy exclusive features with our premium plan"></SectionTitle>
            </div>

            {/* Subscription Options */}
            <div className="max-w-lg mx-auto bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 border-blue-500 transform shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Select Subscription Period</h2>

                {/* Subscription period dropdown */}
                <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="w-full border p-2 rounded mb-4"
                >
                    <option value="1 minute">1 Minute ($2)</option>
                    <option value="5 days">5 Days ($10)</option>
                    <option value="10 days">10 Days ($15)</option>
                </select>

                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        amount={amount}
                        onSuccess={handleSuccess}
                        selectedUserId={selectedUserId}
                        premiumTaken={calculateExpiration().toISOString()}
                    />
                </Elements>
            </div>
        </section>
    );
};

export default Subscription;
