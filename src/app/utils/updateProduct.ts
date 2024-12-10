import { json } from "stream/consumers";

interface iProduct {
  photo: string;
  price: number;
  name: string;
  description: string;
  flavors: string[];
  sizes: string[];
  _id: string;
}

export default async function updateProduct(
  product: FormData,
  id: string
): Promise<any> {
  console.log(id);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const res = await fetch(`${backendUrl}/products/${id}`, {
    method: "PATCH",

    body: product,
    credentials: "include",
  });

  const data = await res.json();
  console.log(data);
  return data;
}
