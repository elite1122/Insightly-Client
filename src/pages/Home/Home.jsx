import React from 'react';
import TrendingArticles from './TrendingArticles';
import AllPublishers from './AllPublishers';
import Statistics from './Statistics';
import Plans from './Plans';
import SubscriptionAd from './SubscriptionAd';
import TopContributors from './TopContributors';
import FrequentlyAskedQuestion from './FrequentlyAskedQuestion';

const Home = () => {
    return (
        <div className='bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 border-yellow-500 shadow-2xl transform'>
            <TrendingArticles></TrendingArticles>
            <AllPublishers></AllPublishers>
            <Statistics></Statistics>
            <Plans></Plans>
            <TopContributors></TopContributors>
            <FrequentlyAskedQuestion></FrequentlyAskedQuestion>
            <SubscriptionAd></SubscriptionAd>
        </div>
    );
};

export default Home;