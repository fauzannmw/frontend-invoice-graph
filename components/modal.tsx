"use client";
import { Invoice } from "@/types";
import {
  Button,
  Image,
  Modal,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import { Fragment } from "react";

export const ModalDetail: React.FC<Invoice> = ({
  invoice_number,
  customer_name,
  salesperson_name,
  products_sold,
  invoice_notes,
  total_amount,
  invoice_date,
}) => {
  const { onClose, isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Fragment>
      <Button onPress={onOpen} variant="bordered" radius="sm">
        Detail
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent className="flex gap-8 p-8 w-full">
          <div className="grid grid-cols-2 ">
            <div>
              <p className="font-bold text-gray-800">Customer Name :</p>
              <p className="text-gray-500">{customer_name}</p>
              <p className="font-bold text-gray-800">Salesperson Name :</p>
              <p className="text-gray-500">{salesperson_name}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-800">Invoice number: :</p>
              <p className="text-gray-500">{invoice_number}</p>
              <p className="font-bold text-gray-800">Invoice date :</p>
              <p className="text-gray-500">{invoice_date}</p>
            </div>
          </div>
          <div className="flow-root sm:mx-0 w-full">
            <table className="min-w-full w-full">
              <colgroup>
                <col className="w-full sm:w-1/2" />
                <col className="sm:w-1/6" />
                <col className="sm:w-1/6" />
                <col className="sm:w-1/6" />
              </colgroup>
              <thead className="border-b border-gray-300 text-gray-900">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Items
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0"
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {products_sold.map((product) => (
                  <tr key={product?.id} className="border-b border-gray-200">
                    <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="font-medium text-gray-900">
                        {product?.name}
                      </div>
                    </td>
                    <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                      <Image
                        alt="product_image"
                        src={product?.picture}
                        className="h-10 w-10"
                      />
                    </td>
                    <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                      {product?.price}
                    </td>
                    <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">
                      {product?.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-4">
            <div className="border-y border-black py-4">
              <label className="text-sm font-semibold">Notes :</label>
              <p className="text-sm font-semibold text-gray-500 text-justify">
                {invoice_notes}
              </p>
            </div>
            <p className="flex gap-4 text-sm font-semibold">
              Total : <span> {total_amount}</span>
            </p>
          </div>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};
