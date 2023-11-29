// import Swal from "sweetalert2";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { useForm } from "react-hook-form";
// import { RiSurveyFill } from "react-icons/ri";
// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "react-router-dom";
// const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

// const UpdateSurvey = () => {
//     const { id } = useParams()
//     console.log(id);
//     const axiosPublic = useAxiosPublic();
//     const axiosSecure = useAxiosSecure();

//     const { data: survey, refetch } = useQuery({
//         queryKey: ['survey'],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/survey/${id}`)
//             console.log(res.data);
//             return res.data
//         }
//     })

//     const { register, handleSubmit, reset } = useForm()
//     const onSubmit = async (data) => {
//         const imgFile = { image: data.image[0] }
//         const res = await axiosPublic.post(image_hosting_api, imgFile, {
//             headers: { "Content-Type": 'multipart/form-data' }
//         })
//         if (res.data.success) {
//             reset()
//             const surveyItem = {
//                 title: data.title,
//                 description: data.description,
//                 image: res.data.data.display_url,
//                 category: data.category,
//                 expireIn: data.expireIn,
//             }
//             // console.log(surveyItem);
//             const surveyRes = await axiosSecure.patch(`/update/survey/${id}`, surveyItem)
//             // console.log(surveyRes.data);
//             if (surveyRes.data.insertedId) {
//                 refetch()
//                 Swal.fire({
//                     position: "top-end",
//                     icon: "success",
//                     title: `${data.title} has been updated!`,
//                     showConfirmButton: false,
//                     timer: 1500
//                 });
//             }
//         }
//     }

//     return (
//         <div className="my-8">
//             <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
//                 <div className="flex gap-6">
//                     <div className="form-control w-full ">
//                         <label className="label">
//                             <span className="label-text">A Title*</span>
//                         </label>
//                         <input {...register("title", { required: true })} type="text" defaultValue={survey?.title} placeholder="A Title" className="input input-bordered w-full" />
//                     </div>
//                     <div className="form-control w-full">
//                         <label className="label">
//                             <span className="label-text">expireIn</span>
//                         </label>
//                         <label className="input-group ">
//                             <input {...register("expireIn", { required: true })} type="date" defaultValue={survey?.expireIn} className="input input-bordered w-full" />
//                         </label>
//                     </div>
//                 </div>
//                 <div className="flex gap-6">

//                     <div className="form-control w-full ">
//                         <label className="label">
//                             <span className="label-text">Category*</span>
//                         </label>
//                         <select defaultValue={survey?.category} {...register("category", { required: true })} className="select select-bordered">
//                             <option disabled value='default'>Category</option>
//                             <option>Market-Research</option>
//                             <option>Product-Research</option>
//                             <option>Customer-Satisfaction</option>
//                             <option>Employee-Satisfaction</option>
//                             <option>Academic-Survey</option>
//                         </select>
//                     </div>
//                     <div className="form-control w-full ">
//                         <label className="label">
//                             <span className="label-text">Options*</span>
//                         </label>
//                         <input {...register("option", { required: true })} type="text" defaultValue='yes or no' placeholder="Yes or No" readOnly className="input input-bordered w-full" />
//                     </div>

//                 </div>
//                 <div className="flex gap-6">
//                     <div className="form-control w-full ">
//                         <label className="label">
//                             <span className="label-text">Like*</span>
//                         </label>
//                         <input {...register("like", { required: true })} type="number" readOnly defaultValue={survey?.like || 0} placeholder="total like input" className="input input-bordered w-full" />
//                     </div>
//                     <div className="form-control w-full ">
//                         <label className="label">
//                             <span className="label-text">DisLike*</span>
//                         </label>
//                         <input {...register("dislike", { required: true })} type="number" readOnly defaultValue={survey?.dislike || 0} placeholder="total dislike input" className="input input-bordered w-full" />
//                     </div>
//                 </div>
//                 <div className="form-control">
//                     <label className="label">
//                         <span className="label-text">Description*</span>
//                     </label>
//                     <textarea {...register("description", { required: true })} className="textarea textarea-bordered h-24" defaultValue={survey?.description} placeholder="Survey Details"></textarea>
//                 </div>
//                 <div>
//                     <input {...register("image", { required: true })} type="file" className="file-input file-input-bordered w-full max-w-xs" defaultValue={survey?.image} />
//                 </div>

//                 <button className="btn">
//                     Update Survey <RiSurveyFill className="ml-1"></RiSurveyFill>
//                 </button>
//             </form>
//         </div>
//     );
// };

// UpdateSurvey.propTypes = {

// };

// export default UpdateSurvey;