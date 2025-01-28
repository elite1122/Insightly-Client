import React from 'react';
import SectionTitle from '../../component/SectionTitle/SectionTitle';

const FrequentlyAskedQuestion = () => {
    return (
        <div className="faq py-10 mt-4 rounded-2xl">
            <div className="container mx-auto text-center">
                <SectionTitle
                    heading="Frequently Asked Questions"
                    subHeading="Find answers to common questions about publishing, subscriptions, and platform features"
                />
                <div className="space-y-4 max-w-6xl mx-auto">
                    {/* Question 1 */}
                    <div className="bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 border-blue-500 rounded-lg p-2 border collapse">
                        <input type="checkbox" className="peer" />
                        <div className="collapse-title text-lg font-semibold">
                            How can I publish an article on this platform?
                        </div>
                        <div className="collapse-content text-gray-900">
                            <p>
                                To publish an article, create an account and navigate to the "Add Article" page in your dashboard. Fill in the required details, upload an image, and submit your article for admin approval.
                            </p>
                        </div>
                    </div>

                    {/* Question 2 */}
                    <div className="bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 border-blue-500 rounded-lg p-2 border collapse">
                        <input type="checkbox" className="peer" />
                        <div className="collapse-title text-lg font-semibold">
                            How long does it take for an article to get approved?
                        </div>
                        <div className="collapse-content text-gray-900">
                            <p>
                                Articles are reviewed by our admin team and typically approved within 24-48 hours. You can check the status in your "My Articles" section.
                            </p>
                        </div>
                    </div>

                    {/* Question 3 */}
                    <div className="bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 border-blue-500 rounded-lg p-2 border collapse">
                        <input type="checkbox" className="peer" />
                        <div className="collapse-title text-lg font-semibold">
                            Can I update or delete my published articles?
                        </div>
                        <div className="collapse-content text-gray-900">
                            <p>
                                Yes, you can update or delete your articles from the "My Articles" page. However, once an article is deleted, it cannot be recovered.
                            </p>
                        </div>
                    </div>

                    {/* Question 4 */}
                    <div className="bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 border-blue-500 rounded-lg p-2 border collapse">
                        <input type="checkbox" className="peer" />
                        <div className="collapse-title text-lg font-semibold">
                            What are the benefits of becoming a premium user?
                        </div>
                        <div className="collapse-content text-gray-900">
                            <p>
                                Premium users can publish unlimited articles, gain access to exclusive news content, and receive priority article approvals.
                            </p>
                        </div>
                    </div>

                    {/* Question 5 */}
                    <div className="bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 border-blue-500 rounded-lg p-2 border collapse">
                        <input type="checkbox" className="peer" />
                        <div className="collapse-title text-lg font-semibold">
                            Is there any fee for publishing articles?
                        </div>
                        <div className="collapse-content text-gray-900">
                            <p>
                                No, publishing articles is completely free for all users. However, premium users enjoy additional benefits such as unlimited article submissions and faster approval times.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FrequentlyAskedQuestion;
