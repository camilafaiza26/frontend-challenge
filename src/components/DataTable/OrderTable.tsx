import React from "react";
import Action from "../DataTable/Action";

type OrderProps = {
  data: {
    id: string;
    customer_name: string;
    total_products: number;
    total_price: string;
    created_at: string;
  }[];
};

const OrderTable = ({ data }: OrderProps) => {
  return (
    <table className="min-w-full border divide-y divide-gray-200">
      <thead>
        <tr>
          <th className="px-6 py-4 text-left font-bold text-teal-900 tracking-wider">
            Order Id
          </th>
          <th className="px-6 py-4 text-left font-bold text-teal-900 tracking-wider">
            Customer
          </th>
          <th className="px-6 py-4 text-left font-bold text-teal-900 tracking-wider">
            Total Products
          </th>
          <th className="px-6 py-4 text-left font-bold text-teal-900 tracking-wider">
            Total Price
          </th>
          <th className="px-6 py-4 text-left font-bold text-teal-900 tracking-wider">
            Order Date
          </th>
          <th className="px-6 py-4 text-left font-bold text-teal-900 tracking-wider">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((item) => (
          <tr key={item.id}>
            <td className="px-6 py-4 whitespace-nowrap text-teal-900">
              {item.id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-teal-900">
              {item.customer_name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-teal-900">
              {item.total_products}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-teal-900">
              Rp {parseFloat(item.total_price).toLocaleString("id-ID")}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-teal-900">
              {new Date(item.created_at)
                .toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })
                .replace(",", "")}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-teal-900">
              <Action id={item.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
