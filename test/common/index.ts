export * from './server';

export const ignoreErrors = [
	/Element (metadata|script|([a-z]+:[a-z]+)) not yet implemented/i,
	/entity not found/i,
	/Synchronous XMLHttpRequest/i,
	/Element fe\w+ not yet implemented/
];

export function filterConsoleWarn(): () => void {

	const {
		warn
	} = console;
	const mockWarn = jest.spyOn(console, 'warn').mockImplementation((first, ...args) => {

		if (typeof first !== 'string'
			|| ignoreErrors.every(_ => !_.test(first))
		) {
			warn(first, ...args);
		}
	});

	return mockWarn.mockRestore.bind(mockWarn);
}

export function filterConsoleError(): () => void {

	const {
		error
	} = console;
	const mockError = jest.spyOn(console, 'error').mockImplementation((first, ...args) => {

		if (typeof first !== 'string'
			|| ignoreErrors.every(_ => !_.test(first))
		) {
			error(first, ...args);
		}
	});

	return mockError.mockRestore.bind(mockError);
}

export function base64ToBuffer(base64: string, type = 'image') {

	let [
		extname,
		data
	] = base64.split(';base64,');

	extname = extname.replace(/^data:/, '');

	if (type && !extname.includes(type)) {
		throw new Error(`Invalid type: ${extname}`);
	}

	return Buffer.from(data, 'base64');
}
