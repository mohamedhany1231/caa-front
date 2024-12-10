const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const getMaxPrice = async (): Promise<{
  min: number;
  max: number;
}> => {
  const response = await fetch(`${backendUrl}/products/maxPrice`);
  if (!response.ok) {
    throw new Error("Failed to fetch product price");
  }

  const data = await response.json();
  const { max, min } = data.data;

  return { max, min };
};

export default getMaxPrice;
