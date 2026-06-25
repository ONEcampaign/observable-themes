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
export {
  AutoPlot
};
