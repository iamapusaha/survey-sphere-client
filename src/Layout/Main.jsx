import { Outlet } from "react-router-dom";
import NavBar from "../pages/Shared/NavBar";


const Main = () => {
    return (
        <div className="container mx-auto">
            <NavBar></NavBar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;