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
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center min-h-screen z-50 p-4">
                    <div className="relative bg-white border-4 sm:border-8 border-gray-900 transform p-4 sm:p-6 lg:p-8 shadow-2xl w-full max-w-xs sm:max-w-md lg:max-w-2xl newspaper-card max-h-[90vh] overflow-y-auto">
                        {/* Close Icon */}
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-900 p-1 sm:p-2 text-xl sm:text-2xl hover:bg-gray-100 rounded-full transition duration-200 border-2 border-gray-900"
                        >
                            <MdOutlineCancelPresentation />
                        </button>

                        {/* Newspaper Header */}
                        <div className="text-center mb-4 sm:mb-6 lg:mb-8 border-b-2 sm:border-b-4 border-gray-900 pb-3 sm:pb-4 lg:pb-6">
                            <div className="newspaper-headline text-xl sm:text-2xl lg:text-3xl uppercase tracking-widest mb-1 sm:mb-2 text-gray-900 font-black">
                                EXCLUSIVE OFFER
                            </div>
                            <div className="text-xs sm:text-sm uppercase tracking-wider text-gray-600 font-bold border-t border-b border-gray-300 py-1 sm:py-2">
                                THE INSIGHTLY PREMIUM EDITION
                            </div>
                            <div className="text-xs uppercase tracking-widest text-gray-500 mt-1 sm:mt-2">
                                LIMITED TIME SUBSCRIPTION
                            </div>
                        </div>

                        {/* Premium Benefits in Newspaper Column Style */}
                        <div className="mb-4 sm:mb-6 lg:mb-8">
                            <div className="border-l-2 sm:border-l-4 border-red-600 pl-2 sm:pl-4 mb-3 sm:mb-4 lg:mb-6">
                                <h3 className="newspaper-headline text-sm sm:text-base lg:text-lg uppercase tracking-wider text-red-600 font-black mb-1 sm:mb-2">
                                    SUBSCRIBER PRIVILEGES
                                </h3>
                                <p className="newspaper-body text-gray-800 leading-relaxed font-medium text-xs sm:text-sm">
                                    Join our distinguished readership and unlock premium editorial content
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm">
                                <div className="border border-gray-300 p-2 sm:p-3 bg-gray-50">
                                    <div className="font-bold text-gray-900 mb-1">• EDITORIAL ACCESS</div>
                                    <div className="text-gray-700">Premium investigative reports</div>
                                </div>
                                <div className="border border-gray-300 p-2 sm:p-3 bg-gray-50">
                                    <div className="font-bold text-gray-900 mb-1">• PRIORITY DELIVERY</div>
                                    <div className="text-gray-700">First access to breaking news</div>
                                </div>
                                <div className="border border-gray-300 p-2 sm:p-3 bg-gray-50">
                                    <div className="font-bold text-gray-900 mb-1">• CONTRIBUTOR STATUS</div>
                                    <div className="text-gray-700">Unlimited article submissions</div>
                                </div>
                                <div className="border border-gray-300 p-2 sm:p-3 bg-gray-50">
                                    <div className="font-bold text-gray-900 mb-1">• EDITORIAL SUPPORT</div>
                                    <div className="text-gray-700">Direct line to our newsroom</div>
                                </div>
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="text-center border-t-2 sm:border-t-4 border-gray-900 pt-3 sm:pt-4 lg:pt-6">
                            <button
                                onClick={handleNavigateToSubscription}
                                className="bg-gray-900 text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 uppercase tracking-widest font-bold text-sm sm:text-base lg:text-lg border-2 sm:border-4 border-gray-900 hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto"
                            >
                                SUBSCRIBE TODAY
                            </button>
                            <p className="mt-2 sm:mt-4 text-xs uppercase tracking-wider text-gray-600 font-semibold">
                                EST. 2025 • TRUSTED NEWS SOURCE • PREMIUM QUALITY
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SubscriptionAd;
