interface iProduct {
  photo: string;
  price: number;
  name: string;
  description: string;
  flavors: string[];
  sizes: { size: string; price: number }[];
  _id: string;
}
export default async function fetchTopProducts(): Promise<{
  products: iProduct[];
  error?: string;
}> {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const response = await fetch(`${backendUrl}/products/top`);
    let error;
    if (!response.ok) {
    }

    const { data } = await response.json();
    const { products } = data;

    return { products, error };
  } catch (error) {
    return {
      products: [],
      error: `error fetching products : ${error?.message}`,
    };
  }
}
