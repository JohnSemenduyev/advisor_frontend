"use client";

import React from "react";
import { CustomSelect } from "../shared/custom-select";

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
  name,
  value,
  defaultValue,
  disabled,
  onChange,
  className = "",
}: AuthSelectProps) {
  const selectId =
    id || name || label.toLowerCase().replace(/\s+/g, "-");

  const resolvedValue = String(
    value ?? defaultValue ?? options[0]?.value ?? ""
  );

  const handleValueChange = (nextValue: string) => {
    if (!onChange) return;
    const syntheticEvent = {
      target: { name: name || "", value: nextValue },
      currentTarget: { name: name || "", value: nextValue },
    } as React.ChangeEvent<HTMLSelectElement>;
    onChange(syntheticEvent);
  };

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
        <CustomSelect
          id={selectId}
          name={name}
          variant="auth"
          ariaLabel={label}
          value={resolvedValue}
          onChange={handleValueChange}
          options={options}
          disabled={disabled}
          hasLeftIcon={Boolean(icon)}
          error={Boolean(error)}
          className={className}
        />
      </div>

      {error && <p className="text-[11px] text-rose-500 font-medium">{error}</p>}
    </div>
  );
}
