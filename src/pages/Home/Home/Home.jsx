
// import PropTypes from 'prop-types';

import { Helmet } from "react-helmet-async";
import useaxiosSecure from "../../../hooks/useAxiosSecure";



const Home = () => {

    const axiousSecret = useaxiosSecure();
    axiousSecret.get('/users')
        .then(res => {
            console.log(res.data);
        })
    return (
        <div>
            <Helmet>
                <title>P & S || Home</title>
            </Helmet>
            <h1 className="text-xl">this is our home</h1>
        </div>
    );
};

Home.propTypes = {

};

export default Home;