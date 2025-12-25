import { Point } from "./Point";

describe("Point", () => {
	describe("constructor and getters", () => {
		it("should store x and y coordinates", () => {
			const point = new Point(3, 5);
			expect(point.x()).toBe(3);
			expect(point.y()).toBe(5);
		});

		it("should handle negative coordinates", () => {
			const point = new Point(-10, -20);
			expect(point.x()).toBe(-10);
			expect(point.y()).toBe(-20);
		});
	});

	describe("rotate", () => {
		it("should rotate point 90 degrees around origin", () => {
			const point = new Point(1, 0);
			const center = new Point(0, 0);
			const rotated = point.rotate(Math.PI / 2, center);

			expect(rotated.x()).toBeCloseTo(0);
			expect(rotated.y()).toBeCloseTo(1);
		});

		it("should rotate point 180 degrees around origin", () => {
			const point = new Point(1, 0);
			const center = new Point(0, 0);
			const rotated = point.rotate(Math.PI, center);

			expect(rotated.x()).toBeCloseTo(-1);
			expect(rotated.y()).toBeCloseTo(0);
		});

		it("should rotate point 90 degrees around custom center", () => {
			const point = new Point(2, 1);
			const center = new Point(1, 1);
			const rotated = point.rotate(Math.PI / 2, center);

			expect(rotated.x()).toBeCloseTo(1);
			expect(rotated.y()).toBeCloseTo(2);
		});

		it("should return same point when rotating around itself", () => {
			const point = new Point(5, 5);
			const rotated = point.rotate(Math.PI / 4, point);

			expect(rotated.x()).toBeCloseTo(5);
			expect(rotated.y()).toBeCloseTo(5);
		});

		it("should rotate point 360 degrees back to original", () => {
			const point = new Point(3, 4);
			const center = new Point(1, 1);
			const rotated = point.rotate(2 * Math.PI, center);

			expect(rotated.x()).toBeCloseTo(3);
			expect(rotated.y()).toBeCloseTo(4);
		});
	});
});
