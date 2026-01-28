import { Point } from "../Point";
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

	describe("center", () => {
		it("should calculate center of segment", () => {
			const segment = new Segment(new Point(0, 0), new Point(10, 20));

			expect(segment.center().x()).toBe(5);
			expect(segment.center().y()).toBe(10);
		});

		it("should calculate center of segment not at origin", () => {
			const segment = new Segment(new Point(10, 20), new Point(30, 40));

			expect(segment.center().x()).toBe(20);
			expect(segment.center().y()).toBe(30);
		});
	});

	describe("boundingBox", () => {
		it("should return bounding box of horizontal segment", () => {
			const segment = new Segment(new Point(0, 5), new Point(10, 5));
			const box = segment.boundingBox();

			expect(box.topLeft().x()).toBe(0);
			expect(box.topLeft().y()).toBe(5);
			expect(box.width()).toBe(10);
			expect(box.height()).toBe(0);
		});

		it("should return bounding box of diagonal segment", () => {
			const segment = new Segment(new Point(0, 0), new Point(10, 20));
			const box = segment.boundingBox();

			expect(box.topLeft().x()).toBe(0);
			expect(box.topLeft().y()).toBe(0);
			expect(box.width()).toBe(10);
			expect(box.height()).toBe(20);
		});

		it("should handle reversed segment direction", () => {
			const segment = new Segment(new Point(10, 20), new Point(0, 0));
			const box = segment.boundingBox();

			expect(box.topLeft().x()).toBe(0);
			expect(box.topLeft().y()).toBe(0);
			expect(box.width()).toBe(10);
			expect(box.height()).toBe(20);
		});
	});

	describe("rotation", () => {
		it("should return rotation angle", () => {
			const segment = new Segment(new Point(0, 0), new Point(10, 0), 45);

			expect(segment.rotation()).toBe(45);
		});

		it("should default rotation to 0", () => {
			const segment = new Segment(new Point(0, 0), new Point(10, 0));

			expect(segment.rotation()).toBe(0);
		});
	});

	describe("rotated", () => {
		it("should rotate segment 90 degrees around origin", () => {
			const segment = new Segment(new Point(1, 0), new Point(2, 0));
			const center = new Point(0, 0);
			const rotated = segment.rotated(90, center);

			expect(rotated.start().x()).toBeCloseTo(0);
			expect(rotated.start().y()).toBeCloseTo(1);
			expect(rotated.end().x()).toBeCloseTo(0);
			expect(rotated.end().y()).toBeCloseTo(2);
		});

		it("should rotate around segment center by default", () => {
			const segment = new Segment(new Point(0, 0), new Point(2, 0));
			const rotated = segment.rotated(180);

			expect(rotated.start().x()).toBeCloseTo(2);
			expect(rotated.start().y()).toBeCloseTo(0);
			expect(rotated.end().x()).toBeCloseTo(0);
			expect(rotated.end().y()).toBeCloseTo(0);
		});

		it("should preserve length after rotation", () => {
			const segment = new Segment(new Point(0, 0), new Point(5, 0));
			const rotated = segment.rotated(45);

			expect(rotated.length()).toBeCloseTo(5);
		});
	});

	describe("reflected", () => {
		it("should reflect segment over horizontal axis", () => {
			const segment = new Segment(new Point(0, 1), new Point(10, 2));
			const axis = new Segment(new Point(0, 0), new Point(10, 0));
			const reflected = segment.reflected(axis);

			expect(reflected.start().x()).toBeCloseTo(0);
			expect(reflected.start().y()).toBeCloseTo(-1);
			expect(reflected.end().x()).toBeCloseTo(10);
			expect(reflected.end().y()).toBeCloseTo(-2);
		});

		it("should reflect segment over vertical axis", () => {
			const segment = new Segment(new Point(1, 0), new Point(2, 10));
			const axis = new Segment(new Point(0, 0), new Point(0, 10));
			const reflected = segment.reflected(axis);

			expect(reflected.start().x()).toBeCloseTo(-1);
			expect(reflected.start().y()).toBeCloseTo(0);
			expect(reflected.end().x()).toBeCloseTo(-2);
			expect(reflected.end().y()).toBeCloseTo(10);
		});

		it("should preserve length after reflection", () => {
			const segment = new Segment(new Point(0, 0), new Point(3, 4));
			const axis = new Segment(new Point(0, 0), new Point(1, 1));
			const reflected = segment.reflected(axis);

			expect(reflected.length()).toBeCloseTo(5);
		});
	});

	describe("reflectedByHorizontal", () => {
		it("should reflect over horizontal axis through center", () => {
			const segment = new Segment(new Point(0, 0), new Point(10, 10));
			const reflected = segment.reflectedByHorizontal();

			expect(reflected.start().x()).toBeCloseTo(0);
			expect(reflected.start().y()).toBeCloseTo(10);
			expect(reflected.end().x()).toBeCloseTo(10);
			expect(reflected.end().y()).toBeCloseTo(0);
		});

		it("should reflect over y=0 when centered is false", () => {
			const segment = new Segment(new Point(0, 5), new Point(10, 10));
			const reflected = segment.reflectedByHorizontal(false);

			expect(reflected.start().x()).toBeCloseTo(0);
			expect(reflected.start().y()).toBeCloseTo(-5);
			expect(reflected.end().x()).toBeCloseTo(10);
			expect(reflected.end().y()).toBeCloseTo(-10);
		});
	});

	describe("reflectedByVertical", () => {
		it("should reflect over vertical axis through center", () => {
			const segment = new Segment(new Point(0, 0), new Point(10, 10));
			const reflected = segment.reflectedByVertical();

			expect(reflected.start().x()).toBeCloseTo(10);
			expect(reflected.start().y()).toBeCloseTo(0);
			expect(reflected.end().x()).toBeCloseTo(0);
			expect(reflected.end().y()).toBeCloseTo(10);
		});

		it("should reflect over x=0 when centered is false", () => {
			const segment = new Segment(new Point(5, 0), new Point(10, 10));
			const reflected = segment.reflectedByVertical(false);

			expect(reflected.start().x()).toBeCloseTo(-5);
			expect(reflected.start().y()).toBeCloseTo(0);
			expect(reflected.end().x()).toBeCloseTo(-10);
			expect(reflected.end().y()).toBeCloseTo(10);
		});
	});
});
