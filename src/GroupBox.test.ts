import { Box2D } from "./Box2D";
import { GroupBox } from "./GroupBox";
import { Point } from "./Point";
import { Segment } from "./Segment";

describe("GroupBox", () => {
	describe("topLeft and bottomRight", () => {
		it("should return bounding box of single child", () => {
			const child = new Box2D(new Point(5, 10), new Point(15, 20));
			const group = new GroupBox([child]);

			expect(group.topLeft().x()).toBe(5);
			expect(group.topLeft().y()).toBe(10);
			expect(group.bottomRight().x()).toBe(15);
			expect(group.bottomRight().y()).toBe(20);
		});

		it("should calculate bounding box of multiple children", () => {
			const box1 = new Box2D(new Point(0, 0), new Point(10, 10));
			const box2 = new Box2D(new Point(20, 20), new Point(30, 30));
			const group = new GroupBox([box1, box2]);

			expect(group.topLeft().x()).toBe(0);
			expect(group.topLeft().y()).toBe(0);
			expect(group.bottomRight().x()).toBe(30);
			expect(group.bottomRight().y()).toBe(30);
		});

		it("should handle overlapping children", () => {
			const box1 = new Box2D(new Point(0, 0), new Point(20, 20));
			const box2 = new Box2D(new Point(10, 10), new Point(25, 15));
			const group = new GroupBox([box1, box2]);

			expect(group.topLeft().x()).toBe(0);
			expect(group.topLeft().y()).toBe(0);
			expect(group.bottomRight().x()).toBe(25);
			expect(group.bottomRight().y()).toBe(20);
		});
	});

	describe("width and height", () => {
		it("should calculate correct dimensions", () => {
			const box1 = new Box2D(new Point(0, 0), new Point(10, 10));
			const box2 = new Box2D(new Point(30, 40), new Point(50, 60));
			const group = new GroupBox([box1, box2]);

			expect(group.width()).toBe(50);
			expect(group.height()).toBe(60);
		});
	});

	describe("rotate", () => {
		it("should rotate all children around group center", () => {
			const box1 = new Box2D(new Point(0, 0), new Point(10, 10));
			const box2 = new Box2D(new Point(20, 0), new Point(30, 10));
			const group = new GroupBox([box1, box2]);
			const rotated = group.rotated(180);

			expect(rotated.width()).toBeCloseTo(30);
			expect(rotated.height()).toBeCloseTo(10);
		});

		it("should rotate around specified center", () => {
			const box = new Box2D(new Point(0, 0), new Point(10, 10));
			const group = new GroupBox([box]);
			const center = new Point(0, 0);
			const rotated = group.rotated(90, center);

			expect(rotated.topLeft().x()).toBeCloseTo(-10);
			expect(rotated.topLeft().y()).toBeCloseTo(0);
		});

		it("should preserve relative positions when rotating", () => {
			const box1 = new Box2D(new Point(0, 0), new Point(10, 10));
			const box2 = new Box2D(new Point(10, 0), new Point(20, 10));
			const group = new GroupBox([box1, box2]);

			const rotated = group.rotated(90);

			expect(rotated.width()).toBeCloseTo(10);
			expect(rotated.height()).toBeCloseTo(20);
		});

		it("should handle nested GroupBox rotation", () => {
			const innerBox = new Box2D(new Point(0, 0), new Point(10, 10));
			const innerGroup = new GroupBox([innerBox]);
			const outerGroup = new GroupBox([innerGroup]);

			const rotated = outerGroup.rotated(90);

			expect(rotated.width()).toBeCloseTo(10);
			expect(rotated.height()).toBeCloseTo(10);
		});

		it("should rotate 360 degrees back to original bounds", () => {
			const box1 = new Box2D(new Point(0, 0), new Point(10, 10));
			const box2 = new Box2D(new Point(15, 15), new Point(25, 25));
			const group = new GroupBox([box1, box2]);

			const rotated = group.rotated(360);

			expect(rotated.topLeft().x()).toBeCloseTo(0);
			expect(rotated.topLeft().y()).toBeCloseTo(0);
			expect(rotated.bottomRight().x()).toBeCloseTo(25);
			expect(rotated.bottomRight().y()).toBeCloseTo(25);
		});
	});

	describe("reflect", () => {
		it("should reflect all children over horizontal axis", () => {
			const box1 = new Box2D(new Point(0, 2), new Point(10, 6));
			const box2 = new Box2D(new Point(20, 4), new Point(30, 8));
			const group = new GroupBox([box1, box2]);
			const axis = new Segment(new Point(0, 0), new Point(10, 0));
			const reflected = group.reflected(axis);

			expect(reflected.topLeft().x()).toBeCloseTo(0);
			expect(reflected.topLeft().y()).toBeCloseTo(-8);
			expect(reflected.bottomRight().x()).toBeCloseTo(30);
			expect(reflected.bottomRight().y()).toBeCloseTo(-2);
		});

		it("should reflect over vertical axis", () => {
			const box = new Box2D(new Point(2, 0), new Point(6, 4));
			const group = new GroupBox([box]);
			const axis = new Segment(new Point(0, 0), new Point(0, 10));
			const reflected = group.reflected(axis);

			expect(reflected.topLeft().x()).toBeCloseTo(-6);
			expect(reflected.topLeft().y()).toBeCloseTo(0);
			expect(reflected.bottomRight().x()).toBeCloseTo(-2);
			expect(reflected.bottomRight().y()).toBeCloseTo(4);
		});

		it("should handle nested GroupBox reflection", () => {
			const innerBox = new Box2D(new Point(0, 2), new Point(4, 6));
			const innerGroup = new GroupBox([innerBox]);
			const outerGroup = new GroupBox([innerGroup]);
			const axis = new Segment(new Point(0, 0), new Point(10, 0));
			const reflected = outerGroup.reflected(axis);

			expect(reflected.topLeft().x()).toBeCloseTo(0);
			expect(reflected.topLeft().y()).toBeCloseTo(-6);
			expect(reflected.bottomRight().x()).toBeCloseTo(4);
			expect(reflected.bottomRight().y()).toBeCloseTo(-2);
		});
	});

	describe("reflectedByHorizontal", () => {
		it("should preserve dimensions when reflecting over horizontal center axis", () => {
			const box = new Box2D(new Point(0, 0), new Point(10, 20));
			const group = new GroupBox([box]);
			const reflected = group.reflectedByHorizontal();

			expect(reflected.width()).toBeCloseTo(10);
			expect(reflected.height()).toBeCloseTo(20);
		});

		it("should keep group in same position when reflecting over its horizontal center", () => {
			const box = new Box2D(new Point(5, 10), new Point(15, 30));
			const group = new GroupBox([box]);
			const reflected = group.reflectedByHorizontal();

			expect(reflected.topLeft().x()).toBeCloseTo(5);
			expect(reflected.topLeft().y()).toBeCloseTo(10);
			expect(reflected.bottomRight().x()).toBeCloseTo(15);
			expect(reflected.bottomRight().y()).toBeCloseTo(30);
		});

		it("should reflect over y=0 axis when centered is false", () => {
			const box = new Box2D(new Point(0, 10), new Point(10, 20));
			const group = new GroupBox([box]);
			const reflected = group.reflectedByHorizontal(false);

			expect(reflected.topLeft().x()).toBeCloseTo(0);
			expect(reflected.topLeft().y()).toBeCloseTo(-20);
			expect(reflected.bottomRight().x()).toBeCloseTo(10);
			expect(reflected.bottomRight().y()).toBeCloseTo(-10);
		});
	});

	describe("reflectedByVertical", () => {
		it("should preserve dimensions when reflecting over vertical center axis", () => {
			const box = new Box2D(new Point(0, 0), new Point(10, 20));
			const group = new GroupBox([box]);
			const reflected = group.reflectedByVertical();

			expect(reflected.width()).toBeCloseTo(10);
			expect(reflected.height()).toBeCloseTo(20);
		});

		it("should keep group in same position when reflecting over its vertical center", () => {
			const box = new Box2D(new Point(5, 10), new Point(15, 30));
			const group = new GroupBox([box]);
			const reflected = group.reflectedByVertical();

			expect(reflected.topLeft().x()).toBeCloseTo(5);
			expect(reflected.topLeft().y()).toBeCloseTo(10);
			expect(reflected.bottomRight().x()).toBeCloseTo(15);
			expect(reflected.bottomRight().y()).toBeCloseTo(30);
		});

		it("should reflect over x=0 axis when centered is false", () => {
			const box = new Box2D(new Point(10, 0), new Point(20, 10));
			const group = new GroupBox([box]);
			const reflected = group.reflectedByVertical(false);

			expect(reflected.topLeft().x()).toBeCloseTo(-20);
			expect(reflected.topLeft().y()).toBeCloseTo(0);
			expect(reflected.bottomRight().x()).toBeCloseTo(-10);
			expect(reflected.bottomRight().y()).toBeCloseTo(10);
		});
	});
});
