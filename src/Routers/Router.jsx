import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import LogIn from "../pages/LogIn/LogIn";
import SignUp from "../pages/SignUp/SignUp";
import DashBoard from "../Layout/DashBoard";
import SurveyCreation from "../pages/DashBoard/SurveyCreation/SurveyCreation";
import AdminRoute from "./AdminRoute";





const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            }
        ]
    }, {
        path: 'dashboard',
        element: <AdminRoute><DashBoard></DashBoard></AdminRoute>,
        children: [
            {
                path: 'survey-creation',
                element: <AdminRoute><SurveyCreation></SurveyCreation></AdminRoute>
            }
        ]
    },
    {
        path: '/login',
        element: <LogIn></LogIn>
    },
    {
        path: '/signup',
        element: <SignUp></SignUp>
    }
])

export default router;