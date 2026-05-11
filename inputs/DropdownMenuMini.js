import * as React from "react";
import { normalizeOptions } from "./normalizeOptions.js";
import { HintBadge } from "./HintBadge.jsx";
function DropdownMenuMini({
  label,
  hint,
  options = [],
  value,
  placeholder = "Select",
  onChange,
  disabled = false,
  className = "",
  search = false,
  multi = false
}) {
  const normalized = React.useMemo(() => normalizeOptions(options), [options]);
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
  const containerRef = React.useRef(null);
  const buttonRef = React.useRef(null);
  const listRef = React.useRef(null);
  const searchInputRef = React.useRef(null);
  const searchRef = React.useRef({ term: "", timeout: null });
  const selected = !multi ? normalized.find((o) => o.value === value) : void 0;
  const selectedSet = React.useMemo(
    () => multi ? new Set(Array.isArray(value) ? value : []) : /* @__PURE__ */ new Set(),
    [multi, value]
  );
  const triggerLabel = React.useMemo(() => {
    if (!multi || selectedSet.size === 0) return null;
    return normalized.filter((o) => selectedSet.has(o.value)).map((o) => o.label).join(", ");
  }, [multi, normalized, selectedSet]);
  const filteredOptions = React.useMemo(
    () => searchQuery ? normalized.filter((o) => o.label.toLowerCase().includes(searchQuery.toLowerCase())) : normalized,
    [normalized, searchQuery]
  );
  const close = () => {
    setOpen(false);
    setHighlightedIndex(-1);
    setSearchQuery("");
    if (searchRef.current.timeout) clearTimeout(searchRef.current.timeout);
    searchRef.current.term = "";
  };
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target)) close();
    }
    function handleEscape(event) {
      if (event.key === "Escape") {
        close();
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      if (searchRef.current.timeout) clearTimeout(searchRef.current.timeout);
    };
  }, []);
  React.useEffect(() => {
    if (!open) return;
    if (search) searchInputRef.current?.focus();
    setHighlightedIndex(() => {
      if (multi) return filteredOptions.length > 0 ? 0 : -1;
      const idx = filteredOptions.findIndex((o) => o.value === value);
      return idx >= 0 ? idx : 0;
    });
  }, [open]);
  React.useEffect(() => {
    if (!open) return;
    setHighlightedIndex(filteredOptions.length > 0 ? 0 : -1);
  }, [searchQuery]);
  React.useEffect(() => {
    if (!open || highlightedIndex < 0) return;
    listRef.current?.querySelector(`[data-index="${highlightedIndex}"]`)?.scrollIntoView({ block: "nearest" });
  }, [open, highlightedIndex]);
  const handleSelect = (option) => {
    if (option.disabled) return;
    if (multi) {
      const arr = Array.isArray(value) ? value : [];
      onChange?.(
        selectedSet.has(option.value) ? arr.filter((v) => v !== option.value) : [...arr, option.value]
      );
    } else {
      onChange?.(option.value);
      close();
      buttonRef.current?.focus();
    }
  };
  const handleArrowNavigation = (direction) => {
    if (!open) {
      setOpen(true);
      return;
    }
    const total = filteredOptions.length;
    if (total === 0) return;
    setHighlightedIndex((prev) => prev < 0 ? 0 : (prev + direction + total) % total);
  };
  const handleTypeAhead = (char) => {
    if (multi) return;
    const isValidChar = char.length === 1 && /[\w\s]/i.test(char);
    if (!isValidChar) return;
    const nextTerm = searchRef.current.term + char.toLowerCase();
    searchRef.current.term = nextTerm;
    if (searchRef.current.timeout) clearTimeout(searchRef.current.timeout);
    searchRef.current.timeout = setTimeout(() => {
      searchRef.current.term = "";
    }, 600);
    const matchIndex = filteredOptions.findIndex((o) => o.label.toLowerCase().startsWith(nextTerm));
    if (matchIndex >= 0) {
      if (!open) setOpen(true);
      setHighlightedIndex(matchIndex);
    }
  };
  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        handleArrowNavigation(1);
        break;
      case "ArrowUp":
        event.preventDefault();
        handleArrowNavigation(-1);
        break;
      case "Enter":
        event.preventDefault();
        if (open && highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex]);
        } else {
          setOpen(true);
        }
        break;
      case "Escape":
        close();
        break;
      case "Home":
        event.preventDefault();
        if (filteredOptions.length) {
          if (!open) setOpen(true);
          setHighlightedIndex(0);
        }
        break;
      case "End":
        event.preventDefault();
        if (filteredOptions.length) {
          if (!open) setOpen(true);
          setHighlightedIndex(filteredOptions.length - 1);
        }
        break;
      default:
        handleTypeAhead(event.key);
    }
  };
  const handleSearchKeyDown = (event) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        handleArrowNavigation(1);
        break;
      case "ArrowUp":
        event.preventDefault();
        handleArrowNavigation(-1);
        break;
      case "Enter":
        event.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) handleSelect(filteredOptions[highlightedIndex]);
        break;
      case "Escape":
        close();
        buttonRef.current?.focus();
        break;
    }
  };
  const triggerText = multi ? triggerLabel ?? placeholder : selected?.label ?? placeholder;
  const triggerDim = multi && !triggerLabel;
  return /* @__PURE__ */ React.createElement("div", { className: `dropdown-mini ${className}`, ref: containerRef }, label && /* @__PURE__ */ React.createElement("label", { className: "control-label label-row" }, label, hint && /* @__PURE__ */ React.createElement(HintBadge, { hint })), /* @__PURE__ */ React.createElement("div", { className: "trigger-wrap" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      ref: buttonRef,
      className: `trigger${disabled ? " is-disabled" : ""}`,
      onClick: () => {
        if (!disabled) setOpen((p) => !p);
      },
      onKeyDown: handleKeyDown,
      "aria-haspopup": "listbox",
      "aria-expanded": open,
      "aria-multiselectable": multi ? "true" : void 0,
      disabled
    },
    /* @__PURE__ */ React.createElement("span", { className: `control-value value${triggerDim ? " is-dim" : ""}` }, triggerText),
    /* @__PURE__ */ React.createElement(
      "svg",
      {
        className: `chevron${open ? " is-open" : ""}`,
        viewBox: "0 0 20 20",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
      },
      /* @__PURE__ */ React.createElement("path", { d: "M5 7.5L10 12.5L15 7.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
    )
  ), open && /* @__PURE__ */ React.createElement("div", { className: "panel" }, search && /* @__PURE__ */ React.createElement("div", { className: "search-wrap" }, /* @__PURE__ */ React.createElement(
    "input",
    {
      ref: searchInputRef,
      type: "text",
      value: searchQuery,
      onChange: (e) => setSearchQuery(e.target.value),
      onKeyDown: handleSearchKeyDown,
      placeholder: "Search...",
      className: "control-option search-input"
    }
  )), /* @__PURE__ */ React.createElement(
    "ul",
    {
      ref: listRef,
      className: "list",
      role: "listbox",
      "aria-multiselectable": multi ? "true" : void 0,
      tabIndex: -1
    },
    filteredOptions.map((option, index) => {
      const isSelected = multi ? selectedSet.has(option.value) : option.value === value;
      const isHighlighted = index === highlightedIndex;
      const isDisabled = option.disabled;
      return /* @__PURE__ */ React.createElement("li", { key: option.value }, /* @__PURE__ */ React.createElement(
        "button",
        {
          type: "button",
          "data-index": index,
          className: `control-option option${isDisabled ? " is-disabled" : ""}${isSelected && !isDisabled ? " is-selected" : ""}${isHighlighted && !isDisabled ? " is-highlighted" : ""}`,
          style: { justifyContent: multi ? "space-between" : "flex-start", alignItems: "center" },
          onClick: () => handleSelect(option),
          onMouseEnter: () => !isDisabled && setHighlightedIndex(index),
          role: "option",
          "aria-selected": isSelected,
          "aria-disabled": isDisabled
        },
        /* @__PURE__ */ React.createElement("span", { className: "option-text" }, option.label),
        multi && isSelected && !isDisabled && /* @__PURE__ */ React.createElement("svg", { className: "option-check", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ React.createElement("path", { d: "M4 10L8 14L16 6", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }))
      ));
    }),
    filteredOptions.length === 0 && /* @__PURE__ */ React.createElement("li", { className: "no-results" }, "No results")
  ))));
}
export {
  DropdownMenuMini
};
