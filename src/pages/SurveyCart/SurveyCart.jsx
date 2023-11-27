
import PropTypes from 'prop-types';
import useAuth from '../../hooks/useAuth';
import moment from 'moment/moment';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';


// description, category, like, dislike, options
const SurveyCart = ({ survey, refetch }) => {
    const { _id, title, image, totalVotes, yesVotes, noVotes } = survey;
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic()
    const currentTime = moment();
    const timestamp = currentTime._d

    const handleCollectVotes = (vote) => {
        const voteInfo = {
            surveyId: _id,
            name: user?.displayName,
            email: user?.email,
            option: vote,
            timestamp,
        }
        axiosPublic.post('/votes', voteInfo)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your vote is succfully counted",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "You have already participated in this survey.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    return (
        <div className="card min-w-96 bg-base-100 shadow-xl image-full">
            <div className='w-64 h-64'>
                <img className='w-full' src={image} alt="Shoes" />
            </div>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <div className='flex gap-4'>
                    <button onClick={() => handleCollectVotes('yes')} className="btn btn-outline btn-success">Yes</button>
                    <button onClick={() => handleCollectVotes('no')} className="btn btn-outline btn-error">No</button>
                </div>
                <p>Total no of vote: {totalVotes}</p>
                <p>{yesVotes}</p>
                <p>{noVotes}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

SurveyCart.propTypes = {
    survey: PropTypes.object,
    refetch: PropTypes.func
};

export default SurveyCart;