interface iProduct {
  photo: string;
  price: number;
  name: string;
  description: string;
  flavors: string[];
  sizes: { size: string; price: string }[];
  _id?: string;
}
export default async function postProduct(product: FormData): Promise<any> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const res = await fetch(`${backendUrl}/products`, {
    method: "POST",

    body: product,
    credentials: "include",
  });

  const data = await res.json();
  return data;
}
