import { DOMParser } from 'https://cdn.skypack.dev/xmldom@^0.6.0'
import {
  Canvg,
  presets
} from 'https://cdn.skypack.dev/canvg@^4.0.0'

const preset = presets.offscreen({
  DOMParser
})

self.onmessage = async (event) => {
  const {
    width,
    height,
    svg
  } = event.data
  const canvas = new OffscreenCanvas(width, height)
  const ctx = canvas.getContext('2d')
  const v = await Canvg.from(ctx, svg, preset)

  // Render only first frame, ignoring animations and mouse.
  await v.render()

  const blob = await canvas.convertToBlob()
  const pngUrl = URL.createObjectURL(blob)

  self.postMessage({
    pngUrl
  })
}
