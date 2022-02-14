import { RenderingContext2D } from './types'
import { IParserOptions, Parser } from './Parser'
import {
  IScreenOptions,
  IScreenStartOptions,
  Screen
} from './Screen'
import {
  IDocumentOptions,
  Document,
  SVGElement
} from './Document'

type DOMDocument = typeof window.document

export interface IOptions extends IParserOptions,
  IScreenOptions,
  IScreenStartOptions,
  IDocumentOptions {}

/**
 * SVG renderer on canvas.
 */
export class Canvg {
  /**
   * Create Canvg instance from SVG source string or URL.
   * @param ctx - Rendering context.
   * @param svg - SVG source string or URL.
   * @param options - Rendering options.
   * @returns Canvg instance.
   */
  static async from(
    ctx: RenderingContext2D,
    svg: string,
    options: IOptions = {}
  ) {
    const parser = new Parser(options)
    const svgDocument = await parser.parse(svg)

    return new Canvg(ctx, svgDocument, options)
  }

  /**
   * Create Canvg instance from SVG source string.
   * @param ctx - Rendering context.
   * @param svg - SVG source string.
   * @param options - Rendering options.
   * @returns Canvg instance.
   */
  static fromString(
    ctx: RenderingContext2D,
    svg: string,
    options: IOptions = {}
  ) {
    const parser = new Parser(options)
    const svgDocument = parser.parseFromString(svg)

    return new Canvg(ctx, svgDocument, options)
  }

  /**
   * XML/HTML parser instance.
   */
  readonly parser: Parser
  /**
   * Screen instance.
   */
  readonly screen: Screen
  /**
   * Canvg Document.
   */
  readonly document: Document
  private readonly documentElement: SVGElement
  private readonly options: IOptions

  /**
   * Main constructor.
   * @param ctx - Rendering context.
   * @param svg - SVG Document.
   * @param options - Rendering options.
   */
  constructor(
    ctx: RenderingContext2D,
    svg: DOMDocument,
    options: IOptions = {}
  ) {
    this.parser = new Parser(options)
    this.screen = new Screen(ctx, options)
    this.options = options

    const document = new Document(this, options)
    const documentElement = document.createDocumentElement(svg)

    this.document = document
    this.documentElement = documentElement
  }

  /**
   * Create new Canvg instance with inherited options.
   * @param ctx - Rendering context.
   * @param svg - SVG source string or URL.
   * @param options - Rendering options.
   * @returns Canvg instance.
   */
  fork(
    ctx: RenderingContext2D,
    svg: string,
    options: IOptions = {}
  ) {
    return Canvg.from(ctx, svg, {
      ...this.options,
      ...options
    })
  }

  /**
   * Create new Canvg instance with inherited options.
   * @param ctx - Rendering context.
   * @param svg - SVG source string.
   * @param options - Rendering options.
   * @returns Canvg instance.
   */
  forkString(
    ctx: RenderingContext2D,
    svg: string,
    options: IOptions = {}
  ) {
    return Canvg.fromString(ctx, svg, {
      ...this.options,
      ...options
    })
  }

  /**
   * Document is ready promise.
   * @returns Ready promise.
   */
  ready() {
    return this.screen.ready()
  }

  /**
   * Document is ready value.
   * @returns Is ready or not.
   */
  isReady() {
    return this.screen.isReady()
  }

  /**
   * Render only first frame, ignoring animations and mouse.
   * @param options - Rendering options.
   */
  async render(options: IScreenStartOptions = {}) {
    this.start({
      enableRedraw: true,
      ignoreAnimation: true,
      ignoreMouse: true,
      ...options
    })

    await this.ready()

    this.stop()
  }

  /**
   * Start rendering.
   * @param options - Render options.
   */
  start(options: IScreenStartOptions = {}) {
    const {
      documentElement,
      screen,
      options: baseOptions
    } = this

    screen.start(documentElement, {
      enableRedraw: true,
      ...baseOptions,
      ...options
    })
  }

  /**
   * Stop rendering.
   */
  stop() {
    this.screen.stop()
  }

  /**
   * Resize SVG to fit in given size.
   * @param width
   * @param height
   * @param preserveAspectRatio
   */
  resize(
    width: number,
    height = width,
    preserveAspectRatio: boolean | string = false
  ) {
    this.documentElement.resize(width, height, preserveAspectRatio)
  }
}
