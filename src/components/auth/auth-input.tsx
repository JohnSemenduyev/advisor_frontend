import React from "react";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
}

export function AuthInput({
  label,
  icon,
  error,
  id,
  className = "",
  ...props
}: AuthInputProps) {
  const inputId = id || props.name || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1 text-left">
      <label
        htmlFor={inputId}
        className="block text-xs font-bold text-[#244c68] tracking-wide"
      >
        {label}
      </label>

      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-3.5 text-[#50788c] pointer-events-none">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={`w-full rounded-xl border border-[#b9d5e3] bg-white py-2.5 text-sm text-[#203b4e] placeholder:text-[#8ba2b2] transition-colors focus:border-[#25678b] focus:outline-none focus:ring-2 focus:ring-[#3a9dbd]/30 ${
            icon ? "pl-10 pr-3.5" : "px-3.5"
          } ${error ? "border-rose-400 focus:ring-rose-200" : ""} ${className}`}
          {...props}
        />
      </div>

      {error && <p className="text-[11px] text-rose-500 font-medium">{error}</p>}
    </div>
  );
}
