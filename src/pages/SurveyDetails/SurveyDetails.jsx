
// import PropTypes from 'prop-types';
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { useLoaderData } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import moment from "moment/moment";
import Swal from "sweetalert2";

const SurveyDetails = () => {
    const surveyData = useLoaderData();
    const { _id, like, title, image, description, totalVotes, yesVotes, noVotes } = surveyData;
    console.log(typeof (like));
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic()
    const currentTime = moment();
    const timestamp = currentTime._d
    const handleLikeDislike = (like, dislike) => {
        const reactInfo = {
            like,
            dislike
        }
        console.log(reactInfo);
        axiosPublic.patch(`/survey/likedis/${_id}`, reactInfo)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    // refetch() 
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "your react added",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
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
                    // refetch() 
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
        <div>
            <div className="flex justify-center items-center border rounded-md">
                <div className="">
                    <div className="flex justify-center">
                        <img
                            src={image}
                            className="rounded-t-md"
                        />
                    </div>
                    <div className='flex gap-4'>
                        <button onClick={() => handleCollectVotes('yes')} className="btn btn-outline btn-success">Yes</button>
                        <button onClick={() => handleCollectVotes('no')} className="btn btn-outline btn-error">No</button>
                    </div>
                    <div className="flex gap-5">
                        <button onClick={() => handleLikeDislike(1, 0)}><AiOutlineLike className="text-6xl"></AiOutlineLike></button>
                        <button onClick={() => handleLikeDislike(0, 1)}><AiOutlineDislike className="text-6xl"></AiOutlineDislike></button>
                    </div>
                    <div className="text-center">
                        <h1 className="font-bold text-xl p-2"></h1>
                        <h2 className="font-semibold">Deadline: </h2>
                        <h2 className="font-semibold">Price range:  to </h2>
                        <div className="flex justify-center">
                            <p className="font-semibold px-3">
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="container mx-auto my-6 bg-[#F6F6F6] p-5 rounded">
                    <h1 className="text-5xl text-center my-2">Bid Now</h1>
                    <form onSubmit=''>
                        <div className="md:flex gap-3 px-2 md:px-1 mb-6">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Price</span>
                                </label>
                                <label className="input-group">
                                    <input type="text" required name="price" placeholder="your bidding amount" className="input input-bordered w-full" />
                                </label>
                            </div>
                        </div>
                        {/* {
                            email === user?.email ?
                                <input disabled="disabled" className=" btn btn-block bg-[#121216] text-white" type="submit" value="Bid on the project" />
                                : <input className="btn btn-block bg-[#6f7191] text-white" type="submit" value="Bid on the project" />
                        } */}
                    </form>
                </div>
            </div>
        </div>
    );
};

SurveyDetails.propTypes = {

};

export default SurveyDetails;