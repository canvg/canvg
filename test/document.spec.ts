import { DOMParser } from '@xmldom/xmldom'
import {
  Canvg,
  Document,
  AElement
} from '../src'

function createLink(href: string) {
  const open = jest.fn()
  const canvg = {
    screen: {
      window: {
        location: {
          href: 'https://example.com/page'
        },
        open
      },
      wait() {}
    }
  } as unknown as Canvg
  const document = new Document(canvg)
  const node = new DOMParser().parseFromString(
    `<a xmlns="http://www.w3.org/2000/svg" href="${href}">link</a>`,
    'image/svg+xml'
  ).documentElement as unknown as HTMLElement

  return {
    link: new AElement(document, node),
    open
  }
}

describe('Document', () => {
  describe('AElement', () => {
    it('should open http(s) links', () => {
      const { link, open } = createLink('https://example.org/')

      link.onClick()

      expect(open).toHaveBeenCalledWith('https://example.org/')
    })

    it('should resolve relative links', () => {
      const { link, open } = createLink('other')

      link.onClick()

      expect(open).toHaveBeenCalledWith('https://example.com/other')
    })

    it('should not open script URLs', () => {
      /* eslint-disable no-script-url */
      [
        'javascript:alert(1)',
        ' JavaScript:alert(1)',
        'java&#9;script:alert(1)',
        'data:text/html,<script>alert(1)</script>',
        'vbscript:msgbox(1)'
      ].forEach((href) => {
        const { link, open } = createLink(href)

        link.onClick()

        expect(open).not.toHaveBeenCalled()
      })
      /* eslint-enable no-script-url */
    })
  })
})
