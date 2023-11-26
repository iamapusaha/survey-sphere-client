
// import PropTypes from 'prop-types';
import { useQuery } from "@tanstack/react-query";

import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            console.log(res.data);
            return res.data
        }

    })
    const handleMakeAdmin = user => {
        axiosSecure.patch(`users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is now admin`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch()
                }
            })

    }
    const handleDeleteUser = id => {
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
                axiosSecure.delete(`/users/${id}`)
                    .then(res => {
                        console.log(res);
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
        <div>
            <h1>Total users: {users.length}</h1>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Change Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map((user, idx) => <tr key={user._id}>
                                <th>{idx + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'admin' ? 'admin'
                                        : <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost btn-lg">
                                            <FaUsers></FaUsers>
                                        </button>
                                    }
                                </td>
                                <td>
                                    <ul className="menu menu-horizontal px-1">
                                        <li>
                                            <details>
                                                <summary>
                                                    Parent
                                                </summary>
                                                <ul className="p-2 bg-base-100 rounded-t-none z-10">
                                                    <li><a>Link 1</a></li>
                                                    <li><a>Link 2</a></li>
                                                </ul>
                                            </details>
                                        </li>
                                    </ul>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteUser(user._id)} className="btn btn-ghost btn-lg">
                                        <FaTrashAlt></FaTrashAlt>
                                    </button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

AllUsers.propTypes = {

};

export default AllUsers;