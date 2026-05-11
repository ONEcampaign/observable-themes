/**
 * Strip all HTML tags from a string, returning plain text.
 * Relies on the browser DOM — not safe for server-side use.
 * @param {string} html
 * @returns {string}
 */
export function decodeHTML(html) {
  const txt = document.createElement("textarea")
  txt.innerHTML = html
  return txt.value
}

/**
 * Escape single quotes for safe interpolation into SQL string literals.
 * @param {string} str
 * @returns {string}
 */
export function escapeSQL(str) {
  return str.replace(/'/g, "''")
}
