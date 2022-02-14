import { DOMParser } from './types'

interface IConfig {
  /**
   * XML/HTML parser from string into DOM Document.
   */
  DOMParser?: DOMParser
}

/**
 * Options preset for `OffscreenCanvas`.
 * @param config - Preset requirements.
 * @param config.DOMParser - XML/HTML parser from string into DOM Document.
 * @returns Preset object.
 */
export function offscreen({ DOMParser: DOMParserFallback }: IConfig = {}) {
  const preset = {
    window: null,
    ignoreAnimation: true,
    ignoreMouse: true,
    DOMParser: DOMParserFallback,
    createCanvas(width: number, height: number) {
      return new OffscreenCanvas(width, height)
    },
    async createImage(url: string) {
      const response = await fetch(url)
      const blob = await response.blob()
      const img = await createImageBitmap(blob)

      return img
    }
  }

  if (typeof globalThis.DOMParser !== 'undefined'
    || typeof DOMParserFallback === 'undefined'
  ) {
    Reflect.deleteProperty(preset, 'DOMParser')
  }

  return preset
}
