import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import AddArticles from "../pages/AddArticles/AddArticles";
import AllArticles from "../pages/AllArticles/AllArticles";
import Subscription from "../pages/Subscription/Subscription";
import Dashboard from "../pages/Dashboard/Dashboard";
import MyArticles from "../pages/MyArticles/MyArticles";
import PremiumArticles from "../pages/PremiumArticles/PremiumArticles";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>,
        },
        {
            path: 'addArticles',
            element: <AddArticles></AddArticles>,
        },
        {
            path: 'allArticles',
            element: <AllArticles></AllArticles>,
        },
        {
            path: 'subscription',
            element: <Subscription></Subscription>,
        },
        {
            path: 'dashboard',
            element: <Dashboard></Dashboard>,
        },
        {
            path: 'myArticles',
            element: <MyArticles></MyArticles>,
        },
        {
            path: 'premiumArticles',
            element: <PremiumArticles></PremiumArticles>,
        },
        {
            path: 'login',
            element: <Login></Login>,
        },
        {
            path: 'register',
            element: <Register></Register>,
        },
      ]
    },
  ]);