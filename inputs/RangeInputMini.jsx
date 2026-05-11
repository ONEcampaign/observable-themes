import * as React from "react"
import { HintBadge } from "./HintBadge.jsx"

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

/**
 * Compact range slider laid out in a horizontal row. Supports both single-thumb
 * and dual-thumb (range) modes via the `single` prop.
 * @param {Object} props
 * @param {number} [props.min=0] - Minimum allowed value
 * @param {number} [props.max=100] - Maximum allowed value
 * @param {number} [props.step=1] - Increment step
 * @param {number|[number, number]} [props.value] - Controlled value; number when `single`, `[min, max]` otherwise
 * @param {string} [props.label=""] - Label shown to the left of the control
 * @param {string} [props.hint] - Tooltip text shown in a HintBadge next to the label
 * @param {(value: number | [number, number]) => void} [props.onChange] - Called with the updated value
 * @param {boolean} [props.single=false] - Use a single thumb instead of a dual-thumb range
 * @param {string} [props.className=""] - Extra CSS classes on the root element
 */
export function RangeInputMini({
  min = 0,
  max = 100,
  step = 1,
  value,
  label = "",
  hint,
  onChange,
  single = false,
  className = "",
}) {
  const initial = React.useMemo(
    () => single ? (value ?? min) : (value ?? [min, max]),
    [value, min, max, single]
  )
  const [range, setRange] = React.useState(initial)

  React.useEffect(() => {
    setRange(initial)
  }, [initial])

  const emit = React.useCallback(
    (next) => {
      setRange(next)
      onChange?.(next)
    },
    [onChange]
  )

  const updateMin = (next) => {
    const minValue = clamp(Number(next), min, max)
    emit([Math.min(minValue, range[1]), range[1]])
  }

  const updateMax = (next) => {
    const maxValue = clamp(Number(next), min, max)
    emit([range[0], Math.max(maxValue, range[0])])
  }

  const updateSingle = (next) => {
    emit(clamp(Number(next), min, max))
  }

  const percent = (val) => ((val - min) / (max - min || 1)) * 100

  return (
    <div className={`range-input-mini ${single ? "single" : "range"} ${className}`}>
      {label && (
        <span className="control-label label-row">
          {label}
          {hint && <HintBadge hint={hint} />}
        </span>
      )}
      {single ? (
        <div className="controls-row">
          <input
            type="number"
            value={range}
            min={min}
            max={max}
            step={step}
            onChange={(event) => updateSingle(event.target.value)}
            className="control-value number-input"
          />
          <div className="slider-wrap" style={{ maxWidth: 250 }}>
            <div className="track-bg" />
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={range}
              aria-label={label || "Value"}
              onChange={(event) => updateSingle(event.target.value)}
            />
          </div>
        </div>
      ) : (
        <div className="controls-row">
          <input
            type="number"
            value={range[0]}
            min={min}
            max={range[1]}
            step={step}
            onChange={(event) => updateMin(event.target.value)}
            className="control-value number-input"
          />
          <div className="slider-wrap" style={{ maxWidth: 250 }}>
            <div className="track-bg" />
            <div
              className="track-fill"
              style={{ left: `${percent(range[0])}%`, right: `${100 - percent(range[1])}%` }}
            />
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={range[0]}
              aria-label="Minimum value"
              onChange={(event) => updateMin(event.target.value)}
            />
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={range[1]}
              aria-label="Maximum value"
              onChange={(event) => updateMax(event.target.value)}
            />
          </div>
          <input
            type="number"
            value={range[1]}
            min={range[0]}
            max={max}
            step={step}
            onChange={(event) => updateMax(event.target.value)}
            className="control-value number-input"
          />
        </div>
      )}
    </div>
  )
}
