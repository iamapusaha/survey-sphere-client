
import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";


const useAdmin = () => {
    const { user, loading } = useContext(AuthContext)
    console.log(user);
    const axiosSecure = useAxiosSecure();
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/admin/${user?.email}`)
            console.log(res.data?.admin);
            return res.data?.admin;


        }
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;