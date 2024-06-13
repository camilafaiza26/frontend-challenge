import React from "react";
import Image from "next/image";

type InputWithLabelProps = {
  id: string;
  label?: string;
  placeholder?: string;
  type: string;
  required?: boolean;
  iconEnd?: string;
  disabled?: boolean;
  prefix?: string | number;
  name?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  id,
  label = "",
  placeholder,
  type = "text",
  required = false,
  iconEnd,
  value,
  name,
  prefix,
  disabled = false,
  onChange,
}) => {
  return (
    <div className="mb-5 relative">
      <label className="block mb-2 font-medium text-gray-900" htmlFor={id}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {prefix && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 pointer-events-none">
            {prefix}
          </div>
        )}

        <input
          type={type}
          id={id}
          className={`border border-gray-200 text-gray-900 rounded block w-full py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ${
            disabled ? "bg-gray-200" : "bg-white"
          } ${prefix ? "px-10" : "px-4"}`}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          name={name}
          value={value}
        />
        {iconEnd && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            <Image src={iconEnd} alt="icon" width={24} height={24} />
          </div>
        )}
      </div>
    </div>
  );
};

export default InputWithLabel;
