import { useQuery } from "@tanstack/react-query";
import fetchProduct from "../utils/fetchProduct";

const useProduct = (productId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId),
    staleTime: 5 * 60 * 1000, // Optional: Keep data fresh for 5 minutes
  });

  return { data, isLoading, error };
};

export default useProduct;
