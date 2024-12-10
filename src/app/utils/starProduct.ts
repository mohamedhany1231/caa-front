export default async function starProduct(id: string): Promise<unknown> {
  console.log(id);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const res = await fetch(`${backendUrl}/products/${id}/star`, {
    method: "PATCH",

    credentials: "include",
  });

  const data = await res.json();
  return data;
}
