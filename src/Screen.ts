import requestAnimationFrame from 'raf'
import {
  RenderingContext2D,
  Fetch
} from './types'
import {
  compressSpaces,
  toNumbers
} from './util'
import { Property } from './Property'
import { ViewPort } from './ViewPort'
import { Mouse } from './Mouse'
import {
  Document,
  Element,
  AnimateElement
} from './Document'

export interface IScreenOptions {
  /**
   * Window object.
   */
  window?: Window | null
  /**
   * WHATWG-compatible `fetch` function.
   */
  fetch?: Fetch
}

export interface IScreenStartOptions {
  /**
   * Whether enable the redraw.
   */
  enableRedraw?: boolean
  /**
   * Ignore mouse events.
   */
  ignoreMouse?: boolean
  /**
   * Ignore animations.
   */
  ignoreAnimation?: boolean
  /**
   * Does not try to resize canvas.
   */
  ignoreDimensions?: boolean
  /**
   * Does not clear canvas.
   */
  ignoreClear?: boolean
  /**
   * Scales horizontally to width.
   */
  scaleWidth?: number
  /**
   * Scales vertically to height.
   */
  scaleHeight?: number
  /**
   * Draws at a x offset.
   */
  offsetX?: number
  /**
   * Draws at a y offset.
   */
  offsetY?: number
  /**
   * Will call the function on every frame, if it returns true, will redraw.
   */
  forceRedraw?(): boolean
}

export interface IScreenViewBoxConfig {
  document: Document
  ctx: RenderingContext2D
  aspectRatio: string
  width: number
  desiredWidth: number
  height: number
  desiredHeight: number
  minX?: number
  minY?: number
  refX?: number
  refY?: number
  clip?: boolean
  clipX?: number
  clipY?: number
}

const defaultWindow = typeof window !== 'undefined'
  ? window
  : null
const defaultFetch = typeof fetch !== 'undefined'
  ? fetch.bind(undefined) // `fetch` depends on context: `someObject.fetch(...)` will throw error.
  : undefined

export class Screen {
  static readonly defaultWindow = defaultWindow
  static readonly defaultFetch = defaultFetch
  static FRAMERATE = 30
  static MAX_VIRTUAL_PIXELS = 30000

  readonly window: Window | null
  readonly fetch: Fetch
  readonly viewPort = new ViewPort()
  readonly mouse = new Mouse(this)
  readonly animations: AnimateElement[] = []
  private readyPromise: Promise<void> | undefined
  private resolveReady: (() => void) | undefined
  private waits: (() => boolean)[] = []
  private frameDuration = 0
  private isReadyLock = false
  private isFirstRender = true
  private intervalId: number | null = null

  constructor(
    readonly ctx: RenderingContext2D,
    {
      fetch = defaultFetch,
      window = defaultWindow
    }: IScreenOptions = {}
  ) {
    this.window = window

    if (!fetch) {
      throw new Error(`Can't find 'fetch' in 'globalThis', please provide it via options`)
    }

    this.fetch = fetch
  }

  wait(checker: () => boolean) {
    this.waits.push(checker)
  }

  ready() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    if (!this.readyPromise) {
      return Promise.resolve()
    }

    return this.readyPromise
  }

  isReady() {
    if (this.isReadyLock) {
      return true
    }

    const isReadyLock = this.waits.every(_ => _())

    if (isReadyLock) {
      this.waits = []

      if (this.resolveReady) {
        this.resolveReady()
      }
    }

    this.isReadyLock = isReadyLock

    return isReadyLock
  }

  setDefaults(ctx: RenderingContext2D) {
    // initial values and defaults
    ctx.strokeStyle = 'rgba(0,0,0,0)'
    ctx.lineCap = 'butt'
    ctx.lineJoin = 'miter'
    ctx.miterLimit = 4
  }

  setViewBox({
    document,
    ctx,
    aspectRatio,
    width,
    desiredWidth,
    height,
    desiredHeight,
    minX = 0,
    minY = 0,
    refX,
    refY,
    clip = false,
    clipX = 0,
    clipY = 0
  }: IScreenViewBoxConfig) {
    // aspect ratio - http://www.w3.org/TR/SVG/coords.html#PreserveAspectRatioAttribute
    const cleanAspectRatio = compressSpaces(aspectRatio).replace(/^defer\s/, '') // ignore defer
    const [aspectRatioAlign, aspectRatioMeetOrSlice] = cleanAspectRatio.split(' ')
    const align = aspectRatioAlign || 'xMidYMid'
    const meetOrSlice = aspectRatioMeetOrSlice || 'meet'
    // calculate scale
    const scaleX = width / desiredWidth
    const scaleY = height / desiredHeight
    const scaleMin = Math.min(scaleX, scaleY)
    const scaleMax = Math.max(scaleX, scaleY)
    let finalDesiredWidth = desiredWidth
    let finalDesiredHeight = desiredHeight

    if (meetOrSlice === 'meet') {
      finalDesiredWidth *= scaleMin
      finalDesiredHeight *= scaleMin
    }

    if (meetOrSlice === 'slice') {
      finalDesiredWidth *= scaleMax
      finalDesiredHeight *= scaleMax
    }

    const refXProp = new Property(document, 'refX', refX)
    const refYProp = new Property(document, 'refY', refY)
    const hasRefs = refXProp.hasValue() && refYProp.hasValue()

    if (hasRefs) {
      ctx.translate(
        -scaleMin * refXProp.getPixels('x'),
        -scaleMin * refYProp.getPixels('y')
      )
    }

    if (clip) {
      const scaledClipX = scaleMin * clipX
      const scaledClipY = scaleMin * clipY

      ctx.beginPath()
      ctx.moveTo(scaledClipX, scaledClipY)
      ctx.lineTo(width, scaledClipY)
      ctx.lineTo(width, height)
      ctx.lineTo(scaledClipX, height)
      ctx.closePath()
      ctx.clip()
    }

    if (!hasRefs) {
      const isMeetMinY = meetOrSlice === 'meet' && scaleMin === scaleY
      const isSliceMaxY = meetOrSlice === 'slice' && scaleMax === scaleY
      const isMeetMinX = meetOrSlice === 'meet' && scaleMin === scaleX
      const isSliceMaxX = meetOrSlice === 'slice' && scaleMax === scaleX

      if (align.startsWith('xMid') && (
        isMeetMinY || isSliceMaxY
      )) {
        ctx.translate(width / 2.0 - finalDesiredWidth / 2.0, 0)
      }

      if (align.endsWith('YMid') && (
        isMeetMinX || isSliceMaxX
      )) {
        ctx.translate(0, height / 2.0 - finalDesiredHeight / 2.0)
      }

      if (align.startsWith('xMax') && (
        isMeetMinY || isSliceMaxY
      )) {
        ctx.translate(width - finalDesiredWidth, 0)
      }

      if (align.endsWith('YMax') && (
        isMeetMinX || isSliceMaxX
      )) {
        ctx.translate(0, height - finalDesiredHeight)
      }
    }

    // scale
    switch (true) {
      case align === 'none':
        ctx.scale(scaleX, scaleY)
        break

      case meetOrSlice === 'meet':
        ctx.scale(scaleMin, scaleMin)
        break

      case meetOrSlice === 'slice':
        ctx.scale(scaleMax, scaleMax)
        break
    }

    // translate
    ctx.translate(-minX, -minY)
  }

  start(
    element: Element,
    {
      enableRedraw = false,
      ignoreMouse = false,
      ignoreAnimation = false,
      ignoreDimensions = false,
      ignoreClear = false,
      forceRedraw,
      scaleWidth,
      scaleHeight,
      offsetX,
      offsetY
    }: IScreenStartOptions = {}
  ) {
    const { mouse } = this
    const frameDuration = 1000 / Screen.FRAMERATE

    this.isReadyLock = false
    this.frameDuration = frameDuration
    this.readyPromise = new Promise((resolve) => {
      this.resolveReady = resolve
    })

    if (this.isReady()) {
      this.render(
        element,
        ignoreDimensions,
        ignoreClear,
        scaleWidth,
        scaleHeight,
        offsetX,
        offsetY
      )
    }

    if (!enableRedraw) {
      return
    }

    let now = Date.now()
    let then = now
    let delta = 0
    const tick = () => {
      now = Date.now()
      delta = now - then

      if (delta >= frameDuration) {
        then = now - (delta % frameDuration)

        if (this.shouldUpdate(
          ignoreAnimation,
          forceRedraw
        )) {
          this.render(
            element,
            ignoreDimensions,
            ignoreClear,
            scaleWidth,
            scaleHeight,
            offsetX,
            offsetY
          )
          mouse.runEvents()
        }
      }

      this.intervalId = requestAnimationFrame(tick)
    }

    if (!ignoreMouse) {
      mouse.start()
    }

    this.intervalId = requestAnimationFrame(tick)
  }

  stop() {
    if (this.intervalId) {
      requestAnimationFrame.cancel(this.intervalId)
      this.intervalId = null
    }

    this.mouse.stop()
  }

  private shouldUpdate(
    ignoreAnimation: boolean,
    forceRedraw: (() => boolean) | undefined
  ) {
    // need update from animations?
    if (!ignoreAnimation) {
      const { frameDuration } = this
      const shouldUpdate = this.animations.reduce(
        (shouldUpdate, animation) => animation.update(frameDuration) || shouldUpdate,
        false
      )

      if (shouldUpdate) {
        return true
      }
    }

    // need update from redraw?
    if (typeof forceRedraw === 'function' && forceRedraw()) {
      return true
    }

    if (!this.isReadyLock && this.isReady()) {
      return true
    }

    // need update from mouse events?
    if (this.mouse.hasEvents()) {
      return true
    }

    return false
  }

  private render(
    element: Element,
    ignoreDimensions: boolean,
    ignoreClear: boolean,
    scaleWidth: number | undefined,
    scaleHeight: number | undefined,
    offsetX: number | undefined,
    offsetY: number | undefined
  ) {
    const {
      viewPort,
      ctx,
      isFirstRender
    } = this
    const canvas = ctx.canvas as HTMLCanvasElement

    viewPort.clear()

    if (canvas.width && canvas.height) {
      viewPort.setCurrent(canvas.width, canvas.height)
    }

    const widthStyle = element.getStyle('width')
    const heightStyle = element.getStyle('height')

    if (!ignoreDimensions && (
      isFirstRender
      || typeof scaleWidth !== 'number' && typeof scaleHeight !== 'number'
    )) {
      // set canvas size
      if (widthStyle.hasValue()) {
        canvas.width = widthStyle.getPixels('x')

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (canvas.style) {
          canvas.style.width = `${canvas.width}px`
        }
      }

      if (heightStyle.hasValue()) {
        canvas.height = heightStyle.getPixels('y')

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (canvas.style) {
          canvas.style.height = `${canvas.height}px`
        }
      }
    }

    let cWidth = canvas.clientWidth || canvas.width
    let cHeight = canvas.clientHeight || canvas.height

    if (ignoreDimensions && widthStyle.hasValue() && heightStyle.hasValue()) {
      cWidth = widthStyle.getPixels('x')
      cHeight = heightStyle.getPixels('y')
    }

    viewPort.setCurrent(cWidth, cHeight)

    if (typeof offsetX === 'number') {
      element.getAttribute('x', true).setValue(offsetX)
    }

    if (typeof offsetY === 'number') {
      element.getAttribute('y', true).setValue(offsetY)
    }

    if (typeof scaleWidth === 'number'
      || typeof scaleHeight === 'number'
    ) {
      const viewBox = toNumbers(element.getAttribute('viewBox').getString())
      let xRatio = 0
      let yRatio = 0

      if (typeof scaleWidth === 'number') {
        const widthStyle = element.getStyle('width')

        if (widthStyle.hasValue()) {
          xRatio = widthStyle.getPixels('x') / scaleWidth
        } else
        if (viewBox[2] && !isNaN(viewBox[2])) {
          xRatio = viewBox[2] / scaleWidth
        }
      }

      if (typeof scaleHeight === 'number') {
        const heightStyle = element.getStyle('height')

        if (heightStyle.hasValue()) {
          yRatio = heightStyle.getPixels('y') / scaleHeight
        } else
        if (viewBox[3] && !isNaN(viewBox[3])) {
          yRatio = viewBox[3] / scaleHeight
        }
      }

      if (!xRatio) {
        xRatio = yRatio
      }

      if (!yRatio) {
        yRatio = xRatio
      }

      element.getAttribute('width', true).setValue(scaleWidth)
      element.getAttribute('height', true).setValue(scaleHeight)

      const transformStyle = element.getStyle('transform', true, true)

      transformStyle.setValue(`${transformStyle.getString()} scale(${1.0 / xRatio}, ${1.0 / yRatio})`)
    }

    // clear and render
    if (!ignoreClear) {
      ctx.clearRect(0, 0, cWidth, cHeight)
    }

    element.render(ctx)

    if (isFirstRender) {
      this.isFirstRender = false
    }
  }
}
