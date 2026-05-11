import * as React from "react"
import { HintBadge } from "./HintBadge.jsx"

/**
 * Horizontal segmented button group for mutually exclusive selection.
 * Falls back to the first option when `value` is undefined or unrecognised.
 * Shows a tooltip when `disabled` and `disabledReason` are both set.
 * @param {Object} props
 * @param {string} [props.label] - Label shown above the control
 * @param {string} [props.hint] - Tooltip text shown in a HintBadge next to the label
 * @param {{ label: string, value: unknown }[]} [props.options=[]] - Selectable segments
 * @param {unknown} props.value - Currently active value
 * @param {(value: unknown) => void} [props.onChange] - Called with the newly selected value
 * @param {boolean} [props.disabled=false] - Disables all buttons
 * @param {string} [props.disabledReason=""] - Tooltip text explaining why the control is disabled
 * @param {string} [props.className=""] - Extra CSS classes on the root element
 */
export function SegmentedToggle({
  label,
  hint,
  options = [],
  value,
  onChange,
  disabled = false,
  disabledReason = "",
  className = ""
}) {
  const normalized = React.useMemo(() => {
    if (!Array.isArray(options) || options.length === 0) {
      return []
    }
    return options
      .filter((option) => option && typeof option === "object")
      .map((option) => ({
        label: option.label ?? String(option.value ?? ""),
        value: option.value
      }))
  }, [options])

  const fallbackValue = normalized[0]?.value
  const activeValue = normalized.some((option) => option.value === value)
    ? value
    : fallbackValue

  React.useEffect(() => {
    if (value === undefined && fallbackValue !== undefined) {
      onChange?.(fallbackValue)
    }
  }, [value, fallbackValue, onChange])

  const handleSelect = (nextValue) => {
    if (disabled || nextValue === undefined) return
    if (nextValue === activeValue) return
    onChange?.(nextValue)
  }

  const segments = (
    <div className={`segments${disabled ? " is-disabled" : ""}`}>
      {normalized.map((option) => {
        const isActive = option.value === activeValue
        return (
          <button
            type="button"
            key={option.value}
            disabled={disabled}
            aria-disabled={disabled}
            onClick={() => handleSelect(option.value)}
            className={`control-value segment${isActive ? " is-active" : ""}`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )

  return (
    <div className={`segmented-toggle ${className}`}>
      <div className={disabled ? "is-disabled" : ""}>
        {label && (
          <label className="control-label label-row">
            {label}
            {hint && <HintBadge hint={hint} />}
          </label>
        )}
        {disabled && disabledReason ? (
          <div className="tooltip-wrap">
            {segments}
            <div className="tooltip">
              {disabledReason}
              <div className="tooltip-arrow" />
            </div>
          </div>
        ) : segments}
      </div>
    </div>
  )
}
