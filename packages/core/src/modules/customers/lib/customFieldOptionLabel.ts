/**
 * Resolve the human label of a select/dictionary custom-field value.
 *
 * The list cells used to print the raw stored value ("in_progress"), so a
 * localized definition shipped next to it was invisible. Returns null when the
 * definition carries no matching option, which keeps free-text fields untouched.
 */
type CustomFieldOption = string | { value?: unknown; label?: unknown }

export function resolveCustomFieldOptionLabel(
  def: { options?: unknown } | null | undefined,
  value: string,
): string | null {
  const options = Array.isArray(def?.options) ? (def?.options as CustomFieldOption[]) : []
  for (const option of options) {
    if (option == null) continue
    if (typeof option === 'string') {
      if (option === value) return option
      continue
    }
    if (String(option.value ?? '') !== value) continue
    const label = option.label ?? option.value
    return typeof label === 'string' && label.length > 0 ? label : value
  }
  return null
}
