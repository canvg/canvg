import './common/imageSnapshot'
import {
  filterConsoleWarn,
  filterConsoleError
} from './common'
import { render } from './node'
import svgs from './svgs.json'

describe('canvg', () => {
  describe('node', () => {
    if (process.platform !== 'linux') {
      it('should run screenshots testing only on CI (linux)', () => {})
      return
    }

    let restoreWarn: () => void
    let restoreError: () => void

    beforeAll(() => {
      restoreWarn = filterConsoleWarn()
      restoreError = filterConsoleError()
    })

    afterAll(() => {
      restoreWarn()
      restoreError()
    })

    for (const type in svgs) {
      const shouldPassing = type === 'passing'
      const svgsOfType = svgs[type]
      const threshold = shouldPassing ? {} : {
        failureThresholdType: 'percent',
        failureThreshold: 11
      }

      for (const svg in svgsOfType) {
        const description: string = svgsOfType[svg]

        it(`should render ${description}`, async () => {
          expect(
            await render(svg)
          ).toMatchImageSnapshot({
            ...threshold,
            customSnapshotIdentifier: `node-${svg}`
          })
        })
      }
    }

    it('should resize SVG', async () => {
      expect(
        await render('../svgs/favicon.svg', 64, 64, 'xMidYMid meet')
      ).toMatchImageSnapshot({
        customSnapshotIdentifier: 'node-favicon.svg'
      })
    })
  })
})
