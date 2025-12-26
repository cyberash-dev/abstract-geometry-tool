import type { Point } from "./Point";
import type { Segment } from "./Segment";

export type Box = {
	topLeft(): Point;
	bottomRight(): Point;
	width(): number;
	height(): number;
	center(): Point;
	rotated(angle: number, center?: Point): Box;
	reflected(axis: Segment): Box;
	reflectedByHorizontal(centered?: boolean): Box;
	reflectedByVertical(centered?: boolean): Box;
};
