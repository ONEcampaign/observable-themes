import {html} from "htl"
import {formatValue} from "../utils/format.js"

const MID_GREY = "#646464"
const LIGHT_GREY = "#E8E8E8"

/**
 * Returns a cell-renderer function for use with Observable's `Inputs.table`.
 * Each cell renders an inline bar scaled to the column's global min/max range,
 * with the numeric value overlaid as text.
 *
 * @param {string} fillColor - Hex color for the bar fill (e.g. `"#0ea5e9"`). Rendered at 40% opacity.
 * @param {"left"|"right"|"center"} alignment - Bar origin. Use `"center"` for data that spans positive and negative values.
 * @param {number} globalMin - Minimum value in the column. Pass `0` for all-positive data with `"left"`/`"right"` alignment.
 * @param {number} globalMax - Maximum value in the column.
 * @param {((value: number) => string)|null} [formatter=null] - Optional value formatter. Defaults to `formatValue`.
 * @returns {(x: number) => HTMLElement}
 */
export function sparkbar(fillColor, alignment, globalMin, globalMax, formatter = null) {
  const range = Math.abs(globalMax) + Math.abs(globalMin)
  const zeroPosition = Math.abs(globalMin) / range

  return (x) => {
    const barWidth = Math.min(100, (100 * Math.abs(x)) / range)

    const barStyle =
      alignment === "center"
        ? `
          position: absolute;
          height: 80%;
          top: 10%;
          background: ${hex2rgb(fillColor, 0.4)};
          width: ${barWidth}%;
          ${x >= 0
            ? `left: ${zeroPosition * 100}%;`
            : `right: ${(1 - zeroPosition) * 100}%;`}
          box-sizing: border-box;
          overflow: hidden;
        `
        : `
          position: absolute;
          height: 90%;
          top: 5%;
          background: ${hex2rgb(fillColor, 0.4)};
          width: ${barWidth}%;
          ${alignment === "right" ? "right: 0;" : "left: 0;"}
          box-sizing: border-box;
          overflow: hidden;
        `

    const zeroLineStyle =
      alignment === "center"
        ? `
          position: absolute;
          height: 100%;
          width: 1px;
          background: ${hex2rgb(MID_GREY, 0.5)};
          left: ${zeroPosition * 100}%;
          box-sizing: border-box;
        `
        : alignment === "right"
          ? `
            position: absolute;
            height: 100%;
            width: 1px;
            background: ${hex2rgb(MID_GREY, 0.5)};
            right: 0;
            box-sizing: border-box;
          `
          : `
            position: absolute;
            height: 100%;
            width: 1px;
            background: ${hex2rgb(MID_GREY, 0.5)};
            left: 0;
            box-sizing: border-box;
          `

    const textAlignment =
      alignment === "center" ? "center"
      : alignment === "right" ? "end"
      : "start"

    return html`
      <div style="
        position: relative;
        width: 100%;
        height: 1.25rem;
        background: none;
        display: flex;
        z-index: 0;
        align-items: center;
        justify-content: ${textAlignment};
        box-sizing: border-box;
        overflow: hidden;">
        <div style="${barStyle}"></div>
        <div style="${zeroLineStyle}"></div>
        <span style="
          position: relative;
          z-index: 1;
          font: 1rem 'Italian Plate', sans-serif;
          color: black;
          text-shadow: .5px .5px 0 ${LIGHT_GREY};
          padding: 0 3px;">
          ${formatter ? formatter(x) : formatValue(x).label}
        </span>
      </div>`
  }
}

export function hex2rgb(hex, alpha = 1) {
  hex = hex.replace(/^#/, "")
  let r, g, b, a = 1

  if (hex.length === 6) {
    r = parseInt(hex.slice(0, 2), 16)
    g = parseInt(hex.slice(2, 4), 16)
    b = parseInt(hex.slice(4, 6), 16)
  } else if (hex.length === 8) {
    r = parseInt(hex.slice(0, 2), 16)
    g = parseInt(hex.slice(2, 4), 16)
    b = parseInt(hex.slice(4, 6), 16)
    a = parseInt(hex.slice(6, 8), 16) / 255
  } else {
    throw new Error("Invalid hex format. Use #RRGGBB or #RRGGBBAA.")
  }

  return `rgba(${r}, ${g}, ${b}, ${a * alpha})`
}
