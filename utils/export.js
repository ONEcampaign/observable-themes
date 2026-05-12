/**
 * Export a JSON array to an Excel (.xlsx) file and trigger a download.
 * Requires the optional `xlsx` dependency.
 * @param {Record<string, unknown>[]} data - Array of objects to export as rows
 * @param {string} filename - Output file name without extension
 * @returns {Promise<void>}
 */
export async function downloadXLSX(data, filename) {
  const { utils, writeFile } = await import("xlsx")

  const worksheet = utils.json_to_sheet(data)
  const workbook = utils.book_new()
  utils.book_append_sheet(workbook, worksheet)
  writeFile(workbook, `${filename}.xlsx`)
}

// ─── Plot image export ────────────────────────────────────────────────────────

const FONT_REGULAR_URL =
  "https://cdn.jsdelivr.net/npm/@one-data/observable-themes@latest/assets/fonts/ItalianPlateNo2-Regular.woff2"
const FONT_BOLD_URL =
  "https://cdn.jsdelivr.net/npm/@one-data/observable-themes@latest/assets/fonts/ItalianPlateNo2-Bold.woff2"

const COLORS = {
  title: "#000000",
  subtitle: "#000000",
  source: "#3d3d3d",
  note: "#3d3d3d",
  bg: "#ffffff"
}

const FONT_FAMILY = "'Italian Plate', Helvetica, sans-serif"
const PADDING = 32
const SCALE = 2

async function fetchAsDataURI(url, mime) {
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const buf = await res.arrayBuffer()
    const b64 = btoa(String.fromCharCode(...new Uint8Array(buf)))
    return `data:${mime};base64,${b64}`
  } catch {
    return null
  }
}

async function toEmbeddableDataURI(src) {
  if (!src) return null
  if (src.startsWith("data:")) return src
  try {
    const res = await fetch(src)
    if (!res.ok) return null
    const blob = await res.blob()
    const buf = await blob.arrayBuffer()
    const b64 = btoa(String.fromCharCode(...new Uint8Array(buf)))
    return `data:${blob.type || "image/png"};base64,${b64}`
  } catch {
    return null
  }
}

function stripHTML(html) {
  const tmp = document.createElement("div")
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ""
}

function parseHTMLSegments(html) {
  const div = document.createElement("div")
  div.innerHTML = html
  const segments = []

  function walk(node, inheritedColor, inheritedWeight) {
    if (node.nodeType === 3) {
      if (node.textContent) {
        segments.push({ text: node.textContent, color: inheritedColor, fontWeight: inheritedWeight })
      }
    } else if (node.nodeType === 1) {
      const color = node.style.color || inheritedColor
      const fontWeight = node.style.fontWeight || inheritedWeight
      for (const child of node.childNodes) {
        walk(child, color, fontWeight)
      }
    }
  }

  for (const child of div.childNodes) {
    walk(child, null, null)
  }
  return segments.filter(s => s.text)
}

function resolveSourceText(source) {
  if (!source) return ""
  if (typeof source === "string") return stripHTML(source)
  const { href, label, publisher } = source
  const parts = []
  if (href && label) parts.push(`${label}.`)
  if (publisher) parts.push(`${publisher}.`)
  return parts.join(" ")
}

function inlineAxisStyles(svg) {
  const axisSelectors = [
    '[aria-label="x-axis tick label"]',
    '[aria-label="y-axis label"] text',
    '[aria-label="y-axis tick label"]'
  ]
  const axisStyle = {
    "font-size": "12px",
    "font-family": FONT_FAMILY,
    fill: "black"
  }
  for (const sel of axisSelectors) {
    for (const el of svg.querySelectorAll(sel)) {
      for (const [k, v] of Object.entries(axisStyle)) {
        el.style.setProperty(k, v)
      }
      for (const t of el.querySelectorAll("text")) {
        for (const [k, v] of Object.entries(axisStyle)) {
          t.style.setProperty(k, v)
        }
      }
    }
  }
  for (const el of svg.querySelectorAll('[aria-label="y-grid"]')) {
    el.style.setProperty("color", "black")
  }
}

function wrapRichTextSegments(segments, maxCharsPerLine) {
  const tokens = []
  for (const seg of segments) {
    const parts = seg.text.split(/(\s+)/)
    for (const part of parts) {
      if (part) tokens.push({ text: part, color: seg.color, fontWeight: seg.fontWeight })
    }
  }

  const lines = []
  let currentLine = []
  let lineLen = 0

  for (const token of tokens) {
    const isSpace = /^\s+$/.test(token.text)
    if (isSpace) {
      if (currentLine.length) { currentLine.push(token); lineLen += token.text.length }
      continue
    }
    if (lineLen > 0 && lineLen + token.text.length > maxCharsPerLine) {
      while (currentLine.length && /^\s+$/.test(currentLine.at(-1).text)) currentLine.pop()
      lines.push(currentLine)
      currentLine = []
      lineLen = 0
    }
    currentLine.push(token)
    lineLen += token.text.length
  }

  if (currentLine.length) {
    while (currentLine.length && /^\s+$/.test(currentLine.at(-1).text)) currentLine.pop()
    lines.push(currentLine)
  }

  return lines.filter(l => l.length)
}

function wrapText(text, maxCharsPerLine) {
  if (!text) return []
  const words = text.split(/\s+/)
  const lines = []
  let current = ""
  for (const word of words) {
    if (current && (current.length + 1 + word.length) > maxCharsPerLine) {
      lines.push(current)
      current = word
    } else {
      current = current ? current + " " + word : word
    }
  }
  if (current) lines.push(current)
  return lines
}

function svgTextBlock(lines, { x, y, fontSize, fontWeight, fill, lineHeight }) {
  if (!lines.length) return { el: null, height: 0 }
  const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text")
  textEl.setAttribute("x", x)
  textEl.setAttribute("y", y)
  textEl.setAttribute("font-family", FONT_FAMILY)
  textEl.setAttribute("font-size", fontSize)
  if (fontWeight) textEl.setAttribute("font-weight", fontWeight)
  textEl.setAttribute("fill", fill)

  lines.forEach((line, i) => {
    const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan")
    tspan.setAttribute("x", x)
    tspan.setAttribute("dy", i === 0 ? "0" : lineHeight)
    tspan.textContent = line
    textEl.appendChild(tspan)
  })

  const totalHeight = fontSize * 1.2 + (lines.length - 1) * parseFloat(lineHeight)
  return { el: textEl, height: totalHeight }
}

function svgRichTextLine(segments, { x, y, fontSize, defaultFill }) {
  const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text")
  textEl.setAttribute("x", x)
  textEl.setAttribute("y", y)
  textEl.setAttribute("font-family", FONT_FAMILY)
  textEl.setAttribute("font-size", fontSize)
  textEl.setAttribute("fill", defaultFill)

  for (const segment of segments) {
    const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan")
    tspan.textContent = segment.text
    if (segment.color) tspan.setAttribute("fill", segment.color)
    if (segment.fontWeight) tspan.setAttribute("font-weight", segment.fontWeight)
    textEl.appendChild(tspan)
  }
  return textEl
}

/**
 * Capture a plot container as a high-resolution PNG via pure SVG composition and trigger a download.
 * Embeds the Italian Plate font, plot SVG with inlined axis styles, title, subtitle (HTML-aware),
 * source, note, and an optional ONE logo. Outputs at 2× pixel ratio.
 *
 * @param {HTMLElement} plotContainer - DOM element containing the Observable Plot SVG
 * @param {Object} opts
 * @param {string} opts.title - Chart title text
 * @param {string} [opts.subtitle] - Subtitle text; may contain inline HTML for styled segments
 * @param {string|{ href: string, label: string, publisher?: string }} [opts.source] - Data source
 * @param {string} [opts.note] - Footnote text
 * @param {string} [opts.filename="plot"] - Output file name without extension
 * @param {string} [opts.logoSrc] - Pre-loaded logo URL or data URI to embed bottom-right
 * @returns {Promise<void>}
 */
export async function downloadPlotAsPng(plotContainer, { title, subtitle, source, note, filename = "plot", logoSrc }) {
  if (!plotContainer) return

  const origSvg = plotContainer.querySelector("svg")
  if (!origSvg) return

  const plotSvg = origSvg.cloneNode(true)

  for (const tip of plotSvg.querySelectorAll('[aria-label="tip"]')) {
    tip.remove()
  }

  inlineAxisStyles(plotSvg)

  const plotRect = origSvg.getBoundingClientRect()
  const plotW = parseFloat(plotSvg.getAttribute("width")) || plotRect.width
  const plotH = parseFloat(plotSvg.getAttribute("height")) || plotRect.height

  if (!plotSvg.getAttribute("viewBox")) {
    plotSvg.setAttribute("viewBox", `0 0 ${plotW} ${plotH}`)
  }

  const titleFontSize = 24
  const subtitleFontSize = 18
  const footerFontSize = 12
  const lineHeightPx = 1.25

  const sourceText = resolveSourceText(source)
  const contentWidth = plotW + PADDING * 2
  const maxChars = Math.floor(contentWidth / (footerFontSize * 0.5))
  const subtitleMaxChars = Math.floor(contentWidth / (subtitleFontSize * 0.52))

  const titleLines = wrapText(title || "", Math.floor(contentWidth / (titleFontSize * 0.4)))
  const subtitleHasHTML = subtitle && /<[a-z]/i.test(subtitle)
  const subtitleSegments = subtitleHasHTML ? parseHTMLSegments(subtitle) : []
  const subtitleRichLines = subtitleHasHTML ? wrapRichTextSegments(subtitleSegments, subtitleMaxChars) : []
  const subtitleLines = subtitleHasHTML ? [] : wrapText(subtitle ? stripHTML(subtitle) : "", subtitleMaxChars)
  const hasSubtitle = subtitleHasHTML ? subtitleRichLines.length > 0 : subtitleLines.length > 0
  const sourceLines = wrapText(sourceText ? `Source: ${sourceText}` : "", maxChars)
  const noteLines = wrapText(note || "", maxChars)

  const [logoDataURI, fontRegularURI, fontBoldURI] = await Promise.all([
    toEmbeddableDataURI(logoSrc),
    fetchAsDataURI(FONT_REGULAR_URL, "font/woff2"),
    fetchAsDataURI(FONT_BOLD_URL, "font/woff2")
  ])

  let cursorY = PADDING

  const titleBlockH = titleLines.length ? titleFontSize * lineHeightPx * titleLines.length : 0
  cursorY += titleBlockH

  if (hasSubtitle) cursorY += 4
  const subtitleLineCount = subtitleHasHTML ? subtitleRichLines.length : subtitleLines.length
  const subtitleBlockH = hasSubtitle ? subtitleFontSize * lineHeightPx * subtitleLineCount : 0
  cursorY += subtitleBlockH

  cursorY += 16
  const plotY = cursorY
  cursorY += plotH

  cursorY += 20
  const footerY = cursorY
  const sourceBlockH = sourceLines.length ? footerFontSize * lineHeightPx * sourceLines.length : 0
  cursorY += sourceBlockH
  if (noteLines.length && sourceLines.length) cursorY += 4
  const noteBlockH = noteLines.length ? footerFontSize * lineHeightPx * noteLines.length : 0
  cursorY += noteBlockH

  cursorY += PADDING
  const totalW = contentWidth
  const totalH = cursorY

  const ns = "http://www.w3.org/2000/svg"
  const wrapper = document.createElementNS(ns, "svg")
  wrapper.setAttribute("xmlns", ns)
  wrapper.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink")
  wrapper.setAttribute("width", totalW)
  wrapper.setAttribute("height", totalH)
  wrapper.setAttribute("viewBox", `0 0 ${totalW} ${totalH}`)

  let fontFaceCSS = ""
  if (fontRegularURI) {
    fontFaceCSS += `@font-face { font-family: 'Italian Plate'; font-weight: 400; src: url('${fontRegularURI}') format('woff2'); }`
  }
  if (fontBoldURI) {
    fontFaceCSS += `@font-face { font-family: 'Italian Plate'; font-weight: 700; src: url('${fontBoldURI}') format('woff2'); }`
  }
  if (fontFaceCSS) {
    const styleEl = document.createElementNS(ns, "style")
    styleEl.textContent = fontFaceCSS
    wrapper.appendChild(styleEl)
  }

  const bg = document.createElementNS(ns, "rect")
  bg.setAttribute("width", totalW)
  bg.setAttribute("height", totalH)
  bg.setAttribute("fill", COLORS.bg)
  wrapper.appendChild(bg)

  let textY = PADDING + titleFontSize
  if (titleLines.length) {
    const { el } = svgTextBlock(titleLines, {
      x: PADDING, y: textY, fontSize: titleFontSize, fontWeight: "700",
      fill: COLORS.title, lineHeight: `${titleFontSize * lineHeightPx}px`
    })
    if (el) wrapper.appendChild(el)
    textY += titleBlockH
  }

  if (hasSubtitle) {
    textY += 4
    if (subtitleHasHTML && subtitleRichLines.length) {
      subtitleRichLines.forEach((lineSegments, i) => {
        const el = svgRichTextLine(lineSegments, {
          x: PADDING, y: textY + i * subtitleFontSize * lineHeightPx,
          fontSize: subtitleFontSize, defaultFill: COLORS.subtitle
        })
        wrapper.appendChild(el)
      })
    } else if (subtitleLines.length) {
      const { el } = svgTextBlock(subtitleLines, {
        x: PADDING, y: textY, fontSize: subtitleFontSize, fontWeight: "400",
        fill: COLORS.subtitle, lineHeight: `${subtitleFontSize * lineHeightPx}px`
      })
      if (el) wrapper.appendChild(el)
    }
  }

  plotSvg.removeAttribute("width")
  plotSvg.removeAttribute("height")
  plotSvg.setAttribute("x", PADDING)
  plotSvg.setAttribute("y", plotY)
  plotSvg.setAttribute("width", plotW)
  plotSvg.setAttribute("height", plotH)
  wrapper.appendChild(plotSvg)

  let footerCursorY = footerY + footerFontSize
  if (sourceLines.length) {
    const { el } = svgTextBlock(sourceLines, {
      x: PADDING, y: footerCursorY, fontSize: footerFontSize, fontWeight: "400",
      fill: COLORS.source, lineHeight: `${footerFontSize * lineHeightPx}px`
    })
    if (el) wrapper.appendChild(el)
    footerCursorY += sourceBlockH
  }

  if (noteLines.length) {
    if (sourceLines.length) footerCursorY += 4
    const { el } = svgTextBlock(noteLines, {
      x: PADDING, y: footerCursorY, fontSize: footerFontSize, fontWeight: "400",
      fill: COLORS.note, lineHeight: `${footerFontSize * lineHeightPx}px`
    })
    if (el) wrapper.appendChild(el)
  }

  const logoSize = 20
  const logoX = totalW - PADDING - logoSize
  const logoY = footerY

  const serializer = new XMLSerializer()
  const svgString = serializer.serializeToString(wrapper)
  const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" })
  const svgUrl = URL.createObjectURL(svgBlob)

  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = totalW * SCALE
      canvas.height = totalH * SCALE
      const ctx = canvas.getContext("2d")
      ctx.scale(SCALE, SCALE)
      ctx.drawImage(img, 0, 0, totalW, totalH)
      URL.revokeObjectURL(svgUrl)

      if (logoDataURI) {
        const logoImg = new Image()
        logoImg.onload = () => {
          ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize)
          finalize()
        }
        logoImg.onerror = () => finalize()
        logoImg.src = logoDataURI
        return
      }

      finalize()

      function finalize() {
        canvas.toBlob((blob) => {
          if (!blob) { resolve(); return }
          const a = document.createElement("a")
          a.href = URL.createObjectURL(blob)
          a.download = `${filename}.png`
          a.click()
          URL.revokeObjectURL(a.href)
          resolve()
        }, "image/png")
      }
    }
    img.onerror = () => {
      URL.revokeObjectURL(svgUrl)
      console.error("SVG → PNG export: failed to load SVG as image")
      resolve()
    }
    img.src = svgUrl
  })
}
