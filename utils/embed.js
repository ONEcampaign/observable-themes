const isBrowser = typeof window !== "undefined"
const isFramed = isBrowser && window.self !== window.top
const hasEmbedFlag = isBrowser && new URLSearchParams(window.location.search).get("embed") === "true"

/**
 * `true` when the page is loaded inside an iframe or with `?embed=true` in the URL.
 *
 * When embedded, the module adds the `"embedded"` CSS class to `<html>` and posts
 * `{ height }` to the parent frame from a `ResizeObserver`, where `height` is the
 * `<html>` border-box height rounded up to a whole pixel.
 *
 * When the page is framed and has `?embed=true`, the parent has declared that it sizes
 * the iframe to the posted height, so the module also sets `overflow: hidden` on `<html>`
 * and the framed document has no scrollbar of its own. A top-level `?embed=true` page
 * and a framed page without the flag keep scrolling.
 *
 * Framed content must not size itself in `vh` units: inside an iframe `vh` is the iframe
 * height, so each posted height makes the content taller and the iframe grows without end.
 */
const isEmbedded = isFramed || hasEmbedFlag

if (isEmbedded) {
  document.documentElement.classList.add("embedded")

  const observer = new ResizeObserver(([entry]) => {
    parent.postMessage({ height: Math.ceil(entry.borderBoxSize[0].blockSize) }, "*")
  })
  observer.observe(document.documentElement)
}

if (isFramed && hasEmbedFlag) {
  document.documentElement.style.overflow = "hidden"
}

export { isEmbedded }
