import React from 'react';

const TopContributors = () => {
    const contributors = [
        {
            name: "Alex Johnson",
            title: "Investigative Reporter",
            specialization: "Political & Government Affairs",
            image: "https://i.ibb.co.com/bgsLw6z/images.jpg",
            description: "Award-winning investigative journalist with 15 years of experience uncovering political scandals and governmental corruption. His fearless reporting has led to major policy reforms.",
            awards: "Pulitzer Prize Finalist 2023",
            articles: 247
        },
        {
            name: "Samantha Lee",
            title: "Technology Correspondent",
            specialization: "AI & Cybersecurity",
            image: "https://i.ibb.co.com/7z7Rh3z/https-author-service-images-prod-us-east-1-publishing-aws-arc-pub-uscannenberg-2cf6d4f7-2cfd-4a77-8b.jpg",
            description: "Leading technology journalist specializing in artificial intelligence and cybersecurity. Makes complex tech topics accessible to mainstream audiences with clarity and precision.",
            awards: "Tech Journalist of the Year 2024",
            articles: 189
        },
        {
            name: "Marcus Chen",
            title: "International Correspondent",
            specialization: "Global Affairs & Economics",
            image: "https://i.ibb.co.com/zmGN20L/1652934627991.jpg",
            description: "Veteran foreign correspondent covering international relations and global economic trends. Based in multiple continents, bringing firsthand insights from around the world.",
            awards: "International Press Award 2023",
            articles: 312
        },
        {
            name: "Elena Rodriguez",
            title: "Environmental Reporter",
            specialization: "Climate & Sustainability",
            image: "https://i.ibb.co.com/bgsLw6z/images.jpg",
            description: "Environmental journalist dedicated to climate change reporting and sustainability issues. Her work has influenced environmental policies and raised awareness about urgent climate matters.",
            awards: "Environmental Journalism Award 2024",
            articles: 156
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
                            OUR NEWSROOM
                        </h2>
                        <div className="flex-1 border-t-2 border-gray-900"></div>
                    </div>
                    <p className="newspaper-meta text-gray-600 uppercase tracking-widest mb-4">
                        Meet Our Award-Winning Journalists
                    </p>
                    <div className="newspaper-body text-gray-700 max-w-3xl mx-auto">
                        <p>Our dedicated team of experienced journalists brings you credible, in-depth reporting from around the globe. 
                        Each contributor is committed to upholding the highest standards of journalism.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                    {contributors.map((contributor, index) => (
                        <article
                            key={index}
                            className="newspaper-card bg-white overflow-hidden group flex flex-col min-h-[450px]"
                        >
                            <div className="p-8 flex-1 flex flex-col">
                                {/* Contributor Header */}
                                <div className="flex items-start space-x-4 mb-6">
                                    <img
                                        src={contributor.image}
                                        alt={contributor.name}
                                        className="w-20 h-20 rounded-full object-cover border-4 border-gray-200 group-hover:border-yellow-400 transition-colors duration-300"
                                    />
                                    <div className="flex-1">
                                        <h3 className="newspaper-subheadline text-xl text-gray-900 mb-1">
                                            {contributor.name}
                                        </h3>
                                        <div className="newspaper-meta text-gray-600 text-sm uppercase tracking-wider mb-1">
                                            {contributor.title}
                                        </div>
                                        <div className="text-sm text-yellow-600 font-semibold">
                                            {contributor.specialization}
                                        </div>
                                    </div>
                                </div>

                                {/* Bio */}
                                <div className="newspaper-body text-gray-700 mb-6 leading-relaxed flex-1">
                                    <p>{contributor.description}</p>
                                </div>

                                {/* Awards & Stats */}
                                <div className="border-t border-gray-200 pt-4 mt-auto">
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div>
                                            <div className="newspaper-meta text-gray-500 text-xs uppercase tracking-widest mb-1">
                                                Recognition
                                            </div>
                                            <div className="newspaper-body text-sm text-gray-900 font-semibold">
                                                {contributor.awards}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="newspaper-meta text-gray-500 text-xs uppercase tracking-widest mb-1">
                                                Articles Published
                                            </div>
                                            <div className="newspaper-headline text-2xl text-gray-900">
                                                {contributor.articles}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Read Articles Button */}
                                    <button className="newspaper-border bg-gray-900 text-white px-6 py-2 hover:bg-gray-800 transition-colors duration-300 text-sm uppercase tracking-wide font-semibold w-full">
                                        View Articles by {contributor.name.split(' ')[0]}
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Newsroom Statement */}
                <div className="mt-16 pt-12 border-t border-gray-300">
                    <div className="newspaper-quote text-center">
                        <p className="newspaper-body text-lg text-gray-800 italic mb-4">
                            "Our commitment to truth, accuracy, and ethical journalism drives every story we publish. 
                            We believe informed citizens make better decisions for our society."
                        </p>
                        <div className="newspaper-meta text-gray-600 text-sm uppercase tracking-widest">
                            — Editorial Board, Insightly News
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TopContributors;
