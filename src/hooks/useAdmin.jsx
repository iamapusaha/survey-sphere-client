import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useaxiosSecure from "./useaxiosSecure";


const useAdmin = () => {
    const { user } = useAuth();
    const axiosSecure = useaxiosSecure();
    const { data: isAdmin, isPending } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/admin/${user?.admin}`)
            console.log(res.data?.admin);
            return res.data?.admin;
        }
    })
    return [isAdmin, isPending]
};

export default useAdmin;