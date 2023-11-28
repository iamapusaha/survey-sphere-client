
// import PropTypes from 'prop-types';

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SurveyTable = () => {
    const axiosSecure = useAxiosSecure();

    const { data: surveysData = [], refetch } = useQuery({
        queryKey: ['surveysData'],
        queryFn: async () => {
            const res = await axiosSecure.get('/surveys')
            return res.data
        }
    })
    return (
        <div>

        </div>
    );
};

SurveyTable.propTypes = {

};

export default SurveyTable;