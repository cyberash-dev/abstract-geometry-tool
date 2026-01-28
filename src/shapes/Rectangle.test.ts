import { Point } from "../Point";
import { Rectangle } from "./Rectangle";
import { Segment } from "./Segment";

describe("Rectangle", () => {
	describe("constructor", () => {
		it("should create rectangle from two points", () => {
			const rect = new Rectangle(new Point(0, 0), new Point(10, 10));

			expect(rect.topLeft().x()).toBe(0);
			expect(rect.topLeft().y()).toBe(0);
			expect(rect.bottomRight().x()).toBe(10);
			expect(rect.bottomRight().y()).toBe(10);
		});
	});

	describe("fromTopLeftPointAndSize", () => {
		it("should create rectangle from top-left point and dimensions", () => {
			const rect = Rectangle.fromTopLeftPointAndSize(new Point(5, 5), 20, 10);

			expect(rect.topLeft().x()).toBe(5);
			expect(rect.topLeft().y()).toBe(5);
			expect(rect.bottomRight().x()).toBe(25);
			expect(rect.bottomRight().y()).toBe(15);
		});
	});

	describe("width and height", () => {
		it("should calculate correct dimensions", () => {
			const rect = new Rectangle(new Point(0, 0), new Point(30, 20));

			expect(rect.width()).toBe(30);
			expect(rect.height()).toBe(20);
		});

		it("should handle rectangles not at origin", () => {
			const rect = new Rectangle(new Point(10, 20), new Point(50, 60));

			expect(rect.width()).toBe(40);
			expect(rect.height()).toBe(40);
		});
	});

	describe("center", () => {
		it("should calculate center of rectangle at origin", () => {
			const rect = new Rectangle(new Point(0, 0), new Point(10, 20));

			expect(rect.center().x()).toBe(5);
			expect(rect.center().y()).toBe(10);
		});

		it("should calculate center of rectangle not at origin", () => {
			const rect = new Rectangle(new Point(10, 20), new Point(30, 40));

			expect(rect.center().x()).toBe(20);
			expect(rect.center().y()).toBe(30);
		});
	});


	describe("rotated", () => {
		it("should preserve dimensions when rotated (Transform approach)", () => {
			const rect = new Rectangle(new Point(0, 0), new Point(10, 20));
			const rotated = rect.rotated(90);

			expect(rotated.width()).toBeCloseTo(10);
			expect(rotated.height()).toBeCloseTo(20);
			expect(rotated.rotation()).toBe(90);
		});

		it("should rotate 180 degrees and maintain dimensions", () => {
			const rect = new Rectangle(new Point(0, 0), new Point(10, 20));
			const rotated = rect.rotated(180);

			expect(rotated.width()).toBeCloseTo(10);
			expect(rotated.height()).toBeCloseTo(20);
			expect(rotated.rotation()).toBe(180);
		});

		it("should rotate around own center keeping position unchanged", () => {
			const rect = new Rectangle(new Point(0, 0), new Point(10, 20));
			const rotated = rect.rotated(30);

			expect(rotated.center().x()).toBeCloseTo(rect.center().x());
			expect(rotated.center().y()).toBeCloseTo(rect.center().y());
		});

		it("should rotate around specified pivot point", () => {
			const rect = new Rectangle(new Point(0, 0), new Point(2, 2));
			const pivot = new Point(0, 0);
			const rotated = rect.rotated(90, pivot);

			expect(rotated.width()).toBe(2);
			expect(rotated.height()).toBe(2);
			expect(rotated.center().x()).toBeCloseTo(-1);
			expect(rotated.center().y()).toBeCloseTo(1);
		});

		it("should accumulate rotation angle", () => {
			const rect = new Rectangle(new Point(0, 0), new Point(10, 20));
			const rotated1 = rect.rotated(30);
			const rotated2 = rotated1.rotated(45);

			expect(rotated2.rotation()).toBe(75);
		});
	});

	describe("boundingBox", () => {
		it("should return bounding box with same dimensions and rotation", () => {
			const rect = new Rectangle(new Point(5, 10), new Point(25, 40), 30);
			const box = rect.boundingBox();

			expect(box.topLeft().x()).toBe(5);
			expect(box.topLeft().y()).toBe(10);
			expect(box.width()).toBe(20);
			expect(box.height()).toBe(30);
			expect(box.rotation()).toBe(30);
		});

		it("should preserve rotation in bounding box", () => {
			const rect = new Rectangle(new Point(0, 0), new Point(100, 50), 45);
			const box = rect.boundingBox();

			expect(box.width()).toBe(100);
			expect(box.height()).toBe(50);
			expect(box.rotation()).toBe(45);
		});
	});

	describe("reflected", () => {
		it("should reflect over horizontal axis", () => {
			const rect = new Rectangle(new Point(0, 2), new Point(4, 6));
			const axis = new Segment(new Point(0, 0), new Point(10, 0));
			const reflected = rect.reflected(axis);

			expect(reflected.topLeft().x()).toBeCloseTo(0);
			expect(reflected.topLeft().y()).toBeCloseTo(-6);
			expect(reflected.bottomRight().x()).toBeCloseTo(4);
			expect(reflected.bottomRight().y()).toBeCloseTo(-2);
		});

		it("should reflect over vertical axis", () => {
			const rect = new Rectangle(new Point(2, 0), new Point(6, 4));
			const axis = new Segment(new Point(0, 0), new Point(0, 10));
			const reflected = rect.reflected(axis);

			expect(reflected.topLeft().x()).toBeCloseTo(-6);
			expect(reflected.topLeft().y()).toBeCloseTo(0);
			expect(reflected.bottomRight().x()).toBeCloseTo(-2);
			expect(reflected.bottomRight().y()).toBeCloseTo(4);
		});
	});

	describe("reflectedByHorizontal", () => {
		it("should preserve dimensions when reflecting over horizontal center axis", () => {
			const rect = new Rectangle(new Point(0, 0), new Point(10, 20));
			const reflected = rect.reflectedByHorizontal();

			expect(reflected.width()).toBeCloseTo(10);
			expect(reflected.height()).toBeCloseTo(20);
		});

		it("should reflect over y=0 axis when centered is false", () => {
			const rect = new Rectangle(new Point(0, 10), new Point(10, 20));
			const reflected = rect.reflectedByHorizontal(false);

			expect(reflected.topLeft().x()).toBeCloseTo(0);
			expect(reflected.topLeft().y()).toBeCloseTo(-20);
			expect(reflected.bottomRight().x()).toBeCloseTo(10);
			expect(reflected.bottomRight().y()).toBeCloseTo(-10);
		});
	});

	describe("reflectedByVertical", () => {
		it("should preserve dimensions when reflecting over vertical center axis", () => {
			const rect = new Rectangle(new Point(0, 0), new Point(10, 20));
			const reflected = rect.reflectedByVertical();

			expect(reflected.width()).toBeCloseTo(10);
			expect(reflected.height()).toBeCloseTo(20);
		});

		it("should reflect over x=0 axis when centered is false", () => {
			const rect = new Rectangle(new Point(10, 0), new Point(20, 10));
			const reflected = rect.reflectedByVertical(false);

			expect(reflected.topLeft().x()).toBeCloseTo(-20);
			expect(reflected.topLeft().y()).toBeCloseTo(0);
			expect(reflected.bottomRight().x()).toBeCloseTo(-10);
			expect(reflected.bottomRight().y()).toBeCloseTo(10);
		});
	});
});
