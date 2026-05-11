import * as React from "react";
function HintBadge({ hint }) {
  return /* @__PURE__ */ React.createElement("span", { className: "hint-badge" }, /* @__PURE__ */ React.createElement("span", { className: "badge" }, "?"), /* @__PURE__ */ React.createElement("span", { className: "hint-text tooltip" }, hint, /* @__PURE__ */ React.createElement("span", { className: "tooltip-arrow" })));
}
export {
  HintBadge
};
