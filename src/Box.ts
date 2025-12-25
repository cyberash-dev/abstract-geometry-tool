import type { Point } from "./Point";
import type { Segment } from "./Segment";

export type Box = {
	topLeft(): Point;
	bottomRight(): Point;
	width(): number;
	height(): number;
	rotate(angle: number, center?: Point): Box;
	reflect(axis: Segment): Box;
};
