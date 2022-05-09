import { ReactNode } from "react";

interface AlertProps {
  msg: string;
  children?: ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ children, msg }) => (
  <div
    className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 my-8"
    role="alert"
  >
    <span className="font-medium text-center">{msg}</span> {children}
  </div>
);
