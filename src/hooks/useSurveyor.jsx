import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useSurveyor = () => {
    const { user, loading } = useAuth()
    console.log(user);
    const axiosSecure = useAxiosSecure();
    const { data: isSurveyor, isPending: isSurveyorLoading, error } = useQuery({
        queryKey: [user?.email, 'isSurveyor'],
        enabled: !loading,
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/user/role/${user?.email}`)
                console.log(res.data);
                return res.data?.surveyor;
            } catch (err) {
                console.error(err);
                throw new Error('Failed to fetch data');
            }
        }
    })
    return [isSurveyor, isSurveyorLoading, error]
};

export default useSurveyor;
