import { promises as fs } from 'fs'
import { DOMParser } from 'xmldom'
import canvas from 'canvas'
import fetch from 'node-fetch'
import {
  Canvg,
  presets
} from 'canvg'

const preset = presets.node({
  DOMParser,
  canvas,
  fetch
});

(async (output, input) => {
  const svg = await fs.readFile(input, 'utf8')
  const canvas = preset.createCanvas(800, 600)
  const ctx = canvas.getContext('2d')
  const v = Canvg.fromString(ctx, svg, preset)

  // Render only first frame, ignoring animations.
  await v.render()

  const png = canvas.toBuffer()

  await fs.writeFile(output, png)
})(
  './example.png',
  './example.svg'
)
