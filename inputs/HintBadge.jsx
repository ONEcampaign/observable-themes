import * as React from "react"

/**
 * A small circular "?" badge that reveals a tooltip on hover.
 * @param {Object} props
 * @param {string} props.hint - Tooltip text displayed on hover
 */
export function HintBadge({ hint }) {
  return (
    <span className="hint-badge">
      <span className="badge">?</span>
      <span className="hint-text tooltip">
        {hint}
        <span className="tooltip-arrow" />
      </span>
    </span>
  )
}
