import { ReactNode, InputHTMLAttributes, ButtonHTMLAttributes } from "react";

// Reusable Input Component
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: ReactNode;
  rightElement?: ReactNode;
  type?: string;
  id?: string;
  className?: string;
  name?: string;
  autoComplete?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void;
}

export function Input({
  label,
  type = "text",
  error,
  icon,
  rightElement,
  id,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col w-full gap-1 text-left">
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      
      <div className="relative flex items-center w-full">
        {icon && (
          <div className="absolute left-3 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}
        
        <input
          id={id}
          type={type}
          className={`w-full bg-white border text-sm text-gray-900 rounded-md py-2 px-3 ${
            icon ? "pl-9" : "pl-3"
          } ${rightElement ? "pr-10" : "pr-3"} transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-brand-orange focus:border-brand-orange placeholder-gray-400 font-sans ${
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 hover:border-gray-400"
          } ${className}`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        
        {rightElement && (
          <div className="absolute right-2.5 flex items-center justify-center">
            {rightElement}
          </div>
        )}
      </div>
      
      {error && (
        <span
          id={`${id}-error`}
          className="text-sm text-red-500 mt-0.5"
        >
          {error}
        </span>
      )}
    </div>
  );
}

// Reusable Button Component
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "primary" | "secondary" | "outline";
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function Button({
  loading = false,
  disabled = false,
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyle =
    "w-full py-2 px-4 rounded-md font-medium text-sm transition-colors duration-150 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-orange";
  
  const variants = {
    primary:
      "bg-brand-orange text-white hover:bg-brand-orange-hover focus:ring-brand-orange active:bg-brand-orange-hover disabled:opacity-50 disabled:cursor-not-allowed",
    secondary:
      "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300 disabled:opacity-50",
    outline:
      "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-300 disabled:opacity-50",
  };

  return (
    <button
      disabled={disabled || loading}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-4 w-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : null}
      <span>{children}</span>
    </button>
  );
}

