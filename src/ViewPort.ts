
export interface IViewPortSize {
  width: number
  height: number
}

export type Axis = 'x' | 'y'

export class ViewPort {
  static DEFAULT_VIEWPORT_WIDTH = 800
  static DEFAULT_VIEWPORT_HEIGHT = 600

  viewPorts: IViewPortSize[] = []

  clear() {
    this.viewPorts = []
  }

  setCurrent(width: number, height: number) {
    this.viewPorts.push({
      width,
      height
    })
  }

  removeCurrent() {
    this.viewPorts.pop()
  }

  getRoot() {
    const [root] = this.viewPorts

    if (!root) {
      return getDefault()
    }

    return root
  }

  getCurrent() {
    const { viewPorts } = this
    const current = viewPorts[viewPorts.length - 1]

    if (!current) {
      return getDefault()
    }

    return current
  }

  get width() {
    return this.getCurrent().width
  }

  get height() {
    return this.getCurrent().height
  }

  computeSize(d?: number|Axis) {
    if (typeof d === 'number') {
      return d
    }

    if (d === 'x') {
      return this.width
    }

    if (d === 'y') {
      return this.height
    }

    return Math.sqrt(
      Math.pow(this.width, 2) + Math.pow(this.height, 2)
    ) / Math.sqrt(2)
  }
}

function getDefault() {
  return {
    width: ViewPort.DEFAULT_VIEWPORT_WIDTH,
    height: ViewPort.DEFAULT_VIEWPORT_HEIGHT
  }
}
