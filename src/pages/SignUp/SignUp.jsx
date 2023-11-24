
// import PropTypes from 'prop-types';

import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { createUser, updateUserProfile } = useAuth()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        const name = data.name;
        const photo = data.photo;
        console.log(email, password, name, photo);
        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                updateUserProfile(name, photo)
                    .then(() => {
                        const userInfo = {
                            name: name,
                            email: email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                console.log(res);
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "User profile updated",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    reset();
                                    navigate('/')
                                }
                            })

                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
            .catch(error => {
                console.error(error);
            })
    }
    return (
        <div>
            <Helmet>
                <title>P & S || SignUp</title>
            </Helmet>
            <div className="my-16 px-3 md:px-0">
                <h1 className="text-4xl font-semibold text-center mb-3">Please SignUp</h1>
                <div className="md:w-3/4 lg:w-1/2 mx-auto border-b-2 border-black px-3 md:px-1 mb-4"></div>

                <form onSubmit={handleSubmit(onSubmit)} className="md:w-3/4 lg:w-1/2 mx-auto">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                        {errors.name && <span className="text-error">This field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo</span>
                        </label>
                        <input type="text" {...register("photo", { required: true })} placeholder="Add photo url" className="input input-bordered" />
                        {errors.photo && <span className="text-error">This field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                        {errors.email && <span className="text-error">This field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password", {
                            required: true,
                            minLength: 6,
                            maxLength: 20,
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-])/
                        })} name="password" placeholder="password" className="input input-bordered" />
                        {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                        {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                        {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
                    </div>
                    <div className="form-control mt-6">
                        <input className="btn bg-[#6f7191] text-white mb-2" type="submit" value="Sign Up" />
                    </div>
                </form>
                <p className="text-center mb-4">Already registered? Go to <Link className="text-red-700 text-bold" to='/login'>log in</Link></p>
                <SocialLogin></SocialLogin>


            </div>
        </div>
    );
};

SignUp.propTypes = {

};

export default SignUp;