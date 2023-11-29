
// import PropTypes from 'prop-types';
import { useQuery } from "@tanstack/react-query";

import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [category, setCategory] = useState(null)

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users', category],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${category || ''}`)
            return res.data
        }
    })

    const handleChangeUserRole = (user, role) => {
        axiosSecure.patch(`users/role/${user._id}`, { role })
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

            <div className="flex justify-between my-5">
                <h1>Total users: {users.length}</h1>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <details>
                                <summary>
                                    Sort by user role
                                </summary>
                                <ul className="p-2 bg-base-100 rounded-t-none z-20">
                                    <li onClick={() => setCategory('')}><a>All User</a></li>
                                    <li onClick={() => setCategory('admin')}><a>admin</a></li>
                                    <li onClick={() => setCategory('user')}><a>user</a></li>
                                    <li onClick={() => setCategory('surveyor')}><a>surveyor</a></li>
                                    <li onClick={() => setCategory('pro-user')}><a>pro-user</a></li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebr my-12">
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
                                        : user.role === 'user' ? 'user'
                                            : user.role === 'pro-user' ? 'pro-user'
                                                : user.role === 'surveyor' ? 'surveyor'
                                                    : 'unknown role'
                                    }
                                </td>
                                <td>
                                    <ul className="menu menu-horizontal">
                                        <li>
                                            <details>
                                                <summary>
                                                    select
                                                </summary>
                                                <ul className=" bg-base-100 rounded-t-none z-10">
                                                    <li onClick={() => handleChangeUserRole(user, 'admin')}><a>admin</a></li>
                                                    <li onClick={() => handleChangeUserRole(user, 'surveyor')}><a>surveyor</a></li>
                                                    <li onClick={() => handleChangeUserRole(user, 'pro-user')}><a>pro-user</a></li>
                                                    <li onClick={() => handleChangeUserRole(user, 'user')}><a>user</a></li>
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