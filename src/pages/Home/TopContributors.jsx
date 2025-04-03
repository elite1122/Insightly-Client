import React from 'react';
import SectionTitle from '../../component/SectionTitle/SectionTitle';

const TopContributors = () => {
    return (
        <div className="contributor-stories py-10 rounded-2xl">
            <div className="container mx-auto text-center">
                <SectionTitle heading="Top Contributors in Journalism" subHeading=" Meet the exceptional journalists and publishers who are reshaping the way we consume news with credibility and impact"></SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    {/* Contributor 1 */}
                    <div className="bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 border-blue-500 transform rounded-lg p-4 border flex flex-col items-center text-center hover:shadow-lg hover:scale-105 transition duration-300">
                        <div tabIndex="0" role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Alex Johnson"
                                    src="https://i.ibb.co.com/bgsLw6z/images.jpg"
                                />
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold mt-4 mb-2">Alex Johnson</h3>
                        <p className="dark:text-gray-400">
                            “Alex is a leading investigative journalist known for uncovering groundbreaking political scandals. His fearless reporting has made headlines worldwide.”
                        </p>
                    </div>

                    {/* Contributor 2 */}
                    <div className="bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 border-blue-500 transform rounded-lg p-4 border flex flex-col items-center text-center hover:shadow-lg hover:scale-105 transition duration-300">
                        <div tabIndex="0" role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Samantha Lee"
                                    src="https://i.ibb.co.com/7z7Rh3z/https-author-service-images-prod-us-east-1-publishing-aws-arc-pub-uscannenberg-2cf6d4f7-2cfd-4a77-8b.jpg"
                                />
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold mt-4 mb-2">Samantha Lee</h3>
                        <p className="dark:text-gray-400">
                            “Samantha specializes in tech journalism, covering AI advancements and cybersecurity. She has played a crucial role in making complex tech topics accessible to readers.”
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopContributors;
