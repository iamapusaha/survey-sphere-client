
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
            const res = await axiosPublic.get('/top/6/surveys');
            // console.log(res.data);
            return res?.data
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

            <div className="mb-9 mt-14">
                <h1 className="text-center text-5xl text-primary mb-9">Top Voted</h1>
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 justify-between items-center">

                    {
                        surveysData?.map(survey => <SurveyCart
                            key={survey._id}
                            survey={survey}
                            refetch={refetch}
                        ></SurveyCart>)
                    }
                </div>
            </div>
            <div className="my-8 ">
                <h1 className="text-center text-5xl text-primary mb-9">Testimonials</h1>
                <Marquee className="pb-8">
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


            <div className="join join-vertical w-full my-20">
                <h1 className="text-center text-5xl text-primary mb-9">FAQ</h1>
                <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="my-accordion-1" />
                    <div className="collapse-title text-xl font-medium">
                        What is SurveySphere?
                    </div>
                    <div className="collapse-content">
                        <p>SurveySphere is a powerful platform that allows users to create and participate in surveys. It uses advanced technology to provide a user-friendly interface and efficient survey management tools. Users can vote, react, and even report surveys after logging in.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">
                        How can I participate in a survey?
                    </div>
                    <div className="collapse-content">
                        <p>To participate in a survey, you need to log in to our website. Once logged in, you can vote, react like or dislike, or even report any survey. Your participation helps in gathering diverse opinions and data.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">
                        What are the benefits of being a pro-user?
                    </div>
                    <div className="collapse-content">
                        <p>Pro-users enjoy additional benefits such as the ability to comment on surveys. This feature provides an opportunity for deeper engagement and discussion around survey topics. To become a pro-user, there is a subscription fee which can be paid through our payment page.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title text-xl font-medium">
                        How can I become a pro-user?
                    </div>
                    <div className="collapse-content">
                        <p>You can become a pro-user by subscribing through our payment page. Once the payment is successful, you will gain access to additional features like commenting on surveys.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="my-accordion-5" />
                    <div className="collapse-title text-xl font-medium">
                        Is my data secure with SurveySphere?
                    </div>
                    <div className="collapse-content">
                        <p>Yes, at SurveySphere, we prioritize the security of your data. We use powerful technology and robust security measures to ensure that your data is safe and secure. Your trust is important to us, and we are committed to maintaining it.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

Home.propTypes = {

};

export default Home;