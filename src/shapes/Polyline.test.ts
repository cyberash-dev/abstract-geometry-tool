import { Point } from "../Point";
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

	describe("rotation", () => {
		it("should return rotation angle", () => {
			const points = [new Point(0, 0), new Point(10, 10)];
			const polyline = new Polyline(points, 30);

			expect(polyline.rotation()).toBe(30);
		});

		it("should default rotation to 0", () => {
			const points = [new Point(0, 0), new Point(10, 10)];
			const polyline = new Polyline(points);

			expect(polyline.rotation()).toBe(0);
		});
	});

	describe("rotated", () => {
		it("should rotate all points around center", () => {
			const points = [new Point(1, 0), new Point(2, 0), new Point(3, 0)];
			const polyline = new Polyline(points);
			const center = new Point(0, 0);
			const rotated = polyline.rotated(90, center);

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
			const rotated = polyline.rotated(180, center);

			expect(rotated.points()[0].x()).toBeCloseTo(-1);
			expect(rotated.points()[0].y()).toBeCloseTo(0);
			expect(rotated.points()[1].x()).toBeCloseTo(-2);
			expect(rotated.points()[1].y()).toBeCloseTo(0);
		});

		it("should rotate around custom center", () => {
			const points = [new Point(2, 1), new Point(3, 1)];
			const polyline = new Polyline(points);
			const center = new Point(1, 1);
			const rotated = polyline.rotated(90, center);

			expect(rotated.points()[0].x()).toBeCloseTo(1);
			expect(rotated.points()[0].y()).toBeCloseTo(2);
			expect(rotated.points()[1].x()).toBeCloseTo(1);
			expect(rotated.points()[1].y()).toBeCloseTo(3);
		});

		it("should preserve point count after rotation", () => {
			const points = [new Point(0, 0), new Point(1, 1), new Point(2, 2), new Point(3, 3)];
			const polyline = new Polyline(points);
			const rotated = polyline.rotated(45, new Point(0, 0));

			expect(rotated.points()).toHaveLength(4);
		});

		it("should rotate around polyline center when no center is provided", () => {
			const points = [new Point(0, 0), new Point(10, 0)];
			const polyline = new Polyline(points);
			const rotated = polyline.rotated(90);

			expect(rotated.points()[0].x()).toBeCloseTo(5);
			expect(rotated.points()[0].y()).toBeCloseTo(-5);
			expect(rotated.points()[1].x()).toBeCloseTo(5);
			expect(rotated.points()[1].y()).toBeCloseTo(5);
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

	describe("boundingBox", () => {
		it("should return bounding box for three points", () => {
			const polyline = new Polyline([new Point(0, 0), new Point(10, 20), new Point(5, 10)]);
			const box = polyline.boundingBox();

			expect(box.topLeft().x()).toBe(0);
			expect(box.topLeft().y()).toBe(0);
			expect(box.width()).toBe(10);
			expect(box.height()).toBe(20);
		});

		it("should return empty bounding box for empty polyline", () => {
			const polyline = new Polyline([]);
			const box = polyline.boundingBox();

			expect(box.topLeft().x()).toBe(0);
			expect(box.topLeft().y()).toBe(0);
			expect(box.width()).toBe(0);
			expect(box.height()).toBe(0);
		});

		it("should return zero-size bounding box for single point", () => {
			const polyline = new Polyline([new Point(5, 10)]);
			const box = polyline.boundingBox();

			expect(box.topLeft().x()).toBe(5);
			expect(box.topLeft().y()).toBe(10);
			expect(box.width()).toBe(0);
			expect(box.height()).toBe(0);
		});

		it("should handle negative coordinates", () => {
			const polyline = new Polyline([new Point(-10, -20), new Point(5, 10), new Point(-5, 0)]);
			const box = polyline.boundingBox();

			expect(box.topLeft().x()).toBe(-10);
			expect(box.topLeft().y()).toBe(-20);
			expect(box.width()).toBe(15);
			expect(box.height()).toBe(30);
		});
	});

	describe("center", () => {
		it("should calculate center between first and last point", () => {
			const polyline = new Polyline([new Point(0, 0), new Point(10, 10), new Point(20, 0)]);

			expect(polyline.center().x()).toBe(10);
			expect(polyline.center().y()).toBe(0);
		});

		it("should calculate center for two points", () => {
			const polyline = new Polyline([new Point(0, 0), new Point(10, 20)]);

			expect(polyline.center().x()).toBe(5);
			expect(polyline.center().y()).toBe(10);
		});

		it("should return point itself for single point polyline", () => {
			const polyline = new Polyline([new Point(5, 5)]);

			expect(polyline.center().x()).toBe(5);
			expect(polyline.center().y()).toBe(5);
		});

		it("should return origin for empty polyline", () => {
			const polyline = new Polyline([]);

			expect(polyline.center().x()).toBe(0);
			expect(polyline.center().y()).toBe(0);
		});
	});

	describe("reflectedByHorizontal", () => {
		it("should reflect over horizontal axis through center when centered is true", () => {
			const polyline = new Polyline([new Point(0, 0), new Point(10, 10), new Point(20, 0)]);
			const reflected = polyline.reflectedByHorizontal(true);

			expect(reflected.points()[0].x()).toBeCloseTo(0);
			expect(reflected.points()[0].y()).toBeCloseTo(0);
			expect(reflected.points()[1].x()).toBeCloseTo(10);
			expect(reflected.points()[1].y()).toBeCloseTo(-10);
			expect(reflected.points()[2].x()).toBeCloseTo(20);
			expect(reflected.points()[2].y()).toBeCloseTo(0);
		});

		it("should reflect over y=0 axis when centered is false", () => {
			const polyline = new Polyline([new Point(0, 5), new Point(10, 10), new Point(20, 5)]);
			const reflected = polyline.reflectedByHorizontal(false);

			expect(reflected.points()[0].x()).toBeCloseTo(0);
			expect(reflected.points()[0].y()).toBeCloseTo(-5);
			expect(reflected.points()[1].x()).toBeCloseTo(10);
			expect(reflected.points()[1].y()).toBeCloseTo(-10);
			expect(reflected.points()[2].x()).toBeCloseTo(20);
			expect(reflected.points()[2].y()).toBeCloseTo(-5);
		});
	});

	describe("reflectedByVertical", () => {
		it("should reflect over vertical axis through center when centered is true", () => {
			const polyline = new Polyline([new Point(0, 0), new Point(10, 10), new Point(20, 0)]);
			const reflected = polyline.reflectedByVertical(true);

			expect(reflected.points()[0].x()).toBeCloseTo(20);
			expect(reflected.points()[0].y()).toBeCloseTo(0);
			expect(reflected.points()[1].x()).toBeCloseTo(10);
			expect(reflected.points()[1].y()).toBeCloseTo(10);
			expect(reflected.points()[2].x()).toBeCloseTo(0);
			expect(reflected.points()[2].y()).toBeCloseTo(0);
		});

		it("should reflect over x=0 axis when centered is false", () => {
			const polyline = new Polyline([new Point(5, 0), new Point(10, 10), new Point(15, 0)]);
			const reflected = polyline.reflectedByVertical(false);

			expect(reflected.points()[0].x()).toBeCloseTo(-5);
			expect(reflected.points()[0].y()).toBeCloseTo(0);
			expect(reflected.points()[1].x()).toBeCloseTo(-10);
			expect(reflected.points()[1].y()).toBeCloseTo(10);
			expect(reflected.points()[2].x()).toBeCloseTo(-15);
			expect(reflected.points()[2].y()).toBeCloseTo(0);
		});
	});
});
