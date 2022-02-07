import {
  toNumbers,
  parseExternalUrl,
  normalizeColor
} from '../src/util'

describe('util', () => {
  describe('toNumbers', () => {
    it('should parse mixed-separator lists of integers and real numbers', () => {
      expect(
        toNumbers('.5')
      ).toEqual(
        [0.5]
      )
      expect(
        toNumbers('7 88.8')
      ).toEqual(
        [7, 88.8]
      )
      expect(
        toNumbers('1,-2,3,14,5')
      ).toEqual(
        [
          1,
          -2,
          3,
          14,
          5
        ]
      )
      expect(
        toNumbers(' 1 -0.2   ,3,.14,  5  ')
      ).toEqual(
        [
          1,
          -0.2,
          3,
          0.14,
          5
        ]
      )
      expect(
        toNumbers('-1.83697e-16 -1 1 -1.83697e-16 0 100')
      ).toEqual(
        [
          -1.83697e-16,
          -1,
          1,
          -1.83697e-16,
          0,
          100
        ]
      )
    })

    it('should support the omission of superfluous separators', () => {
      expect(
        toNumbers('5.5.5')
      ).toEqual(
        [5.5, 0.5]
      )
      expect(
        toNumbers('1-2-3')
      ).toEqual(
        [
          1,
          -2,
          -3
        ]
      )
      expect(
        toNumbers('1-.4')
      ).toEqual(
        [1, -0.4]
      )
    })
  })

  describe('parseExternalUrl', () => {
    it('should ignore not urls', () => {
      expect(
        parseExternalUrl('')
      ).toBeFalsy()
      expect(
        parseExternalUrl('foo')
      ).toBeFalsy()
      expect(
        parseExternalUrl('url()')
      ).toBeFalsy()
      expect(
        parseExternalUrl('url(\'\')')
      ).toBeFalsy()
      expect(
        parseExternalUrl('url(\'asf)')
      ).toBeFalsy()
    })

    it('should parse urls', () => {
      expect(
        parseExternalUrl('url(foo)')
      ).toBe('foo')
      expect(
        parseExternalUrl('url(\'foo\')')
      ).toBe('foo')
      expect(
        parseExternalUrl('url(\'foo\')')
      ).toBe('foo')
    })
  })

  describe('normalizeColor', () => {
    it('should normalize rgb', () => {
      expect(
        normalizeColor('rgb(123.32, 32.9, 54.21)')
      ).toBe(
        'rgb(123, 33, 54)'
      )

      expect(
        normalizeColor('rgb(123.32, 255, 255)')
      ).toBe(
        'rgb(123, 255, 255)'
      )
    })

    it('should normalize rgba', () => {
      expect(
        normalizeColor('rgba(123.32, 32.9, 54.21, 0.2)')
      ).toBe(
        'rgba(123, 33, 54, 0.2)'
      )

      expect(
        normalizeColor('rgba(123.32, 255, 255, .3)')
      ).toBe(
        'rgba(123, 255, 255, .3)'
      )
    })

    it('should not change color', () => {
      expect(
        normalizeColor('rgb(255, 255, 255)')
      ).toBe(
        'rgb(255, 255, 255)'
      )

      expect(
        normalizeColor('rgb(255, 255, 255, .9)')
      ).toBe(
        'rgb(255, 255, 255, .9)'
      )

      expect(
        normalizeColor('rgb(255, 255, 255, 0.9)')
      ).toBe(
        'rgb(255, 255, 255, 0.9)'
      )
    })
  })
})
