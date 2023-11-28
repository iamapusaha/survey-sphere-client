import { Outlet } from "react-router-dom";
import NavBar from "../pages/Shared/NavBar";
import Footer from "../pages/Shared/Footer";


const Main = () => {
    return (
        <div className="container mx-auto">
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;