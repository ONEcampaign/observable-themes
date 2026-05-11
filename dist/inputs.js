// inputs/DropdownMenu.js
import * as React2 from "react";

// inputs/normalizeOptions.js
var normalizeOptions = (options) => {
  if (!options) return [];
  if (options instanceof Map) {
    return Array.from(options.entries()).map(([label, value]) => ({ label, value }));
  }
  return options.map(
    (option) => typeof option === "string" ? { label: option, value: option } : { label: option.label, value: option.value, disabled: option.disabled ?? false }
  );
};

// inputs/HintBadge.jsx
import * as React from "react";
function HintBadge({ hint }) {
  return /* @__PURE__ */ React.createElement("span", { className: "hint-badge" }, /* @__PURE__ */ React.createElement("span", { className: "badge" }, "?"), /* @__PURE__ */ React.createElement("span", { className: "hint-text tooltip" }, hint, /* @__PURE__ */ React.createElement("span", { className: "tooltip-arrow" })));
}

// inputs/DropdownMenu.js
function DropdownMenu({
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
  const normalized = React2.useMemo(() => normalizeOptions(options), [options]);
  const [open, setOpen] = React2.useState(false);
  const [searchQuery, setSearchQuery] = React2.useState("");
  const [highlightedIndex, setHighlightedIndex] = React2.useState(-1);
  const containerRef = React2.useRef(null);
  const buttonRef = React2.useRef(null);
  const listRef = React2.useRef(null);
  const searchInputRef = React2.useRef(null);
  const searchRef = React2.useRef({ term: "", timeout: null });
  const selected = !multi ? normalized.find((o) => o.value === value) : void 0;
  const selectedSet = React2.useMemo(
    () => multi ? new Set(Array.isArray(value) ? value : []) : /* @__PURE__ */ new Set(),
    [multi, value]
  );
  const triggerLabel = React2.useMemo(() => {
    if (!multi || selectedSet.size === 0) return null;
    return normalized.filter((o) => selectedSet.has(o.value)).map((o) => o.label).join(", ");
  }, [multi, normalized, selectedSet]);
  const filteredOptions = React2.useMemo(
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
  React2.useEffect(() => {
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
  React2.useEffect(() => {
    if (!open) return;
    if (search) searchInputRef.current?.focus();
    if (filteredOptions.length === 0) {
      setHighlightedIndex(-1);
      return;
    }
    setHighlightedIndex(() => {
      if (multi) return 0;
      const idx = filteredOptions.findIndex((o) => o.value === value);
      return idx >= 0 ? idx : 0;
    });
  }, [open]);
  React2.useEffect(() => {
    if (!open) return;
    setHighlightedIndex(filteredOptions.length > 0 ? 0 : -1);
  }, [searchQuery]);
  React2.useEffect(() => {
    if (!open || highlightedIndex < 0) return;
    listRef.current?.querySelector(`[data-index="${highlightedIndex}"]`)?.scrollIntoView({ block: "nearest" });
  }, [open, highlightedIndex]);
  const handleSelect = (option) => {
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
  return /* @__PURE__ */ React2.createElement("div", { className: `dropdown ${className}`, ref: containerRef }, label && /* @__PURE__ */ React2.createElement("label", { className: "control-label label-row" }, label, hint && /* @__PURE__ */ React2.createElement(HintBadge, { hint })), /* @__PURE__ */ React2.createElement("div", { className: "trigger-wrap" }, /* @__PURE__ */ React2.createElement(
    "button",
    {
      type: "button",
      ref: buttonRef,
      className: `trigger${disabled ? " is-disabled" : ""}`,
      onClick: () => {
        if (!disabled) setOpen((prev) => !prev);
      },
      onKeyDown: handleKeyDown,
      "aria-haspopup": "listbox",
      "aria-expanded": open,
      "aria-multiselectable": multi ? "true" : void 0,
      disabled
    },
    /* @__PURE__ */ React2.createElement("span", { className: `control-value value${triggerDim ? " is-dim" : ""}` }, triggerText),
    /* @__PURE__ */ React2.createElement(
      "svg",
      {
        className: `chevron${open ? " is-open" : ""}`,
        viewBox: "0 0 20 20",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
      },
      /* @__PURE__ */ React2.createElement("path", { d: "M5 7.5L10 12.5L15 7.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
    )
  ), open && /* @__PURE__ */ React2.createElement("div", { className: "panel" }, search && /* @__PURE__ */ React2.createElement("div", { className: "search-wrap" }, /* @__PURE__ */ React2.createElement(
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
  )), /* @__PURE__ */ React2.createElement(
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
      return /* @__PURE__ */ React2.createElement("li", { key: option.value }, /* @__PURE__ */ React2.createElement(
        "button",
        {
          type: "button",
          "data-index": index,
          className: `control-option option${isSelected ? " is-selected" : ""}${isHighlighted ? " is-highlighted" : ""}`,
          style: { justifyContent: multi ? "space-between" : "flex-start", alignItems: "center" },
          onClick: () => handleSelect(option),
          onMouseEnter: () => setHighlightedIndex(index),
          role: "option",
          "aria-selected": isSelected
        },
        /* @__PURE__ */ React2.createElement("span", { className: "option-text" }, option.label),
        multi && isSelected && /* @__PURE__ */ React2.createElement("svg", { className: "option-check", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ React2.createElement("path", { d: "M4 10L8 14L16 6", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }))
      ));
    }),
    filteredOptions.length === 0 && /* @__PURE__ */ React2.createElement("li", { className: "no-results" }, "No results")
  ))));
}

// inputs/DropdownMenuMini.js
import * as React3 from "react";
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
  const normalized = React3.useMemo(() => normalizeOptions(options), [options]);
  const [open, setOpen] = React3.useState(false);
  const [searchQuery, setSearchQuery] = React3.useState("");
  const [highlightedIndex, setHighlightedIndex] = React3.useState(-1);
  const containerRef = React3.useRef(null);
  const buttonRef = React3.useRef(null);
  const listRef = React3.useRef(null);
  const searchInputRef = React3.useRef(null);
  const searchRef = React3.useRef({ term: "", timeout: null });
  const selected = !multi ? normalized.find((o) => o.value === value) : void 0;
  const selectedSet = React3.useMemo(
    () => multi ? new Set(Array.isArray(value) ? value : []) : /* @__PURE__ */ new Set(),
    [multi, value]
  );
  const triggerLabel = React3.useMemo(() => {
    if (!multi || selectedSet.size === 0) return null;
    return normalized.filter((o) => selectedSet.has(o.value)).map((o) => o.label).join(", ");
  }, [multi, normalized, selectedSet]);
  const filteredOptions = React3.useMemo(
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
  React3.useEffect(() => {
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
  React3.useEffect(() => {
    if (!open) return;
    if (search) searchInputRef.current?.focus();
    setHighlightedIndex(() => {
      if (multi) return filteredOptions.length > 0 ? 0 : -1;
      const idx = filteredOptions.findIndex((o) => o.value === value);
      return idx >= 0 ? idx : 0;
    });
  }, [open]);
  React3.useEffect(() => {
    if (!open) return;
    setHighlightedIndex(filteredOptions.length > 0 ? 0 : -1);
  }, [searchQuery]);
  React3.useEffect(() => {
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
  return /* @__PURE__ */ React3.createElement("div", { className: `dropdown-mini ${className}`, ref: containerRef }, label && /* @__PURE__ */ React3.createElement("label", { className: "control-label label-row" }, label, hint && /* @__PURE__ */ React3.createElement(HintBadge, { hint })), /* @__PURE__ */ React3.createElement("div", { className: "trigger-wrap" }, /* @__PURE__ */ React3.createElement(
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
    /* @__PURE__ */ React3.createElement("span", { className: `control-value value${triggerDim ? " is-dim" : ""}` }, triggerText),
    /* @__PURE__ */ React3.createElement(
      "svg",
      {
        className: `chevron${open ? " is-open" : ""}`,
        viewBox: "0 0 20 20",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
      },
      /* @__PURE__ */ React3.createElement("path", { d: "M5 7.5L10 12.5L15 7.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
    )
  ), open && /* @__PURE__ */ React3.createElement("div", { className: "panel" }, search && /* @__PURE__ */ React3.createElement("div", { className: "search-wrap" }, /* @__PURE__ */ React3.createElement(
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
  )), /* @__PURE__ */ React3.createElement(
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
      return /* @__PURE__ */ React3.createElement("li", { key: option.value }, /* @__PURE__ */ React3.createElement(
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
        /* @__PURE__ */ React3.createElement("span", { className: "option-text" }, option.label),
        multi && isSelected && !isDisabled && /* @__PURE__ */ React3.createElement("svg", { className: "option-check", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ React3.createElement("path", { d: "M4 10L8 14L16 6", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }))
      ));
    }),
    filteredOptions.length === 0 && /* @__PURE__ */ React3.createElement("li", { className: "no-results" }, "No results")
  ))));
}

// inputs/MultiSelect.js
import * as React4 from "react";
function normalizeOption(option) {
  if (option == null) return null;
  if (typeof option === "string") {
    return { label: option, value: option, disabled: false };
  }
  if (typeof option === "object" && option.value != null) {
    return {
      label: option.label ?? String(option.value),
      value: option.value,
      disabled: Boolean(option.disabled)
    };
  }
  return null;
}
function MultiSelect({
  label,
  hint,
  options = [],
  value = [],
  onChange,
  maxSelected = 5,
  disabledValues = [],
  placeholder = "Search..."
}) {
  const normalizedOptions = React4.useMemo(() => {
    return options.map(normalizeOption).filter((option) => option && option.label && option.value != null);
  }, [options]);
  const optionLabelMap = React4.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const option of normalizedOptions) {
      map.set(option.value, option.label);
    }
    return map;
  }, [normalizedOptions]);
  const selectedSet = React4.useMemo(() => new Set(value ?? []), [value]);
  const disabledSet = React4.useMemo(
    () => new Set(disabledValues ?? []),
    [disabledValues]
  );
  const [query, setQuery] = React4.useState("");
  const filteredOptions = React4.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return normalizedOptions.filter((option) => {
      if (selectedSet.has(option.value)) return false;
      if (disabledSet.has(option.value)) return false;
      if (!normalizedQuery) return true;
      return option.label.toLowerCase().includes(normalizedQuery);
    });
  }, [normalizedOptions, selectedSet, disabledSet, query]);
  const limitReached = value.length >= maxSelected;
  const commit = (next) => {
    if (!onChange) return;
    onChange(next);
  };
  const addValue = (nextValue) => {
    if (nextValue == null) return;
    if (disabledSet.has(nextValue)) return;
    if (selectedSet.has(nextValue)) return;
    if (limitReached) return;
    const optionMeta = normalizedOptions.find((option) => option.value === nextValue);
    if (optionMeta?.disabled) return;
    commit([...value, nextValue]);
    setQuery("");
  };
  const removeValue = (targetValue) => {
    commit(value.filter((item) => item !== targetValue));
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && filteredOptions[0]) {
      event.preventDefault();
      addValue(filteredOptions[0].value);
    } else if (event.key === "Backspace" && !query && value.length) {
      event.preventDefault();
      removeValue(value[value.length - 1]);
    }
  };
  return /* @__PURE__ */ React4.createElement("div", { className: "multi-select" }, label && /* @__PURE__ */ React4.createElement("label", { className: "control-label label-row" }, label, hint && /* @__PURE__ */ React4.createElement(HintBadge, { hint })), /* @__PURE__ */ React4.createElement("div", { className: "box" }, /* @__PURE__ */ React4.createElement("div", { className: "tags" }, value.map((item) => /* @__PURE__ */ React4.createElement("span", { key: item, className: "tag" }, optionLabelMap.get(item) ?? item, /* @__PURE__ */ React4.createElement(
    "button",
    {
      type: "button",
      className: "tag-remove",
      onClick: () => removeValue(item)
    },
    "\xD7"
  ))), placeholder ? /* @__PURE__ */ React4.createElement(
    "input",
    {
      type: "text",
      value: query,
      onChange: (event) => setQuery(event.target.value),
      onKeyDown: handleKeyDown,
      placeholder: limitReached ? null : placeholder,
      disabled: limitReached,
      className: `search-input${limitReached ? " is-hidden" : ""}`
    }
  ) : null), filteredOptions.length > 0 && /* @__PURE__ */ React4.createElement("ul", { className: "options-list" }, filteredOptions.map((option) => {
    const optionDisabled = limitReached || option.disabled;
    return /* @__PURE__ */ React4.createElement("li", { key: option.value, className: "option-item" }, /* @__PURE__ */ React4.createElement(
      "button",
      {
        type: "button",
        onClick: () => addValue(option.value),
        disabled: optionDisabled,
        "aria-disabled": optionDisabled,
        className: `option-btn${optionDisabled ? " is-disabled" : ""}`
      },
      /* @__PURE__ */ React4.createElement("span", null, option.label)
    ));
  }))));
}

// inputs/RangeInput.js
import * as React5 from "react";
var clamp = (value, min, max) => Math.min(Math.max(value, min), max);
function RangeInput({
  min = 0,
  max = 100,
  step = 1,
  value,
  label = "",
  onChange
}) {
  const initial = React5.useMemo(() => value ?? [min, max], [value, min, max]);
  const [range, setRange] = React5.useState(initial);
  React5.useEffect(() => {
    setRange(initial);
  }, [initial]);
  const emit = React5.useCallback(
    (next) => {
      setRange(next);
      onChange?.(next);
    },
    [onChange]
  );
  const updateMin = (next) => {
    const minValue = clamp(Number(next), min, max);
    emit([Math.min(minValue, range[1]), range[1]]);
  };
  const updateMax = (next) => {
    const maxValue = clamp(Number(next), min, max);
    emit([range[0], Math.max(maxValue, range[0])]);
  };
  const percent = (val) => (val - min) / (max - min || 1) * 100;
  return /* @__PURE__ */ React5.createElement("div", { className: "range-input" }, label && /* @__PURE__ */ React5.createElement("div", { className: "control-label label-row" }, /* @__PURE__ */ React5.createElement("span", null, label)), /* @__PURE__ */ React5.createElement("div", { className: "controls-row" }, /* @__PURE__ */ React5.createElement(
    "input",
    {
      type: "number",
      value: range[0],
      min,
      max: range[1],
      step,
      onChange: (event) => updateMin(event.target.value),
      className: "control-value number-input"
    }
  ), /* @__PURE__ */ React5.createElement("div", { className: "slider-wrap", style: { maxWidth: 350 } }, /* @__PURE__ */ React5.createElement("div", { className: "track-bg" }), /* @__PURE__ */ React5.createElement(
    "div",
    {
      className: "track-fill",
      style: { left: `${percent(range[0])}%`, right: `${100 - percent(range[1])}%` }
    }
  ), /* @__PURE__ */ React5.createElement(
    "input",
    {
      type: "range",
      min,
      max,
      step,
      value: range[0],
      "aria-label": "Minimum value",
      onChange: (event) => updateMin(event.target.value)
    }
  ), /* @__PURE__ */ React5.createElement(
    "input",
    {
      type: "range",
      min,
      max,
      step,
      value: range[1],
      "aria-label": "Maximum value",
      onChange: (event) => updateMax(event.target.value)
    }
  )), /* @__PURE__ */ React5.createElement(
    "input",
    {
      type: "number",
      value: range[1],
      min: range[0],
      max,
      step,
      onChange: (event) => updateMax(event.target.value),
      className: "control-value number-input"
    }
  )));
}

// inputs/RangeInputMini.js
import * as React6 from "react";
var clamp2 = (value, min, max) => Math.min(Math.max(value, min), max);
function RangeInputMini({
  min = 0,
  max = 100,
  step = 1,
  value,
  label = "",
  hint,
  onChange,
  single = false,
  className = ""
}) {
  const initial = React6.useMemo(
    () => single ? value ?? min : value ?? [min, max],
    [value, min, max, single]
  );
  const [range, setRange] = React6.useState(initial);
  React6.useEffect(() => {
    setRange(initial);
  }, [initial]);
  const emit = React6.useCallback(
    (next) => {
      setRange(next);
      onChange?.(next);
    },
    [onChange]
  );
  const updateMin = (next) => {
    const minValue = clamp2(Number(next), min, max);
    emit([Math.min(minValue, range[1]), range[1]]);
  };
  const updateMax = (next) => {
    const maxValue = clamp2(Number(next), min, max);
    emit([range[0], Math.max(maxValue, range[0])]);
  };
  const updateSingle = (next) => {
    emit(clamp2(Number(next), min, max));
  };
  const percent = (val) => (val - min) / (max - min || 1) * 100;
  return /* @__PURE__ */ React6.createElement("div", { className: `range-input-mini ${single ? "single" : "range"} ${className}` }, label && /* @__PURE__ */ React6.createElement("span", { className: "control-label label-row" }, label, hint && /* @__PURE__ */ React6.createElement(HintBadge, { hint })), single ? /* @__PURE__ */ React6.createElement("div", { className: "controls-row" }, /* @__PURE__ */ React6.createElement(
    "input",
    {
      type: "number",
      value: range,
      min,
      max,
      step,
      onChange: (event) => updateSingle(event.target.value),
      className: "control-value number-input"
    }
  ), /* @__PURE__ */ React6.createElement("div", { className: "slider-wrap", style: { maxWidth: 250 } }, /* @__PURE__ */ React6.createElement("div", { className: "track-bg" }), /* @__PURE__ */ React6.createElement(
    "input",
    {
      type: "range",
      min,
      max,
      step,
      value: range,
      "aria-label": label || "Value",
      onChange: (event) => updateSingle(event.target.value)
    }
  ))) : /* @__PURE__ */ React6.createElement("div", { className: "controls-row" }, /* @__PURE__ */ React6.createElement(
    "input",
    {
      type: "number",
      value: range[0],
      min,
      max: range[1],
      step,
      onChange: (event) => updateMin(event.target.value),
      className: "control-value number-input"
    }
  ), /* @__PURE__ */ React6.createElement("div", { className: "slider-wrap", style: { maxWidth: 250 } }, /* @__PURE__ */ React6.createElement("div", { className: "track-bg" }), /* @__PURE__ */ React6.createElement(
    "div",
    {
      className: "track-fill",
      style: { left: `${percent(range[0])}%`, right: `${100 - percent(range[1])}%` }
    }
  ), /* @__PURE__ */ React6.createElement(
    "input",
    {
      type: "range",
      min,
      max,
      step,
      value: range[0],
      "aria-label": "Minimum value",
      onChange: (event) => updateMin(event.target.value)
    }
  ), /* @__PURE__ */ React6.createElement(
    "input",
    {
      type: "range",
      min,
      max,
      step,
      value: range[1],
      "aria-label": "Maximum value",
      onChange: (event) => updateMax(event.target.value)
    }
  )), /* @__PURE__ */ React6.createElement(
    "input",
    {
      type: "number",
      value: range[1],
      min: range[0],
      max,
      step,
      onChange: (event) => updateMax(event.target.value),
      className: "control-value number-input"
    }
  )));
}

// inputs/SegmentedToggle.js
import * as React7 from "react";
function SegmentedToggle({
  label,
  hint,
  options = [],
  value,
  onChange,
  disabled = false,
  disabledReason = "",
  className = ""
}) {
  const normalized = React7.useMemo(() => {
    if (!Array.isArray(options) || options.length === 0) {
      return [];
    }
    return options.filter((option) => option && typeof option === "object").map((option) => ({
      label: option.label ?? String(option.value ?? ""),
      value: option.value
    }));
  }, [options]);
  const fallbackValue = normalized[0]?.value;
  const activeValue = normalized.some((option) => option.value === value) ? value : fallbackValue;
  React7.useEffect(() => {
    if (value === void 0 && fallbackValue !== void 0) {
      onChange?.(fallbackValue);
    }
  }, [value, fallbackValue, onChange]);
  const handleSelect = (nextValue) => {
    if (disabled || nextValue === void 0) return;
    if (nextValue === activeValue) return;
    onChange?.(nextValue);
  };
  const segments = /* @__PURE__ */ React7.createElement("div", { className: `segments${disabled ? " is-disabled" : ""}` }, normalized.map((option) => {
    const isActive = option.value === activeValue;
    return /* @__PURE__ */ React7.createElement(
      "button",
      {
        type: "button",
        key: option.value,
        disabled,
        "aria-disabled": disabled,
        onClick: () => handleSelect(option.value),
        className: `control-value segment${isActive ? " is-active" : ""}`
      },
      option.label
    );
  }));
  return /* @__PURE__ */ React7.createElement("div", { className: `segmented-toggle ${className}` }, /* @__PURE__ */ React7.createElement("div", { className: disabled ? "is-disabled" : "" }, label && /* @__PURE__ */ React7.createElement("label", { className: "control-label label-row" }, label, hint && /* @__PURE__ */ React7.createElement(HintBadge, { hint })), disabled && disabledReason ? /* @__PURE__ */ React7.createElement("div", { className: "tooltip-wrap" }, segments, /* @__PURE__ */ React7.createElement("div", { className: "tooltip" }, disabledReason, /* @__PURE__ */ React7.createElement("div", { className: "tooltip-arrow" }))) : segments));
}

// inputs/ToggleSwitch.js
import * as React8 from "react";
var defaultOptions = [
  { label: "Off", value: false },
  { label: "On", value: true }
];
function ToggleSwitch({
  label,
  hint,
  value,
  options = defaultOptions,
  onChange,
  disabled = false,
  className = ""
}) {
  const normalizedOptions = options.length >= 2 ? options : defaultOptions;
  const [leftOption, rightOption] = normalizedOptions;
  const isRightSelected = value === rightOption.value;
  const isLeftSelected = value === leftOption.value || !isRightSelected;
  const commit = (nextValue) => {
    if (disabled) return;
    onChange?.(nextValue);
  };
  const toggle = () => {
    commit(isLeftSelected ? rightOption.value : leftOption.value);
  };
  const handleKeyDown = (event) => {
    if (disabled) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      commit(leftOption.value);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      commit(rightOption.value);
    }
  };
  return /* @__PURE__ */ React8.createElement("div", { className: `toggle ${className}` }, label && /* @__PURE__ */ React8.createElement("label", { className: "control-label label-row" }, label, hint && /* @__PURE__ */ React8.createElement(HintBadge, { hint })), /* @__PURE__ */ React8.createElement("div", { className: "row" }, /* @__PURE__ */ React8.createElement(
    "span",
    {
      className: "control-value",
      style: { fontWeight: isLeftSelected ? 700 : 500, color: isLeftSelected ? "#0f172a" : "#64748b" }
    },
    leftOption.label
  ), /* @__PURE__ */ React8.createElement(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": isRightSelected,
      "aria-label": label,
      disabled,
      onClick: toggle,
      onKeyDown: handleKeyDown,
      className: `track${disabled ? " is-disabled" : ""}`
    },
    /* @__PURE__ */ React8.createElement("span", { className: `thumb${isRightSelected ? " is-right" : ""}` })
  ), /* @__PURE__ */ React8.createElement(
    "span",
    {
      className: "control-value",
      style: { fontWeight: isRightSelected ? 700 : 500, color: isRightSelected ? "#0f172a" : "#64748b" }
    },
    rightOption.label
  )));
}

// inputs/ToggleSwitchMini.js
import * as React9 from "react";
var defaultOptions2 = [
  { label: "Off", value: false },
  { label: "On", value: true }
];
function ToggleSwitchMini({
  label,
  hint,
  value,
  options = defaultOptions2,
  onChange,
  disabled = false,
  className = ""
}) {
  const normalizedOptions = options.length >= 2 ? options : defaultOptions2;
  const [leftOption, rightOption] = normalizedOptions;
  const isRightSelected = value === rightOption.value;
  const isLeftSelected = value === leftOption.value || !isRightSelected;
  const commit = (nextValue) => {
    if (disabled) return;
    onChange?.(nextValue);
  };
  const toggle = () => commit(isLeftSelected ? rightOption.value : leftOption.value);
  const handleKeyDown = (event) => {
    if (disabled) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      commit(leftOption.value);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      commit(rightOption.value);
    }
  };
  return /* @__PURE__ */ React9.createElement("div", { className: `toggle-mini ${className}` }, label && /* @__PURE__ */ React9.createElement("span", { className: "control-label label-row" }, label, hint && /* @__PURE__ */ React9.createElement(HintBadge, { hint })), /* @__PURE__ */ React9.createElement("div", { className: "row" }, /* @__PURE__ */ React9.createElement(
    "span",
    {
      className: "control-option",
      style: { fontWeight: isLeftSelected ? 700 : 500, color: isLeftSelected ? "#0f172a" : "#64748b" }
    },
    leftOption.label
  ), /* @__PURE__ */ React9.createElement(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": isRightSelected,
      "aria-label": label,
      disabled,
      onClick: toggle,
      onKeyDown: handleKeyDown,
      className: `track${disabled ? " is-disabled" : ""}`
    },
    /* @__PURE__ */ React9.createElement("span", { className: `thumb${isRightSelected ? " is-right" : ""}` })
  ), /* @__PURE__ */ React9.createElement(
    "span",
    {
      className: "control-option",
      style: { fontWeight: isRightSelected ? 700 : 500, color: isRightSelected ? "#0f172a" : "#64748b" }
    },
    rightOption.label
  )));
}
export {
  DropdownMenu,
  DropdownMenuMini,
  MultiSelect,
  RangeInput,
  RangeInputMini,
  SegmentedToggle,
  ToggleSwitch,
  ToggleSwitchMini
};
