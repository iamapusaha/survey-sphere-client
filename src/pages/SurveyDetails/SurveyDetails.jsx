
// import PropTypes from 'prop-types';
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { useLoaderData } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import moment from "moment/moment";
import Swal from "sweetalert2";
import useProUser from "../../hooks/useProUser";

const SurveyDetails = () => {
    const surveyData = useLoaderData();
    const [isProUser] = useProUser()
    console.log(isProUser);
    const { _id, like, title, image, description, totalVotes, yesVotes, noVotes } = surveyData;
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic()
    const currentTime = moment();
    const timestamp = currentTime._d
    const handlAddComment = e => {
        e.preventDefault()
        const comment = e.target.comment.value;
        const commentInfo = {
            user: user.displayName,
            email: user.email,
            comment
        }
        console.log(commentInfo);
        axiosPublic.patch(`/survey/comment/${_id}`, commentInfo)
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
    const handleCollectVotes = (yes, no, vote) => {
        const voteInfo = {
            vote: {
                yes,
                no,
            },
            user: {
                name: user.displayName,
                email: user.email,
                timestamp,
                option: vote
            }
        }
        axiosPublic.patch(`/survey/vote/${_id}`, voteInfo)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
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
                        <button onClick={() => handleCollectVotes(1, 0, 'yes')} className="btn btn-outline btn-success">Yes</button>
                        <button onClick={() => handleCollectVotes(0, 1, 'no')} className="btn btn-outline btn-error">No</button>
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
                    <h1 className="text-5xl text-center my-2">Add Your Comment</h1>
                    <form onSubmit={handlAddComment}>
                        <div className="md:flex gap-3 px-2 md:px-1 mb-6">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Comment</span>
                                </label>
                                <label className="input-group">
                                    {/* <input type="" required name="price" placeholder="your bidding amount" className="input input-bordered w-full" /> */}
                                    <textarea name="comment" placeholder="Write your comment here" required className="textarea textarea-bordered textarea-xs w-full" ></textarea>
                                </label>
                            </div>
                        </div>

                        {
                            isProUser ?
                                <input className="btn btn-block bg-[#6f7191] text-white" type="submit" value="Add Comment" />
                                : <input disabled className="btn btn-block bg-[#6f7191] text-white" type="submit" value="Add Comment" />
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

SurveyDetails.propTypes = {

};

export default SurveyDetails;