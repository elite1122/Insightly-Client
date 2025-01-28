import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['users'], 
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    return { users, loading, refetch }; // Return an object
};

export default useUsers;
