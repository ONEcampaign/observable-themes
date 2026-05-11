// ui/Header.js
import * as React2 from "react";

// ui/NavMenu.js
import * as React from "react";
function NavMenu({ navItems, currentPage }) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef(null);
  React.useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
    }
    function handleEscape(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);
  return /* @__PURE__ */ React.createElement("div", { className: "nav-menu" }, /* @__PURE__ */ React.createElement("nav", { className: "desktop-nav nav-text", "aria-label": "Primary" }, navItems.map((item) => {
    const isActive = item.id === currentPage;
    return /* @__PURE__ */ React.createElement(
      "a",
      {
        key: item.id,
        href: item.href,
        className: "nav-link",
        "aria-current": isActive ? "page" : void 0
      },
      /* @__PURE__ */ React.createElement("span", { className: `nav-link-label${isActive ? " is-active" : " is-inactive"}` }, item.label),
      /* @__PURE__ */ React.createElement(
        "span",
        {
          "aria-hidden": true,
          className: `nav-link-bar${isActive ? " is-active" : " is-inactive"}`
        }
      )
    );
  })), /* @__PURE__ */ React.createElement("div", { className: "mobile-nav-wrap", ref: containerRef }, /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: () => setOpen((o) => !o),
      "aria-label": "Open navigation menu",
      "aria-expanded": open,
      className: "burger"
    },
    /* @__PURE__ */ React.createElement("svg", { className: "burger-icon", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, /* @__PURE__ */ React.createElement(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M4 6h16",
        style: {
          transformBox: "fill-box",
          transformOrigin: "center",
          transition: "transform 200ms cubic-bezier(0.4,0,0.2,1)",
          transform: open ? "translateY(6px) rotate(45deg)" : "none"
        }
      }
    ), /* @__PURE__ */ React.createElement(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M4 12h16",
        style: {
          transformBox: "fill-box",
          transformOrigin: "center",
          transition: "opacity 200ms ease, transform 300ms cubic-bezier(0.4,0,0.2,1)",
          opacity: open ? 0 : 1,
          transform: open ? "scaleX(0.4)" : "none"
        }
      }
    ), /* @__PURE__ */ React.createElement(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M4 18h16",
        style: {
          transformBox: "fill-box",
          transformOrigin: "center",
          transition: "transform 300ms cubic-bezier(0.4,0,0.2,1)",
          transform: open ? "translateY(-6px) rotate(-45deg)" : "none"
        }
      }
    ))
  ), /* @__PURE__ */ React.createElement(
    "nav",
    {
      className: `mobile-panel nav-text-mobile${open ? " is-open" : " is-closed"}`,
      "aria-label": "Primary"
    },
    navItems.map((item) => {
      const isActive = item.id === currentPage;
      return /* @__PURE__ */ React.createElement(
        "a",
        {
          key: item.id,
          href: item.href,
          className: "mobile-nav-link",
          "aria-current": isActive ? "page" : void 0,
          onClick: () => setOpen(false)
        },
        /* @__PURE__ */ React.createElement("span", { className: `mobile-nav-link-label${isActive ? " is-active" : " is-inactive"}` }, item.label),
        /* @__PURE__ */ React.createElement(
          "span",
          {
            "aria-hidden": true,
            className: `mobile-nav-link-bar${isActive ? " is-active" : " is-inactive"}`
          }
        )
      );
    })
  )));
}

// ui/Header.js
function Header({ appTitle, appDescription, navItems, currentPage }) {
  return /* @__PURE__ */ React2.createElement("div", { className: "app-header" }, /* @__PURE__ */ React2.createElement("div", { className: "title-row" }, /* @__PURE__ */ React2.createElement("h1", { className: "app-title" }, appTitle), /* @__PURE__ */ React2.createElement(NavMenu, { navItems, currentPage })), /* @__PURE__ */ React2.createElement("div", { className: "description" }, /* @__PURE__ */ React2.createElement("p", { className: "plain-text", dangerouslySetInnerHTML: { __html: appDescription } })));
}

// ui/KPICards.js
import * as React3 from "react";
function KPICards({ data = [] }) {
  if (!data.length) return null;
  return /* @__PURE__ */ React3.createElement("div", { className: "kpi-cards" }, data.map((item, i) => /* @__PURE__ */ React3.createElement("div", { key: i, className: "card" }, /* @__PURE__ */ React3.createElement("p", { className: "card-title" }, item.title), /* @__PURE__ */ React3.createElement("p", { className: "card-kpi" }, item.kpi), /* @__PURE__ */ React3.createElement("p", { className: "card-description" }, item.description))));
}
export {
  Header,
  KPICards,
  NavMenu
};
