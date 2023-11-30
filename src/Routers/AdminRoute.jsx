
import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin();
    // console.log(isAdmin, isAdminLoading);
    const location = useLocation()

    if (loading || isAdminLoading) {
        return <span className="loading loading-bars loading-lg"></span>
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate state={{ from: location }} to='/'></Navigate>
};

AdminRoute.propTypes = {
    children: PropTypes.node
};

export default AdminRoute;