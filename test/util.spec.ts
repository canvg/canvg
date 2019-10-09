import {
	toNumberArray,
	parseExternalUrl
} from '../src/util';

describe('util', () => {

	describe('toNumberArray', () => {

		it('should parse mixed-separator lists of integers and real numbers', () => {

			expect(
				toNumberArray('.5')
			).toEqual(
				[0.5]
			);
			expect(
				toNumberArray('7 88.8')
			).toEqual(
				[7, 88.8]
			);
			expect(
				toNumberArray('1,-2,3,14,5')
			).toEqual(
				[1, -2, 3, 14, 5]
			);
			expect(
				toNumberArray(' 1 -0.2   ,3,.14,  5  ')
			).toEqual(
				[1, -0.2, 3, 0.14, 5]
			);
			expect(
				toNumberArray('-1.83697e-16 -1 1 -1.83697e-16 0 100')
			).toEqual(
				[-1.83697e-16, -1, 1, -1.83697e-16, 0, 100]
			);
		});

		it('should support the omission of superfluous separators', () => {

			expect(
				toNumberArray('5.5.5')
			).toEqual(
				[5.5, 0.5]
			);
			expect(
				toNumberArray('1-2-3')
			).toEqual(
				[1, -2, -3]
			);
			expect(
				toNumberArray('1-.4')
			).toEqual(
				[1, -0.4]
			);
		});
	});

	describe('parseExternalUrl', () => {

		it('should ignore not urls', () => {

			expect(
				parseExternalUrl('')
			).toBeFalsy();
			expect(
				parseExternalUrl('foo')
			).toBeFalsy();
			expect(
				parseExternalUrl('url()')
			).toBeFalsy();
			expect(
				parseExternalUrl('url(\'\')')
			).toBeFalsy();
			expect(
				parseExternalUrl('url(\'asf)')
			).toBeFalsy();
		});

		it('should parse urls', () => {

			expect(
				parseExternalUrl('url(foo)')
			).toBe('foo');
			expect(
				parseExternalUrl('url(\'foo\')')
			).toBe('foo');
			expect(
				parseExternalUrl('url(\'foo\')')
			).toBe('foo');
		});
	});
});
