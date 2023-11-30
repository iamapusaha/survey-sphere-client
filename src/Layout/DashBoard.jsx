import { NavLink, Outlet } from "react-router-dom";
import { FaHome } from 'react-icons/fa';
import { RiSurveyFill } from "react-icons/ri";
import useAdmin from "../hooks/useAdmin";


const DashBoard = () => {
    const [isAdmin] = useAdmin()
    return (
        <div className="container mx-auto flex gap-10">
            <div className="md:w-72 w-40 h-screen bg-blue-500">
                <ul className="menu p-4 rounded-box mt-2 uppercase">

                    {
                        isAdmin ? <>
                            <li className="mb-3 "><NavLink to='/dashboard/admin-home'>
                                <FaHome></FaHome>
                                Admin Home
                            </NavLink></li>
                            <li className="mb-3"><NavLink to='/dashboard/survey-creation'>
                                <RiSurveyFill></RiSurveyFill>
                                Survey Creation
                            </NavLink></li>
                            <li className="mb-3"><NavLink to='/dashboard/all-users'>
                                <RiSurveyFill></RiSurveyFill>
                                All Users
                            </NavLink></li>
                            <li className="mb-3"><NavLink to='/dashboard/manage-survey'>
                                <RiSurveyFill></RiSurveyFill>
                                Manage Survey
                            </NavLink></li>

                        </> :
                            <>
                                <li className="mb-3 "><NavLink to='/dashboard/surveyor-home'>
                                    <FaHome></FaHome>
                                    Surveyor Home
                                </NavLink></li>
                                <li className="mb-3"><NavLink to='/dashboard/survey-creation'>
                                    <RiSurveyFill></RiSurveyFill>
                                    Survey Creation
                                </NavLink></li>
                                <li className="mb-3"><NavLink to='/dashboard/manage-survey'>
                                    <RiSurveyFill></RiSurveyFill>
                                    Manage Survey
                                </NavLink></li>
                            </>
                    }



                    <div className="divider"></div>
                    <li className="mb-3"><NavLink to='/'>
                        <FaHome></FaHome>
                        home
                    </NavLink></li>
                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;