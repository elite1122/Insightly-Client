import { Helmet } from "react-helmet-async";
import SectionTitle from "../../component/SectionTitle/SectionTitle";

const AboutUs = () => {
    return (
        <section className="min-h-screen dark:bg-gray-900 p-6">
            <Helmet>
                <title>Insightly | About us</title>
            </Helmet>
            <SectionTitle heading="About Insightly" subHeading="A modern, interactive, and user-friendly newspaper website designed to deliver
            news efficiently while offering a seamless reading experience with premium features"></SectionTitle>
            <div className="mx-auto text-center space-y-8 max-w-5xl">
                {/* Content Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 border-blue-500 transform dark:bg-gray-800 bg-opacity-80 backdrop-blur-md p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition duration-300">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">📰 Our Mission</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            To revolutionize news consumption by providing a comprehensive platform
                            that blends accuracy, speed, and user-focused experiences, making
                            reliable news accessible to all.
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 border-blue-500 dark:bg-gray-800 bg-opacity-80 backdrop-blur-md p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">🌟 Our Vision</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            To create the go-to digital destination for news enthusiasts by
                            combining cutting-edge technology, premium content, and intuitive design
                            for a superior reading experience.
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 border-blue-500 dark:bg-gray-800 bg-opacity-80 backdrop-blur-md p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">💡 Our Values</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Integrity, innovation, accessibility, and community engagement guide our
                            commitment to delivering credible news and a premium user experience.
                        </p>
                    </div>
                </div>

                {/* Call to Action */}
                <div>
                    <a
                        href="/allArticles"
                        className="btn btn-primary"
                    >
                        Explore Articles
                    </a>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
