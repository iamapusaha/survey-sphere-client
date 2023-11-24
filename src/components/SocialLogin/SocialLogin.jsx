import { GoogleAuthProvider } from "firebase/auth";
// import PropTypes from 'prop-types';
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import useAxiousPublic from "../../hooks/useAxiousPublic";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
const SocialLogin = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/";
    const { signInWithGoogle } = useAuth();
    const axiousPublic = useAxiousPublic()
    const googleProvider = new GoogleAuthProvider()
    const handleGoogleSigIn = () => {
        signInWithGoogle(googleProvider)
            .then(result => {
                const userInfo = {
                    name: result.user.displayName,
                    email: result.user.email
                }
                axiousPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);

                    })
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "you are successfully logged in",
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div className="text-center my-2">
            <button onClick={handleGoogleSigIn} className="btn">
                <FcGoogle></FcGoogle>
                Google
            </button>
        </div>
    );
};

SocialLogin.propTypes = {

};

export default SocialLogin;