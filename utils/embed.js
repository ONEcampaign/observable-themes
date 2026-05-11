const isBrowser = typeof window !== "undefined"

/**
 * `true` when the page is loaded inside an iframe or with `?embed=true` in the URL.
 * When embedded, automatically adds the `"embedded"` CSS class to `<html>` and posts
 * the document height to the parent frame via `ResizeObserver` for iframe auto-sizing.
 */
const isEmbedded = isBrowser && (
  new URLSearchParams(window.location.search).get("embed") === "true" ||
  window.self !== window.top
)

if (isBrowser && isEmbedded) {
  document.documentElement.classList.add("embedded")

  const observer = new ResizeObserver(([entry]) => {
    parent.postMessage({ height: entry.target.offsetHeight }, "*")
  })
  observer.observe(document.documentElement)
}

export { isEmbedded }
