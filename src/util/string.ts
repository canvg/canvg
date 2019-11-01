/**
 * HTML-safe compress white-spaces.
 * @param str - String to compress.
 */
export function compressSpaces(str: string) {
	return str.replace(/(?!\u3000)\s+/gm, ' ');
}

/**
 * HTML-safe left trim.
 * @param str - String to trim.
 */
export function trimLeft(str: string) {
	return str.replace(/^[\n \t]+/, '');
}

/**
 * HTML-safe right trim.
 * @param str - String to trim.
 */
export function trimRight(str: string) {
	return str.replace(/[\n \t]+$/, '');
}

/**
 * String to numbers array.
 * @param str - Numbers string.
 */
export function toNumbers(str: string) {

	const matches = (str || '').match(/-?(\d+(?:\.\d*(?:[eE][+-]?\d+)?)?|\.\d+)(?=\D|$)/gm) || [];

	return matches.map(parseFloat);
}

// Microsoft Edge fix
const allUppercase = /^[A-Z-]+$/;

/**
 * Normalize attribute name.
 * @param name - Attribute name.
 */
export function normalizeAttributeName(name: string) {

	if (allUppercase.test(name)) {
		return name.toLowerCase();
	}

	return name;
}

/**
 * Parse external URL.
 * @param url - CSS url string.
 */
export function parseExternalUrl(url: string): string {
	//                                   single quotes [2]
	//                                   v           double quotes [3]
	//                                   v           v        no quotes [4]
	//                                   v           v        v
	const urlMatch = url.match(/url\(('([^']+)'|"([^"]+)"|([^'"\)]+))\)/) || [];

	return urlMatch[2] || urlMatch[3] || urlMatch[4];
}
