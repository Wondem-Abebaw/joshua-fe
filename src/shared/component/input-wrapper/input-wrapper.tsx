import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  label?: any;
  required?: boolean;
  error?: any;
  className?: string;
  labelClassName?: string;
}
export default function InputWrapper(props: Props) {
  const { children, label, required, error, className, labelClassName } = props;
  return (
    <div className={`w-full flex-col space-y-0 text-sm ${className ?? ""}`}>
      <label
        className={`flex text-sm font-bold space-x-2 ${labelClassName ?? ""} ${
          required ? "" : "mb-[6px]"
        }`}
      >
        {label}
        {required && (
          <span className="text-rose-500 flex items-center text-lg pl-2">
            *
          </span>
        )}
      </label>
      {children}
      {error && error !== "undefined" && (
        <span className="text-danger">{error}</span>
      )}
    </div>
  );
}
