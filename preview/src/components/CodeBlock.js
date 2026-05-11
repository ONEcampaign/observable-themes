import React, { useState } from "react";
function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  return /* @__PURE__ */ React.createElement("div", { className: "code-block" }, /* @__PURE__ */ React.createElement("pre", null, /* @__PURE__ */ React.createElement("code", null, code.trim())), /* @__PURE__ */ React.createElement("button", { className: "code-block-copy", onClick: copy }, copied ? "Copied" : "Copy"));
}
export {
  CodeBlock as default
};
