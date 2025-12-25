import { Box2D } from "./Box2D";
import { Point } from "./Point";
import { Segment } from "./Segment";

describe("Box2D", () => {
	describe("constructor", () => {
		it("should create box from two points", () => {
			const box = new Box2D(new Point(0, 0), new Point(10, 10));

			expect(box.topLeft().x()).toBe(0);
			expect(box.topLeft().y()).toBe(0);
			expect(box.bottomRight().x()).toBe(10);
			expect(box.bottomRight().y()).toBe(10);
		});
	});

	describe("fromTopLeftPointAndSize", () => {
		it("should create box from top-left point and dimensions", () => {
			const box = Box2D.fromTopLeftPointAndSize(new Point(5, 5), 20, 10);

			expect(box.topLeft().x()).toBe(5);
			expect(box.topLeft().y()).toBe(5);
			expect(box.bottomRight().x()).toBe(25);
			expect(box.bottomRight().y()).toBe(15);
		});
	});

	describe("width and height", () => {
		it("should calculate correct dimensions", () => {
			const box = new Box2D(new Point(0, 0), new Point(30, 20));

			expect(box.width()).toBe(30);
			expect(box.height()).toBe(20);
		});

		it("should handle boxes not at origin", () => {
			const box = new Box2D(new Point(10, 20), new Point(50, 60));

			expect(box.width()).toBe(40);
			expect(box.height()).toBe(40);
		});
	});

	describe("rotate", () => {
		it("should rotate 90 degrees around own center", () => {
			const box = new Box2D(new Point(0, 0), new Point(10, 20));
			const rotated = box.rotate(90);

			expect(rotated.width()).toBeCloseTo(20);
			expect(rotated.height()).toBeCloseTo(10);
		});

		it("should rotate 180 degrees and maintain dimensions", () => {
			const box = new Box2D(new Point(0, 0), new Point(10, 20));
			const rotated = box.rotate(180);

			expect(rotated.width()).toBeCloseTo(10);
			expect(rotated.height()).toBeCloseTo(20);
		});

		it("should rotate around specified center", () => {
			const box = new Box2D(new Point(0, 0), new Point(2, 2));
			const center = new Point(0, 0);
			const rotated = box.rotate(90, center);

			expect(rotated.topLeft().x()).toBeCloseTo(-2);
			expect(rotated.topLeft().y()).toBeCloseTo(0);
			expect(rotated.bottomRight().x()).toBeCloseTo(0);
			expect(rotated.bottomRight().y()).toBeCloseTo(2);
		});

		it("should rotate 45 degrees and expand bounding box", () => {
			const box = new Box2D(new Point(0, 0), new Point(10, 10));
			const rotated = box.rotate(45);

			const expectedDiagonal = 10 * Math.sqrt(2);
			expect(rotated.width()).toBeCloseTo(expectedDiagonal);
			expect(rotated.height()).toBeCloseTo(expectedDiagonal);
		});

		it("should rotate 360 degrees back to original", () => {
			const box = new Box2D(new Point(5, 10), new Point(15, 30));
			const rotated = box.rotate(360);

			expect(rotated.topLeft().x()).toBeCloseTo(5);
			expect(rotated.topLeft().y()).toBeCloseTo(10);
			expect(rotated.bottomRight().x()).toBeCloseTo(15);
			expect(rotated.bottomRight().y()).toBeCloseTo(30);
		});
	});

	describe("reflect", () => {
		it("should reflect over horizontal axis", () => {
			const box = new Box2D(new Point(0, 2), new Point(4, 6));
			const axis = new Segment(new Point(0, 0), new Point(10, 0));
			const reflected = box.reflect(axis);

			expect(reflected.topLeft().x()).toBeCloseTo(0);
			expect(reflected.topLeft().y()).toBeCloseTo(-6);
			expect(reflected.bottomRight().x()).toBeCloseTo(4);
			expect(reflected.bottomRight().y()).toBeCloseTo(-2);
		});

		it("should reflect over vertical axis", () => {
			const box = new Box2D(new Point(2, 0), new Point(6, 4));
			const axis = new Segment(new Point(0, 0), new Point(0, 10));
			const reflected = box.reflect(axis);

			expect(reflected.topLeft().x()).toBeCloseTo(-6);
			expect(reflected.topLeft().y()).toBeCloseTo(0);
			expect(reflected.bottomRight().x()).toBeCloseTo(-2);
			expect(reflected.bottomRight().y()).toBeCloseTo(4);
		});

		it("should preserve dimensions when reflecting", () => {
			const box = new Box2D(new Point(0, 0), new Point(10, 20));
			const axis = new Segment(new Point(0, 0), new Point(1, 1));
			const reflected = box.reflect(axis);

			expect(reflected.width()).toBeCloseTo(20);
			expect(reflected.height()).toBeCloseTo(10);
		});

		it("should reflect over axis not passing through origin", () => {
			const box = new Box2D(new Point(0, 0), new Point(4, 4));
			const axis = new Segment(new Point(0, 10), new Point(10, 10));
			const reflected = box.reflect(axis);

			expect(reflected.topLeft().x()).toBeCloseTo(0);
			expect(reflected.topLeft().y()).toBeCloseTo(16);
			expect(reflected.bottomRight().x()).toBeCloseTo(4);
			expect(reflected.bottomRight().y()).toBeCloseTo(20);
		});
	});
});
