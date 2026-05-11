import * as React from "react";
import { HintBadge } from "./HintBadge.jsx";
const defaultOptions = [
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
  return /* @__PURE__ */ React.createElement("div", { className: `toggle ${className}` }, label && /* @__PURE__ */ React.createElement("label", { className: "control-label label-row" }, label, hint && /* @__PURE__ */ React.createElement(HintBadge, { hint })), /* @__PURE__ */ React.createElement("div", { className: "row" }, /* @__PURE__ */ React.createElement(
    "span",
    {
      className: "control-value",
      style: { fontWeight: isLeftSelected ? 700 : 500, color: isLeftSelected ? "#0f172a" : "#64748b" }
    },
    leftOption.label
  ), /* @__PURE__ */ React.createElement(
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
    /* @__PURE__ */ React.createElement("span", { className: `thumb${isRightSelected ? " is-right" : ""}` })
  ), /* @__PURE__ */ React.createElement(
    "span",
    {
      className: "control-value",
      style: { fontWeight: isRightSelected ? 700 : 500, color: isRightSelected ? "#0f172a" : "#64748b" }
    },
    rightOption.label
  )));
}
export {
  ToggleSwitch
};
