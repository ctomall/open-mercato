/**
 * Active formatting locale for the UI package.
 *
 * Compiled components call `Intl.*` without an explicit locale, which resolves
 * to the machine default (en-US on most servers) instead of the application
 * locale. The host application declares its locale once at bootstrap and every
 * formatter reads it from here, so localized output no longer depends on the
 * server's `LANG` or on monkey-patching `Intl` globally.
 */
let activeLocale: string | undefined

/** Set the locale used by every formatter that does not receive one explicitly. */
export function setFormatLocale(locale: string | undefined | null): void {
  const next = typeof locale === 'string' && locale.trim().length ? locale.trim() : undefined
  activeLocale = next
}

/** Current active locale, or undefined when the host has not declared one. */
export function getFormatLocale(): string | undefined {
  return activeLocale
}

/** Explicit locale wins; otherwise fall back to the active one. */
export function resolveFormatLocale(locale?: string | null): string | undefined {
  const explicit = typeof locale === 'string' && locale.trim().length ? locale.trim() : undefined
  return explicit ?? activeLocale
}

/** Test helper: forget the active locale. */
export function resetFormatLocale(): void {
  activeLocale = undefined
}
