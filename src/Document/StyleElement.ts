import {
  compressSpaces,
  getSelectorSpecificity,
  parseExternalUrl
} from '../util'
import { Property } from '../Property'
import { SVGFontLoader } from '../SVGFontLoader'
import { Document } from './Document'
import { Element } from './Element'

export class StyleElement extends Element {
  static readonly parseExternalUrl = parseExternalUrl

  override type = 'style'

  constructor(
    document: Document,
    node: HTMLElement,
    captureTextNodes?: boolean
  ) {
    super(document, node, captureTextNodes)

    const css = compressSpaces(
      Array.from(node.childNodes)
      // NEED TEST
        .map(_ => _.textContent)
        .join('')
        .replace(/(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(^[\s]*\/\/.*)/gm, '') // remove comments
        .replace(/@import.*;/g, '') // remove imports
    )
    const cssDefs = css.split('}')

    cssDefs.forEach((_) => {
      const def = _.trim()

      if (!def) {
        return
      }

      const cssParts = def.split('{')
      const cssClasses = cssParts[0].split(',')
      const cssProps = cssParts[1].split(';')

      cssClasses.forEach((_) => {
        const cssClass = _.trim()

        if (!cssClass) {
          return
        }

        const props = document.styles[cssClass] || {}

        cssProps.forEach((cssProp) => {
          const prop = cssProp.indexOf(':')
          const name = cssProp.substr(0, prop).trim()
          const value = cssProp.substr(prop + 1, cssProp.length - prop).trim()

          if (name && value) {
            props[name] = new Property(document, name, value)
          }
        })

        document.styles[cssClass] = props
        document.stylesSpecificity[cssClass] = getSelectorSpecificity(cssClass)

        if (cssClass === '@font-face') { //  && !nodeEnv
          const fontFamily = props['font-family'].getString().replace(/"|'/g, '')
          const srcs = props.src.getString().split(',')

          srcs.forEach((src) => {
            if (src.indexOf('format("svg")') > 0) {
              const url = parseExternalUrl(src)

              if (url) {
                void new SVGFontLoader(document).load(fontFamily, url)
              }
            }
          })
        }
      })
    })
  }
}
