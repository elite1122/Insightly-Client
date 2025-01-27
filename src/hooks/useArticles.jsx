import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useArticles = () => {
    const axiosPublic = useAxiosPublic();

    const { data: articles = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['articles'], 
        queryFn: async () => {
            const res = await axiosPublic.get('/articles');
            return res.data;
        }
    });

    return { articles, loading, refetch }; // Return an object
};

export default useArticles;
