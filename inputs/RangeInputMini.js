import * as React from "react";
import { HintBadge } from "./HintBadge.jsx";
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
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
  const initial = React.useMemo(
    () => single ? value ?? min : value ?? [min, max],
    [value, min, max, single]
  );
  const [range, setRange] = React.useState(initial);
  React.useEffect(() => {
    setRange(initial);
  }, [initial]);
  const emit = React.useCallback(
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
  const updateSingle = (next) => {
    emit(clamp(Number(next), min, max));
  };
  const percent = (val) => (val - min) / (max - min || 1) * 100;
  return /* @__PURE__ */ React.createElement("div", { className: `range-input-mini ${single ? "single" : "range"} ${className}` }, label && /* @__PURE__ */ React.createElement("span", { className: "control-label label-row" }, label, hint && /* @__PURE__ */ React.createElement(HintBadge, { hint })), single ? /* @__PURE__ */ React.createElement("div", { className: "controls-row" }, /* @__PURE__ */ React.createElement(
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
  ), /* @__PURE__ */ React.createElement("div", { className: "slider-wrap", style: { maxWidth: 250 } }, /* @__PURE__ */ React.createElement("div", { className: "track-bg" }), /* @__PURE__ */ React.createElement(
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
  ))) : /* @__PURE__ */ React.createElement("div", { className: "controls-row" }, /* @__PURE__ */ React.createElement(
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
  ), /* @__PURE__ */ React.createElement("div", { className: "slider-wrap", style: { maxWidth: 250 } }, /* @__PURE__ */ React.createElement("div", { className: "track-bg" }), /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "track-fill",
      style: { left: `${percent(range[0])}%`, right: `${100 - percent(range[1])}%` }
    }
  ), /* @__PURE__ */ React.createElement(
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
  ), /* @__PURE__ */ React.createElement(
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
  )), /* @__PURE__ */ React.createElement(
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
export {
  RangeInputMini
};
