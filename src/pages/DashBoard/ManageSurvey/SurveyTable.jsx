
// import PropTypes from 'prop-types';

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import useAdmin from "../../../hooks/useAdmin";
import useSurveyor from "../../../hooks/useSurveyor";
import { useState } from "react";

const SurveyTable = () => {
    const [modalData, setModalData] = useState('');
    const [isAdmin] = useAdmin();
    const [isSurveyor] = useSurveyor();
    console.log(isAdmin, isSurveyor);

    const axiosSecure = useAxiosSecure();

    const { data: surveysData = [], refetch } = useQuery({
        queryKey: ['surveysData'],
        queryFn: async () => {
            const res = await axiosSecure.get('/surveys')
            return res.data
        }
    })

    const handleFeedBack = (e, status, id) => {
        e.preventDefault();
        let feedBack = '';
        if (e.target.feedback) {
            feedBack = e.target.feedback.value;
        }
        const feed = {
            status,
            feedback: feedBack
        }
        axiosSecure.patch(`/survey/feedback/${id}`, feed)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch()
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
    const handleDeleteSurvey = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/survey/${id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"

                            });
                        }
                    })
            }
        });
    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        {
                            isAdmin ? <>
                                <th>#</th>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Admin Feedback</th>
                                <th>Chnge Status</th>
                                <th>Delete</th>
                                <th>report</th>
                                <th>Detils</th>
                            </> : <>
                                <th>#</th>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Admin Feedback</th>
                                <th>report</th>
                                <th>Detils</th>
                            </>
                        }

                    </tr>
                </thead>
                <tbody>
                    {
                        surveysData.map((data, idx) =>
                            <tr key={data._id}>
                                <td>{idx + 1}</td>
                                <th>{data.title}</th>
                                <td>{data.status}</td>
                                <td>
                                    {
                                        data.feedbacks.map((feedback, index) => (
                                            <div key={index}>
                                                <button
                                                    className="btn"
                                                    onClick={() => {
                                                        // Set the modal data state
                                                        setModalData(feedback.feed);
                                                        // Show the modal
                                                        document.getElementById('my_modal_5').showModal();
                                                    }}
                                                >
                                                    feedback
                                                </button>
                                            </div>
                                        ))
                                    }
                                </td>

                                {isAdmin ? (
                                    <>
                                        <td>
                                            <ul className="menu menu-horizontal bg-slate-400">
                                                <li>
                                                    <details>
                                                        <summary>select</summary>
                                                        <div className="bg-base-100 rounded-t-none z-10">
                                                            <li className="mb-2">
                                                                <button onClick={(e) => handleFeedBack(e, "publish", data._id)} className="btn btn-sm btn-success">publish</button>
                                                            </li>
                                                            <li className="bg-orange-500">
                                                                <form onSubmit={(e) => handleFeedBack(e, "unpublish", data._id)}>
                                                                    <input type="text" name="feedback" className="input input-bordered join-item" required />
                                                                    <button type="submit" className="btn btn-primary join-item">unpublish</button>
                                                                </form>
                                                            </li>
                                                        </div>
                                                    </details>
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDeleteSurvey(data._id)} className="btn btn-ghost btn-lg">
                                                <FaTrashAlt></FaTrashAlt>
                                            </button>
                                        </td>
                                    </>
                                ) : null}

                                <td>
                                    {
                                        data.feedbacks.map((feedback, index) => (
                                            <div key={index}>
                                                <button
                                                    className="btn"
                                                    onClick={() => {
                                                        // Set the modal data state
                                                        setModalData(feedback.feed);
                                                        // Show the modal
                                                        document.getElementById('my_modal_5').showModal();
                                                    }}
                                                >
                                                    feedback
                                                </button>
                                            </div>
                                        ))
                                    }
                                </td>



                                <td>
                                    <Link to={`/dashboard/survey-response/${data._id}`} className="btn btn-ghost btn-md">Survey responses</Link>
                                </td>

                            </tr>)



                    }

                </tbody>


            </table>
            {/* for modal data / */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <p className="py-4">{modalData}</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    );
};

SurveyTable.propTypes = {

};

export default SurveyTable;