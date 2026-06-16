import * as React from "react";
import { cn } from "@/app/utils/cn";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function Select({
  options,
  value,
  placeholder = "Select...",
  onChange,
  className,
}: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);
  const listboxId = React.useId();

  const handleOpen = React.useCallback(() => {
    const index = options.findIndex((o) => o.value === value);
    setHighlightedIndex(index >= 0 ? index : 0);
    setOpen(true);
  }, [options, value]);

  const handleClose = React.useCallback(() => {
    setHighlightedIndex(-1);
    setOpen(false);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        handleClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, handleClose]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        handleOpen();
      }
      return;
    }

    switch (e.key) {
      case "Escape":
        handleClose();
        break;
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => {
          let next = prev + 1;
          while (next < options.length && options[next].disabled) {
            next++;
          }
          return next < options.length ? next : prev;
        });
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => {
          let next = prev - 1;
          while (next >= 0 && options[next].disabled) {
            next--;
          }
          return next >= 0 ? next : prev;
        });
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (highlightedIndex >= 0 && !options[highlightedIndex].disabled) {
          onChange?.(options[highlightedIndex].value);
          handleClose();
        }
        break;
      case "Tab":
        handleClose();
        break;
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        onClick={() => (open ? handleClose() : handleOpen())}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-activedescendant={
          open && highlightedIndex >= 0
            ? `${listboxId}-option-${highlightedIndex}`
            : undefined
        }
        className="
          flex w-full items-center justify-between
          border border-neutral-300 bg-white px-3 py-2
          text-left text-sm cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
        "
      >
        <span className={cn(!selected && "text-neutral-400")}>
          {selected?.label ?? placeholder}
        </span>
        <span
          className={cn(
            "transition-transform duration-300",
            open && "rotate-180",
          )}
        >
          <ChevronDown size={16} />
        </span>
      </button>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          tabIndex={-1}
          className="
            absolute left-0 top-full mt-1
            w-full
            max-h-60
            overflow-y-auto
            border border-black
            bg-white
            z-50
            m-0 p-0 list-none
          "
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isHighlighted = index === highlightedIndex;

            return (
              <li
                key={option.value}
                id={`${listboxId}-option-${index}`}
                role="option"
                aria-selected={isSelected}
                aria-disabled={option.disabled}
                onClick={() => {
                  if (option.disabled) return;
                  onChange?.(option.value);
                  handleClose();
                }}
                onMouseEnter={() =>
                  !option.disabled && setHighlightedIndex(index)
                }
                className={cn(
                  "block w-full px-3 py-2 text-left text-sm cursor-pointer",
                  isHighlighted && "bg-black text-white",
                  isSelected && "font-medium",
                  option.disabled &&
                    "opacity-50 cursor-not-allowed hover:bg-transparent",
                )}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
