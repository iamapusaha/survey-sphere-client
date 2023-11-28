
// import PropTypes from 'prop-types';

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const SurveyTable = () => {
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

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Chnge Status</th>
                        <th>Detils</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        surveysData.map((data, idx) => <tr key={data._id}>
                            <td>{idx + 1}</td>
                            <th>
                                {data.title}
                            </th>
                            <td>
                                {data.status}
                            </td>
                            {/* <td>
                                <ul className="menu menu-horizontal bg-slate-400">
                                    <li>
                                        <details>
                                            <summary>
                                                select
                                            </summary>
                                            <div className=" bg-base-100 rounded-t-none z-10">
                                                <li className="mb-2"><button className="btn btn-sm btn-success">Success</button></li>
                                                <li className="bg-orange-500">
                                                    <form onClick={() => handleFeedBack()}>
                                                        <input type="text" name="feedback" className="input input-bordered join-item" />
                                                        <button className="btn btn-primary join-item">Subscribe</button>
                                                    </form>
                                                </li>

                                            </div>
                                        </details>
                                    </li>
                                </ul>
                            </td> */}
                            <td>
                                <ul className="menu menu-horizontal bg-slate-400">
                                    <li>
                                        <details>
                                            <summary>
                                                select
                                            </summary>
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


                            <th>
                                <button className="btn btn-ghost btn-xs">details</button>
                            </th>
                        </tr>)

                    }


                </tbody>

            </table>
        </div>
    );
};

SurveyTable.propTypes = {

};

export default SurveyTable;