// import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { RiSurveyFill } from "react-icons/ri";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from "moment/moment";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const SurveyCreation = () => {
    const time = moment();
    const timestamp = time._d;
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm()
    const onSubmit = async (data) => {
        console.log(data)
        const imgFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imgFile, {
            headers: { "Content-Type": 'multipart/form-data' }
        })
        if (res.data.success) {
            reset()
            const surveyItem = {
                title: data.title,
                description: data.description,
                image: res.data.data.display_url,
                category: data.category,
                like: data.like,
                dislike: data.dislike,
                options: ["Yes", "No"],
                timestamp: timestamp,
            }
            console.log(surveyItem);
            const surveyRes = await axiosSecure.post('/surveys', surveyItem)
            console.log(surveyRes.data);
            if (surveyRes.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.title} has been added!`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }

    return (
        <div className="my-8">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">A Title*</span>
                        </label>
                        <input {...register("title", { required: true })} type="text" placeholder="A Title" className="input input-bordered w-full" />
                    </div>
                </div>
                <div className="flex gap-6">

                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Category*</span>
                        </label>
                        <select  {...register("category", { required: true })} className="select select-bordered">
                            <option disabled value='default'>Category</option>
                            <option>Market-Research</option>
                            <option>Product-Research</option>
                            <option>Customer-Satisfaction</option>
                            <option>Employee-Satisfaction</option>
                            <option>Academic-Survey</option>
                        </select>
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Options*</span>
                        </label>
                        <input {...register("option", { required: true })} type="text" defaultValue='yes or no' placeholder="Yes or No" readOnly className="input input-bordered w-full" />
                    </div>

                </div>
                <div className="flex gap-6">
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Like*</span>
                        </label>
                        <input {...register("like", { required: true })} type="number" defaultValue={0} placeholder="total like input" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">DisLike*</span>
                        </label>
                        <input {...register("dislike", { required: true })} type="number" defaultValue={0} placeholder="total dislike input" className="input input-bordered w-full" />
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description*</span>
                    </label>
                    <textarea {...register("description", { required: true })} className="textarea textarea-bordered h-24" placeholder="Survey Details"></textarea>
                </div>
                <div>
                    <input {...register("image", { required: true })} type="file" className="file-input file-input-bordered w-full max-w-xs" />
                </div>

                <button className="btn">
                    Create Survey <RiSurveyFill className="ml-1"></RiSurveyFill>
                </button>
            </form>
        </div>
    );
};

SurveyCreation.propTypes = {

};

export default SurveyCreation;