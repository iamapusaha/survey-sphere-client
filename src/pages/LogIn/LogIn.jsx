
// import PropTypes from 'prop-types';

import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import Swal from "sweetalert2";

const LogIn = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/";
    const { signIn } = useAuth()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState(null)
    const onSubmit = (data) => {
        console.log(data)
        signIn(data.email, data.password)
            .then(result => {
                console.log(result);
                setError(null);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "you are successfully logged in",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true })
            })
            .catch(error => {
                setError(error.message)
                console.error(error);
            })
    }
    return (
        <div className="my-16 px-3 md:px-0">
            <Helmet>
                <title>P & S || LogIn</title>
            </Helmet>
            <h1 className="text-4xl font-semibold text-center mb-3">SignIn with your account</h1>
            <div className="md:w-3/4 lg:w-1/2 mx-auto border-b-2 border-black px-3 md:px-1 mb-4"></div>
            <form onSubmit={handleSubmit(onSubmit)} className="md:w-3/4 lg:w-1/2 mx-auto">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" {...register("password", { required: true })} placeholder="password" className="input input-bordered" />
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <input className="btn bg-[#6f7191] text-white" type="submit" value="LogIn" />
                </div>
            </form>
            <SocialLogin></SocialLogin>
            <p className="text-center mt-4">Dont’t Have An Account ? <Link className="text-red-400" to='/signup'>SignUp</Link></p>
            <p className="text-red-600 text-center mt-2 text-xl">{error}</p>

        </div>
    );
};

LogIn.propTypes = {

};

export default LogIn;