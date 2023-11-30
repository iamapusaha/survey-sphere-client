import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import LogIn from "../pages/LogIn/LogIn";
import SignUp from "../pages/SignUp/SignUp";
import DashBoard from "../Layout/DashBoard";
import SurveyCreation from "../pages/DashBoard/SurveyCreation/SurveyCreation";
// import AdminRoute from "./AdminRoute";
import AllUsers from "../pages/DashBoard/AllUsers/AllUsers";
import Surveys from "../pages/Surveys/Surveys";
import SurveyDetails from "../pages/SurveyDetails/SurveyDetails";
import SurveyTable from "../pages/DashBoard/ManageSurvey/SurveyTable";
import SurveyResponse from "../pages/DashBoard/ManageSurvey/SurveyResponse";
import AdminHome from "../pages/DashBoard/AdminHome";
import SurveyorHome from "../pages/DashBoard/SurveyorHome";
import MixRoute from "./MixRoute";





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
        element: <MixRoute><DashBoard></DashBoard></MixRoute>,
        children: [
            {
                path: 'admin-home',
                element: <AdminHome></AdminHome>
            },
            {
                path: 'survey-creation',
                element: <MixRoute><SurveyCreation></SurveyCreation></MixRoute>
            },
            {
                path: 'all-users',
                // element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
                element: <AllUsers></AllUsers>
            },
            {
                path: 'manage-survey',
                element: <SurveyTable></SurveyTable>
            },
            {
                path: 'survey-response/:id',
                element: <SurveyResponse></SurveyResponse>
            },
            {
                path: 'surveyor-home',
                element: <SurveyorHome></SurveyorHome>
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