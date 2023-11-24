
import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const location = useLocation()
    const { user, loading } = useAuth();
    if (loading) {
        return <span className="loading loading-bars loading-lg"></span>
    }
    if (user) {
        return children
    }
    return <Navigate state={{ from: location }} to='/login'></Navigate>
};

PrivateRoute.propTypes = {
    children: PropTypes.node
};

export default PrivateRoute;