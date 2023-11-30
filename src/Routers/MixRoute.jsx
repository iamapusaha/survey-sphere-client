import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';
import useSurveyor from '../hooks/useSurveyor';

const MixRoute = ({ children }) => {
    const { user, loading: authLoading } = useAuth()
    const [isAdmin, isAdminLoading, adminError] = useAdmin();
    const [isSurveyor, isSurveyorLoading, surveyorError] = useSurveyor()
    const location = useLocation()

    const loading = authLoading || isAdminLoading || isSurveyorLoading;

    if (loading) {
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

