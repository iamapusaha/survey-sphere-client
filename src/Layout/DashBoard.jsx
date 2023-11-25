import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaShoppingBag } from 'react-icons/fa';
import { IoMdMenu } from "react-icons/io";
import { IoMail } from "react-icons/io5";
import { RiSurveyFill } from "react-icons/ri";


const DashBoard = () => {
    return (
        <div className="container mx-auto flex gap-10">
            <div className="w-72 h-screen bg-blue-500">
                <ul className="menu p-4 rounded-box mt-2 uppercase">

                    <>
                        <li className="mb-3 "><NavLink to='/dashboard'>
                            <FaHome></FaHome>
                            Admin Home
                        </NavLink></li>
                        <li className="mb-3"><NavLink to='/dashboard/survey-creation'>
                            <RiSurveyFill></RiSurveyFill>
                            Survey Creation
                        </NavLink></li>

                    </>



                    <div className="divider"></div>
                    <li className="mb-3"><NavLink to='/'>
                        <FaHome></FaHome>
                        home
                    </NavLink></li>
                    <li className="mb-3"><NavLink to='/order/salads'>
                        <IoMdMenu></IoMdMenu>
                        menu
                    </NavLink></li>
                    <li className="mb-3"><NavLink to='/shop'>
                        <FaShoppingBag></FaShoppingBag>
                        shop
                    </NavLink></li>
                    <li className="mb-3"><NavLink to='/contact'>
                        <IoMail></IoMail>
                        contact
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