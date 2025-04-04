import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <section>
            <Helmet><title>Insightly | 404 Error</title></Helmet>
            <div className="flex items-center justify-center h-screen bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 border-yellow-500 shadow-2xl transform">
            <div className="text-center p-10 bg-white rounded-lg shadow-lg max-w-lg">
                <h2 className="text-9xl font-extrabold text-purple-600 mb-4">404</h2>
                <h3 className="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h3>
                <p className="text-gray-600 mb-8">
                    The page you are looking for doesn’t exist or has been moved. Please check the URL or go back to the homepage.
                </p>
                <Link to="/" className="px-6 py-3 text-white bg-purple-600 font-semibold rounded-lg hover:bg-purple-700">
                    Go to Homepage
                </Link>
            </div>
        </div>
        </section>
    );
};

export default ErrorPage;