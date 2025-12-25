import { Point } from "./Point";
import { Segment } from "./Segment";

describe("Segment", () => {
	describe("constructor and getters", () => {
		it("should store start and end points", () => {
			const start = new Point(0, 0);
			const end = new Point(10, 10);
			const segment = new Segment(start, end);

			expect(segment.start()).toBe(start);
			expect(segment.end()).toBe(end);
		});

		it("should handle negative coordinates", () => {
			const start = new Point(-5, -10);
			const end = new Point(5, 10);
			const segment = new Segment(start, end);

			expect(segment.start().x()).toBe(-5);
			expect(segment.start().y()).toBe(-10);
			expect(segment.end().x()).toBe(5);
			expect(segment.end().y()).toBe(10);
		});
	});

	describe("length", () => {
		it("should calculate length of horizontal segment", () => {
			const segment = new Segment(new Point(0, 0), new Point(10, 0));

			expect(segment.length()).toBe(10);
		});

		it("should calculate length of vertical segment", () => {
			const segment = new Segment(new Point(0, 0), new Point(0, 15));

			expect(segment.length()).toBe(15);
		});

		it("should calculate length of diagonal segment", () => {
			const segment = new Segment(new Point(0, 0), new Point(3, 4));

			expect(segment.length()).toBe(5);
		});

		it("should return 0 for zero-length segment", () => {
			const point = new Point(5, 5);
			const segment = new Segment(point, point);

			expect(segment.length()).toBe(0);
		});

		it("should calculate length regardless of direction", () => {
			const segment1 = new Segment(new Point(0, 0), new Point(10, 0));
			const segment2 = new Segment(new Point(10, 0), new Point(0, 0));

			expect(segment1.length()).toBe(segment2.length());
		});

		it("should handle segments not at origin", () => {
			const segment = new Segment(new Point(5, 5), new Point(8, 9));

			expect(segment.length()).toBe(5);
		});
	});
});
