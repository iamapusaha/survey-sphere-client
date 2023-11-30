import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';
import useSurveyor from '../hooks/useSurveyor';

const MixRoute = ({ children }) => {
    const { user, loading: authLoading } = useAuth()
    const [isAdmin, , adminError] = useAdmin();
    const [isSurveyor, , surveyorError] = useSurveyor()
    const location = useLocation()

    if (authLoading) {
        return <span className="loading loading-bars loading-lg"></span>
    }
    if (adminError) {
        // console.error('Admin error:', adminError);
    }
    if (surveyorError) {
        // console.error('Surveyor error:', surveyorError);
    }
    if (user && (isAdmin || isSurveyor)) {
        return children;
    }
    return <Navigate state={{ from: location }} to='/'></Navigate>
};

MixRoute.propTypes = {
    children: PropTypes.node
};

export default MixRoute;
