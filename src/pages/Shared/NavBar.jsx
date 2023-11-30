
// import PropTypes from 'prop-types';

import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import logo from '../../assets/logo.png'

const NavBar = () => {
    const { user, logOut } = useAuth();

    const handlelogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "you are successfully logout",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    const menuItem = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/surveys'>Surveys</Link></li>
        <li><Link to='/order/salads'>Pricing page</Link></li>
        <li><Link to='/contact-us'>Contact Us</Link></li>
        <li><Link to='/about-us'>About Us</Link></li>
        <li><Link to='/dashboard'>dashboard</Link></li>
        {/* <li>
            <Link to='/dashboard/cart' className="dropdown dropdown-end">
                <label tabIndex={0} className="">
                    <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        <span className="badge badge-sm indicator-item">{cart.length}</span>
                    </div>
                </label>
                <div tabIndex={0} className="mt-20 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                    <div className="card-body">
                        <span className="font-bold text-lg">8 Items</span>
                        <span className="text-info">Subtotal: $999</span>
                        <div className="card-actions">
                            <button className="btn btn-primary btn-block">View cart</button>
                        </div>
                    </div>
                </div>
            </Link>
        </li> */}
    </>
    return (
        <div className=" z-10 navbar bg-opacity-10 my-3">
            <div className="navbar-start">
                <div className="dropdown ">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="text-black menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItem}
                    </ul>
                </div>
                <div>
                    <Link to='/'><img src={logo} alt="" /></Link>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className=" menu menu-horizontal px-1">
                    {menuItem}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <div className="z-20 dropdown dropdown-end text-black">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user.photoURL} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">{user.displayName}</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li className="z-30"><button onClick={handlelogOut}>Logout</button></li>
                        </ul>
                    </div>
                        : <button className="btn btn-ghost"><Link to='/login'>Login</Link></button>
                }
            </div>
        </div>
    );
};

NavBar.propTypes = {

};

export default NavBar;