import {
    createBrowserRouter,
    Navigate,
  } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import AddArticles from "../pages/AddArticles/AddArticles";
import Subscription from "../pages/Subscription/Subscription";
import Dashboard from "../pages/Dashboard/Dashboard";
import MyArticles from "../pages/MyArticles/MyArticles";
import PremiumArticles from "../pages/PremiumArticles/PremiumArticles";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllUsers from "../pages/Dashboard/InDashboard/AllUsers";
import AddPublisher from "../pages/Dashboard/InDashboard/AddPublisher";
import AllArticles from "../pages/Dashboard/InDashboard/AllArticles";
import AdminRoute from "./AdminRoute";
import AdminHome from "../pages/Dashboard/InDashboard/AdminHome";

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
            children: [
                {
                    // Default route when visiting /dashboard
                    index: true,
                    element: <Navigate to="/dashboard/adminHome" replace={true} />
                },
                {
                    path: '/dashboard/adminHome',
                    element: <AdminHome></AdminHome>,
                },
                {
                    path: '/dashboard/allUsers',
                    element: <AllUsers></AllUsers>,
                },
                {
                    path: '/dashboard/allArticles',
                    element: <AllArticles></AllArticles>,
                },
                {
                    path: '/dashboard/addPublisher',
                    element: <AddPublisher></AddPublisher>,
                },
            ]
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