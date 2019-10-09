import {
	toMatchImageSnapshot
} from 'jest-image-snapshot';

declare global {
	namespace jest {
		// tslint:disable-next-line: interface-name
		interface Matchers<R> {
			toMatchImageSnapshot(): R;
		}
	}
}

expect.extend({
	toMatchImageSnapshot
});
