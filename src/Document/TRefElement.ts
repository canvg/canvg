import { TextElement } from './TextElement'

export class TRefElement extends TextElement {
  override type = 'tref'

  override getText() {
    const element = this.getHrefAttribute().getDefinition()

    if (element) {
      const firstChild = element.children[0] as TextElement

      if (firstChild) {
        return firstChild.getText()
      }
    }

    return ''
  }
}
