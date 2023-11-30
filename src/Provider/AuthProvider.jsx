import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import PropTypes from 'prop-types';
import app from "../firebase/firebase.config";
import useAxiosSecure from "../hooks/useAxiosSecure";


export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const axiosSecret = useAxiosSecure()
    const auth = getAuth(app);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    const signInWithGoogle = (provider) => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }
    const updateUserProfile = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            // console.log('current user is now', currentUser);
            if (currentUser) {
                const userInfo = {
                    email: currentUser.email
                }
                axiosSecret.post('/jwt', userInfo)
                    .then(res => {
                        // console.log(res.data);
                        const token = res.data.token;
                        if (token) {
                            localStorage.setItem('access-token', token)
                            setLoading(false)
                        }
                    })
            } else {
                localStorage.removeItem('access-token')
                setLoading(false)
            }

        })
        return () => {
            return unSubscribe()
        }
    }, [auth, axiosSecret])

    const authInfo = {
        user,
        createUser,
        loading,
        signIn,
        signInWithGoogle,
        updateUserProfile,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
};

export default AuthProvider;