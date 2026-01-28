import { degreesToRadians, radiansToDegrees } from "./angle";

describe("angle utilities", () => {
	describe("degreesToRadians", () => {
		it("should convert 0 degrees to 0 radians", () => {
			expect(degreesToRadians(0)).toBe(0);
		});

		it("should convert 90 degrees to π/2 radians", () => {
			expect(degreesToRadians(90)).toBeCloseTo(Math.PI / 2);
		});

		it("should convert 180 degrees to π radians", () => {
			expect(degreesToRadians(180)).toBeCloseTo(Math.PI);
		});

		it("should convert 360 degrees to 2π radians", () => {
			expect(degreesToRadians(360)).toBeCloseTo(2 * Math.PI);
		});

		it("should handle negative degrees", () => {
			expect(degreesToRadians(-90)).toBeCloseTo(-Math.PI / 2);
		});

		it("should convert 45 degrees to π/4 radians", () => {
			expect(degreesToRadians(45)).toBeCloseTo(Math.PI / 4);
		});
	});

	describe("radiansToDegrees", () => {
		it("should convert 0 radians to 0 degrees", () => {
			expect(radiansToDegrees(0)).toBe(0);
		});

		it("should convert π/2 radians to 90 degrees", () => {
			expect(radiansToDegrees(Math.PI / 2)).toBeCloseTo(90);
		});

		it("should convert π radians to 180 degrees", () => {
			expect(radiansToDegrees(Math.PI)).toBeCloseTo(180);
		});

		it("should convert 2π radians to 360 degrees", () => {
			expect(radiansToDegrees(2 * Math.PI)).toBeCloseTo(360);
		});

		it("should handle negative radians", () => {
			expect(radiansToDegrees(-Math.PI / 2)).toBeCloseTo(-90);
		});

		it("should convert π/4 radians to 45 degrees", () => {
			expect(radiansToDegrees(Math.PI / 4)).toBeCloseTo(45);
		});
	});

	describe("round-trip conversions", () => {
		it("should preserve value when converting degrees -> radians -> degrees", () => {
			const originalDegrees = 123.456;
			const radians = degreesToRadians(originalDegrees);
			const backToDegrees = radiansToDegrees(radians);
			expect(backToDegrees).toBeCloseTo(originalDegrees);
		});

		it("should preserve value when converting radians -> degrees -> radians", () => {
			const originalRadians = 2.5;
			const degrees = radiansToDegrees(originalRadians);
			const backToRadians = degreesToRadians(degrees);
			expect(backToRadians).toBeCloseTo(originalRadians);
		});
	});
});
