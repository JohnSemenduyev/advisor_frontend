"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

interface TagSelectionModalProps {
  modalId: "ba-location-modal" | "ba-industry-modal";
  titleId: string;
  title: string;
  inputId: string;
  placeholder: string;
  selectedItems: string[];
  getSuggestions: (query: string, selected: string[]) => string[];
  onAdd: (item: string) => void;
  onRemove: (item: string) => void;
  onClose: () => void;
  onDone: () => void;
  footerStartContent?: React.ReactNode;
}

export function TagSelectionModal({
  modalId,
  titleId,
  title,
  inputId,
  placeholder,
  selectedItems,
  getSuggestions,
  onAdd,
  onRemove,
  onClose,
  onDone,
  footerStartContent,
}: TagSelectionModalProps) {
  const [query, setQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const dropdownVisibleRef = useRef(false);

  const trimmedQuery = query.trim();

  const suggestions = useMemo(() => {
    if (!trimmedQuery) return [];
    return getSuggestions(trimmedQuery, selectedItems);
  }, [getSuggestions, trimmedQuery, selectedItems]);

  const dropdownVisible = isDropdownOpen && suggestions.length > 0;

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    dropdownVisibleRef.current = dropdownVisible;
  }, [dropdownVisible]);

  useEffect(() => {
    const focusTimer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    const handleDocumentKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        if (dropdownVisibleRef.current) {
          setIsDropdownOpen(false);
        } else {
          onCloseRef.current();
        }
      }
    };

    const handleDocumentPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        !inputRef.current?.contains(target) &&
        !resultsRef.current?.contains(target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("keydown", handleDocumentKeyDown);
    document.addEventListener("pointerdown", handleDocumentPointerDown);
    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleDocumentKeyDown);
      document.removeEventListener("pointerdown", handleDocumentPointerDown);
    };
  }, []);

  const safeActiveIndex =
    suggestions.length > 0 ? Math.min(activeIndex, suggestions.length - 1) : 0;

  const handleSelectItem = (item: string) => {
    onAdd(item);
    setQuery("");
    setIsDropdownOpen(false);
    setActiveIndex(0);
    inputRef.current?.focus();
  };

  const handleRemoveItem = (item: string) => {
    onRemove(item);
    setIsDropdownOpen(false);
    inputRef.current?.focus();
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (dropdownVisible && suggestions.length > 0) {
        handleSelectItem(suggestions[safeActiveIndex] || suggestions[0]);
      }
    } else if (e.key === "ArrowDown" && dropdownVisible && suggestions.length > 0) {
      e.preventDefault();
      const nextIndex = (safeActiveIndex + 1) % suggestions.length;
      setActiveIndex(nextIndex);
      const target = resultsRef.current?.children[nextIndex] as
        | HTMLElement
        | undefined;
      target?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "ArrowUp" && dropdownVisible && suggestions.length > 0) {
      e.preventDefault();
      const nextIndex =
        (safeActiveIndex - 1 + suggestions.length) % suggestions.length;
      setActiveIndex(nextIndex);
      const target = resultsRef.current?.children[nextIndex] as
        | HTMLElement
        | undefined;
      target?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "Tab") {
      setIsDropdownOpen(false);
    }
  };

  return (
    <div
      id={modalId}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="lm-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        {/* Header: Title and Close button */}
        <div className="lm-head">
          <span id={titleId} className="lm-label">
            {title}
          </span>
          <button
            type="button"
            className="lm-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Modal Search Input */}
        <input
          ref={inputRef}
          id={inputId}
          className="lm-input"
          type="text"
          autoComplete="off"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            const nextValue = e.target.value;
            setQuery(nextValue);
            setActiveIndex(0);
            setIsDropdownOpen(nextValue.trim().length > 0);
          }}
          onKeyDown={handleInputKeyDown}
        />

        {/* Autocomplete Suggestions Dropdown */}
        {dropdownVisible && (
          <div ref={resultsRef} className="lm-results">
            {suggestions.map((item, idx) => (
              <button
                key={item}
                type="button"
                tabIndex={-1}
                className={idx === safeActiveIndex ? "active" : ""}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelectItem(item)}
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {/* Selected Chips Container */}
        <div className="lm-chips">
          {selectedItems.map((item) => (
            <span key={item} className="lm-chip">
              <span>{item}</span>
              <button
                type="button"
                onClick={() => handleRemoveItem(item)}
                aria-label={`Remove ${item}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="lm-footer">
          {footerStartContent}
          <button
            type="button"
            className="lm-done"
            onClick={onDone}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
