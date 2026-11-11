"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";

export interface CustomSelectOption {
  value: string;
  label: string;
}

export interface CustomSelectProps {
  value: string;
  options: CustomSelectOption[];
  onChange: (value: string) => void;
  variant?: "filter" | "pager" | "field" | "auth";
  placement?: "bottom" | "top";
  align?: "left" | "center" | "right";
  minMenuWidth?: number;
  id?: string;
  name?: string;
  ariaLabel?: string;
  disabled?: boolean;
  hasLeftIcon?: boolean;
  error?: boolean;
  className?: string;
  triggerLabelClassName?: string;
}

interface MenuCoords {
  left: number;
  minWidth: number;
  maxHeight: number;
  openUp: boolean;
  top?: number;
  bottom?: number;
}

const DEFAULT_MIN_WIDTH: Record<NonNullable<CustomSelectProps["variant"]>, number> = {
  filter: 0,
  pager: 0,
  field: 0,
  auth: 0,
};

export function CustomSelect({
  value,
  options,
  onChange,
  variant = "filter",
  placement = "bottom",
  align = "left",
  minMenuWidth,
  id,
  name,
  ariaLabel,
  disabled = false,
  hasLeftIcon = false,
  error = false,
  className = "",
  triggerLabelClassName = "",
}: CustomSelectProps) {
  const generatedId = useId();
  const triggerId = id || `ba-select-${generatedId}`;
  const listboxId = `${triggerId}-listbox`;

  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [isKeyboardNav, setIsKeyboardNav] = useState(false);
  const [menuCoords, setMenuCoords] = useState<MenuCoords | null>(null);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const computeCoordsRef = useRef<() => MenuCoords | null>(() => null);

  const selectedIndex = Math.max(
    0,
    options.findIndex((opt) => opt.value === value)
  );
  const selectedOption = options[selectedIndex] || options[0];

  const computeCoords = (): MenuCoords | null => {
    const triggerEl = triggerRef.current;
    if (!triggerEl || typeof window === "undefined") return null;

    const rect = triggerEl.getBoundingClientRect();
    const resolvedMinWidth = Math.max(
      rect.width,
      minMenuWidth ?? DEFAULT_MIN_WIDTH[variant]
    );

    const estimatedMenuHeight = Math.min(260, options.length * 34 + 12);
    const spaceBelow = Math.max(0, window.innerHeight - rect.bottom - 10);
    const spaceAbove = Math.max(0, rect.top - 10);

    const openUp =
      placement === "top"
        ? spaceAbove >= Math.min(estimatedMenuHeight, 120) || spaceAbove > spaceBelow
        : spaceBelow < estimatedMenuHeight && spaceAbove > spaceBelow;

    let left =
      align === "right"
        ? rect.right - resolvedMinWidth
        : align === "center"
          ? rect.left + (rect.width - resolvedMinWidth) / 2
          : rect.left;

    left = Math.max(12, Math.min(left, window.innerWidth - resolvedMinWidth - 12));

    if (openUp) {
      return {
        left,
        minWidth: resolvedMinWidth,
        maxHeight: Math.max(120, Math.min(260, spaceAbove)),
        openUp: true,
        bottom: window.innerHeight - rect.top + 3,
      };
    }

    return {
      left,
      minWidth: resolvedMinWidth,
      maxHeight: Math.max(120, Math.min(260, spaceBelow)),
      openUp: false,
      top: rect.bottom + 3,
    };
  };

  useEffect(() => {
    computeCoordsRef.current = computeCoords;
  });

  const openMenu = (startIndex?: number, keyboard = false) => {
    if (disabled || options.length === 0) return;
    const coords = computeCoords();
    if (!coords) return;
    setMenuCoords(coords);
    setHighlightedIndex(startIndex ?? selectedIndex);
    setIsKeyboardNav(keyboard);
    setIsOpen(true);
  };

  const closeMenu = (restoreFocus = false) => {
    setIsOpen(false);
    if (restoreFocus) {
      triggerRef.current?.focus();
    }
  };

  const handleSelectOption = (optValue: string, restoreFocus = false) => {
    onChange(optValue);
    closeMenu(restoreFocus);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        !triggerRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    const handleWindowResize = () => {
      const nextCoords = computeCoordsRef.current();
      if (nextCoords) {
        setMenuCoords(nextCoords);
      }
    };

    const handleDocumentScroll = (e: Event) => {
      if (menuRef.current?.contains(e.target as Node)) return;
      const rect = triggerRef.current?.getBoundingClientRect();
      if (
        !rect ||
        rect.bottom < 0 ||
        rect.top > window.innerHeight ||
        rect.right < 0 ||
        rect.left > window.innerWidth
      ) {
        setIsOpen(false);
        return;
      }
      const nextCoords = computeCoordsRef.current();
      if (nextCoords) {
        setMenuCoords(nextCoords);
      }
    };

    const handleWindowKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("resize", handleWindowResize);
    document.addEventListener("scroll", handleDocumentScroll, true);
    document.addEventListener("keydown", handleWindowKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("resize", handleWindowResize);
      document.removeEventListener("scroll", handleDocumentScroll, true);
      document.removeEventListener("keydown", handleWindowKeyDown);
    };
  }, [isOpen]);

  const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled || options.length === 0) return;

    if (!isOpen) {
      if (
        e.key === "Enter" ||
        e.key === " " ||
        e.key === "ArrowDown" ||
        e.key === "ArrowUp"
      ) {
        e.preventDefault();
        const initialIdx =
          e.key === "ArrowUp"
            ? (selectedIndex - 1 + options.length) % options.length
            : selectedIndex;
        openMenu(initialIdx, true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIdx = (highlightedIndex + 1) % options.length;
      setHighlightedIndex(nextIdx);
      setIsKeyboardNav(true);
      const optionEl = menuRef.current?.children[nextIdx] as
        | HTMLElement
        | undefined;
      optionEl?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const nextIdx = (highlightedIndex - 1 + options.length) % options.length;
      setHighlightedIndex(nextIdx);
      setIsKeyboardNav(true);
      const optionEl = menuRef.current?.children[nextIdx] as
        | HTMLElement
        | undefined;
      optionEl?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "Home") {
      e.preventDefault();
      setHighlightedIndex(0);
      setIsKeyboardNav(true);
      const optionEl = menuRef.current?.children[0] as HTMLElement | undefined;
      optionEl?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "End") {
      e.preventDefault();
      const lastIdx = options.length - 1;
      setHighlightedIndex(lastIdx);
      setIsKeyboardNav(true);
      const optionEl = menuRef.current?.children[lastIdx] as
        | HTMLElement
        | undefined;
      optionEl?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const targetOption = options[highlightedIndex] || options[0];
      if (targetOption) {
        handleSelectOption(targetOption.value, true);
      }
    } else if (e.key === "Tab") {
      setIsOpen(false);
    }
  };

  return (
    <>
      {name && <input type="hidden" name={name} value={value} />}
      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={() => {
          if (isOpen) {
            closeMenu();
          } else {
            openMenu();
          }
        }}
        onKeyDown={handleTriggerKeyDown}
        className={`ba-select-trigger ba-select-trigger--${variant} ${
          isOpen ? "is-open" : ""
        } ${hasLeftIcon ? "has-left-icon" : ""} ${
          error ? "has-error" : ""
        } ${className}`}
      >
        <span className={`ba-select-value truncate ${triggerLabelClassName}`}>
          {selectedOption?.label ?? ""}
        </span>
        <ChevronDown
          className="ba-select-chevron"
          size={variant === "auth" ? 15 : 12}
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </button>

      {isOpen &&
        menuCoords &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={menuRef}
            id={listboxId}
            role="listbox"
            aria-labelledby={triggerId}
            onMouseMove={() => {
              if (isKeyboardNav) setIsKeyboardNav(false);
            }}
            className={`ba-select-menu ba-select-menu--${variant} ${
              menuCoords.openUp ? "is-up" : "is-down"
            }`}
            style={{
              left: `${menuCoords.left}px`,
              minWidth: `${menuCoords.minWidth}px`,
              maxHeight: `${menuCoords.maxHeight}px`,
              ...(menuCoords.openUp
                ? { bottom: `${menuCoords.bottom}px` }
                : { top: `${menuCoords.top}px` }),
            }}
          >
            {options.map((option, idx) => {
              const isSelected = option.value === value;
              const isHighlighted = isKeyboardNav && idx === highlightedIndex;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={-1}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSelectOption(option.value, false)}
                  className={`ba-select-option ${
                    isHighlighted ? "is-highlighted" : ""
                  }`}
                >
                  <span className="truncate">{option.label}</span>
                </button>
              );
            })}
          </div>,
          document.body
        )}
    </>
  );
}
