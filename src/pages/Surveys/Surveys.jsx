
// import PropTypes from 'prop-types';

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";
import SurveyCart from "../SurveyCart/SurveyCart";

const Surveys = () => {
    const axiosPublic = useAxiosPublic();
    const { data: surveysData, refetch } = useQuery({
        queryKey: ['surveys'],
        queryFn: async () => {
            const res = await axiosPublic.get('/publish/surveys');
            // console.log(res.data);
            return res.data
        }
    })
    return (
        <div>
            <Helmet>
                <title>P & S || Survey</title>
            </Helmet>
            <div className="grid grid-cols-4 gap-5 justify-between items-center mt-36">
                {
                    surveysData?.map(survey => <SurveyCart
                        key={survey._id}
                        survey={survey}
                        refetch={refetch}
                    ></SurveyCart>)
                }
            </div>
        </div>
    );
};

Surveys.propTypes = {

};

export default Surveys;