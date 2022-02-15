import puppeteer, {
  Browser,
  Page
} from 'puppeteer'
import { ignoreErrors } from '.'

export function launch() {
  return puppeteer.launch({
    args: [
      '--no-sandbox ',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-web-security'
    ]
  })
}

export async function createPage(browser: Browser) {
  const page = await browser.newPage()
  const { goto } = page

  page.goto = (url, options) => goto.call(page, url, {
    waitUntil: 'networkidle0',
    ...options
  })

  await page.setViewport({
    width: 1280,
    height: 720
  })

  return page
}

export function onPageError(page: Page, listener: (error: Error) => void) {
  page.on('console', (message) => {
    if (message.type() === 'error'
      || message.type() === 'warning'
    ) {
      const text = message.text()

      if (ignoreErrors.every(_ => !_.test(text))) {
        listener(new Error(text))
      }
    }
  })
  page.on('error', listener)
  page.on('pageerror', listener)
}
