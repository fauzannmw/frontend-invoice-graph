"use client";
import React, { useEffect, useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import products from "@/api/products.json";
import { Invoice, Product } from "@/types";

import {
  Button,
  CalendarDate,
  DatePicker,
  Image,
  Input,
  Textarea,
} from "@nextui-org/react";
import { toast } from "sonner";
import { IoIosClose } from "react-icons/io";

const FormDataSchema = z.object({
  customer_name: z.string().min(1),
  salesperson_name: z.string().min(1),
  invoice_notes: z.string().min(0),
});

export type CreateInvoiceTypes = z.infer<typeof FormDataSchema>;

export default function InvoiceInput() {
  const [loading, setLoading] = useState<boolean>();
  const [date, setDate] = useState<CalendarDate>();
  const [invoiceDate, setInvoiceDate] = useState<string>("");
  const [productInput, setProductInput] = useState<string>("");
  const [productSuggestions, setProductSuggestions] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const generateInvoiceNumber = (): string => {
    return `inv-${Math.floor(1000 + Math.random() * 9000)}`;
  };

  const saveInvoices = (invoices: CreateInvoiceTypes[]) => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  };

  const addInvoice = (newInvoice: CreateInvoiceTypes) => {
    const invoices = getInvoices();
    const invoice_number = generateInvoiceNumber();

    const total_amount = selectedProducts.reduce(
      (total, product) => total + product.price * (product.quantity || 0),
      0
    );

    const product_sold = selectedProducts.map((product) => ({
      id: product.id,
      name: product.name,
      picture: product.picture,
      stock: product.stock,
      price: product.price,
      quantity: product.quantity || 0,
    }));

    const invoiceWithDetails: Invoice = {
      ...newInvoice,
      invoice_number,
      product_sold,
      total_amount,
      invoice_date: invoiceDate,
    };

    invoices.push(invoiceWithDetails);
    saveInvoices(invoices);
  };

  const getInvoices = (): CreateInvoiceTypes[] => {
    const storedInvoices = localStorage.getItem("invoices");
    return storedInvoices ? JSON.parse(storedInvoices) : [];
  };

  useEffect(() => {
    setInvoiceDate(`${date?.year}-${date?.month}-${date?.day}`);
  }, [date]);

  const handleProductInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setProductInput(value);
    if (value.length > 0) {
      const suggestions = (products as Product[]).filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setProductSuggestions(suggestions);
    } else {
      setProductSuggestions([]);
    }
  };

  const handleProductSelect = (product: Product) => {
    if (!selectedProducts.some((p) => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }
    setProductInput("");
    setProductSuggestions([]);
  };

  const handleProductRemove = (productId: number) => {
    setSelectedProducts(
      selectedProducts.filter((product) => product.id !== productId)
    );
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    const updatedProducts = selectedProducts.map((product) =>
      product.id === productId ? { ...product, quantity } : product
    );
    setSelectedProducts(updatedProducts);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateInvoiceTypes>({
    defaultValues: {},
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<CreateInvoiceTypes> = async (data) => {
    try {
      setLoading(true);
      const newInvoice: CreateInvoiceTypes = {
        ...data,
      };

      // Simulate waiting 3 seconds before adding invoice
      await new Promise((resolve) => setTimeout(resolve, 3000));

      addInvoice(newInvoice);
      toast("Success Created new Invoice");
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full gap-2 px-4 py-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-black">
      <h2 className="text-lg font-semibold">Create Invoice</h2>
      <form
        onSubmit={handleSubmit(processForm)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="customer-name"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Customer Name
          </label>
          <Input
            type="text"
            placeholder="Customer Name..."
            variant="bordered"
            size="lg"
            radius="sm"
            isInvalid={errors.customer_name ? true : false}
            errorMessage={errors.customer_name && errors.customer_name.message}
            {...register("customer_name", { required: true })}
            className="w-full font-semibold "
            classNames={{
              input: "text-sm font-semibold",
            }}
          />
          <label
            htmlFor="salesperson-name"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Sales Person Name
          </label>
          <Input
            type="text"
            placeholder="Salesperson Name..."
            variant="bordered"
            size="lg"
            radius="sm"
            isInvalid={errors.salesperson_name ? true : false}
            errorMessage={
              errors.salesperson_name && errors.salesperson_name.message
            }
            {...register("salesperson_name", { required: true })}
            className="w-full font-semibold "
            classNames={{
              input: "text-sm font-semibold",
            }}
          />
          <div>
            <label
              htmlFor="products-sold"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Product Sold
            </label>
            <input
              type="text"
              value={productInput}
              onChange={handleProductInputChange}
              placeholder="Search Product..."
              className={`outline-none block w-full p-3 rounded-lg shadow-sm text-sm font-semibold border-2 border-gray-200 placeholder-gray-500 ${
                selectedProducts.length < 1 &&
                "placeholder-[#f31260] border-[#f31260]"
              }`}
            />
            <ul className="rounded-md bg-white">
              {productSuggestions.map((product, index) => (
                <li
                  key={index}
                  onClick={() => handleProductSelect(product)}
                  className="cursor-pointer p-2 hover:bg-gray-100 flex items-center"
                >
                  <Image
                    src={product.picture}
                    alt={product.name}
                    className="w-10 h-10 object-cover mr-2"
                    radius="sm"
                  />
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-500">
                      Stock Remaining: {product.stock} - Product Price: Rp.{" "}
                      {product.price}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <label
              htmlFor="products-sold"
              className={`block text-sm font-semibold leading-6 ${
                selectedProducts.length < 1 && "text-[#f31260]"
              }`}
            >
              Product Selected:
            </label>
            <div
              className={`w-full border-2 border-gray-200 min-h-12 rounded-lg p-2 ${
                selectedProducts.length < 1 && "border-[#f31260]"
              }`}
            >
              <ul>
                {selectedProducts.map((product, index) => (
                  <li key={index} className="flex items-center mb-2 gap-2">
                    <Image
                      src={product.picture}
                      alt={product.name}
                      className="w-10 h-10 object-cover mr-2"
                      radius="sm"
                    />
                    <div className="flex-grow">
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-500">
                        Stock Remaining: {product.stock} - Product Price: Rp.{" "}
                        {product.price}
                      </div>
                    </div>
                    <Input
                      type="number"
                      min="1"
                      value={product.quantity?.toString()}
                      onChange={(e) =>
                        handleQuantityChange(
                          product.id,
                          parseInt(e.target.value)
                        )
                      }
                      variant="bordered"
                      radius="sm"
                      className="w-20"
                    />
                    <Button
                      type="button"
                      variant="bordered"
                      radius="sm"
                      endContent={<IoIosClose className="text-2xl" />}
                      onClick={() => handleProductRemove(product.id)}
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-xs text-start font-semibold text-[#f31260] my-1.5">
              {selectedProducts.length < 1 && "Required Selected Product"}
            </p>
          </div>
          <div>
            <label
              htmlFor="invoice_date"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Invoice Date
            </label>
            <DatePicker
              variant="bordered"
              size="lg"
              radius="sm"
              value={date}
              onChange={setDate}
              className={`w-full font-semibold ${
                selectedProducts.length < 1 &&
                "placeholder-[#f31260] !border-[#f31260]"
              }`}
            />
            <p className="text-xs text-start font-semibold text-[#f31260] my-1.5">
              {!date && "Required Invoice Date"}
            </p>
          </div>
          <label
            htmlFor="invoice-notes"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Invoice Notes:
          </label>
          <Textarea
            variant="bordered"
            placeholder="Give some explanation to the notes..."
            minRows={2}
            radius="sm"
            isInvalid={errors.invoice_notes ? true : false}
            errorMessage={errors.invoice_notes && errors.invoice_notes.message}
            {...register("invoice_notes", { required: true })}
            className="w-full font-semibold"
            classNames={{
              label: "text-sm",
              input: "resize-y min-h-[30px] text-sm font-semibold",
            }}
          />
        </div>
        <Button
          type="submit"
          color="primary"
          radius="sm"
          isLoading={loading}
          className="w-full text-sm font-semibold"
        >
          Create Invoice
        </Button>
      </form>
    </div>
  );
}
