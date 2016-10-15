/**
 * Tests for the internal 'svg' component
 */
describe('svg', function() {
	var svg;

	beforeEach(function() {
		svg = canvg._build({});
	});

	describe('#ToNumberArray', function() {
		it('Should parse mixed-separator lists of integers and real numbers', function() {
			expect(svg.ToNumberArray(".5")).toEqual([0.5]);
			expect(svg.ToNumberArray("1,-2,3,14,5")).toEqual([1, -2, 3, 14, 5]);
			expect(svg.ToNumberArray(" 1 -0.2   ,3,.14,  5  ")).toEqual([1, -0.2, 3, 0.14, 5]);
		});

		it('Should support the omission of superfluous separators', function() {
			expect(svg.ToNumberArray("5.5.5")).toEqual([5.5, 0.5]);
			expect(svg.ToNumberArray("1-2-3")).toEqual([1, -2, -3]);
			expect(svg.ToNumberArray("1-.4")).toEqual([1, -0.4]);
		});
	});
});
