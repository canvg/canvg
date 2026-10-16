import path from 'path'
import { promises as fs } from 'fs'
import { DOMParser } from '@xmldom/xmldom'
import * as canvas from 'canvas'
import fetch from 'node-fetch'
import { Canvg, presets } from '../src'

const preset = presets.node({
  DOMParser,
  canvas,
  fetch
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

  describe('style', () => {
    it('should strip unterminated css comment in linear time', () => {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg"><style>/*${'\n'.repeat(26)}</style></svg>`
      const c = preset.createCanvas(1280, 720) as canvas.Canvas
      const ctx = c.getContext('2d')
      const start = Date.now()

      Canvg.fromString(ctx, svg, preset)

      expect(Date.now() - start).toBeLessThan(200)
    })
  })
})
