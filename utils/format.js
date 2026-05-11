/**
 * Remove ", Total" suffixes from a string, and optionally convert to snake_case for file naming.
 * @param {string} str
 * @param {{ fileMode?: boolean }} [options]
 * @returns {string}
 */
export function formatString(str, options = { fileMode: false }) {
  let result = str.replace(/, Total/g, "")

  if (options.fileMode) {
    result = result.toLowerCase().replace(/\s+/g, "_")
  }

  return result
}

/**
 * Round a numeric value to 2 decimal places and produce a locale-formatted label.
 * Returns `{ value: 0, label: "0" }` for null/undefined inputs, and `"< 0.01"` as the
 * label when the original value rounds to exactly zero.
 * @param {number|null|undefined} value
 * @returns {{ value: number, label: string }}
 */
export function formatValue(value) {
  if (value == null) {
    return { value: 0, label: "0" }
  }

  const roundedValue = parseFloat(value.toFixed(2))

  let label
  if (value === 0) {
    label = "< 0.01"
  } else {
    label = roundedValue.toLocaleString("en-US", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 2
    })
  }

  return { value: roundedValue, label }
}

/**
 * Convert integer units to millions.
 * Value columns in parquet files are stored as integers in units (not millions).
 * @param {number|null|undefined} value
 * @returns {number|null}
 */
export function convertUnitsToMillions(value) {
  if (value == null) return null
  return Number(value) / 1e6
}

const SCALE_SUFFIXES = { 0: "", 3: "thousand", 6: "million", 9: "billion", 12: "trillion" }
const SCALE_LEVELS = [0, 3, 6, 9, 12]

/**
 * Given an array of values and their input unit, determine the optimal display scale.
 * The function finds the highest magnitude where the maximum absolute value is ≥ 1,
 * so data is always displayed as a readable number (e.g. 1.2 billion instead of 1200 million).
 * Scales both up and down as needed.
 *
 * @param {number[]} values - Data values expressed in the given unit
 * @param {0|3|6|9|12} [magnitude=0] - Order of magnitude of the input values:
 *   `0` = units, `3` = thousands, `6` = millions, `9` = billions, `12` = trillions
 * @returns {{ divisor: number, suffix: string }}
 *
 * @example
 * resolveScale([500, 1200, 800], 6)            // data in millions, max 1200 M  → { divisor: 1000,  suffix: "billion" }
 * resolveScale([0.5, 1.2, 0.8], 6)            // data in millions, max 1.2 M   → { divisor: 1,     suffix: "million" }
 * resolveScale([500000, 1200000], 0)           // data in units,   max 1.2 M   → { divisor: 1e6,   suffix: "million" }
 * resolveScale([0.005, 0.0001, 0.0002], 6)    // data in millions, max 5000 u  → { divisor: 0.001, suffix: "thousand" }
 */
export function resolveScale(values, magnitude = 0) {
  const finite = Array.from(values).map(v => Math.abs(v ?? 0)).filter(v => isFinite(v) && v > 0)

  if (finite.length === 0) {
    return { divisor: 1, suffix: SCALE_SUFFIXES[magnitude] ?? "" }
  }

  const rawMax = Math.max(...finite) * Math.pow(10, magnitude)

  const displayMag = [...SCALE_LEVELS]
    .reverse()
    .find(m => rawMax >= Math.pow(10, m)) ?? 0

  return {
    divisor: Math.pow(10, displayMag - magnitude),
    suffix: SCALE_SUFFIXES[displayMag] ?? ""
  }
}

/**
 * Format a value (in millions) as a currency string, e.g. `"US$12.3 B"` or `"€50.0 M"`.
 * @param {number|null|undefined} value - Value in millions
 * @param {string} currency - Currency code: `"usd"`, `"eur"`, `"cad"`, `"gbp"`
 * @param {{ divisor: number, suffix: string }|null} [scale] - Pre-resolved scale; auto-detected if omitted
 * @returns {string}
 */
export function formatCurrencyValue(value, currency, scale = null) {
  if (value == null) return "—"
  const sym = getCurrencyLabel(currency, { currencyOnly: true })
  const { divisor, suffix } = scale ?? (Math.abs(value) >= 1000 ? { divisor: 1000, suffix: "B" } : { divisor: 1, suffix: "M" })
  const formatted = (value / divisor).toLocaleString("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  })
  return `${sym}${formatted} ${suffix}`
}

/**
 * Map a currency code to its display symbol or name, with flexible formatting options.
 * @param {string} tag - Currency code: `"usd"`, `"eur"`, `"cad"`, `"gbp"`
 * @param {Object} [options]
 * @param {boolean} [options.currencyOnly=false] - Return only the currency symbol/name
 * @param {boolean} [options.currencyLong=false] - Use long currency name (e.g. "US Dollars")
 * @param {boolean} [options.unitsOnly=false] - Return only the units suffix
 * @param {boolean} [options.unitsLong=true] - Use long units name (e.g. "Million")
 * @param {boolean} [options.inSentence=false] - Format for use in a sentence: `"US$ (millions)"`
 * @param {string} [options.value=""] - Numeric value to embed in the label
 * @param {string|null} [options.suffix=null] - Override the units suffix
 * @returns {string}
 */
export function getCurrencyLabel(tag, {
  currencyOnly = false,
  currencyLong = false,
  unitsOnly = false,
  unitsLong = true,
  inSentence = false,
  value = "",
  suffix = null,
} = {}) {
  const currencyMap = {
    "usd": currencyLong ? "US Dollars" : "US$",
    "eur": currencyLong ? "Euros" : "€",
    "cad": currencyLong ? "Canada Dollars" : "CA$",
    "gbp": currencyLong ? "British Pounds" : "£",
  }

  const currency = currencyMap[tag] ?? tag
  const units = suffix ?? (unitsLong ? "Million" : "M")

  if (inSentence) return `${currency} (millions)`
  if (currencyOnly) return currency
  if (unitsOnly) return units

  return value === "" ? `${currency} ${units}` : `${currency}${value} ${units}`
}
