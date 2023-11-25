import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import LogIn from "../pages/LogIn/LogIn";
import SignUp from "../pages/SignUp/SignUp";
import DashBoard from "../Layout/DashBoard";
import SurveyCreation from "../pages/DashBoard/SurveyCreation/SurveyCreation";





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
        element: <DashBoard></DashBoard>,
        children: [
            {
                path: 'survey-creation',
                element: <SurveyCreation></SurveyCreation>
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