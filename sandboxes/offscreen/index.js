import {
  Canvg,
  presets
} from 'canvg'

const preset = presets.offscreen()

async function toPng(data) {
  const {
    width,
    height,
    svg
  } = data
  const canvas = new OffscreenCanvas(width, height)
  const ctx = canvas.getContext('2d')
  const v = await Canvg.from(ctx, svg, preset)

  // Render only first frame, ignoring animations and mouse.
  await v.render()

  const blob = await canvas.convertToBlob()
  const pngUrl = URL.createObjectURL(blob)

  return pngUrl
}

toPng({
  width: 600,
  height: 600,
  svg: './example.svg'
}).then((pngUrl) => {
  const img = document.querySelector('img')

  img.src = pngUrl
})
