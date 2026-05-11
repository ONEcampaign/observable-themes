import * as React from "react"
import { DownloadButton } from "../inputs/DownloadButton.jsx"
import { downloadPlotAsPng, downloadXLSX } from "../utils/export.js"
import { logo } from "../brand/index.js"

/**
 * Opinionated visualization container that wraps a chart or table with ONE Data branding,
 * metadata (title, subtitle, source, note), filter controls, and download buttons.
 * Overlays loading spinners, error messages, and empty-state notices on top of the content area.
 *
 * @param {Object} props
 * @param {string} props.title - Chart title
 * @param {string} [props.subtitle] - Chart subtitle; set `subtitleIsHTML` to parse HTML
 * @param {boolean} [props.subtitleIsHTML=false] - Render `subtitle` as raw HTML
 * @param {React.ReactNode} [props.controls] - Filter controls rendered between the subtitle and the chart
 * @param {React.ReactNode} props.children - The chart or table content
 * @param {string|{ href: string, label: string, publisher?: string }|React.ReactNode} [props.source] - Data source attribution
 * @param {string} [props.note] - Footnote text displayed below the source
 * @param {boolean} [props.loading=false] - Show a loading spinner overlay
 * @param {unknown} [props.error=null] - Show an error overlay when truthy
 * @param {boolean} [props.empty=false] - Show an empty-state overlay
 * @param {string} [props.emptyMessage="No data"] - Text shown in the empty-state overlay
 * @param {string} [props.fileName] - File name (without extension) used for both image and data downloads
 * @param {Record<string, unknown>[]} [props.data] - Data array for XLSX export
 * @param {boolean} [props.imageDownload=false] - Show a plot PNG download button
 * @param {boolean} [props.dataDownload=false] - Show a data XLSX download button
 * @param {string} [props.className=""] - Extra CSS classes on the root `<section>`
 */
export function ONEVisual({
  title,
  subtitle,
  subtitleIsHTML = false,
  controls,
  children,
  source,
  note,
  loading = false,
  error = null,
  empty = false,
  emptyMessage = "No data",
  fileName,
  data,
  imageDownload = false,
  dataDownload = false,
  className = ""
}) {
  const captureRef = React.useRef(null)
  const blocked = loading || !!error || empty

  const renderSourceContent = () => {
    if (!source) return null
    if (typeof source === "string") {
      return <span dangerouslySetInnerHTML={{ __html: source }} />
    }
    if (React.isValidElement(source)) {
      return source
    }
    const { href, label, publisher } = source
    const hasLink = href && label
    if (!hasLink && !publisher) return null
    return (
      <>
        {hasLink && (
          <>
            <a className="source-link" href={href} target="_blank" rel="noopener noreferrer">
              {label}
            </a>
            .
          </>
        )}
        {publisher && (
          <>
            {hasLink && ' '}
            {publisher}.
          </>
        )}
      </>
    )
  }

  const subtitleNode = subtitle
    ? subtitleIsHTML
      ? (
        <h3
          className="plot-subtitle"
          dangerouslySetInnerHTML={{ __html: subtitle }}
        />
      )
      : (
        <h3 className="plot-subtitle">
          {subtitle}
        </h3>
      )
    : null

  const handleImageDownload = () => {
    if (blocked || !captureRef.current) return
    const plotEl = captureRef.current.querySelector(".chart-inner")
    if (plotEl) downloadPlotAsPng(plotEl, { title, subtitle, source, note, filename: fileName, logoSrc: logo })
  }

  const handleDataDownload = () => {
    if (blocked || !data?.length) return
    downloadXLSX(data, fileName)
  }

  const showButtons = imageDownload || dataDownload

  return (
    <section className={`one-visual ${className}`}>
      <div className="body" ref={captureRef}>
        <div className="header">
          <h2 className="plot-title">
            {title}
          </h2>
          {subtitleNode}
        </div>
        {controls && <div className="controls">{controls}</div>}
        <div className="chart-area">
          <div className="chart-inner">{children}</div>
          {loading && (
            <div className="overlay overlay-loading">
              <span className="spinner" />
              <p className="loading-text">Loading data...</p>
            </div>
          )}
          {!loading && error && (
            <div className="overlay overlay-error">
              Unable to load data. Please try different filters.
            </div>
          )}
          {!loading && !error && empty && (
            <div className="overlay overlay-empty">
              {emptyMessage}
            </div>
          )}
        </div>
        <div className="footer plot-note">
          <div className="footer-notes">
            {source && (
              <p>
                Source:{' '}
                {renderSourceContent()}
              </p>
            )}
            {note && <p>{note}</p>}
          </div>
          <div className="footer-logo">
            <a
              href="https://data.one.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="logo-link"
            >
              <img src={logo} alt="The ONE Campaign logo" className="logo-img" />
            </a>
          </div>
        </div>
      </div>
      {showButtons && (
        <div className="action-bar">
          {imageDownload && (
            <DownloadButton
              label="Download plot"
              icon="chart"
              onClick={handleImageDownload}
              disabled={blocked}
            />
          )}
          {dataDownload && (
            <DownloadButton
              onClick={handleDataDownload}
              disabled={blocked || !data?.length}
            />
          )}
        </div>
      )}
    </section>
  )
}
