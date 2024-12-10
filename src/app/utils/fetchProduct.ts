const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const fetchProduct = async (
  productId: string
): Promise<{
  photo: string;
  price: number;
  name: string;
  description: string;
  flavors: string[];
  sizes: { size: string; price: number }[];
}> => {
  const response = await fetch(`${backendUrl}/products/${productId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product details");
  }

  const data = await response.json();
  return data.data.product;
};

export default fetchProduct;
