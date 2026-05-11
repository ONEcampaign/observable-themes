import * as React from "react";
import { DownloadButton } from "../inputs/DownloadButton.jsx";
import { downloadPlotAsPng, downloadXLSX } from "../utils/export.js";
import { logo } from "../brand/index.js";
function ONEVisual({
  title,
  subtitle,
  subtitleIsHTML = false,
  controls,
  children,
  source,
  note,
  loading = false,
  error = null,
  empty = false,
  emptyMessage = "No data",
  fileName,
  data,
  imageDownload = false,
  dataDownload = false,
  className = ""
}) {
  const captureRef = React.useRef(null);
  const blocked = loading || !!error || empty;
  const renderSourceContent = () => {
    if (!source) return null;
    if (typeof source === "string") {
      return /* @__PURE__ */ React.createElement("span", { dangerouslySetInnerHTML: { __html: source } });
    }
    if (React.isValidElement(source)) {
      return source;
    }
    const { href, label, publisher } = source;
    const hasLink = href && label;
    if (!hasLink && !publisher) return null;
    return /* @__PURE__ */ React.createElement(React.Fragment, null, hasLink && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("a", { className: "source-link", href, target: "_blank", rel: "noopener noreferrer" }, label), "."), publisher && /* @__PURE__ */ React.createElement(React.Fragment, null, hasLink && " ", publisher, "."));
  };
  const subtitleNode = subtitle ? subtitleIsHTML ? /* @__PURE__ */ React.createElement(
    "h3",
    {
      className: "plot-subtitle",
      dangerouslySetInnerHTML: { __html: subtitle }
    }
  ) : /* @__PURE__ */ React.createElement("h3", { className: "plot-subtitle" }, subtitle) : null;
  const handleImageDownload = () => {
    if (blocked || !captureRef.current) return;
    const plotEl = captureRef.current.querySelector(".chart-inner");
    if (plotEl) downloadPlotAsPng(plotEl, { title, subtitle, source, note, filename: fileName, logoSrc: logo });
  };
  const handleDataDownload = () => {
    if (blocked || !data?.length) return;
    downloadXLSX(data, fileName);
  };
  const showButtons = imageDownload || dataDownload;
  return /* @__PURE__ */ React.createElement("section", { className: `one-visual ${className}` }, /* @__PURE__ */ React.createElement("div", { className: "body", ref: captureRef }, /* @__PURE__ */ React.createElement("div", { className: "header" }, /* @__PURE__ */ React.createElement("h2", { className: "plot-title" }, title), subtitleNode), controls && /* @__PURE__ */ React.createElement("div", { className: "controls" }, controls), /* @__PURE__ */ React.createElement("div", { className: "chart-area" }, /* @__PURE__ */ React.createElement("div", { className: "chart-inner" }, children), loading && /* @__PURE__ */ React.createElement("div", { className: "overlay overlay-loading" }, /* @__PURE__ */ React.createElement("span", { className: "spinner" }), /* @__PURE__ */ React.createElement("p", { className: "loading-text" }, "Loading data...")), !loading && error && /* @__PURE__ */ React.createElement("div", { className: "overlay overlay-error" }, "Unable to load data. Please try different filters."), !loading && !error && empty && /* @__PURE__ */ React.createElement("div", { className: "overlay overlay-empty" }, emptyMessage)), /* @__PURE__ */ React.createElement("div", { className: "footer plot-note" }, /* @__PURE__ */ React.createElement("div", { className: "footer-notes" }, source && /* @__PURE__ */ React.createElement("p", null, "Source:", " ", renderSourceContent()), note && /* @__PURE__ */ React.createElement("p", null, note)), /* @__PURE__ */ React.createElement("div", { className: "footer-logo" }, /* @__PURE__ */ React.createElement(
    "a",
    {
      href: "https://data.one.org/",
      target: "_blank",
      rel: "noopener noreferrer",
      className: "logo-link"
    },
    /* @__PURE__ */ React.createElement("img", { src: logo, alt: "The ONE Campaign logo", className: "logo-img" })
  )))), showButtons && /* @__PURE__ */ React.createElement("div", { className: "action-bar" }, imageDownload && /* @__PURE__ */ React.createElement(
    DownloadButton,
    {
      label: "Download plot",
      icon: "chart",
      onClick: handleImageDownload,
      disabled: blocked
    }
  ), dataDownload && /* @__PURE__ */ React.createElement(
    DownloadButton,
    {
      onClick: handleDataDownload,
      disabled: blocked || !data?.length
    }
  )));
}
export {
  ONEVisual
};
