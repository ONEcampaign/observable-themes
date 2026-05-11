import * as React from "react"

/**
 * Container for a dynamically rendered table. Re-renders whenever `data` or `tableFn` changes.
 * Wraps the output in a horizontally scrollable div to handle wide tables gracefully.
 * @param {Object} props
 * @param {unknown[]} props.data - Dataset; the container is cleared when empty or nullish
 * @param {() => HTMLElement} props.tableFn - Function that returns a table DOM element
 */
export function AutoTable({data, tableFn}) {
  const ref = React.useRef(null)

  React.useEffect(() => {
    const node = ref.current
    if (!node || !data?.length) {
      if (node) node.innerHTML = ""
      return
    }
    const tableEl = tableFn()
    node.innerHTML = ""
    node.appendChild(tableEl)
    return () => { if (tableEl?.remove) tableEl.remove() }
  }, [data, tableFn])

  return <div ref={ref} style={{ width: "100%", overflowX: "auto" }} />
}
