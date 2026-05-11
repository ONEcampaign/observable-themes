import React from "react";
function Section({ title, description, children }) {
  return /* @__PURE__ */ React.createElement("section", { className: "preview-section" }, /* @__PURE__ */ React.createElement("h2", { className: "section-header" }, title), description && /* @__PURE__ */ React.createElement("p", { className: "preview-section-desc" }, description), children);
}
export {
  Section as default
};
