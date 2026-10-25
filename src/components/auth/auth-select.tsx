import React from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface AuthSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  icon?: React.ReactNode;
  options: Option[];
  error?: string;
}

export function AuthSelect({
  label,
  icon,
  options,
  error,
  id,
  className = "",
  ...props
}: AuthSelectProps) {
  const selectId =
    id || props.name || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1 text-left">
      <label
        htmlFor={selectId}
        className="block text-xs font-bold text-[#244c68] tracking-wide"
      >
        {label}
      </label>

      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-3.5 text-[#50788c] pointer-events-none z-10">
            {icon}
          </span>
        )}
        <select
          id={selectId}
          className={`w-full appearance-none rounded-xl border border-[#b9d5e3] bg-white py-2.5 text-sm text-[#203b4e] transition-colors focus:border-[#25678b] focus:outline-none focus:ring-2 focus:ring-[#3a9dbd]/30 ${
            icon ? "pl-10 pr-9" : "px-3.5 pr-9"
          } ${error ? "border-rose-400 focus:ring-rose-200" : ""} ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3.5 h-4 w-4 text-[#50788c] pointer-events-none" />
      </div>

      {error && <p className="text-[11px] text-rose-500 font-medium">{error}</p>}
    </div>
  );
}
