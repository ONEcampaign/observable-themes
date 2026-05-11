import * as React from "react";
function KPICards({ data = [] }) {
  if (!data.length) return null;
  return /* @__PURE__ */ React.createElement("div", { className: "kpi-cards" }, data.map((item, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "card" }, /* @__PURE__ */ React.createElement("p", { className: "card-title" }, item.title), /* @__PURE__ */ React.createElement("p", { className: "card-kpi" }, item.kpi), /* @__PURE__ */ React.createElement("p", { className: "card-description" }, item.description))));
}
export {
  KPICards
};
