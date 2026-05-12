import * as React from "react"

/**
 * A small circular "?" badge that reveals a tooltip on hover.
 * @param {Object} props
 * @param {string} props.hint - Tooltip content displayed on hover; basic HTML (e.g. `<b>`, `<br>`) is supported
 */
export function HintBadge({ hint }) {
  return (
    <span className="hint-badge">
      <span className="badge">?</span>
      <span className="hint-text tooltip">
        <span dangerouslySetInnerHTML={{ __html: hint }} />
        <span className="tooltip-arrow" />
      </span>
    </span>
  )
}
