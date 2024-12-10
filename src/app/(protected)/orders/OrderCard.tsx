// components/OrderCard.tsx

import { OrderProductRow } from "./OrderProductRow";

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

export default function OrderCard({ order }: { order: iOrder }) {
  return (
    <div className="border p-4 rounded-lg shadow-md w-full max-w-3xl mx-auto  space-y-2">
      {/* User Info Section */}
      <div className="text-left  flex gap-4 items-center flex-wrap">
        <h2 className="text-xl font-semibold ">{order.name}</h2>
        <p className="text-sm text-gray-600">{order.email}</p>
        <p className="text-sm text-gray-600">{order.phone}</p>
        <p className="text-sm text-gray-600  ">address: {order.address}</p>
      </div>

      {/* Order Details Section */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Order Details:</h3>
        <ul className="space-y-2">
          {order.products.map((prod, index) => (
            <OrderProductRow
              key={`${prod.productId}-${prod.flavor}-${prod.size}`}
              count={prod.count}
              flavor={prod.flavor}
              size={prod.size}
              id={prod.productId}
            />
          ))}
        </ul>
      </div>

      {/* Total Price Section */}
      <div className="text-right mb-4">
        <p className="text-xl font-bold">Total: {order.total} EGP</p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between gap-2">
        <button className="bg-red-500 text-white py-2 px-4 rounded-md w-full sm:w-auto text-sm">
          Cancel
        </button>
        <button className="bg-yellow-500 text-white py-2 px-4 rounded-md w-full sm:w-auto text-sm">
          Process
        </button>
      </div>
    </div>
  );
}
