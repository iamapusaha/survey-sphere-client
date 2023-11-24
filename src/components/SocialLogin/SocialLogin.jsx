import { GoogleAuthProvider } from "firebase/auth";
// import PropTypes from 'prop-types';
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
const SocialLogin = () => {
    const { signInWithGoogle } = useAuth()
    const googleProvider = new GoogleAuthProvider()
    const handleGoogleSigIn = () => {
        signInWithGoogle(googleProvider)
            .then(result => {
                console.log(result);
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