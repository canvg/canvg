import { MatrixValue } from '../types'

/**
 * HTML-safe compress white-spaces.
 * @param str - String to compress.
 * @returns String.
 */
export function compressSpaces(str: string) {
  return str.replace(/(?!\u3000)\s+/gm, ' ')
}

/**
 * HTML-safe left trim.
 * @param str - String to trim.
 * @returns String.
 */
export function trimLeft(str: string) {
  return str.replace(/^[\n \t]+/, '')
}

/**
 * HTML-safe right trim.
 * @param str - String to trim.
 * @returns String.
 */
export function trimRight(str: string) {
  return str.replace(/[\n \t]+$/, '')
}

/**
 * String to numbers array.
 * @param str - Numbers string.
 * @returns Numbers array.
 */
export function toNumbers(str: string) {
  const matches = str.match(/-?(\d+(?:\.\d*(?:[eE][+-]?\d+)?)?|\.\d+)(?=\D|$)/gm)

  return matches ? matches.map(parseFloat) : []
}

/**
 * String to matrix value.
 * @param str - Numbers string.
 * @returns Matrix value.
 */
export function toMatrixValue(str: string): MatrixValue {
  const numbers = toNumbers(str)
  const matrix = [
    numbers[0] || 0,
    numbers[1] || 0,
    numbers[2] || 0,
    numbers[3] || 0,
    numbers[4] || 0,
    numbers[5] || 0
  ] as const

  return matrix
}

// Microsoft Edge fix
const allUppercase = /^[A-Z-]+$/

/**
 * Normalize attribute name.
 * @param name - Attribute name.
 * @returns Normalized attribute name.
 */
export function normalizeAttributeName(name: string) {
  if (allUppercase.test(name)) {
    return name.toLowerCase()
  }

  return name
}

/**
 * Parse external URL.
 * @param url - CSS url string.
 * @returns Parsed URL.
 */
export function parseExternalUrl(url: string): string {
  //                      single quotes [2]
  //                      v         double quotes [3]
  //                      v         v         no quotes [4]
  //                      v         v         v
  const urlMatch = /url\(('([^']+)'|"([^"]+)"|([^'")]+))\)/.exec(url)

  if (!urlMatch) {
    return ''
  }

  return urlMatch[2] || urlMatch[3] || urlMatch[4] || ''
}

/**
 * Transform floats to integers in rgb colors.
 * @param color - Color to normalize.
 * @returns Normalized color.
 */
export function normalizeColor(color: string) {
  if (!color.startsWith('rgb')) {
    return color
  }

  let rgbParts = 3
  const normalizedColor = color.replace(
    /\d+(\.\d+)?/g,
    (num, isFloat) => (rgbParts-- && isFloat
      ? String(Math.round(parseFloat(num)))
      : num)
  )

  return normalizedColor
}
