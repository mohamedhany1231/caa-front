interface iOrder {
  address: string;
  email: string;
  phone: string;
  name: string;
  message?: string;
  products: {
    productId: string;
    count: number;
    size?: string;
    flavor?: string;
  }[];
}
export default async function fetchOrders({
  token = "",
  page = 1,
  sort = "",
  filter = "",
}: {
  token?: string;
  page?: number;
  sort?: string;
  filter?: string;
}): Promise<{
  orders: iOrder[];
  count: number;
  error?: string;
}> {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const response = await fetch(
      `${backendUrl}/orders?page=${page}${
        filter ? `&name=${filter}` : ""
      }&sort=${sort}`,
      {
        credentials: "include",
        ...(token && {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }),
      }
    );
    let error;
    if (!response.ok) {
      throw new Error(
        (await response.json()).message ||
          "something wrong happened , please try again"
      );
    }

    const { orders, count } = await response.json();
    return { orders, count, error };
  } catch (error) {
    return {
      orders: [],
      count: 0,
      error: `error fetching orders : ${error?.message}`,
    };
  }
}
