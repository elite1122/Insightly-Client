import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionTitle from '../../component/SectionTitle/SectionTitle';
import { MdOutlineCancelPresentation } from 'react-icons/md';

const SubscriptionAd = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    // Effect to show the modal after 10 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowModal(true);
        }, 10000); // 10 seconds

        return () => clearTimeout(timer); // Cleanup timer if component is unmounted
    }, []);

    const handleNavigateToSubscription = () => {
        navigate('/subscription');
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-80 flex justify-center items-center min-h-screen z-50">
                    <div className="relative bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 border-yellow-500 transform p-8 rounded-lg shadow-xl w-11/12 max-w-xl">
                        {/* Close Icon */}
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-3 right-3 text-white p-2 text-xl hover:bg-opacity-80 transition duration-200"
                        >
                            <MdOutlineCancelPresentation />
                        </button>

                        <SectionTitle heading="Upgrade to Premium!" subHeading="Enjoy the best features with our premium plan"></SectionTitle>
                        <div className="mb-6">
                            <p className="text-lg text-white font-medium">
                                Unlock exclusive benefits when you subscribe to our premium plan:
                            </p>
                            <ul className="list-disc list-inside mt-4 space-y-2 text-white">
                                <li>Ad-free browsing experience.</li>
                                <li>Access to premium and exclusive articles.</li>
                                <li>Priority support from our team.</li>
                                <li>Unlimited article submissions.</li>
                                <li>Stay ahead with the latest insights and trends.</li>
                            </ul>
                        </div>
                        <button
                            onClick={handleNavigateToSubscription}
                            className="btn btn-primary rounded-lg w-full text-white text-lg font-semibold shadow-md transform hover:scale-105 transition duration-300"
                        >
                            Upgrade Now
                        </button>
                        <p className="mt-4 text-sm text-gray-200 text-center">
                            Don't miss out! Upgrade today and transform your experience.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default SubscriptionAd;
