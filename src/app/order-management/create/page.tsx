"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import InputWithLabel from "../../../../components/Form/InputWithLabel";
import Button from "../../../../components/Form/Button";
import PageTitle from "../../../../components/PageTitle";
import { motion } from "framer-motion";
import Select, { ValueType, StylesConfig } from "react-select";
import { Toaster, toast } from "sonner";
import Loader from "@/components/Loader";

interface ProductOption {
  value: number;
  label: string;
  price: number;
}

export default function AddOrder() {
  const [products, setProducts] = useState<number[]>([1]);
  const [productOptions, setProductOptions] = useState<ProductOption[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<{
    [key: number]: ProductOption | null;
  }>({});
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [totalPrices, setTotalPrices] = useState<{ [key: number]: number }>({});
  const [isMounted, setIsMounted] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    axios
      .get("https://mock.apidog.com/m1/523540-0-default/api/products")
      .then((response) => {
        const options = response.data.data.map((product: any) => ({
          value: product.id,
          label: `${product.name}`,
          price: product.price,
        }));
        setProductOptions(options);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handlePriceChange = (
    index: number,
    selectedOption: ValueType<ProductOption>
  ) => {
    const product = selectedOption as ProductOption;
    setSelectedProducts((prevSelectedProducts) => ({
      ...prevSelectedProducts,
      [index]: product,
    }));

    const quantity = quantities[index] || 0;
    setTotalPrices((prevTotalPrices) => ({
      ...prevTotalPrices,
      [index]: quantity * product.price,
    }));
  };

  const handleQuantityChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value, 10);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [index]: value,
    }));

    const product = selectedProducts[index];
    setTotalPrices((prevTotalPrices) => ({
      ...prevTotalPrices,
      [index]: value * (product?.price || 0),
    }));
  };

  const addProduct = () => {
    setProducts([...products, products.length + 1]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!customerName) {
      toast.error("You should fill all of the mandatory fields.", {
        className: "bg-red-500 border-l-4 border-red-700 text-white text-base",
      });
      return;
    }

    for (let i = 0; i < products.length; i++) {
      if (!selectedProducts[i] || !quantities[i]) {
        toast.error("You should fill all of the mandatory fields.", {
          className:
            "bg-red-500 border-l-4 border-red-700 text-white text-base",
        });
        return;
      }
    }

    const orderData = {
      customer_name: customerName,
      products: products.map((_, index) => ({
        product_id: selectedProducts[index]?.value,
        quantity: quantities[index],
      })),
    };

    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://mock.apidog.com/m1/523540-0-default/api/order",
        orderData
      );
      if (response.data.success) {
        console.log(response.data);
        toast.success("Your data has been successfully saved.", {
          className: "bg-green-500 border-l-4 border-green-700 text-white p-6",
        });
      }
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const customStyles: StylesConfig = {
    control: (provided) => ({
      ...provided,
      padding: "8px",
    }),
  };

  return (
    <>
      <Toaster position="top-right" />
      <PageTitle title="Add New Order" />
      <section className="p-10 min-h-screen bg-white rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputWithLabel
              id="customer-name"
              label="Customer Name"
              placeholder="Input customer name"
              type="text"
              name="customer_name"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <hr className="border-gray-300 my-6" />
          {products.map((product, index) => (
            <motion.fieldset
              key={index}
              className="mt-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-slate-500">Product Details {index + 1}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                <div>
                  <label
                    className="block mb-2 font-medium text-gray-900"
                    htmlFor={`product-name-${index}`}
                  >
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  {isMounted && (
                    <Select
                      options={productOptions}
                      placeholder="Select a product"
                      styles={customStyles}
                      name="product_id"
                      onChange={(selectedOption) =>
                        handlePriceChange(index, selectedOption)
                      }
                    />
                  )}
                </div>

                <InputWithLabel
                  id={`price-${index}`}
                  label="Price"
                  placeholder="You need to select product name"
                  type="text"
                  prefix="Rp"
                  value={selectedProducts[index]?.price.toLocaleString() || ""}
                  disabled
                />
                <InputWithLabel
                  id={`quantity-${index}`}
                  label="Quantity"
                  placeholder="Input quantity"
                  type="number"
                  name="quantity"
                  required
                  onChange={(event) => handleQuantityChange(index, event)}
                />
                <InputWithLabel
                  id={`total-product-price-${index}`}
                  label="Total Product Price"
                  placeholder="You need to input quantity"
                  type="text"
                  prefix="Rp"
                  value={totalPrices[index]?.toLocaleString() || ""}
                  disabled
                />
              </div>
              <hr className="border-gray-300 my-3" />
            </motion.fieldset>
          ))}

          <div className="my-4">
            <Button
              text="Add More Product"
              onClick={addProduct}
              type="button"
              className="px-6 text-white bg-sky-900 hover:bg-sky-950"
            />
          </div>
          <hr className="border-gray-300 my-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputWithLabel
              id="total-order-price"
              label="Total Order Price"
              placeholder="Total price "
              type="text"
              prefix="Rp"
              value={Object.values(totalPrices)
                .reduce((acc, price) => acc + price, 0)
                .toLocaleString()}
              disabled
            />
          </div>
          <div className="mt-4">
            <Button text="Save" type="submit" className="px-16" />
            <Button
              text="Back"
              type="button"
              className="px-16 ml-4 text-sky-950"
              goBack
            />
          </div>
          {isLoading ? <Loader /> : ""}
        </form>
      </section>
    </>
  );
}
