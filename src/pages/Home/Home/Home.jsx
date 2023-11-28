
// import PropTypes from 'prop-types';

import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import SurveyCart from "../../SurveyCart/SurveyCart";
import { Link } from "react-router-dom";
// import MyComponent from "../components/MyComponent";
import Marquee from "react-fast-marquee";
import banner from '../../../assets/survey-banner.jpg'
import one from '../../../assets/1.jpg'
import two from '../../../assets/2.jpg'
import three from '../../../assets/3.jpg'
import four from '../../../assets/4.jpg'
import five from '../../../assets/5.jpg'
import six from '../../../assets/6.jpg'




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
            <div className="my-8 py-5">
                <Marquee>
                    <div className="h-96 mx-4 card bordered w-96 bg-base-100 shadow-xl">
                        <figure className="p-6">
                            <img src={one} alt="Avatar" className="rounded-full h-24 w-24 object-cover mx-auto border-4 border-primary" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-primary">John Doe</h2>
                            <p>SurveySphere has revolutionized the way we conduct surveys and collect data.Highly recommended for anyone looking to conduct surveys on a global scale</p>
                            <div className="justify-end card-actions">
                                <button className="btn glass rounded-full">Read More</button>
                            </div>
                        </div>
                    </div>
                    <div className="h-96 mx-4 card bordered w-96 bg-base-100 shadow-xl">
                        <figure className="p-6">
                            <img src={two} alt="Avatar" className="rounded-full h-24 w-24 object-cover mx-auto border-4 border-primary" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-primary">Emma Smith</h2>
                            <p>SurveySphere’s user-friendly interface made data collection a breeze. A game-changer!</p>
                            <div className="justify-end card-actions">
                                <button className="btn glass rounded-full">Read More</button>
                            </div>
                        </div>
                    </div>
                    <div className="h-96 mx-4 card bordered w-96 bg-base-100 shadow-xl">
                        <figure className="p-6">
                            <img src={three} alt="Avatar" className="rounded-full h-24 w-24 object-cover mx-auto border-4 border-primary" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-primary">Liam Johnson</h2>
                            <p>SurveySphere has made our research process efficient and reliable. Highly recommended!</p>
                            <div className="justify-end card-actions">
                                <button className="btn glass rounded-full">Read More</button>
                            </div>
                        </div>
                    </div>
                    <div className="h-96 mx-4 card bordered w-96 bg-base-100 shadow-xl">
                        <figure className="p-6">
                            <img src={four} alt="Avatar" className="rounded-full h-24 w-24 object-cover mx-auto border-4 border-primary" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-primary">Olivia Williams</h2>
                            <p>With SurveySphere, we’ve been able to reach a wider audience. Fantastic platform!</p>
                            <div className="justify-end card-actions">
                                <button className="btn glass rounded-full">Read More</button>
                            </div>
                        </div>
                    </div>
                    <div className="h-96 mx-4 card bordered w-96 bg-base-100 shadow-xl">
                        <figure className="p-6">
                            <img src={five} alt="Avatar" className="rounded-full h-24 w-24 object-cover mx-auto border-4 border-primary" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-primary">Noah Jones</h2>
                            <p>SurveySphere is revolutionizing surveys on a global scale. We love it!</p>
                            <div className="justify-end card-actions">
                                <button className="btn glass rounded-full">Read More</button>
                            </div>
                        </div>
                    </div>
                    <div className="h-96 mx-4 card bordered w-96 bg-base-100 shadow-xl">
                        <figure className="p-6">
                            <img src={six} alt="Avatar" className="rounded-full h-24 w-24 object-cover mx-auto border-4 border-primary" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-primary">Ava Brown</h2>
                            <p>“SurveySphere has significantly improved our data accuracy. It’s a must-have tool!</p>
                            <div className="justify-end card-actions">
                                <button className="btn glass rounded-full">Read More</button>
                            </div>
                        </div>
                    </div>
                </Marquee>
            </div>
        </div>
    );
};

Home.propTypes = {

};

export default Home;