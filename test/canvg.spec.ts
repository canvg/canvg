import path from 'path'
import { promises as fs } from 'fs'
import { DOMParser } from 'xmldom'
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
      const result = await race({
        render: async () => {
          await canvg.render()
          await canvg.render()
        },
        timeout: async () => {
          await delay(200)
        }
      })

      expect(result).toBe('render')
    })
  })
})

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms)
  })
}

function race<TKey extends string>(fns: Record<TKey, () => Promise<void>>): Promise<TKey> {
  return new Promise((resolve, reject) => {
    Object.entries(fns).forEach(async ([key, fn]: [TKey, () => Promise<void>]) => {
      try {
        await fn()
        resolve(key)
      } catch (e) {
        reject(e)
      }
    })
  })
}
