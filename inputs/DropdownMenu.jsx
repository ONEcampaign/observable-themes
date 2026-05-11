import * as React from "react"
import { normalizeOptions } from "./normalizeOptions.js"
import { HintBadge } from "./HintBadge.jsx"

/**
 * Full-featured accessible dropdown with optional search, multi-select, and keyboard navigation.
 * Supports type-ahead selection in single-select mode.
 * @param {Object} props
 * @param {string} [props.label] - Label shown above the control
 * @param {string} [props.hint] - Tooltip text shown in a HintBadge next to the label
 * @param {string[]|{ label: string, value: unknown, disabled?: boolean }[]|Map<string, unknown>} [props.options=[]] - Selectable options
 * @param {unknown} props.value - Currently selected value (array when `multi` is true)
 * @param {string} [props.placeholder="Select"] - Placeholder text when nothing is selected
 * @param {(value: unknown) => void} [props.onChange] - Called with the new value on selection
 * @param {boolean} [props.disabled=false] - Disables the entire control
 * @param {string} [props.className=""] - Extra CSS classes on the root element
 * @param {boolean} [props.search=false] - Show a search input inside the dropdown
 * @param {boolean} [props.multi=false] - Allow multiple simultaneous selections
 */
export function DropdownMenu({
  label,
  hint,
  options = [],
  value,
  placeholder = "Select",
  onChange,
  disabled = false,
  className = "",
  search = false,
  multi = false,
}) {
  const normalized = React.useMemo(() => normalizeOptions(options), [options])
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1)
  const containerRef = React.useRef(null)
  const buttonRef = React.useRef(null)
  const listRef = React.useRef(null)
  const searchInputRef = React.useRef(null)
  const searchRef = React.useRef({ term: "", timeout: null })

  const selected = !multi
    ? normalized.find((o) => o.value === value)
    : undefined

  const selectedSet = React.useMemo(
    () => multi ? new Set(Array.isArray(value) ? value : []) : new Set(),
    [multi, value]
  )

  const triggerLabel = React.useMemo(() => {
    if (!multi || selectedSet.size === 0) return null
    return normalized.filter(o => selectedSet.has(o.value)).map(o => o.label).join(", ")
  }, [multi, normalized, selectedSet])

  const filteredOptions = React.useMemo(
    () => searchQuery
      ? normalized.filter(o => o.label.toLowerCase().includes(searchQuery.toLowerCase()))
      : normalized,
    [normalized, searchQuery]
  )

  const close = () => {
    setOpen(false)
    setHighlightedIndex(-1)
    setSearchQuery("")
    if (searchRef.current.timeout) clearTimeout(searchRef.current.timeout)
    searchRef.current.term = ""
  }

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (!containerRef.current) return
      if (!containerRef.current.contains(event.target)) close()
    }
    function handleEscape(event) {
      if (event.key === "Escape") { close(); buttonRef.current?.focus() }
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
      if (searchRef.current.timeout) clearTimeout(searchRef.current.timeout)
    }
  }, [])

  React.useEffect(() => {
    if (!open) return
    if (search) searchInputRef.current?.focus()
    if (filteredOptions.length === 0) { setHighlightedIndex(-1); return }
    setHighlightedIndex(() => {
      if (multi) return 0
      const idx = filteredOptions.findIndex(o => o.value === value)
      return idx >= 0 ? idx : 0
    })
  }, [open])

  React.useEffect(() => {
    if (!open) return
    setHighlightedIndex(filteredOptions.length > 0 ? 0 : -1)
  }, [searchQuery])

  React.useEffect(() => {
    if (!open || highlightedIndex < 0) return
    listRef.current?.querySelector(`[data-index="${highlightedIndex}"]`)?.scrollIntoView({ block: "nearest" })
  }, [open, highlightedIndex])

  const handleSelect = (option) => {
    if (multi) {
      const arr = Array.isArray(value) ? value : []
      onChange?.(selectedSet.has(option.value)
        ? arr.filter(v => v !== option.value)
        : [...arr, option.value]
      )
    } else {
      onChange?.(option.value)
      close()
      buttonRef.current?.focus()
    }
  }

  const handleArrowNavigation = (direction) => {
    if (!open) { setOpen(true); return }
    const total = filteredOptions.length
    if (total === 0) return
    setHighlightedIndex(prev => prev < 0 ? 0 : (prev + direction + total) % total)
  }

  const handleTypeAhead = (char) => {
    if (multi) return
    const isValidChar = char.length === 1 && /[\w\s]/i.test(char)
    if (!isValidChar) return
    const nextTerm = searchRef.current.term + char.toLowerCase()
    searchRef.current.term = nextTerm
    if (searchRef.current.timeout) clearTimeout(searchRef.current.timeout)
    searchRef.current.timeout = setTimeout(() => { searchRef.current.term = "" }, 600)
    const matchIndex = filteredOptions.findIndex(o => o.label.toLowerCase().startsWith(nextTerm))
    if (matchIndex >= 0) {
      if (!open) setOpen(true)
      setHighlightedIndex(matchIndex)
    }
  }

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault()
        handleArrowNavigation(1)
        break
      case "ArrowUp":
        event.preventDefault()
        handleArrowNavigation(-1)
        break
      case "Enter":
        event.preventDefault()
        if (open && highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex])
        } else {
          setOpen(true)
        }
        break
      case "Escape":
        close()
        break
      case "Home":
        event.preventDefault()
        if (filteredOptions.length) { if (!open) setOpen(true); setHighlightedIndex(0) }
        break
      case "End":
        event.preventDefault()
        if (filteredOptions.length) { if (!open) setOpen(true); setHighlightedIndex(filteredOptions.length - 1) }
        break
      default:
        handleTypeAhead(event.key)
    }
  }

  const handleSearchKeyDown = (event) => {
    switch (event.key) {
      case "ArrowDown": event.preventDefault(); handleArrowNavigation(1); break
      case "ArrowUp": event.preventDefault(); handleArrowNavigation(-1); break
      case "Enter":
        event.preventDefault()
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) handleSelect(filteredOptions[highlightedIndex])
        break
      case "Escape": close(); buttonRef.current?.focus(); break
    }
  }

  const triggerText = multi ? (triggerLabel ?? placeholder) : (selected?.label ?? placeholder)
  const triggerDim = multi && !triggerLabel

  return (
    <div className={`dropdown ${className}`} ref={containerRef}>
      {label && (
        <label className="control-label label-row">
          {label}
          {hint && <HintBadge hint={hint} />}
        </label>
      )}
      <div className="trigger-wrap">
        <button
          type="button"
          ref={buttonRef}
          className={`trigger${disabled ? " is-disabled" : ""}`}
          onClick={() => { if (!disabled) setOpen(prev => !prev) }}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-multiselectable={multi ? "true" : undefined}
          disabled={disabled}
        >
          <span className={`control-value value${triggerDim ? " is-dim" : ""}`}>
            {triggerText}
          </span>
          <svg
            className={`chevron${open ? " is-open" : ""}`}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {open && (
          <div className="panel">
            {search && (
              <div className="search-wrap">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search..."
                  className="control-option search-input"
                />
              </div>
            )}
            <ul
              ref={listRef}
              className="list"
              role="listbox"
              aria-multiselectable={multi ? "true" : undefined}
              tabIndex={-1}
            >
              {filteredOptions.map((option, index) => {
                const isSelected = multi ? selectedSet.has(option.value) : option.value === value
                const isHighlighted = index === highlightedIndex
                return (
                  <li key={option.value}>
                    <button
                      type="button"
                      data-index={index}
                      className={`control-option option${isSelected ? " is-selected" : ""}${isHighlighted ? " is-highlighted" : ""}`}
                      style={{ justifyContent: multi ? "space-between" : "flex-start", alignItems: "center" }}
                      onClick={() => handleSelect(option)}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <span className="option-text">{option.label}</span>
                      {multi && isSelected && (
                        <svg className="option-check" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  </li>
                )
              })}
              {filteredOptions.length === 0 && (
                <li className="no-results">No results</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
