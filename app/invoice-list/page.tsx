"use client";

import React from "react";

import invoices from "@/api/invoices.json";

import { ModalDetail } from "@/components/modal";

export default function InvoiceList() {
  return (
    <div className="flex flex-col w-full gap-2 px-4 py-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-black">
      <h2 className="text-lg font-semibold px-4">Invoice Cards</h2>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full text-left">
          <thead>
            <tr>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="block antialiased font-sans text-sm font-semibold">
                  Customer Name
                </p>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="block antialiased font-sans text-sm font-semibold">
                  Sales Person Name
                </p>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="block antialiased font-sans text-sm font-semibold">
                  Invoice Date
                </p>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="block antialiased font-sans text-sm font-semibold">
                  Total Amount Paid
                </p>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="block antialiased font-sans text-sm font-semibold">
                  Status
                </p>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="block antialiased font-sans text-sm font-semibold">
                  Detail
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.invoice_number}>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                    {invoice.customer_name}
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                    {invoice.salesperson_name}
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                    Wed 3:00pm
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                    Rp {invoice.total_amount}
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="w-max">
                    <div className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-green-500/20 text-green-900 py-1 px-2 text-xs rounded-md">
                      <span className="">paid</span>
                    </div>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <ModalDetail
                    invoice_number={invoice.invoice_number}
                    customer_name={invoice.customer_name}
                    salesperson_name={invoice.salesperson_name}
                    product_sold={invoice.product_sold}
                    invoice_notes={invoice.invoice_notes}
                    total_amount={invoice.total_amount}
                    invoice_date={invoice.invoice_date}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
