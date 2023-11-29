
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


// description, category, like, dislike, options
const SurveyCart = ({ survey }) => {
    const { _id, description, title, image, totalVotes, yesVotes, noVotes, } = survey;

    const shortDescription = description.length > 40 ? `${description.slice(0, 40)}...` : description;

    return (
        <div className="bg-white shadow-md rounded-lg p-6 min-w-96 h-[550px]">
            <img className="w-full h-64 rounded-md object-cover mb-4" src={image} alt={title} />
            <h2 className="text-xl text-gray-900 font-bold mb-2">{title}</h2>
            {description && <p className="text-gray-700 mb-3">{shortDescription}</p>}
            <div className="flex justify-between items-center my-4">
                <div>
                    <span className="text-gray-900 font-bold">{totalVotes}</span>
                    <span className="text-gray-600 ml-1">Votes</span>
                </div>
                <div>
                    <span className="text-gray-900 font-bold">{noVotes}</span>
                    <span className="text-gray-600 ml-1">Likes</span>
                </div>
            </div>
            <Link to={`/survey/${_id}`} className="btn btn-outline my-2">Details</Link>
        </div>
    );
};

SurveyCart.propTypes = {
    survey: PropTypes.object,
    refetch: PropTypes.func
};

export default SurveyCart;