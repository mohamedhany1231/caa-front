// pages/admin/orders.tsx

// import { GetServerSideProps } from "next";
import Pagination from "@/app/components/Pagination";
import OrderCard from "./OrderCard"; // A custom card component to show orders
import fetchOrders from "@/app/utils/fetchOrders";
import { cookies } from "next/headers";

interface Order {
  user: { name: string; email: string; phone: string; address: string };
  orderDetails: {
    product: string;
    count: number;
  }[];
  total: number;
}

// interface AdminOrdersPageProps {
//   orders: Order[];
//   totalItems: number;
//   currentPage: number;
//   itemsPerPage: number;
// }

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { page = 1 } = context.query;
//   const itemsPerPage = 8;

//   // Fetch the orders with pagination
//   const { paginatedOrders, totalItems } = await fetchOrders(
//     Number(page),
//     itemsPerPage
//   );

//   return {
//     props: {
//       orders: paginatedOrders,
//       totalItems,
//       currentPage: Number(page),
//       itemsPerPage,
//     },
//   };
// };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { page: currentPage } = await searchParams;
  const itemsPerPage = 8;
  const c = await cookies();
  // FIXME: edit items num
  const totalItems = 12;
  const { orders, count, error } = await fetchOrders({
    token: c.get("jwt")?.value,
  });
  return (
    <div className="container mx-auto px-4 py-16">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Admin Orders</h1>
      </header>

      <div className="grid  gap-8">
        {orders.map((order, index) => (
          <OrderCard key={index} order={order} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={+(currentPage || 0)}
      />
    </div>
  );
}
