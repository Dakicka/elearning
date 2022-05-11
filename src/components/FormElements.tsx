import { ErrorMessage } from "@hookform/error-message";
import { ReactNode } from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";

export const InputText: React.FC<{
  name: string;
  type: string;
  errors?: FieldErrors;
  placeholder?: string;
  defaultValue?: string;
  children: ReactNode;
  registerHandler(): UseFormRegisterReturn;
}> = ({
  children,
  name,
  type,
  placeholder,
  defaultValue,
  errors,
  registerHandler,
}) => (
  <div>
    <label className="text-sm font-bold text-gray-600 block">{children}</label>
    <input
      {...registerHandler()}
      type={type}
      className="w-full p-2 border border-gray-300 rounded mt-1"
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
    <ErrorMessage errors={errors} name={name} />
  </div>
);

export const FormContainer: React.FC<{ children: ReactNode }> = ({
  children,
}) => (
  <div className="max-w-md w-full-md mx-auto bg-white border p-8 border-gray-300 mt-4">
    {children}
  </div>
);
