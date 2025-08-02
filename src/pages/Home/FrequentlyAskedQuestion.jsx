import React from 'react';
import SectionTitle from '../../component/SectionTitle/SectionTitle';

const FrequentlyAskedQuestion = () => {
    const faqs = [
        {
            question: "How can I publish an article on this platform?",
            answer: "To publish an article, create an account and navigate to the 'Add Article' page in your dashboard. Fill in the required details including title, content, tags, and upload a compelling image. Submit your article for admin review and approval. Our editorial team ensures all content meets our journalism standards."
        },
        {
            question: "How long does it take for an article to get approved?",
            answer: "Our editorial team reviews all submissions within 24-48 hours. We carefully fact-check content, verify sources, and ensure editorial standards are met. You can track your article's status in the 'My Articles' section of your dashboard. Premium subscribers receive priority review."
        },
        {
            question: "Can I update or delete my published articles?",
            answer: "Yes, you have full control over your published content. Access the 'My Articles' page to edit, update, or delete your articles. Please note that deleted articles cannot be recovered, and major edits may require re-approval from our editorial team."
        },
        {
            question: "What are the benefits of becoming a premium subscriber?",
            answer: "Premium subscribers enjoy unlimited access to exclusive investigative reports, in-depth analyses, premium-only articles, ad-free reading experience, advanced search filters, offline reading capability, and priority customer support. You also get early access to breaking news updates."
        },
        {
            question: "Is there any fee for publishing articles?",
            answer: "Publishing articles is completely free for all registered users. We believe in democratizing journalism and giving everyone a voice. Premium subscription is only required for accessing exclusive content, not for publishing your own articles."
        },
        {
            question: "How do you ensure the quality and accuracy of articles?",
            answer: "We have a rigorous editorial process involving fact-checking, source verification, and peer review. Our experienced editorial team reviews all submissions for accuracy, relevance, and journalistic integrity before publication. We also encourage reader feedback and corrections."
        },
        {
            question: "Can I share articles on social media?",
            answer: "Absolutely! We encourage sharing quality journalism. Every article includes social sharing buttons for major platforms. You can also embed articles on your website or blog with proper attribution. Sharing helps spread credible information."
        },
        {
            question: "How do I cancel my premium subscription?",
            answer: "You can cancel your premium subscription anytime from your account settings. There are no cancellation fees or hidden charges. Your premium access will continue until the end of your billing period, and you can resubscribe anytime."
        }
    ];

    return (
        <section className="bg-white py-16 border-b-2 border-gray-200">
            <div className="max-w-7xl mx-auto px-6">
                {/* Newspaper-style section header */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center mb-4">
                        <div className="flex-1 border-t-2 border-gray-900"></div>
                        <h2 className="newspaper-headline text-3xl md:text-4xl mx-6 text-gray-900">
                            FREQUENTLY ASKED
                        </h2>
                        <div className="flex-1 border-t-2 border-gray-900"></div>
                    </div>
                    <p className="newspaper-meta text-gray-600 uppercase tracking-widest mb-4">
                        Questions & Answers
                    </p>
                    <div className="newspaper-body text-gray-700 max-w-3xl mx-auto">
                        <p>Find answers to common questions about our platform, publishing process, subscriptions, and editorial policies. 
                        Can't find what you're looking for? Contact our newsroom.</p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="newspaper-card bg-white border-l-4 border-gray-900 collapse collapse-arrow">
                            <input type="checkbox" className="peer" />
                            <div className="collapse-title newspaper-subheadline text-lg text-gray-900 peer-checked:bg-gray-50 transition-colors duration-200">
                                <span className="newspaper-meta text-gray-500 text-sm mr-4">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                {faq.question}
                            </div>
                            <div className="collapse-content bg-gray-50 border-t border-gray-200">
                                <div className="pt-4">
                                    <p className="newspaper-body text-gray-700 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Information */}
                <div className="mt-16 pt-12 border-t border-gray-300 text-center">
                    <div className="newspaper-body text-gray-600 mb-6">
                        <p>Still have questions? Our newsroom is here to help.</p>
                    </div>
                    <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
                        <button className="newspaper-border bg-gray-900 text-white px-6 py-3 hover:bg-gray-800 transition-colors duration-300 uppercase tracking-wide font-semibold">
                            Contact Editorial Team
                        </button>
                        <button className="newspaper-border bg-white text-gray-900 px-6 py-3 hover:bg-gray-100 transition-colors duration-300 uppercase tracking-wide font-semibold">
                            Visit Help Center
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FrequentlyAskedQuestion;
