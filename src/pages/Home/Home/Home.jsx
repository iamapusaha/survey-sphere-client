
// import PropTypes from 'prop-types';

import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import SurveyCart from "../../SurveyCart/SurveyCart";
import banner from '../../../assets/survey-banner.jpg'
import { Link } from "react-router-dom";



const Home = () => {

    const axiosPublic = useAxiosPublic();
    const { data: surveysData, refetch } = useQuery({
        queryKey: ['surveys'],
        queryFn: async () => {
            const res = await axiosPublic.get('/surveys');
            // console.log(res.data);
            return res.data
        }
    })

    return (
        <div>
            <Helmet>
                <title>P & S || Home</title>
            </Helmet>
            {/* benner section  */}
            <div className="hero min-h-screen" style={{ backgroundImage: `url(${banner})` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Welcome To SurveySphere</h1>
                        <p className="mb-5">your global platform for conducting surveys and polls. We provide a comprehensive space for gathering and analyzing data or opinions from users all around the world. Join us to make your voice heard and explore the pulse of the globe.</p>
                        <Link to='/surveys'><button className="btn btn-outline">Explore More</button></Link>
                    </div>
                </div>
            </div>
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

Home.propTypes = {

};

export default Home;