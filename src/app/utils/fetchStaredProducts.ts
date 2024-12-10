interface iProduct {
  photo: string;
  price: number;
  name: string;
  description: string;
  flavors: string[];
  sizes: { size: string; price: number }[];
  _id: string;
  isStarred: boolean;
}
export default async function fetchStared(): Promise<{
  products: iProduct[];
  count: number;
  error?: string;
}> {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const response = await fetch(`${backendUrl}/products?isStarred=true`);
    let error;
    if (!response.ok) {
    }

    const { products, count } = await response.json();

    return { products, count, error };
  } catch (error) {
    return {
      products: [],
      count: 0,
      error: `error fetching products : ${error?.message}`,
    };
  }
}
