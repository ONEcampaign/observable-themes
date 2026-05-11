import * as React from "react";
import { NavMenu } from "./NavMenu.js";
function Header({ appTitle, appDescription, navItems, currentPage }) {
  return /* @__PURE__ */ React.createElement("div", { className: "app-header" }, /* @__PURE__ */ React.createElement("div", { className: "title-row" }, /* @__PURE__ */ React.createElement("h1", { className: "app-title" }, appTitle), /* @__PURE__ */ React.createElement(NavMenu, { navItems, currentPage })), /* @__PURE__ */ React.createElement("div", { className: "description" }, /* @__PURE__ */ React.createElement("p", { className: "plain-text" }, appDescription)));
}
export {
  Header
};
