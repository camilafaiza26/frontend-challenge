"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PageTitle from "@/components/PageTitle";

interface Product {
  quantity: number;
  product_price: number;
  product_id: number;
}

interface OrderData {
  id: string;
  customerName: string;
  totalOrderPrice: number | string;
  products: Product[];
}

const ProductRow: React.FC<Product> = ({ quantity, product_price }) => (
  <tr>
    <td className="py-4">{`Product ID: ${quantity}`}</td>
    <td className="py-4">{quantity}</td>
    <td className="py-4">Rp {product_price}</td>
    <td className="py-4">Rp {quantity * product_price}</td>
  </tr>
);

const Order: React.FC<OrderData> = ({
  id,
  customerName,
  totalOrderPrice,
  products,
}) => (
  <div>
    <p className="text-black">Order ID</p>
    <p className="text-xl font-bold my-2">{id}</p>
    <p className="text-black my-2">Customer Name</p>
    <p className="text-xl font-bold my-2">{customerName}</p>
    <p className="text-black my-2">Total Order Price</p>
    <p className="text-xl font-bold my-2">{totalOrderPrice}</p>
    <hr className="border-gray-300 my-10" />
    <p className="text-zinc-500">Product Detail</p>
    <table className="w-full bg-white mt-4 table-fixed">
      <thead>
        <tr>
          <th className="font-semibold text-black text-left py-4">
            Product Name
          </th>
          <th className="font-semibold text-black text-left py-4">Quantity</th>
          <th className="font-semibold text-black text-left py-4">Price</th>
          <th className="font-semibold text-black text-left py-4">
            Total Product Price
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <ProductRow key={index} {...product} />
        ))}
      </tbody>
    </table>
    <hr className="border-gray-300 my-10" />
  </div>
);

export default function OrderDetailPage({
  params,
}: {
  params: { orderId: string };
}) {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  console.log(params.orderId);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `https://mock.apidog.com/m1/523540-0-default/api/order/${params.orderId}`
        );

        const { id, customer_name, products } = response.data;
        const formattedProducts: Product[] = products.map((product: any) => ({
          product_name: `Product ID: ${product.product_id}`,
          quantity: Number(product.quantity),
          product_price: Number(product.product_price),
          product_id: product.product_id,
        }));
        const totalOrderPrice = formattedProducts.reduce(
          (total, product) => total + product.quantity * product.product_price,
          0
        );
        setOrder({
          id,
          customerName: customer_name,
          totalOrderPrice: `Rp ${totalOrderPrice.toLocaleString("id-ID")}`,
          products: formattedProducts,
        });
      } catch (error) {
        console.error("Error fetching order: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [params.orderId]);

  return (
    <>
      <PageTitle title="Order Detail" />
      <section className="min-h-screen p-10 bg-white rounded-lg">
        {loading ? <p>Loading...</p> : order && <Order {...order} />}
      </section>
    </>
  );
}
