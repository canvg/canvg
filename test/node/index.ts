/* eslint-disable  */
import path from 'path'
import {
  promises as fs,
  createReadStream
} from 'fs'
import { DOMParser } from 'xmldom'
import * as canvas from 'canvas'
import fetch, { Response } from 'node-fetch'
import { Canvg, presets } from '../../src'

const preset = presets.node({
  DOMParser,
  canvas,
  fetch(input) {
    if (typeof input === 'string' && !input.startsWith('http')) {
      const stream = createReadStream(
        path.join(__dirname, '..', 'svgs', input)
      )
      const response = new Response(stream)

      return Promise.resolve(response)
    }

    return fetch(input)
  }
})

export async function render(
  file: string,
  width?: number,
  height?: number,
  preserveAspectRatio?: string
) {
  const svg = await fs.readFile(
    path.join(__dirname, '..', 'svgs', file),
    'utf8'
  )
  const c = preset.createCanvas(1280, 720) as canvas.Canvas
  const ctx = c.getContext('2d')
  const v = Canvg.fromString(ctx, svg, preset)

  if (width && height && preserveAspectRatio) {
    v.resize(width, height, preserveAspectRatio)
  }

  await v.render()

  return c.toBuffer()
}

const maybeRunIndex = process.argv.indexOf(__filename)

if (~maybeRunIndex && maybeRunIndex === process.argv.length - 3) {
  void (async () => {
    const output = process.argv.pop()
    const input = process.argv.pop()
    const image = await render(input)

    await fs.writeFile(output, image)
  })()
}
