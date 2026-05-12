import * as React from "react";
import { NavMenu } from "./NavMenu.js";
function Header({ appTitle, appDescription, navItems, currentPage, descriptionMaxWidth }) {
  return /* @__PURE__ */ React.createElement("div", { className: "app-header" }, /* @__PURE__ */ React.createElement("div", { className: "title-row" }, /* @__PURE__ */ React.createElement("h1", { className: "app-title" }, appTitle), /* @__PURE__ */ React.createElement(NavMenu, { navItems, currentPage })), /* @__PURE__ */ React.createElement("div", { className: "description", style: descriptionMaxWidth ? { maxWidth: descriptionMaxWidth } : void 0 }, /* @__PURE__ */ React.createElement("p", { className: "plain-text", dangerouslySetInnerHTML: { __html: appDescription } })));
}
export {
  Header
};
