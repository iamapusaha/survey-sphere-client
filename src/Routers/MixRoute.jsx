
import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';
import useSurveyor from '../hooks/useSurveyor';

const MixRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isSurveyor, isSurveyorLoading] = useSurveyor()
    console.log(isAdmin, isAdminLoading);
    const location = useLocation()

    if (loading || isAdminLoading || isSurveyorLoading) {
        return <span className="loading loading-bars loading-lg"></span>
    }
    if (user && isAdmin && isSurveyor) {
        return children;
    }
    return <Navigate state={{ from: location }} to='/'></Navigate>
};

MixRoute.propTypes = {
    children: PropTypes.node
};

export default MixRoute;