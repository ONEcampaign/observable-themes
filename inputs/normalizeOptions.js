/**
 * Normalize a mixed options array into `{ label, value, disabled }` objects.
 * Accepts strings, `{ label, value }` objects, or a `Map<label, value>`.
 * @param {string[]|{ label: string, value: unknown, disabled?: boolean }[]|Map<string, unknown>} options
 * @returns {{ label: string, value: unknown, disabled: boolean }[]}
 */
export const normalizeOptions = (options) => {
  if (!options) return []
  if (options instanceof Map) {
    return Array.from(options.entries()).map(([label, value]) => ({ label, value }))
  }
  return options.map((option) =>
      typeof option === "string"
          ? { label: option, value: option }
          : { label: option.label, value: option.value, disabled: option.disabled ?? false }
  )
}
