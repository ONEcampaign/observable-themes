import * as React from "react"

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

/**
 * Dual-thumb range slider with paired numeric inputs for precise value entry.
 * The lower thumb is clamped so it never exceeds the upper thumb, and vice versa.
 * @param {Object} props
 * @param {number} [props.min=0] - Minimum allowed value
 * @param {number} [props.max=100] - Maximum allowed value
 * @param {number} [props.step=1] - Increment step
 * @param {[number, number]} [props.value] - Controlled `[min, max]` range; defaults to `[min, max]`
 * @param {string} [props.label=""] - Label shown above the control
 * @param {(range: [number, number]) => void} [props.onChange] - Called with the updated `[min, max]` range
 */
export function RangeInput({
  min = 0,
  max = 100,
  step = 1,
  value,
  label = "",
  onChange
}) {
  const initial = React.useMemo(() => value ?? [min, max], [value, min, max])
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

  const percent = (val) => ((val - min) / (max - min || 1)) * 100

  return (
    <div className="range-input">
      {label && (
        <div className="control-label label-row">
          <span>{label}</span>
        </div>
      )}
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
        <div className="slider-wrap" style={{ maxWidth: 350 }}>
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
    </div>
  )
}
