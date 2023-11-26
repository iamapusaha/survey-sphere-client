
import PropTypes from 'prop-types';

const SurveyCart = ({ survey }) => {
    const { title, description, image, category, like, dislike, options } = survey;
    return (
        <div className="card min-w-96 bg-base-100 shadow-xl image-full">
            <div className='w-64 h-64'><img className='w-full' src={image} alt="Shoes" /></div>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>hello</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

SurveyCart.propTypes = {
    survey: PropTypes.object
};

export default SurveyCart;