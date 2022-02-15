/* eslint-disable @typescript-eslint/no-use-before-define */
import { Canvg } from '../Canvg'
import { IScreenViewBoxConfig, Screen } from '../Screen'
import { Property } from '../Property'
import { SVGFontLoader } from '../SVGFontLoader'
import { Element } from './Element'
import { UnknownElement } from './UnknownElement'
import { TextNode } from './TextNode'
import { ImageElement } from './ImageElement'
import { SVGElement } from './SVGElement'
import {
  AnyElement,
  elements as elementTypes
} from './elements'

/**
 * Function to create new canvas.
 */
export type CreateCanvas = (width: number, height: number) => HTMLCanvasElement | OffscreenCanvas

/**
 * Function to create new image.
 */
export type CreateImage = (src: string, anonymousCrossOrigin?: boolean) => Promise<CanvasImageSource>

export interface IDocumentOptions {
  /**
   * Default `rem` size.
   */
  rootEmSize?: number
  /**
   * Default `em` size.
   */
  emSize?: number
  /**
   * Function to create new canvas.
   */
  createCanvas?: CreateCanvas
  /**
   * Function to create new image.
   */
  createImage?: CreateImage
  /**
   * Load images anonymously.
   */
  anonymousCrossOrigin?: boolean
}

export type IViewBoxConfig = Omit<IScreenViewBoxConfig, 'document'>

type DOMDocument = typeof window.document

function createCanvas(width: number, height: number) {
  const canvas = document.createElement('canvas')

  canvas.width = width
  canvas.height = height

  return canvas
}

async function createImage(src: string, anonymousCrossOrigin = false) {
  const image = document.createElement('img')

  if (anonymousCrossOrigin) {
    image.crossOrigin = 'Anonymous'
  }

  return new Promise<HTMLImageElement>((resolve, reject) => {
    image.onload = () => {
      resolve(image)
    }

    image.onerror = (_event, _source, _lineno, _colno, error) => {
      reject(error)
    }

    image.src = src
  })
}

const DEFAULT_EM_SIZE = 12

export class Document {
  static readonly createCanvas = createCanvas
  static readonly createImage = createImage
  static readonly elementTypes: Record<string, AnyElement> = elementTypes

  rootEmSize: number
  documentElement?: SVGElement
  readonly screen: Screen
  readonly createCanvas: CreateCanvas
  readonly createImage: CreateImage
  readonly definitions: Record<string, Element> = {}
  readonly styles: Record<string, Record<string, Property>> = {}
  readonly stylesSpecificity: Record<string, string> = {}
  readonly images: ImageElement[] = []
  readonly fonts: SVGFontLoader[] = []
  private readonly emSizeStack: number[] = []
  private uniqueId = 0

  constructor(
    readonly canvg: Canvg,
    {
      rootEmSize = DEFAULT_EM_SIZE,
      emSize = DEFAULT_EM_SIZE,
      createCanvas = Document.createCanvas,
      createImage = Document.createImage,
      anonymousCrossOrigin
    }: IDocumentOptions = {}
  ) {
    this.screen = canvg.screen
    this.rootEmSize = rootEmSize
    this.emSize = emSize
    this.createCanvas = createCanvas
    this.createImage = this.bindCreateImage(createImage, anonymousCrossOrigin)

    this.screen.wait(() => this.isImagesLoaded())
    this.screen.wait(() => this.isFontsLoaded())
  }

  private bindCreateImage(createImage: CreateImage, anonymousCrossOrigin?: boolean) {
    if (typeof anonymousCrossOrigin === 'boolean') {
      return (source: string, forceAnonymousCrossOrigin?: boolean) => createImage(
        source,
        typeof forceAnonymousCrossOrigin === 'boolean'
          ? forceAnonymousCrossOrigin
          : anonymousCrossOrigin
      )
    }

    return createImage
  }

  get window() {
    return this.screen.window
  }

  get fetch() {
    return this.screen.fetch
  }

  get ctx() {
    return this.screen.ctx
  }

  get emSize() {
    const { emSizeStack } = this

    return emSizeStack[emSizeStack.length - 1] || DEFAULT_EM_SIZE
  }

  set emSize(value: number) {
    const { emSizeStack } = this

    emSizeStack.push(value)
  }

  popEmSize() {
    const { emSizeStack } = this

    emSizeStack.pop()
  }

  getUniqueId() {
    return `canvg${++this.uniqueId}`
  }

  isImagesLoaded() {
    return this.images.every(_ => _.loaded)
  }

  isFontsLoaded() {
    return this.fonts.every(_ => _.loaded)
  }

  createDocumentElement(document: DOMDocument) {
    const documentElement = this.createElement<SVGElement>(document.documentElement)

    documentElement.root = true
    documentElement.addStylesFromStyleDefinition()

    this.documentElement = documentElement

    return documentElement
  }

  createElement<T extends Element>(node: HTMLElement) {
    const elementType = node.nodeName.replace(/^[^:]+:/, '')
    const ElementType = Document.elementTypes[elementType]

    if (ElementType) {
      return new ElementType(this, node) as T
    }

    return new UnknownElement(this, node) as T
  }

  createTextNode(node: HTMLElement) {
    return new TextNode(this, node)
  }

  setViewBox(config: IViewBoxConfig) {
    this.screen.setViewBox({
      document: this,
      ...config
    })
  }
}
