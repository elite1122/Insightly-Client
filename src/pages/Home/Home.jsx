import React from 'react';
import TrendingArticles from './TrendingArticles';

const Home = () => {
    return (
        <div className='bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 border-yellow-500 shadow-2xl transform'>
            <TrendingArticles></TrendingArticles>
        </div>
    );
};

export default Home;