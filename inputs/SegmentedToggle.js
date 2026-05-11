import * as React from "react";
import { HintBadge } from "./HintBadge.jsx";
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
  const normalized = React.useMemo(() => {
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
  React.useEffect(() => {
    if (value === void 0 && fallbackValue !== void 0) {
      onChange?.(fallbackValue);
    }
  }, [value, fallbackValue, onChange]);
  const handleSelect = (nextValue) => {
    if (disabled || nextValue === void 0) return;
    if (nextValue === activeValue) return;
    onChange?.(nextValue);
  };
  const renderToggle = () => /* @__PURE__ */ React.createElement("div", { className: disabled ? "is-disabled" : "" }, label && /* @__PURE__ */ React.createElement("label", { className: "control-label label-row" }, label, hint && /* @__PURE__ */ React.createElement(HintBadge, { hint })), /* @__PURE__ */ React.createElement("div", { className: "segments" }, normalized.map((option) => {
    const isActive = option.value === activeValue;
    return /* @__PURE__ */ React.createElement(
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
  })));
  if (disabled && disabledReason) {
    return /* @__PURE__ */ React.createElement("div", { className: `segmented-toggle ${className}` }, /* @__PURE__ */ React.createElement("div", { className: "tooltip-wrap" }, renderToggle(), /* @__PURE__ */ React.createElement("div", { className: "tooltip" }, disabledReason, /* @__PURE__ */ React.createElement("div", { className: "tooltip-arrow" }))));
  }
  return /* @__PURE__ */ React.createElement("div", { className: `segmented-toggle ${className}` }, renderToggle());
}
export {
  SegmentedToggle
};
