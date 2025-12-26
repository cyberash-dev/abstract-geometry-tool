import type { Point } from "./Point";
import type { Segment } from "./Segment";

export class Polyline {
	private readonly _points: Point[] = [];

	constructor(points: Point[]) {
		this._points = points;
	}

	points(): Point[] {
		return this._points;
	}

	rotated(angle: number, center: Point): Polyline {
		return new Polyline(this._points.map((point) => point.rotated(angle, center)));
	}

	reflected(axis: Segment): Polyline {
		return new Polyline(this._points.map((point) => point.reflected(axis.start(), axis.end())));
	}
}
