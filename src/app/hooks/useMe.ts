import { useQuery } from "@tanstack/react-query";

const useMe = () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const fetchMe = async (): Promise<{
    data: {
      name?: string;
      email?: string;
      _id?: string;
    };
  }> => {
    const response = await fetch(`${backendUrl}/users/me`, {
      credentials: "include",
    });
    if (!response.ok) {
      return { data: {} };
      throw new Error("Failed to fetch user details");
    }

    return response.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    retry: 0,
    staleTime: 0, // Optional: Keep data fresh for 5 minutes
  });

  return { me: data?.data, isLoading, error };
};

export default useMe;
