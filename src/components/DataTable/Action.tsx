import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DialogConfirmation from "../../components/DialogConfirmation";
import axios from "axios";
import { Toaster, toast } from "sonner";

type ActionProps = {
  id: string;
};

const Action = ({ id }: ActionProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://mock.apidog.com/m1/523540-0-default/api/order/${id}`
      );
      if (response.data.success) {
        toast.success("Your data has been successfully deleted.", {
          className:
            "bg-green-100 border-l-4 border-green-500 text-green-700 p-6",
        });
      }
    } catch (error) {
      console.error("Error deleting data: ", error);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="flex gap-2">
        <Link
          href={`order-management/edit/${id}`}
          className="flex items-center justify-center p-2"
        >
          <Image
            src="/images/icon/edit.svg"
            alt="Edit Icon"
            width={24}
            height={24}
            className="mr-2"
          />
        </Link>
        <Link
          href={`order-management/${id}`}
          className="flex items-center justify-center p-2"
        >
          <Image
            src="/images/icon/list_alt.svg"
            alt="List Alt Icon"
            width={24}
            height={24}
            className="mr-2"
          />
        </Link>
        <button
          className="flex items-center justify-center p-2"
          onClick={() => setShowConfirmation(true)}
        >
          <Image
            src="/images/icon/delete.svg"
            alt="Delete Icon"
            width={24}
            height={24}
            className="mr-2"
          />
        </button>

        {showConfirmation && (
          <DialogConfirmation
            onClose={() => setShowConfirmation(false)}
            onConfirm={handleDelete}
          />
        )}
      </div>
    </>
  );
};

export default Action;
