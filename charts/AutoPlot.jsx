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
    if (!ref.current) return
    const observer = new ResizeObserver(entries => setWidth(entries[0].contentRect.width))
    observer.observe(ref.current)
    setWidth(ref.current.clientWidth)
    return () => observer.disconnect()
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
