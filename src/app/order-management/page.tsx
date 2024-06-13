"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import InputWithLabel from "@/components/Form/InputWithLabel";
import PageTitle from "@/components/PageTitle";
import Button from "@/components/Form/Button";
import OrderTable from "@/components/DataTable/OrderTable";
import Paging from "@/components/DataTable/Paging";
import Loader from "@/components/Loader";

const List = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customerName, setCustomerName] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPerPage, setShowPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalData, setTotalData] = useState(0);

  useEffect(() => {
    fetchData(currentPage, showPerPage);
  }, [customerName, orderDate, currentPage, showPerPage]);

  const fetchData = async (page = 1, limit = showPerPage) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://mock.apidog.com/m1/523540-0-default/api/orders",
        {
          params: {
            page,
            limit,
            customer_name: customerName,
            order_date: orderDate,
          },
        }
      );
      setOrders(response.data.list);
      setTotalPages(Math.ceil(response.data.total / limit));
      setTotalData(response.data.total);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchData(page, showPerPage);
  };

  const handleShowPerPageChange = (limit: number) => {
    setShowPerPage(limit);
    setCurrentPage(1);
    fetchData(1, limit);
  };

  return (
    <>
      <PageTitle title="Order Management" />
      <section className="p-10 bg-white min-h-screen rounded-lg">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <InputWithLabel
              id="search-customer-name"
              placeholder="Input customer name"
              label="Customer Name"
              type="text"
              iconEnd="/images/icon/search.svg"
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <InputWithLabel
              id="search-create-date"
              label="Create Date"
              placeholder="Select Date"
              type="date"
              onChange={(e) => setOrderDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-center whitespace-nowrap">
            <Link href="/order-management/create">
              <Button
                text="Add New Order"
                type="button"
                className="px-4 py-2 mt-1 bg-sky-500 text-white"
              />
            </Link>
          </div>
        </div>
        {loading ? <Loader /> : <OrderTable data={orders} />}
        <Paging
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          showPerPage={showPerPage}
          onShowPerPageChange={handleShowPerPageChange}
          totalData={totalData}
        />
      </section>
    </>
  );
};

export default List;
