import * as React from "react"

/**
 * Responsive container for Observable Plot. Observes its own width via `ResizeObserver`
 * and re-renders the plot whenever `data`, `width`, or `plotFn` changes.
 * Clears the container when `data` is empty or unavailable.
 * @param {Object} props
 * @param {unknown[]} props.data - Dataset; the plot is cleared when empty or nullish
 * @param {(width: number) => SVGElement | HTMLElement} props.plotFn - Function that receives the
 *   current container width and returns a Plot element
 */
export function AutoPlot({data, plotFn}) {
  const ref = React.useRef(null)
  const [width, setWidth] = React.useState(0)

  React.useEffect(() => {
    const node = ref.current
    if (!node) return
    let frame = 0
    let last = 0
    const update = w => {
      const rounded = Math.round(w)
      if (rounded === last) return            // ignore sub-pixel jitter (e.g. Windows fractional display scaling)
      last = rounded
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setWidth(rounded))  // coalesce resize bursts to one render per frame
    }
    const observer = new ResizeObserver(entries => update(entries[0].contentRect.width))
    observer.observe(node)
    update(node.clientWidth)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [])

  React.useEffect(() => {
    const node = ref.current
    if (!node || !width || !data?.length) {
      if (node) node.innerHTML = ""
      return
    }
    const plotEl = plotFn(width)
    node.innerHTML = ""
    node.appendChild(plotEl)
    return () => { if (plotEl?.remove) plotEl.remove() }
  }, [data, width, plotFn])

  return <div ref={ref} style={{ height: "100%", width: "100%" }} />
}
