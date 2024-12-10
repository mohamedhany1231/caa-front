import { useQuery } from "@tanstack/react-query";
import getMaxPrice from "../utils/getMaxPrice";

const useMaxPrice = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["maxPrice"],
    queryFn: () => getMaxPrice(),
    staleTime: 5 * 60 * 1000, // Optional: Keep data fresh for 5 minutes
  });

  return { data, isLoading, error };
};

export default useMaxPrice;
