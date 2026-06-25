// charts/AutoPlot.js
import * as React from "react";
function AutoPlot({ data, plotFn }) {
  const ref = React.useRef(null);
  const [width, setWidth] = React.useState(0);
  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let frame = 0;
    let last = 0;
    const update = (w) => {
      const rounded = Math.round(w);
      if (rounded === last) return;
      last = rounded;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setWidth(rounded));
    };
    const observer = new ResizeObserver((entries) => update(entries[0].contentRect.width));
    observer.observe(node);
    update(node.clientWidth);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);
  React.useEffect(() => {
    const node = ref.current;
    if (!node || !width || !data?.length) {
      if (node) node.innerHTML = "";
      return;
    }
    const plotEl = plotFn(width);
    node.innerHTML = "";
    node.appendChild(plotEl);
    return () => {
      if (plotEl?.remove) plotEl.remove();
    };
  }, [data, width, plotFn]);
  return /* @__PURE__ */ React.createElement("div", { ref, style: { height: "100%", width: "100%" } });
}

// charts/AutoTable.js
import * as React2 from "react";
function AutoTable({ data, tableFn }) {
  const ref = React2.useRef(null);
  React2.useEffect(() => {
    const node = ref.current;
    if (!node || !data?.length) {
      if (node) node.innerHTML = "";
      return;
    }
    const tableEl = tableFn();
    node.innerHTML = "";
    node.appendChild(tableEl);
    return () => {
      if (tableEl?.remove) tableEl.remove();
    };
  }, [data, tableFn]);
  return /* @__PURE__ */ React2.createElement("div", { ref, style: { width: "100%", overflowX: "auto" } });
}

// charts/ONEVisual.js
import * as React4 from "react";

// inputs/DownloadButton.jsx
import * as React3 from "react";
function DownloadButton({ onClick, disabled = false, label = "Download data", icon: icon2 = "download" }) {
  const Icon = icon2 === "chart" ? ChartIcon : DownloadIcon;
  return /* @__PURE__ */ React3.createElement(
    "button",
    {
      type: "button",
      onClick,
      disabled,
      className: "button-text download-btn"
    },
    /* @__PURE__ */ React3.createElement("span", null, label),
    /* @__PURE__ */ React3.createElement(Icon, { size: 16 })
  );
}
function DownloadIcon({ className = "", size = 18 }) {
  return /* @__PURE__ */ React3.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 -960 960 960",
      width: size,
      height: size,
      className,
      fill: "currentColor"
    },
    /* @__PURE__ */ React3.createElement("path", { d: "M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" })
  );
}
function ChartIcon({ className = "", size = 18 }) {
  return /* @__PURE__ */ React3.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 -960 960 960",
      width: size,
      height: size,
      className,
      fill: "currentColor"
    },
    /* @__PURE__ */ React3.createElement("path", { d: "M280-280h80v-280h-80v280Zm160 0h80v-400h-80v400Zm160 0h80v-160h-80v160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" })
  );
}

// utils/export.js
async function downloadXLSX(data, filename) {
  const { utils, writeFile } = await import("xlsx");
  const worksheet = utils.json_to_sheet(data);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet);
  writeFile(workbook, `${filename}.xlsx`);
}
var FONT_REGULAR_URL = "https://cdn.jsdelivr.net/npm/@one-data/observable-themes@latest/assets/fonts/ItalianPlateNo2-Regular.woff2";
var FONT_BOLD_URL = "https://cdn.jsdelivr.net/npm/@one-data/observable-themes@latest/assets/fonts/ItalianPlateNo2-Bold.woff2";
var COLORS = {
  title: "#000000",
  subtitle: "#000000",
  source: "#3d3d3d",
  note: "#3d3d3d",
  bg: "#ffffff"
};
var FONT_FAMILY = "'Italian Plate', Helvetica, sans-serif";
var PADDING = 32;
var SCALE = 2;
async function fetchAsDataURI(url, mime) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    const b64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
    return `data:${mime};base64,${b64}`;
  } catch {
    return null;
  }
}
async function toEmbeddableDataURI(src) {
  if (!src) return null;
  if (src.startsWith("data:")) return src;
  try {
    const res = await fetch(src);
    if (!res.ok) return null;
    const blob = await res.blob();
    const buf = await blob.arrayBuffer();
    const b64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
    return `data:${blob.type || "image/png"};base64,${b64}`;
  } catch {
    return null;
  }
}
function stripHTML(html2) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html2;
  return tmp.textContent || tmp.innerText || "";
}
function parseHTMLSegments(html2) {
  const div = document.createElement("div");
  div.innerHTML = html2;
  const segments = [];
  function walk(node, inheritedColor, inheritedWeight) {
    if (node.nodeType === 3) {
      if (node.textContent) {
        segments.push({ text: node.textContent, color: inheritedColor, fontWeight: inheritedWeight });
      }
    } else if (node.nodeType === 1) {
      const color = node.style.color || inheritedColor;
      const fontWeight = node.style.fontWeight || inheritedWeight;
      for (const child of node.childNodes) {
        walk(child, color, fontWeight);
      }
    }
  }
  for (const child of div.childNodes) {
    walk(child, null, null);
  }
  return segments.filter((s) => s.text);
}
function resolveSourceText(source) {
  if (!source) return "";
  if (typeof source === "string") return stripHTML(source);
  const { href, label, publisher } = source;
  const parts = [];
  if (href && label) parts.push(`${label}.`);
  if (publisher) parts.push(`${publisher}.`);
  return parts.join(" ");
}
function inlineAxisStyles(svg) {
  const axisSelectors = [
    '[aria-label="x-axis tick label"]',
    '[aria-label="y-axis label"] text',
    '[aria-label="y-axis tick label"]'
  ];
  const axisStyle = {
    "font-size": "12px",
    "font-family": FONT_FAMILY,
    fill: "black"
  };
  for (const sel of axisSelectors) {
    for (const el of svg.querySelectorAll(sel)) {
      for (const [k, v] of Object.entries(axisStyle)) {
        el.style.setProperty(k, v);
      }
      for (const t of el.querySelectorAll("text")) {
        for (const [k, v] of Object.entries(axisStyle)) {
          t.style.setProperty(k, v);
        }
      }
    }
  }
  for (const el of svg.querySelectorAll('[aria-label="y-grid"]')) {
    el.style.setProperty("color", "black");
  }
}
function wrapRichTextSegments(segments, maxCharsPerLine) {
  const tokens = [];
  for (const seg of segments) {
    const parts = seg.text.split(/(\s+)/);
    for (const part of parts) {
      if (part) tokens.push({ text: part, color: seg.color, fontWeight: seg.fontWeight });
    }
  }
  const lines = [];
  let currentLine = [];
  let lineLen = 0;
  for (const token of tokens) {
    const isSpace = /^\s+$/.test(token.text);
    if (isSpace) {
      if (currentLine.length) {
        currentLine.push(token);
        lineLen += token.text.length;
      }
      continue;
    }
    if (lineLen > 0 && lineLen + token.text.length > maxCharsPerLine) {
      while (currentLine.length && /^\s+$/.test(currentLine.at(-1).text)) currentLine.pop();
      lines.push(currentLine);
      currentLine = [];
      lineLen = 0;
    }
    currentLine.push(token);
    lineLen += token.text.length;
  }
  if (currentLine.length) {
    while (currentLine.length && /^\s+$/.test(currentLine.at(-1).text)) currentLine.pop();
    lines.push(currentLine);
  }
  return lines.filter((l) => l.length);
}
function wrapText(text, maxCharsPerLine) {
  if (!text) return [];
  const words = text.split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    if (current && current.length + 1 + word.length > maxCharsPerLine) {
      lines.push(current);
      current = word;
    } else {
      current = current ? current + " " + word : word;
    }
  }
  if (current) lines.push(current);
  return lines;
}
function svgTextBlock(lines, { x, y, fontSize, fontWeight, fill, lineHeight }) {
  if (!lines.length) return { el: null, height: 0 };
  const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
  textEl.setAttribute("x", x);
  textEl.setAttribute("y", y);
  textEl.setAttribute("font-family", FONT_FAMILY);
  textEl.setAttribute("font-size", fontSize);
  if (fontWeight) textEl.setAttribute("font-weight", fontWeight);
  textEl.setAttribute("fill", fill);
  lines.forEach((line, i) => {
    const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    tspan.setAttribute("x", x);
    tspan.setAttribute("dy", i === 0 ? "0" : lineHeight);
    tspan.textContent = line;
    textEl.appendChild(tspan);
  });
  const totalHeight = fontSize * 1.2 + (lines.length - 1) * parseFloat(lineHeight);
  return { el: textEl, height: totalHeight };
}
function svgRichTextLine(segments, { x, y, fontSize, defaultFill }) {
  const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
  textEl.setAttribute("x", x);
  textEl.setAttribute("y", y);
  textEl.setAttribute("font-family", FONT_FAMILY);
  textEl.setAttribute("font-size", fontSize);
  textEl.setAttribute("fill", defaultFill);
  for (const segment of segments) {
    const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    tspan.textContent = segment.text;
    if (segment.color) tspan.setAttribute("fill", segment.color);
    if (segment.fontWeight) tspan.setAttribute("font-weight", segment.fontWeight);
    textEl.appendChild(tspan);
  }
  return textEl;
}
async function downloadPlotAsPng(plotContainer, { title, subtitle, source, note, filename = "plot", logoSrc }) {
  if (!plotContainer) return;
  const origSvg = plotContainer.querySelector("svg");
  if (!origSvg) return;
  const plotSvg = origSvg.cloneNode(true);
  for (const tip of plotSvg.querySelectorAll('[aria-label="tip"]')) {
    tip.remove();
  }
  inlineAxisStyles(plotSvg);
  const plotRect = origSvg.getBoundingClientRect();
  const plotW = parseFloat(plotSvg.getAttribute("width")) || plotRect.width;
  const plotH = parseFloat(plotSvg.getAttribute("height")) || plotRect.height;
  if (!plotSvg.getAttribute("viewBox")) {
    plotSvg.setAttribute("viewBox", `0 0 ${plotW} ${plotH}`);
  }
  const titleFontSize = 24;
  const subtitleFontSize = 18;
  const footerFontSize = 12;
  const lineHeightPx = 1.25;
  const sourceText = resolveSourceText(source);
  const contentWidth = plotW + PADDING * 2;
  const maxChars = Math.floor(contentWidth / (footerFontSize * 0.5));
  const subtitleMaxChars = Math.floor(contentWidth / (subtitleFontSize * 0.52));
  const titleLines = wrapText(title || "", Math.floor(contentWidth / (titleFontSize * 0.4)));
  const subtitleHasHTML = subtitle && /<[a-z]/i.test(subtitle);
  const subtitleSegments = subtitleHasHTML ? parseHTMLSegments(subtitle) : [];
  const subtitleRichLines = subtitleHasHTML ? wrapRichTextSegments(subtitleSegments, subtitleMaxChars) : [];
  const subtitleLines = subtitleHasHTML ? [] : wrapText(subtitle ? stripHTML(subtitle) : "", subtitleMaxChars);
  const hasSubtitle = subtitleHasHTML ? subtitleRichLines.length > 0 : subtitleLines.length > 0;
  const sourceLines = wrapText(sourceText ? `Source: ${sourceText}` : "", maxChars);
  const noteLines = wrapText(note || "", maxChars);
  const [logoDataURI, fontRegularURI, fontBoldURI] = await Promise.all([
    toEmbeddableDataURI(logoSrc),
    fetchAsDataURI(FONT_REGULAR_URL, "font/woff2"),
    fetchAsDataURI(FONT_BOLD_URL, "font/woff2")
  ]);
  let cursorY = PADDING;
  const titleBlockH = titleLines.length ? titleFontSize * lineHeightPx * titleLines.length : 0;
  cursorY += titleBlockH;
  if (hasSubtitle) cursorY += 4;
  const subtitleLineCount = subtitleHasHTML ? subtitleRichLines.length : subtitleLines.length;
  const subtitleBlockH = hasSubtitle ? subtitleFontSize * lineHeightPx * subtitleLineCount : 0;
  cursorY += subtitleBlockH;
  cursorY += 16;
  const plotY = cursorY;
  cursorY += plotH;
  cursorY += 20;
  const footerY = cursorY;
  const sourceBlockH = sourceLines.length ? footerFontSize * lineHeightPx * sourceLines.length : 0;
  cursorY += sourceBlockH;
  if (noteLines.length && sourceLines.length) cursorY += 4;
  const noteBlockH = noteLines.length ? footerFontSize * lineHeightPx * noteLines.length : 0;
  cursorY += noteBlockH;
  cursorY += PADDING;
  const totalW = contentWidth;
  const totalH = cursorY;
  const ns = "http://www.w3.org/2000/svg";
  const wrapper = document.createElementNS(ns, "svg");
  wrapper.setAttribute("xmlns", ns);
  wrapper.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  wrapper.setAttribute("width", totalW);
  wrapper.setAttribute("height", totalH);
  wrapper.setAttribute("viewBox", `0 0 ${totalW} ${totalH}`);
  let fontFaceCSS = "";
  if (fontRegularURI) {
    fontFaceCSS += `@font-face { font-family: 'Italian Plate'; font-weight: 400; src: url('${fontRegularURI}') format('woff2'); }`;
  }
  if (fontBoldURI) {
    fontFaceCSS += `@font-face { font-family: 'Italian Plate'; font-weight: 700; src: url('${fontBoldURI}') format('woff2'); }`;
  }
  if (fontFaceCSS) {
    const styleEl = document.createElementNS(ns, "style");
    styleEl.textContent = fontFaceCSS;
    wrapper.appendChild(styleEl);
  }
  const bg = document.createElementNS(ns, "rect");
  bg.setAttribute("width", totalW);
  bg.setAttribute("height", totalH);
  bg.setAttribute("fill", COLORS.bg);
  wrapper.appendChild(bg);
  let textY = PADDING + titleFontSize;
  if (titleLines.length) {
    const { el } = svgTextBlock(titleLines, {
      x: PADDING,
      y: textY,
      fontSize: titleFontSize,
      fontWeight: "700",
      fill: COLORS.title,
      lineHeight: `${titleFontSize * lineHeightPx}px`
    });
    if (el) wrapper.appendChild(el);
    textY += titleBlockH;
  }
  if (hasSubtitle) {
    textY += 4;
    if (subtitleHasHTML && subtitleRichLines.length) {
      subtitleRichLines.forEach((lineSegments, i) => {
        const el = svgRichTextLine(lineSegments, {
          x: PADDING,
          y: textY + i * subtitleFontSize * lineHeightPx,
          fontSize: subtitleFontSize,
          defaultFill: COLORS.subtitle
        });
        wrapper.appendChild(el);
      });
    } else if (subtitleLines.length) {
      const { el } = svgTextBlock(subtitleLines, {
        x: PADDING,
        y: textY,
        fontSize: subtitleFontSize,
        fontWeight: "400",
        fill: COLORS.subtitle,
        lineHeight: `${subtitleFontSize * lineHeightPx}px`
      });
      if (el) wrapper.appendChild(el);
    }
  }
  plotSvg.removeAttribute("width");
  plotSvg.removeAttribute("height");
  plotSvg.setAttribute("x", PADDING);
  plotSvg.setAttribute("y", plotY);
  plotSvg.setAttribute("width", plotW);
  plotSvg.setAttribute("height", plotH);
  wrapper.appendChild(plotSvg);
  let footerCursorY = footerY + footerFontSize;
  if (sourceLines.length) {
    const { el } = svgTextBlock(sourceLines, {
      x: PADDING,
      y: footerCursorY,
      fontSize: footerFontSize,
      fontWeight: "400",
      fill: COLORS.source,
      lineHeight: `${footerFontSize * lineHeightPx}px`
    });
    if (el) wrapper.appendChild(el);
    footerCursorY += sourceBlockH;
  }
  if (noteLines.length) {
    if (sourceLines.length) footerCursorY += 4;
    const { el } = svgTextBlock(noteLines, {
      x: PADDING,
      y: footerCursorY,
      fontSize: footerFontSize,
      fontWeight: "400",
      fill: COLORS.note,
      lineHeight: `${footerFontSize * lineHeightPx}px`
    });
    if (el) wrapper.appendChild(el);
  }
  const logoSize = 20;
  const logoX = totalW - PADDING - logoSize;
  const logoY = footerY;
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(wrapper);
  const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const svgUrl = URL.createObjectURL(svgBlob);
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = totalW * SCALE;
      canvas.height = totalH * SCALE;
      const ctx = canvas.getContext("2d");
      ctx.scale(SCALE, SCALE);
      ctx.drawImage(img, 0, 0, totalW, totalH);
      URL.revokeObjectURL(svgUrl);
      if (logoDataURI) {
        const logoImg = new Image();
        logoImg.onload = () => {
          ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
          finalize();
        };
        logoImg.onerror = () => finalize();
        logoImg.src = logoDataURI;
        return;
      }
      finalize();
      function finalize() {
        canvas.toBlob((blob) => {
          if (!blob) {
            resolve();
            return;
          }
          const a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = `${filename}.png`;
          a.click();
          URL.revokeObjectURL(a.href);
          resolve();
        }, "image/png");
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(svgUrl);
      console.error("SVG \u2192 PNG export: failed to load SVG as image");
      resolve();
    };
    img.src = svgUrl;
  });
}

// brand/index.js
var baseURL = "https://cdn.jsdelivr.net/npm/@one-data/observable-themes@latest/assets/images/";
var logo = baseURL + "logo.png";
var icon = baseURL + "favicon.ico";

// charts/ONEVisual.js
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
  const captureRef = React4.useRef(null);
  const blocked = loading || !!error || empty;
  const renderSourceContent = () => {
    if (!source) return null;
    if (typeof source === "string") {
      return /* @__PURE__ */ React4.createElement("span", { dangerouslySetInnerHTML: { __html: source } });
    }
    if (React4.isValidElement(source)) {
      return source;
    }
    const { href, label, publisher } = source;
    const hasLink = href && label;
    if (!hasLink && !publisher) return null;
    return /* @__PURE__ */ React4.createElement(React4.Fragment, null, hasLink && /* @__PURE__ */ React4.createElement(React4.Fragment, null, /* @__PURE__ */ React4.createElement("a", { className: "source-link", href, target: "_blank", rel: "noopener noreferrer" }, label), "."), publisher && /* @__PURE__ */ React4.createElement(React4.Fragment, null, hasLink && " ", publisher, "."));
  };
  const subtitleNode = subtitle ? subtitleIsHTML ? /* @__PURE__ */ React4.createElement(
    "h3",
    {
      className: "plot-subtitle",
      dangerouslySetInnerHTML: { __html: subtitle }
    }
  ) : /* @__PURE__ */ React4.createElement("h3", { className: "plot-subtitle" }, subtitle) : null;
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
  return /* @__PURE__ */ React4.createElement("section", { className: `one-visual ${className}` }, /* @__PURE__ */ React4.createElement("div", { className: "body", ref: captureRef }, /* @__PURE__ */ React4.createElement("div", { className: "header" }, /* @__PURE__ */ React4.createElement("h2", { className: "plot-title" }, title), subtitleNode), controls && /* @__PURE__ */ React4.createElement("div", { className: "controls" }, controls), /* @__PURE__ */ React4.createElement("div", { className: "chart-area" }, /* @__PURE__ */ React4.createElement("div", { className: "chart-inner" }, children), loading && /* @__PURE__ */ React4.createElement("div", { className: "overlay overlay-loading" }, /* @__PURE__ */ React4.createElement("span", { className: "spinner" }), /* @__PURE__ */ React4.createElement("p", { className: "loading-text" }, "Loading data...")), !loading && error && /* @__PURE__ */ React4.createElement("div", { className: "overlay overlay-error" }, "Unable to load data. Please try different filters."), !loading && !error && empty && /* @__PURE__ */ React4.createElement("div", { className: "overlay overlay-empty" }, emptyMessage)), /* @__PURE__ */ React4.createElement("div", { className: "footer plot-note" }, /* @__PURE__ */ React4.createElement("div", { className: "footer-notes" }, source && /* @__PURE__ */ React4.createElement("p", null, "Source:", " ", renderSourceContent()), note && /* @__PURE__ */ React4.createElement("p", null, note)), /* @__PURE__ */ React4.createElement("div", { className: "footer-logo" }, /* @__PURE__ */ React4.createElement(
    "a",
    {
      href: "https://data.one.org/",
      target: "_blank",
      rel: "noopener noreferrer",
      className: "logo-link"
    },
    /* @__PURE__ */ React4.createElement("img", { src: logo, alt: "The ONE Campaign logo", className: "logo-img" })
  )))), showButtons && /* @__PURE__ */ React4.createElement("div", { className: "action-bar" }, imageDownload && /* @__PURE__ */ React4.createElement(
    DownloadButton,
    {
      label: "Download plot",
      icon: "chart",
      onClick: handleImageDownload,
      disabled: blocked
    }
  ), dataDownload && /* @__PURE__ */ React4.createElement(
    DownloadButton,
    {
      onClick: handleDataDownload,
      disabled: blocked || !data?.length
    }
  )));
}

// utils/format.js
function formatValue(value) {
  if (value == null) {
    return { value: 0, label: "0" };
  }
  const roundedValue = parseFloat(value.toFixed(2));
  let label;
  if (value === 0) {
    label = "< 0.01";
  } else {
    label = roundedValue.toLocaleString("en-US", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 2
    });
  }
  return { value: roundedValue, label };
}

// charts/sparkbar.js
function html(strings, ...values) {
  const markup = strings.reduce((acc, str, i) => acc + (values[i - 1] ?? "") + str);
  const template = document.createElement("template");
  template.innerHTML = markup.trim();
  return template.content.firstElementChild;
}
var MID_GREY = "#646464";
var LIGHT_GREY = "#E8E8E8";
function sparkbar(fillColor, alignment, globalMin, globalMax, formatter = null) {
  const range = Math.abs(globalMax) + Math.abs(globalMin);
  const zeroPosition = Math.abs(globalMin) / range;
  return (x) => {
    const barWidth = Math.min(100, 100 * Math.abs(x) / range);
    const barStyle = alignment === "center" ? `
          position: absolute;
          height: 80%;
          top: 10%;
          background: ${hex2rgb(fillColor, 0.4)};
          width: ${barWidth}%;
          ${x >= 0 ? `left: ${zeroPosition * 100}%;` : `right: ${(1 - zeroPosition) * 100}%;`}
          box-sizing: border-box;
          overflow: hidden;
        ` : `
          position: absolute;
          height: 90%;
          top: 5%;
          background: ${hex2rgb(fillColor, 0.4)};
          width: ${barWidth}%;
          ${alignment === "right" ? "right: 0;" : "left: 0;"}
          box-sizing: border-box;
          overflow: hidden;
        `;
    const zeroLineStyle = alignment === "center" ? `
          position: absolute;
          height: 100%;
          width: 1px;
          background: ${hex2rgb(MID_GREY, 0.5)};
          left: ${zeroPosition * 100}%;
          box-sizing: border-box;
        ` : alignment === "right" ? `
            position: absolute;
            height: 100%;
            width: 1px;
            background: ${hex2rgb(MID_GREY, 0.5)};
            right: 0;
            box-sizing: border-box;
          ` : `
            position: absolute;
            height: 100%;
            width: 1px;
            background: ${hex2rgb(MID_GREY, 0.5)};
            left: 0;
            box-sizing: border-box;
          `;
    const textAlignment = alignment === "center" ? "center" : alignment === "right" ? "end" : "start";
    return html`
      <div style="
        position: relative;
        width: 100%;
        height: 1.25rem;
        background: none;
        display: flex;
        z-index: 0;
        align-items: center;
        justify-content: ${textAlignment};
        box-sizing: border-box;
        overflow: hidden;">
        <div style="${barStyle}"></div>
        <div style="${zeroLineStyle}"></div>
        <span style="
          position: relative;
          z-index: 1;
          font: 1rem 'Italian Plate', sans-serif;
          color: black;
          text-shadow: .5px .5px 0 ${LIGHT_GREY};
          padding: 0 3px;">
          ${formatter ? formatter(x) : formatValue(x).label}
        </span>
      </div>`;
  };
}
function hex2rgb(hex, alpha = 1) {
  hex = hex.replace(/^#/, "");
  let r, g, b, a = 1;
  if (hex.length === 6) {
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  } else if (hex.length === 8) {
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
    a = parseInt(hex.slice(6, 8), 16) / 255;
  } else {
    throw new Error("Invalid hex format. Use #RRGGBB or #RRGGBBAA.");
  }
  return `rgba(${r}, ${g}, ${b}, ${a * alpha})`;
}
export {
  AutoPlot,
  AutoTable,
  ONEVisual,
  sparkbar
};
