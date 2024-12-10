export default async function postProduct(product: FormData): Promise<unknown> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const res = await fetch(`${backendUrl}/products`, {
    method: "POST",

    body: product,
    credentials: "include",
  });

  const data = await res.json();
  return data;
}
