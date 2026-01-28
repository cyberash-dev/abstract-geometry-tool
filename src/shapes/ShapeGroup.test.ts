import { Point } from "../Point";
import { Rectangle } from "./Rectangle";
import { Segment } from "./Segment";
import { ShapeGroup } from "./ShapeGroup";

describe("ShapeGroup", () => {
	describe("constructor and getters", () => {
		it("should store shapes", () => {
			const rect1 = new Rectangle(new Point(0, 0), new Point(10, 10));
			const rect2 = new Rectangle(new Point(20, 20), new Point(30, 30));
			const group = new ShapeGroup([rect1, rect2]);

			expect(group.shapes()).toHaveLength(2);
		});

		it("should return copy of shapes array", () => {
			const rect = new Rectangle(new Point(0, 0), new Point(10, 10));
			const group = new ShapeGroup([rect]);
			const shapes = group.shapes();

			expect(shapes).not.toBe(group.shapes());
			expect(shapes).toEqual(group.shapes());
		});

		it("should handle empty array", () => {
			const group = new ShapeGroup([]);

			expect(group.shapes()).toHaveLength(0);
		});
	});

	describe("boundingBox", () => {
		it("should return empty bounding box for empty group", () => {
			const group = new ShapeGroup([]);
			const box = group.boundingBox();

			expect(box.topLeft().x()).toBe(0);
			expect(box.topLeft().y()).toBe(0);
			expect(box.width()).toBe(0);
			expect(box.height()).toBe(0);
		});

		it("should return bounding box of single shape", () => {
			const rect = new Rectangle(new Point(5, 10), new Point(15, 20));
			const group = new ShapeGroup([rect]);
			const box = group.boundingBox();

			expect(box.topLeft().x()).toBe(5);
			expect(box.topLeft().y()).toBe(10);
			expect(box.width()).toBe(10);
			expect(box.height()).toBe(10);
		});

		it("should calculate bounding box of multiple shapes", () => {
			const rect1 = new Rectangle(new Point(0, 0), new Point(10, 10));
			const rect2 = new Rectangle(new Point(20, 20), new Point(30, 30));
			const group = new ShapeGroup([rect1, rect2]);
			const box = group.boundingBox();

			expect(box.topLeft().x()).toBe(0);
			expect(box.topLeft().y()).toBe(0);
			expect(box.width()).toBe(30);
			expect(box.height()).toBe(30);
		});

		it("should handle overlapping shapes", () => {
			const rect1 = new Rectangle(new Point(0, 0), new Point(20, 20));
			const rect2 = new Rectangle(new Point(10, 10), new Point(25, 15));
			const group = new ShapeGroup([rect1, rect2]);
			const box = group.boundingBox();

			expect(box.topLeft().x()).toBe(0);
			expect(box.topLeft().y()).toBe(0);
			expect(box.width()).toBe(25);
			expect(box.height()).toBe(20);
		});

		it("should correctly calculate bounding box for rotated rectangle", () => {
			const rect = new Rectangle(new Point(0, 0), new Point(10, 10), 45);
			const group = new ShapeGroup([rect]);
			const box = group.boundingBox();

			const expectedSize = 10 * Math.sqrt(2);
			expect(box.width()).toBeCloseTo(expectedSize, 5);
			expect(box.height()).toBeCloseTo(expectedSize, 5);
			expect(box.rotation()).toBe(0);
		});

		it("should correctly calculate bounding box for multiple rotated shapes", () => {
			const rect1 = new Rectangle(new Point(0, 0), new Point(10, 10), 45);
			const rect2 = new Rectangle(new Point(20, 0), new Point(30, 10), 45);
			const group = new ShapeGroup([rect1, rect2]);
			const box = group.boundingBox();

			expect(box.rotation()).toBe(0);
			expect(box.width()).toBeGreaterThan(20);
			expect(box.height()).toBeCloseTo(10 * Math.sqrt(2), 5);
		});
	});

	describe("center", () => {
		it("should return origin for empty group", () => {
			const group = new ShapeGroup([]);

			expect(group.center().x()).toBe(0);
			expect(group.center().y()).toBe(0);
		});

		it("should calculate center of single shape group", () => {
			const rect = new Rectangle(new Point(0, 0), new Point(10, 20));
			const group = new ShapeGroup([rect]);

			expect(group.center().x()).toBe(5);
			expect(group.center().y()).toBe(10);
		});

		it("should calculate center of multiple shapes", () => {
			const rect1 = new Rectangle(new Point(0, 0), new Point(10, 10));
			const rect2 = new Rectangle(new Point(20, 20), new Point(30, 30));
			const group = new ShapeGroup([rect1, rect2]);

			expect(group.center().x()).toBe(15);
			expect(group.center().y()).toBe(15);
		});

		it("should calculate center of rotated rectangle correctly", () => {
			const rect = new Rectangle(new Point(0, 0), new Point(10, 10), 45);
			const group = new ShapeGroup([rect]);

			expect(group.center().x()).toBeCloseTo(5, 5);
			expect(group.center().y()).toBeCloseTo(5, 5);
		});

		it("should calculate center of group with symmetrically rotated rectangles", () => {
			const rect1 = new Rectangle(new Point(0, 0), new Point(10, 10), 45);
			const rect2 = new Rectangle(new Point(0, 0), new Point(10, 10), -45);
			const group = new ShapeGroup([rect1, rect2]);

			expect(group.center().x()).toBeCloseTo(5, 5);
			expect(group.center().y()).toBeCloseTo(5, 5);
		});
	});

	describe("rotation", () => {
		it("should return rotation angle", () => {
			const rect = new Rectangle(new Point(0, 0), new Point(10, 10));
			const group = new ShapeGroup([rect], 45);

			expect(group.rotation()).toBe(45);
		});

		it("should default rotation to 0", () => {
			const rect = new Rectangle(new Point(0, 0), new Point(10, 10));
			const group = new ShapeGroup([rect]);

			expect(group.rotation()).toBe(0);
		});
	});

	describe("rotated", () => {
		it("should have same center as single rectangle for nested identical rectangles", () => {
			const rect1 = new Rectangle(new Point(0, 0), new Point(10, 10));
			const rect2 = new Rectangle(new Point(0, 0), new Point(10, 10));
			const rect3 = new Rectangle(new Point(0, 0), new Point(5, 5));
			const group = new ShapeGroup([rect2, rect3]);

			expect(group.center().x()).toBe(rect1.center().x());
			expect(group.center().y()).toBe(rect1.center().y());
		});

		it("should maintain center consistency after rotation like Rectangle does", () => {
			const singleRect = new Rectangle(new Point(0, 0), new Point(10, 10));
			const rect1 = new Rectangle(new Point(0, 0), new Point(10, 10));
			const rect2 = new Rectangle(new Point(0, 0), new Point(5, 5));
			const group = new ShapeGroup([rect1, rect2]);

			const rotatedRect = singleRect.rotated(45);
			const rotatedGroup = group.rotated(45);

			expect(rotatedGroup.center().x()).toBeCloseTo(rotatedRect.center().x(), 5);
			expect(rotatedGroup.center().y()).toBeCloseTo(rotatedRect.center().y(), 5);
		});

		it("should preserve bounding box center for nested rectangles after 180 degree rotation", () => {
			const rect1 = new Rectangle(new Point(520, 1000), new Point(640, 1060));
			const rect2 = new Rectangle(new Point(520, 1030), new Point(550, 1060));
			const group = new ShapeGroup([rect1, rect2]);

			const bboxBefore = group.boundingBox();
			const rotatedGroup = group.rotated(90);
			const bboxAfter = rotatedGroup.boundingBox();

			expect(bboxAfter.width()).toBeCloseTo(bboxBefore.width(), 5);
			expect(bboxAfter.height()).toBeCloseTo(bboxBefore.height(), 5);
		});

		it("should rotate all shapes around group center", () => {
			const rect1 = new Rectangle(new Point(0, 0), new Point(10, 10));
			const rect2 = new Rectangle(new Point(20, 0), new Point(30, 10));
			const group = new ShapeGroup([rect1, rect2]);
			const rotated = group.rotated(180);
			const box = rotated.boundingBox();

			expect(box.width()).toBeCloseTo(30);
			expect(box.height()).toBeCloseTo(10);
		});

		it("should rotate around specified center", () => {
			const rect = new Rectangle(new Point(0, 0), new Point(10, 10));
			const group = new ShapeGroup([rect]);
			const center = new Point(0, 0);
			const rotated = group.rotated(90, center);
			const box = rotated.boundingBox();

			expect(box.topLeft().x()).toBeCloseTo(-10);
			expect(box.topLeft().y()).toBeCloseTo(0);
		});

		it("should correctly rotate group with pre-rotated rectangles", () => {
			const rect1 = new Rectangle(new Point(0, 0), new Point(10, 10), 45);
			const rect2 = new Rectangle(new Point(20, 0), new Point(30, 10), 45);
			const group = new ShapeGroup([rect1, rect2]);

			const originalCenter = group.center();
			const rotated = group.rotated(90);
			const newCenter = rotated.center();

			expect(newCenter.x()).toBeCloseTo(originalCenter.x(), 2);
			expect(newCenter.y()).toBeCloseTo(originalCenter.y(), 2);
		});

		it("should preserve group structure when rotating around own center", () => {
			const rect = new Rectangle(new Point(0, 0), new Point(10, 10), 30);
			const group = new ShapeGroup([rect]);

			const originalCenter = group.center();
			const rotated = group.rotated(45);
			const newCenter = rotated.center();

			expect(newCenter.x()).toBeCloseTo(originalCenter.x(), 5);
			expect(newCenter.y()).toBeCloseTo(originalCenter.y(), 5);
		});
	});

	describe("reflected", () => {
		it("should reflect all shapes over axis", () => {
			const rect = new Rectangle(new Point(0, 2), new Point(10, 6));
			const group = new ShapeGroup([rect]);
			const axis = new Segment(new Point(0, 0), new Point(10, 0));
			const reflected = group.reflected(axis);
			const box = reflected.boundingBox();

			expect(box.topLeft().x()).toBeCloseTo(0);
			expect(box.topLeft().y()).toBeCloseTo(-6);
			expect(box.width()).toBeCloseTo(10);
			expect(box.height()).toBeCloseTo(4);
		});
	});

	describe("reflectedByHorizontal", () => {
		it("should reflect over horizontal axis through group center", () => {
			const rect = new Rectangle(new Point(0, 0), new Point(10, 20));
			const group = new ShapeGroup([rect]);
			const reflected = group.reflectedByHorizontal();
			const box = reflected.boundingBox();

			expect(box.width()).toBeCloseTo(10);
			expect(box.height()).toBeCloseTo(20);
		});

		it("should reflect over y=0 axis when centered is false", () => {
			const rect = new Rectangle(new Point(0, 10), new Point(10, 20));
			const group = new ShapeGroup([rect]);
			const reflected = group.reflectedByHorizontal(false);
			const box = reflected.boundingBox();

			expect(box.topLeft().x()).toBeCloseTo(0);
			expect(box.topLeft().y()).toBeCloseTo(-20);
		});
	});

	describe("reflectedByVertical", () => {
		it("should reflect over vertical axis through group center", () => {
			const rect = new Rectangle(new Point(0, 0), new Point(10, 20));
			const group = new ShapeGroup([rect]);
			const reflected = group.reflectedByVertical();
			const box = reflected.boundingBox();

			expect(box.width()).toBeCloseTo(10);
			expect(box.height()).toBeCloseTo(20);
		});

		it("should reflect over x=0 axis when centered is false", () => {
			const rect = new Rectangle(new Point(10, 0), new Point(20, 10));
			const group = new ShapeGroup([rect]);
			const reflected = group.reflectedByVertical(false);
			const box = reflected.boundingBox();

			expect(box.topLeft().x()).toBeCloseTo(-20);
			expect(box.topLeft().y()).toBeCloseTo(0);
		});
	});

	describe("nested groups", () => {
		it("should handle nested ShapeGroup", () => {
			const rect = new Rectangle(new Point(0, 0), new Point(10, 10));
			const innerGroup = new ShapeGroup([rect]);
			const outerGroup = new ShapeGroup([innerGroup]);
			const box = outerGroup.boundingBox();

			expect(box.topLeft().x()).toBe(0);
			expect(box.topLeft().y()).toBe(0);
			expect(box.width()).toBe(10);
			expect(box.height()).toBe(10);
		});
	});
});
