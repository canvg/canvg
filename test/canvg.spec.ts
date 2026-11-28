import path from 'path'
import { promises as fs } from 'fs'
import { DOMParser } from '@xmldom/xmldom'
import * as canvas from 'canvas'
import fetch from 'node-fetch'
import { Canvg, Font, presets } from '../src'

const preset = presets.node({
  DOMParser,
  canvas,
  fetch
})

describe('Font.parse', () => {
  it.each([
    ["16px 'Courier New'", "'Courier New'"],
    ['italic bold 12px/1.5 Times New Roman, serif', 'Times New Roman, serif'],
    ['bold 14px / 1.5 Times New Roman', 'Times New Roman'],
    ['16px "A  B", monospace', '"A  B", monospace']
  ])('should keep the family list in %s', (shorthand, family) => {
    expect(Font.parse(shorthand).fontFamily).toBe(family)
  })
})

describe('Canvg', () => {
  describe('render', () => {
    it('should render twice without deadlock', async () => {
      const svg = await fs.readFile(path.join(__dirname, 'svgs/favicon.svg'), 'utf8')
      const c = preset.createCanvas(1280, 720) as canvas.Canvas
      const ctx = c.getContext('2d')
      const canvg = Canvg.fromString(ctx, svg, preset)

      await canvg.render()
      await canvg.render()
    }, 200)
  })
})
