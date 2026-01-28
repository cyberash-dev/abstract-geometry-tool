import type { BoundingBox } from "../BoundingBox";
import type { Point } from "../Point";

export type SegmentLike = {
	start(): Point;
	end(): Point;
};

export type Shape = {
	rotation(): number;
	rotated(angle: number, center?: Point): Shape;
	reflected(axis: SegmentLike): Shape;
	reflectedByHorizontal(centered?: boolean): Shape;
	reflectedByVertical(centered?: boolean): Shape;
	boundingBox(): BoundingBox;
	center(): Point;
};
