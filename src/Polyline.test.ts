import { Point } from "./Point";
import { Polyline } from "./Polyline";
import { Segment } from "./Segment";

describe("Polyline", () => {
	describe("constructor and getters", () => {
		it("should store points", () => {
			const points = [new Point(0, 0), new Point(10, 10), new Point(20, 0)];
			const polyline = new Polyline(points);

			expect(polyline.points()).toHaveLength(3);
			expect(polyline.points()[0].x()).toBe(0);
			expect(polyline.points()[1].x()).toBe(10);
			expect(polyline.points()[2].x()).toBe(20);
		});

		it("should handle empty polyline", () => {
			const polyline = new Polyline([]);

			expect(polyline.points()).toHaveLength(0);
		});

		it("should handle single point", () => {
			const polyline = new Polyline([new Point(5, 5)]);

			expect(polyline.points()).toHaveLength(1);
			expect(polyline.points()[0].x()).toBe(5);
			expect(polyline.points()[0].y()).toBe(5);
		});
	});

	describe("rotated", () => {
		it("should rotate all points around center", () => {
			const points = [new Point(1, 0), new Point(2, 0), new Point(3, 0)];
			const polyline = new Polyline(points);
			const center = new Point(0, 0);
			const rotated = polyline.rotated(Math.PI / 2, center);

			expect(rotated.points()[0].x()).toBeCloseTo(0);
			expect(rotated.points()[0].y()).toBeCloseTo(1);
			expect(rotated.points()[1].x()).toBeCloseTo(0);
			expect(rotated.points()[1].y()).toBeCloseTo(2);
			expect(rotated.points()[2].x()).toBeCloseTo(0);
			expect(rotated.points()[2].y()).toBeCloseTo(3);
		});

		it("should rotate 180 degrees", () => {
			const points = [new Point(1, 0), new Point(2, 0)];
			const polyline = new Polyline(points);
			const center = new Point(0, 0);
			const rotated = polyline.rotated(Math.PI, center);

			expect(rotated.points()[0].x()).toBeCloseTo(-1);
			expect(rotated.points()[0].y()).toBeCloseTo(0);
			expect(rotated.points()[1].x()).toBeCloseTo(-2);
			expect(rotated.points()[1].y()).toBeCloseTo(0);
		});

		it("should rotate around custom center", () => {
			const points = [new Point(2, 1), new Point(3, 1)];
			const polyline = new Polyline(points);
			const center = new Point(1, 1);
			const rotated = polyline.rotated(Math.PI / 2, center);

			expect(rotated.points()[0].x()).toBeCloseTo(1);
			expect(rotated.points()[0].y()).toBeCloseTo(2);
			expect(rotated.points()[1].x()).toBeCloseTo(1);
			expect(rotated.points()[1].y()).toBeCloseTo(3);
		});

		it("should preserve point count after rotation", () => {
			const points = [new Point(0, 0), new Point(1, 1), new Point(2, 2), new Point(3, 3)];
			const polyline = new Polyline(points);
			const rotated = polyline.rotated(Math.PI / 4, new Point(0, 0));

			expect(rotated.points()).toHaveLength(4);
		});
	});

	describe("reflected", () => {
		it("should reflect all points over horizontal axis", () => {
			const points = [new Point(0, 1), new Point(5, 2), new Point(10, 3)];
			const polyline = new Polyline(points);
			const axis = new Segment(new Point(0, 0), new Point(10, 0));
			const reflected = polyline.reflected(axis);

			expect(reflected.points()[0].x()).toBeCloseTo(0);
			expect(reflected.points()[0].y()).toBeCloseTo(-1);
			expect(reflected.points()[1].x()).toBeCloseTo(5);
			expect(reflected.points()[1].y()).toBeCloseTo(-2);
			expect(reflected.points()[2].x()).toBeCloseTo(10);
			expect(reflected.points()[2].y()).toBeCloseTo(-3);
		});

		it("should reflect all points over vertical axis", () => {
			const points = [new Point(1, 0), new Point(2, 5), new Point(3, 10)];
			const polyline = new Polyline(points);
			const axis = new Segment(new Point(0, 0), new Point(0, 10));
			const reflected = polyline.reflected(axis);

			expect(reflected.points()[0].x()).toBeCloseTo(-1);
			expect(reflected.points()[0].y()).toBeCloseTo(0);
			expect(reflected.points()[1].x()).toBeCloseTo(-2);
			expect(reflected.points()[1].y()).toBeCloseTo(5);
			expect(reflected.points()[2].x()).toBeCloseTo(-3);
			expect(reflected.points()[2].y()).toBeCloseTo(10);
		});

		it("should reflect over diagonal axis", () => {
			const points = [new Point(2, 0), new Point(4, 0)];
			const polyline = new Polyline(points);
			const axis = new Segment(new Point(0, 0), new Point(1, 1));
			const reflected = polyline.reflected(axis);

			expect(reflected.points()[0].x()).toBeCloseTo(0);
			expect(reflected.points()[0].y()).toBeCloseTo(2);
			expect(reflected.points()[1].x()).toBeCloseTo(0);
			expect(reflected.points()[1].y()).toBeCloseTo(4);
		});

		it("should preserve point count after reflection", () => {
			const points = [new Point(0, 0), new Point(1, 1), new Point(2, 2)];
			const polyline = new Polyline(points);
			const axis = new Segment(new Point(0, 0), new Point(10, 0));
			const reflected = polyline.reflected(axis);

			expect(reflected.points()).toHaveLength(3);
		});
	});
});
