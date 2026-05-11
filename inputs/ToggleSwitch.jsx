import * as React from "react"
import { HintBadge } from "./HintBadge.jsx"

const defaultOptions = [
  { label: "Off", value: false },
  { label: "On", value: true }
]

/**
 * Two-position toggle switch. Defaults to Off / On but accepts any two-option array.
 * Supports arrow-key navigation: ← selects the left option, → the right option.
 * @param {Object} props
 * @param {string} [props.label] - Label shown above the control
 * @param {string} [props.hint] - Tooltip text shown in a HintBadge next to the label
 * @param {unknown} props.value - Currently selected value
 * @param {{ label: string, value: unknown }[]} [props.options] - Exactly two options (defaults to Off/On)
 * @param {(value: unknown) => void} [props.onChange] - Called with the newly selected value
 * @param {boolean} [props.disabled=false] - Disables the switch
 * @param {string} [props.className=""] - Extra CSS classes on the root element
 */
export function ToggleSwitch({
  label,
  hint,
  value,
  options = defaultOptions,
  onChange,
  disabled = false,
  className = "",
}) {
  const normalizedOptions = options.length >= 2 ? options : defaultOptions
  const [leftOption, rightOption] = normalizedOptions
  const isRightSelected = value === rightOption.value
  const isLeftSelected = value === leftOption.value || !isRightSelected

  const commit = (nextValue) => {
    if (disabled) return
    onChange?.(nextValue)
  }

  const toggle = () => {
    commit(isLeftSelected ? rightOption.value : leftOption.value)
  }

  const handleKeyDown = (event) => {
    if (disabled) return
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      commit(leftOption.value)
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      commit(rightOption.value)
    }
  }

  return (
    <div className={`toggle ${className}`}>
      {label && (
        <label className="control-label label-row">
          {label}
          {hint && <HintBadge hint={hint} />}
        </label>
      )}
      <div className="row">
        <span
            className="control-value"
            style={{ fontWeight: isLeftSelected ? 700 : 500, color: isLeftSelected ? "#0f172a" : "#64748b" }}
        >
          {leftOption.label}
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={isRightSelected}
          aria-label={label}
          disabled={disabled}
          onClick={toggle}
          onKeyDown={handleKeyDown}
          className={`track${disabled ? " is-disabled" : ""}`}
        >
          <span className={`thumb${isRightSelected ? " is-right" : ""}`} />
        </button>
        <span
            className="control-value"
            style={{ fontWeight: isRightSelected ? 700 : 500, color: isRightSelected ? "#0f172a" : "#64748b" }}

        >
          {rightOption.label}
        </span>
      </div>
    </div>
  )
}
