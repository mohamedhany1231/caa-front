export default async function starProduct(id: string): Promise<any> {
  console.log(id);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const res = await fetch(`${backendUrl}/products/${id}/star`, {
    method: "PATCH",

    credentials: "include",
  });

  const data = await res.json();
  console.log(data);
  return data;
}
