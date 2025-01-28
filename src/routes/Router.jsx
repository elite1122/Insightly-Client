import {
    createBrowserRouter,
    Navigate,
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
import AddPublisher from "../pages/Dashboard/InDashboard/AddPublisher";
import AdminHome from "../pages/Dashboard/InDashboard/AdminHome";
import ManageArticles from "../pages/Dashboard/InDashboard/ManageArticles";
import AllUsers from "../pages/Dashboard/InDashboard/AllUsers";
import UpdateArticles from "../pages/UpdateArticles/UpdateArticles";
import ArticleDetails from "../component/ArticleDetails/ArticleDetails";
import Profile from "../pages/Profile/Profile";
import ErrorPage from "../component/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
            path: '/',
            element: <Home></Home>,
        },
        {
            path: 'addArticles',
            element: <PrivateRoute><AddArticles></AddArticles></PrivateRoute>,
        },
        {
            path: 'updateArticles/:id',
            element: <UpdateArticles></UpdateArticles>,
        },
        {
            path: 'allArticles',
            element: <AllArticles></AllArticles>,
        },
        {
            path: 'subscription',
            element: <PrivateRoute><Subscription></Subscription></PrivateRoute>,
        },
        {
            path: 'dashboard',
            element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
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
                    path: '/dashboard/manageArticles',
                    element: <ManageArticles></ManageArticles>,
                },
                {
                    path: '/dashboard/addPublisher',
                    element: <AddPublisher></AddPublisher>,
                },
            ]
        },
        {
            path: 'myArticles',
            element: <PrivateRoute><MyArticles></MyArticles></PrivateRoute>,
        },
        {
            path: 'articles/:id',
            element: <PrivateRoute><ArticleDetails></ArticleDetails></PrivateRoute>,
        },
        {
            path: 'premiumArticles',
            element: <PrivateRoute><PremiumArticles></PremiumArticles></PrivateRoute>,
        },
        {
            path: 'profile',
            element: <PrivateRoute><Profile></Profile></PrivateRoute>,
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