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
        <div className=''>
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