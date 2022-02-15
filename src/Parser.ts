import { Fetch } from './types'
import { Screen } from './Screen'

type DOMParserConstructor = typeof DOMParser

export interface IParserOptions {
  /**
   * WHATWG-compatible `fetch` function.
   */
  fetch?: Fetch
  /**
   * XML/HTML parser from string into DOM Document.
   */
  DOMParser?: DOMParserConstructor
}

const { defaultFetch } = Screen
const DefaultDOMParser = typeof DOMParser !== 'undefined'
  ? DOMParser
  : undefined

export class Parser {
  private readonly fetch: Fetch
  private readonly DOMParser: DOMParserConstructor

  constructor({
    fetch = defaultFetch,
    DOMParser = DefaultDOMParser
  }: IParserOptions = {}) {
    if (!fetch) {
      throw new Error(`Can't find 'fetch' in 'globalThis', please provide it via options`)
    }

    if (!DOMParser) {
      throw new Error(`Can't find 'DOMParser' in 'globalThis', please provide it via options`)
    }

    this.fetch = fetch
    this.DOMParser = DOMParser
  }

  async parse(resource: string) {
    if (resource.startsWith('<')) {
      return this.parseFromString(resource)
    }

    return this.load(resource)
  }

  parseFromString(xml: string) {
    const parser = new this.DOMParser()

    try {
      return this.checkDocument(
        parser.parseFromString(xml, 'image/svg+xml')
      )
    } catch (err) {
      return this.checkDocument(
        parser.parseFromString(xml, 'text/xml')
      )
    }
  }

  private checkDocument(document: Document) {
    const parserError = document.getElementsByTagName('parsererror')[0]

    if (parserError) {
      throw new Error(parserError.textContent || 'Unknown parse error')
    }

    return document
  }

  async load(url: string) {
    const response = await this.fetch(url)
    const xml = await response.text()

    return this.parseFromString(xml)
  }
}
