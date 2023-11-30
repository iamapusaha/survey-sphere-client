import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useAdmin = () => {
    const { user, loading } = useContext(AuthContext)
    console.log(user);
    const axiosSecure = useAxiosSecure();
    const { data: isAdmin, isPending: isAdminLoading, error } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/user/role/${user?.email}`)
                console.log(res.data);
                return res.data?.admin;
            } catch (err) {
                console.error(err);
                throw new Error('Failed to fetch data');
            }
        }
    })
    return [isAdmin, isAdminLoading, error]
};

export default useAdmin;
