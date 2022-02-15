import { RenderingContext2D } from '../types'
import { BoundingBox } from '../BoundingBox'
import { Document } from './Document'
import { RenderedElement } from './RenderedElement'

// groups: 1: mime-type (+ charset), 2: mime-type (w/o charset), 3: charset, 4: base64?, 5: body
const dataUriRegex = /^\s*data:(([^/,;]+\/[^/,;]+)(?:;([^,;=]+=[^,;=]+))?)?(?:;(base64))?,(.*)$/i

export class ImageElement extends RenderedElement {
  override type = 'image'
  loaded = false
  protected image: CanvasImageSource | string | undefined

  constructor(
    document: Document,
    node: HTMLElement,
    captureTextNodes?: boolean
  ) {
    super(document, node, captureTextNodes)

    const href = this.getHrefAttribute().getString()

    if (!href) {
      return
    }

    const isSvg = href.endsWith('.svg') || /^\s*data:image\/svg\+xml/i.test(href)

    document.images.push(this)

    if (!isSvg) {
      void this.loadImage(href)
    } else {
      void this.loadSvg(href)
    }
  }

  protected async loadImage(href: string) {
    try {
      const image = await this.document.createImage(href)

      this.image = image
    } catch (err) {
      console.error(`Error while loading image "${href}":`, err)
    }

    this.loaded = true
  }

  protected async loadSvg(href: string) {
    const match = dataUriRegex.exec(href)

    if (match) {
      const data = match[5]

      if (data) {
        if (match[4] === 'base64') {
          this.image = atob(data)
        } else {
          this.image = decodeURIComponent(data)
        }
      }
    } else {
      try {
        const response = await this.document.fetch(href)
        const svg = await response.text()

        this.image = svg
      } catch (err) {
        console.error(`Error while loading image "${href}":`, err)
      }
    }

    this.loaded = true
  }

  override renderChildren(ctx: RenderingContext2D) {
    const {
      document,
      image,
      loaded
    } = this
    const x = this.getAttribute('x').getPixels('x')
    const y = this.getAttribute('y').getPixels('y')
    const width = this.getStyle('width').getPixels('x')
    const height = this.getStyle('height').getPixels('y')

    if (!loaded || !image
      || !width || !height
    ) {
      return
    }

    ctx.save()
    ctx.translate(x, y)

    if (typeof image === 'string') {
      const subDocument = document.canvg.forkString(
        ctx,
        image,
        {
          ignoreMouse: true,
          ignoreAnimation: true,
          ignoreDimensions: true,
          ignoreClear: true,
          offsetX: 0,
          offsetY: 0,
          scaleWidth: width,
          scaleHeight: height
        }
      )
      const { documentElement } = subDocument.document

      if (documentElement) {
        documentElement.parent = this
      }

      void subDocument.render()
    } else {
      document.setViewBox({
        ctx,
        aspectRatio: this.getAttribute('preserveAspectRatio').getString(),
        width,
        desiredWidth: image.width as number,
        height,
        desiredHeight: image.height as number
      })

      if (this.loaded) {
        if (!('complete' in image) || image.complete) {
          ctx.drawImage(image, 0, 0)
        }
      }
    }

    ctx.restore()
  }

  getBoundingBox() {
    const x = this.getAttribute('x').getPixels('x')
    const y = this.getAttribute('y').getPixels('y')
    const width = this.getStyle('width').getPixels('x')
    const height = this.getStyle('height').getPixels('y')

    return new BoundingBox(x, y, x + width, y + height)
  }
}
