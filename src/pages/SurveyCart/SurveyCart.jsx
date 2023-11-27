
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


// description, category, like, dislike, options
const SurveyCart = ({ survey }) => {
    const { _id, title, image, totalVotes, yesVotes, noVotes, } = survey;



    return (
        <div className="card min-w-96 bg-base-100 shadow-xl image-full">
            <div className='w-64 h-64'>
                <img className='w-full' src={image} alt="Shoes" />
            </div>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>Total no of vote: {totalVotes}</p>
                <p>{yesVotes}</p>
                <p>{noVotes}</p>
                <div className="card-actions justify-end">
                    <Link to={`/survey/${_id}`} className="btn btn-primary">Details</Link>
                </div>
            </div>
        </div >
    );
};

SurveyCart.propTypes = {
    survey: PropTypes.object,
    refetch: PropTypes.func
};

export default SurveyCart;