
export function compressSpaces(str: string) {
	return str.replace(/(?!\u3000)\s+/gm, ' ');
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
