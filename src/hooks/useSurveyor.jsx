import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useSurveyor = () => {
    const { user, loading } = useAuth()
    console.log(user);
    const axiosSecure = useAxiosSecure();
    const { data: isSurveyor, isPending: isSurveyorLoading } = useQuery({
        queryKey: [user?.email, 'isSurveyor'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/role/${user?.email}`)
            console.log(res.data);
            return res.data?.surveyor;


        }
    })
    return [isSurveyor, isSurveyorLoading]
};

export default useSurveyor;