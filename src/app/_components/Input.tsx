"use client";
import React from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

type InputMode =
  | "search"
  | "email"
  | "tel"
  | "text"
  | "url"
  | "none"
  | "numeric"
  | "decimal"
  | undefined;

interface Props {
  type: string;
  id: string;
  placeholder: string;
  inputMode: InputMode;
  disabled: boolean;
  label: string;
  register: UseFormRegisterReturn;
  errors?: FieldError;
}

export const Input = ({
  type,
  id,
  placeholder,
  inputMode,
  disabled,
  label,
  errors,
  register,
}: Props) => {
  return (
    <div className="pb-5">
      <label>{label}</label>
      <input
        className="bg-custom-gray py-2 px-3 mb-1 text-gray-700 leading-tight w-full border-[1px] rounded-lg"
        id={id}
        type={type}
        placeholder={placeholder}
        inputMode={inputMode}
        disabled={disabled}
        {...register}
      />
      {errors && typeof errors.message === "string" && (
        <p className="text-sm text-red-500">{errors.message}</p>
      )}
    </div>
  );
};
