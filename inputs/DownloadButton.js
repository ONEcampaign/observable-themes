import * as React from "react";
function DownloadButton({ onClick, disabled = false, label = "Download data", icon = "download" }) {
  const Icon = icon === "chart" ? ChartIcon : DownloadIcon;
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick,
      disabled,
      className: "button-text download-btn"
    },
    /* @__PURE__ */ React.createElement("span", null, label),
    /* @__PURE__ */ React.createElement(Icon, { size: 16 })
  );
}
function DownloadIcon({ className = "", size = 18 }) {
  return /* @__PURE__ */ React.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 -960 960 960",
      width: size,
      height: size,
      className,
      fill: "currentColor"
    },
    /* @__PURE__ */ React.createElement("path", { d: "M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" })
  );
}
function ChartIcon({ className = "", size = 18 }) {
  return /* @__PURE__ */ React.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 -960 960 960",
      width: size,
      height: size,
      className,
      fill: "currentColor"
    },
    /* @__PURE__ */ React.createElement("path", { d: "M280-280h80v-280h-80v280Zm160 0h80v-400h-80v400Zm160 0h80v-160h-80v160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" })
  );
}
export {
  DownloadButton
};
