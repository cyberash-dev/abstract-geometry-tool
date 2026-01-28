import { BoundingBox } from "./BoundingBox";
import { Point } from "./Point";

describe("BoundingBox", () => {
	describe("constructor and getters", () => {
		it("should store topLeft, width, height and rotation", () => {
			const box = new BoundingBox(new Point(5, 10), 20, 30, 45);

			expect(box.topLeft().x()).toBe(5);
			expect(box.topLeft().y()).toBe(10);
			expect(box.width()).toBe(20);
			expect(box.height()).toBe(30);
			expect(box.rotation()).toBe(45);
		});

		it("should default rotation to 0", () => {
			const box = new BoundingBox(new Point(0, 0), 100, 50);

			expect(box.rotation()).toBe(0);
		});

		it("should handle box at origin", () => {
			const box = new BoundingBox(new Point(0, 0), 100, 50);

			expect(box.topLeft().x()).toBe(0);
			expect(box.topLeft().y()).toBe(0);
			expect(box.width()).toBe(100);
			expect(box.height()).toBe(50);
		});

		it("should handle zero dimensions", () => {
			const box = new BoundingBox(new Point(10, 10), 0, 0);

			expect(box.width()).toBe(0);
			expect(box.height()).toBe(0);
		});

		it("should handle negative coordinates", () => {
			const box = new BoundingBox(new Point(-10, -20), 15, 25);

			expect(box.topLeft().x()).toBe(-10);
			expect(box.topLeft().y()).toBe(-20);
			expect(box.width()).toBe(15);
			expect(box.height()).toBe(25);
		});
	});

	describe("center", () => {
		it("should calculate center correctly", () => {
			const box = new BoundingBox(new Point(0, 0), 100, 50);

			expect(box.center().x()).toBe(50);
			expect(box.center().y()).toBe(25);
		});

		it("should calculate center for non-origin box", () => {
			const box = new BoundingBox(new Point(10, 20), 30, 40);

			expect(box.center().x()).toBe(25);
			expect(box.center().y()).toBe(40);
		});
	});
});
