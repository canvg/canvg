import './common/imageSnapshot'
import path from 'path'
import {
  Browser,
  Page
} from 'puppeteer'
import {
  Server,
  base64ToBuffer
} from './common'
import {
  launch,
  createPage,
  onPageError
} from './common/puppeteer'
import svgs from './svgs.json'

async function render(page: Page, file: string) {
  const url = `http://localhost:${Server.defaultPort}/test/browser/?no-ui&no-svg&redraw=false&&url=${path.join('..', 'svgs', file)}`

  return new Promise<Buffer>(async (resolve, reject) => {
    onPageError(page, reject)

    try {
      await page.goto(url)
      await page.waitForSelector('#svg svg')

      const base64 = await page.evaluate(() => {
        const c = document.querySelector('canvas')

        return c.toDataURL('image/png')
      })

      resolve(base64ToBuffer(base64))
    } catch (err) {
      reject(err)
    }
  })
}

jest.setTimeout(30000)

describe('canvg', () => {
  describe('browser', () => {
    if (process.platform !== 'linux') {
      it('should run screenshots testing only on CI (linux)', () => {})
      return
    }

    let browser: Browser | null = null
    let page: Page | null = null
    let server: Server | null = null

    beforeAll(async () => {
      server = new Server()
      await server.listen()

      browser = await launch()
    })

    beforeEach(async () => {
      if (browser) {
        page = await createPage(browser)
      }
    })

    afterAll(async () => {
      await browser?.close()
      server?.close()

      browser = null
      server = null
    })

    afterEach(async () => {
      if (page) {
        await page.close()
        page = null
      }
    })

    for (const type in svgs) {
      const svgsOfType = svgs[type]

      for (const svg in svgsOfType) {
        const description: string = svgsOfType[svg]

        it(`should render ${description}`, async () => {
          expect(
            await render(page, svg)
          ).toMatchImageSnapshot({
            customSnapshotIdentifier: `browser-${svg}`
          })
        })
      }
    }
  })
})
