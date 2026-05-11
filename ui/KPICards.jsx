import * as React from "react"

/**
 * Horizontal row of metric cards, each displaying a title, a primary KPI value,
 * and a short description. Cards share equal width and expand to fill the container.
 *
 * @param {Object} props
 * @param {{ title: string, kpi: string|number, description: string }[]} [props.data=[]] - Array of card data objects.
 *   Each object must have:
 *   - `title` — label shown above the KPI (e.g. "Total funding")
 *   - `kpi` — the primary metric value (e.g. "$4.2B" or 42)
 *   - `description` — supporting text shown below the KPI (e.g. "as of 2024")
 */
export function KPICards({ data = [] }) {
  if (!data.length) return null

  return (
    <div className="kpi-cards">
      {data.map((item, i) => (
        <div key={i} className="card">
          <p className="card-title">{item.title}</p>
          <p className="card-kpi">{item.kpi}</p>
          <p className="card-description">{item.description}</p>
        </div>
      ))}
    </div>
  )
}
