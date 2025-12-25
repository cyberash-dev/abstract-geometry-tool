import type { Point } from "./Point";

export type Box = {
	topLeft(): Point;
	bottomRight(): Point;
	width(): number;
	height(): number;
	rotate(angle: number, center?: Point): Box;
};
