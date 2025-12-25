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

	describe("reflect", () => {
		it("should reflect point over horizontal axis", () => {
			const point = new Point(2, 3);
			const axisStart = new Point(0, 0);
			const axisEnd = new Point(10, 0);
			const reflected = point.reflect(axisStart, axisEnd);

			expect(reflected.x()).toBeCloseTo(2);
			expect(reflected.y()).toBeCloseTo(-3);
		});

		it("should reflect point over vertical axis", () => {
			const point = new Point(3, 2);
			const axisStart = new Point(0, 0);
			const axisEnd = new Point(0, 10);
			const reflected = point.reflect(axisStart, axisEnd);

			expect(reflected.x()).toBeCloseTo(-3);
			expect(reflected.y()).toBeCloseTo(2);
		});

		it("should reflect point over diagonal axis (y = x)", () => {
			const point = new Point(3, 1);
			const axisStart = new Point(0, 0);
			const axisEnd = new Point(1, 1);
			const reflected = point.reflect(axisStart, axisEnd);

			expect(reflected.x()).toBeCloseTo(1);
			expect(reflected.y()).toBeCloseTo(3);
		});

		it("should return same point when point is on the axis", () => {
			const point = new Point(5, 0);
			const axisStart = new Point(0, 0);
			const axisEnd = new Point(10, 0);
			const reflected = point.reflect(axisStart, axisEnd);

			expect(reflected.x()).toBeCloseTo(5);
			expect(reflected.y()).toBeCloseTo(0);
		});

		it("should reflect over axis not passing through origin", () => {
			const point = new Point(0, 0);
			const axisStart = new Point(0, 5);
			const axisEnd = new Point(10, 5);
			const reflected = point.reflect(axisStart, axisEnd);

			expect(reflected.x()).toBeCloseTo(0);
			expect(reflected.y()).toBeCloseTo(10);
		});
	});
});
