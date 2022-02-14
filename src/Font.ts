import { compressSpaces } from './util'

function wrapFontFamily(fontFamily: string) {
  const trimmed = fontFamily.trim()

  return /^('|")/.test(trimmed)
    ? trimmed
    : `"${trimmed}"`
}

function prepareFontFamily(fontFamily: string) {
  return typeof process === 'undefined'
    ? fontFamily
    : fontFamily
      .trim()
      .split(',')
      .map(wrapFontFamily)
      .join(',')
}

/**
 * https://developer.mozilla.org/en-US/docs/Web/CSS/font-style
 * @param fontStyle
 * @returns CSS font style.
 */
function prepareFontStyle(fontStyle: string) {
  if (!fontStyle) {
    return ''
  }

  const targetFontStyle = fontStyle.trim().toLowerCase()

  switch (targetFontStyle) {
    case 'normal':
    case 'italic':
    case 'oblique':
    case 'inherit':
    case 'initial':
    case 'unset':
      return targetFontStyle

    default:

      if (/^oblique\s+(-|)\d+deg$/.test(targetFontStyle)) {
        return targetFontStyle
      }

      return ''
  }
}

/**
 * https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight
 * @param fontWeight
 * @returns CSS font weight.
 */
function prepareFontWeight(fontWeight: string) {
  if (!fontWeight) {
    return ''
  }

  const targetFontWeight = fontWeight.trim().toLowerCase()

  switch (targetFontWeight) {
    case 'normal':
    case 'bold':
    case 'lighter':
    case 'bolder':
    case 'inherit':
    case 'initial':
    case 'unset':
      return targetFontWeight

    default:

      if (/^[\d.]+$/.test(targetFontWeight)) {
        return targetFontWeight
      }

      return ''
  }
}

export class Font {
  static parse(
    font = '',
    inherit?: string | Font
  ) {
    let fontStyle = ''
    let fontVariant = ''
    let fontWeight = ''
    let fontSize = ''
    let fontFamily = ''
    const parts = compressSpaces(font).trim().split(' ')
    const set = {
      fontSize: false,
      fontStyle: false,
      fontWeight: false,
      fontVariant: false
    }

    parts.forEach((part) => {
      switch (true) {
        case !set.fontStyle && Font.styles.includes(part):

          if (part !== 'inherit') {
            fontStyle = part
          }

          set.fontStyle = true
          break

        case !set.fontVariant && Font.variants.includes(part):

          if (part !== 'inherit') {
            fontVariant = part
          }

          set.fontStyle = true
          set.fontVariant = true
          break

        case !set.fontWeight && Font.weights.includes(part):

          if (part !== 'inherit') {
            fontWeight = part
          }

          set.fontStyle = true
          set.fontVariant = true
          set.fontWeight = true
          break

        case !set.fontSize:

          if (part !== 'inherit') {
            fontSize = part.split('/')[0] || ''
          }

          set.fontStyle = true
          set.fontVariant = true
          set.fontWeight = true
          set.fontSize = true
          break

        default:

          if (part !== 'inherit') {
            fontFamily += part
          }
      }
    })

    return new Font(
      fontStyle,
      fontVariant,
      fontWeight,
      fontSize,
      fontFamily,
      inherit
    )
  }

  static readonly styles = 'normal|italic|oblique|inherit'
  static readonly variants = 'normal|small-caps|inherit'
  static readonly weights = 'normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit'

  readonly fontFamily: string
  readonly fontSize: string
  readonly fontStyle: string
  readonly fontWeight: string
  readonly fontVariant: string

  constructor(
    fontStyle: string,
    fontVariant: string,
    fontWeight: string,
    fontSize: string,
    fontFamily: string,
    inherit?: string | Font
  ) {
    const inheritFont = inherit
      ? typeof inherit === 'string'
        ? Font.parse(inherit)
        : inherit
      : {} as Font

    this.fontFamily = fontFamily || inheritFont.fontFamily
    this.fontSize = fontSize || inheritFont.fontSize
    this.fontStyle = fontStyle || inheritFont.fontStyle
    this.fontWeight = fontWeight || inheritFont.fontWeight
    this.fontVariant = fontVariant || inheritFont.fontVariant
  }

  toString() {
    return [
      prepareFontStyle(this.fontStyle),
      this.fontVariant,
      prepareFontWeight(this.fontWeight),
      this.fontSize,
      // Wrap fontFamily only on nodejs and only for canvas.ctx
      prepareFontFamily(this.fontFamily)
    ].join(' ').trim()
  }
}
