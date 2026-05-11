import * as React from "react";
function AutoTable({ data, tableFn }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
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
  return /* @__PURE__ */ React.createElement("div", { ref, style: { width: "100%", overflowX: "auto" } });
}
export {
  AutoTable
};
