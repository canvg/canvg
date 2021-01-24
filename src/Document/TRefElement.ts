import TextElement from './TextElement';

export default class TRefElement extends TextElement {
	type = 'tref';

	getText() {
		const element = this.getHrefAttribute().getDefinition();

		if (element) {
			const firstChild = element.children[0] as TextElement;

			if (firstChild) {
				return firstChild.getText();
			}
		}

		return '';
	}
}
