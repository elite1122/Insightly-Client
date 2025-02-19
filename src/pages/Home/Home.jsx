import React from 'react';
import TrendingArticles from './TrendingArticles';
import AllPublishers from './AllPublishers';
import Statistics from './Statistics';
import Plans from './Plans';
import SubscriptionAd from './SubscriptionAd';
import TopContributors from './TopContributors';
import FrequentlyAskedQuestion from './FrequentlyAskedQuestion';
import UserTestimonials from './UserTestimonials';
import HowItWorks from './HowItWorks';

const Home = () => {
    return (
        <div className=''>
            <TrendingArticles></TrendingArticles>
            <AllPublishers></AllPublishers>
            <Statistics></Statistics>
            <Plans></Plans>
            <HowItWorks></HowItWorks>
            <TopContributors></TopContributors>
            <UserTestimonials></UserTestimonials>
            <FrequentlyAskedQuestion></FrequentlyAskedQuestion>
            <SubscriptionAd></SubscriptionAd>
        </div>
    );
};

export default Home;