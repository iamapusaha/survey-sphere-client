import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import LogIn from "../pages/LogIn/LogIn";
import SignUp from "../pages/SignUp/SignUp";
import DashBoard from "../Layout/DashBoard";
import SurveyCreation from "../pages/DashBoard/SurveyCreation/SurveyCreation";
import AdminRoute from "./AdminRoute";
import AllUsers from "../pages/DashBoard/AllUsers/AllUsers";
import Surveys from "../pages/Surveys/Surveys";
import SurveyDetails from "../pages/SurveyDetails/SurveyDetails";





const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/surveys',
                element: <Surveys></Surveys>
            },
            {
                path: '/survey/:id',
                element: <SurveyDetails></SurveyDetails>,
                loader: ({ params }) => fetch(`http://localhost:5000/survey/${params.id}`)
            }
        ]
    }, {
        path: 'dashboard',
        element: <AdminRoute><DashBoard></DashBoard></AdminRoute>,
        children: [
            {
                path: 'survey-creation',
                element: <AdminRoute><SurveyCreation></SurveyCreation></AdminRoute>
            },
            {
                path: 'all-users',
                element: <AllUsers></AllUsers>
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