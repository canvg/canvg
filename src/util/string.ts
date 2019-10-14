
export function compressSpaces(str: string) {
	return str.replace(/(?!\u3000)\s+/gm, ' ');
}

export function trimLeft(str: string) {
	return str.replace(/^[\n \t]+/, '');
}

export function trimRight(str: string) {
	return str.replace(/[\n \t]+$/, '');
}

export function toNumberArray(str: string) {

	const matches = (str || '').match(/-?(\d+(?:\.\d*(?:[eE][+-]?\d+)?)?|\.\d+)(?=\D|$)/gm) || [];

	return matches.map(parseFloat);
}

// Microsoft Edge fix
const allUppercase = /^[A-Z-]+$/;

export function normalizeAttributeName(name: string) {

	if (allUppercase.test(name)) {
		return name.toLowerCase();
	}

	return name;
}

export function parseExternalUrl(url: string): string {
	//                                   single quotes [2]
	//                                   v           double quotes [3]
	//                                   v           v        no quotes [4]
	//                                   v           v        v
	const urlMatch = url.match(/url\(('([^']+)'|"([^"]+)"|([^'"\)]+))\)/) || [];

	return urlMatch[2] || urlMatch[3] || urlMatch[4];
}
