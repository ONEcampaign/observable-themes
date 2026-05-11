import * as React from "react"
import { HintBadge } from "./HintBadge.jsx"

function normalizeOption(option) {
  if (option == null) return null
  if (typeof option === "string") {
    return {label: option, value: option, disabled: false}
  }
  if (typeof option === "object" && option.value != null) {
    return {
      label: option.label ?? String(option.value),
      value: option.value,
      disabled: Boolean(option.disabled)
    }
  }
  return null
}

/**
 * Tag-based multi-select with inline search. Selected values appear as removable pills.
 * Typing filters the option list; Enter adds the first match, Backspace removes the last tag.
 * @param {Object} props
 * @param {string} [props.label] - Label shown above the control
 * @param {string} [props.hint] - Tooltip text shown in a HintBadge next to the label
 * @param {string[]|{ label: string, value: unknown, disabled?: boolean }[]} [props.options=[]] - Available options
 * @param {unknown[]} [props.value=[]] - Array of currently selected values
 * @param {(value: unknown[]) => void} [props.onChange] - Called with the updated selection array
 * @param {number} [props.maxSelected=5] - Maximum number of simultaneously selected values
 * @param {unknown[]} [props.disabledValues=[]] - Values that cannot be selected
 * @param {string} [props.placeholder="Search..."] - Placeholder for the search input
 */
export function MultiSelect({
  label,
  hint,
  options = [],
  value = [],
  onChange,
  maxSelected = 5,
  disabledValues = [],
  placeholder = "Search..."
}) {
  const normalizedOptions = React.useMemo(() => {
    return options
      .map(normalizeOption)
      .filter((option) => option && option.label && option.value != null)
  }, [options])

  const optionLabelMap = React.useMemo(() => {
    const map = new Map()
    for (const option of normalizedOptions) {
      map.set(option.value, option.label)
    }
    return map
  }, [normalizedOptions])

  const selectedSet = React.useMemo(() => new Set(value ?? []), [value])
  const disabledSet = React.useMemo(
    () => new Set(disabledValues ?? []),
    [disabledValues]
  )

  const [query, setQuery] = React.useState("")

  const filteredOptions = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return normalizedOptions.filter((option) => {
      if (selectedSet.has(option.value)) return false
      if (disabledSet.has(option.value)) return false
      if (!normalizedQuery) return true
      return option.label.toLowerCase().includes(normalizedQuery)
    })
  }, [normalizedOptions, selectedSet, disabledSet, query])

  const limitReached = value.length >= maxSelected

  const commit = (next) => {
    if (!onChange) return
    onChange(next)
  }

  const addValue = (nextValue) => {
    if (nextValue == null) return
    if (disabledSet.has(nextValue)) return
    if (selectedSet.has(nextValue)) return
    if (limitReached) return
    const optionMeta = normalizedOptions.find((option) => option.value === nextValue)
    if (optionMeta?.disabled) return
    commit([...value, nextValue])
    setQuery("")
  }

  const removeValue = (targetValue) => {
    commit(value.filter((item) => item !== targetValue))
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && filteredOptions[0]) {
      event.preventDefault()
      addValue(filteredOptions[0].value)
    } else if (event.key === "Backspace" && !query && value.length) {
      event.preventDefault()
      removeValue(value[value.length - 1])
    }
  }

  return (
    <div className="multi-select">
      {label && (
        <label className="control-label label-row">
          {label}
          {hint && <HintBadge hint={hint} />}
        </label>
      )}
      <div className="box">
        <div className="tags">
          {value.map((item) => (
            <span key={item} className="tag">
              {optionLabelMap.get(item) ?? item}
              <button
                type="button"
                className="tag-remove"
                onClick={() => removeValue(item)}
              >
                ×
              </button>
            </span>
          ))}
          {placeholder ? (
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={limitReached ? null : placeholder}
              disabled={limitReached}
              className={`search-input${limitReached ? " is-hidden" : ""}`}
            />
          ) : null}
        </div>
        {filteredOptions.length > 0 && (
          <ul className="options-list">
            {filteredOptions.map((option) => {
              const optionDisabled = limitReached || option.disabled
              return (
                <li key={option.value} className="option-item">
                  <button
                    type="button"
                    onClick={() => addValue(option.value)}
                    disabled={optionDisabled}
                    aria-disabled={optionDisabled}
                    className={`option-btn${optionDisabled ? " is-disabled" : ""}`}
                  >
                    <span>{option.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
