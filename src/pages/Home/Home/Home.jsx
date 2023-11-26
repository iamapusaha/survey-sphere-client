
// import PropTypes from 'prop-types';

import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import SurveyCart from "../../SurveyCart/SurveyCart";






const Home = () => {
    const axiosPublic = useAxiosPublic();
    const { data: surveysData } = useQuery({
        queryKey: ['surveys'],
        queryFn: async () => {
            const res = await axiosPublic.get('/surveys')
            console.log(res.data);
            return res.data
        }
    })

    return (
        <div>
            <Helmet>
                <title>P & S || Home</title>
            </Helmet>
            <h1 className="text-xl">this is our home</h1>
            <div className="grid grid-cols-4 gap-5 justify-between items-center">
                {
                    surveysData?.map(survey => <SurveyCart
                        key={survey._id}
                        survey={survey}
                    ></SurveyCart>)
                }
            </div>
        </div>
    );
};

Home.propTypes = {

};

export default Home;