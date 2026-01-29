import { BoundingBox } from "../BoundingBox";
import { Point } from "../Point";
import { Segment } from "./Segment";
import type { Shape } from "./Shape";

export class Polyline implements Shape {
	private readonly _points: Point[] = [];
	private readonly _rotation: number = 0;

	constructor(points: Point[], rotation: number = 0) {
		this._points = points;
		this._rotation = rotation;
	}

	points(): Point[] {
		return [...this._points];
	}

	boundingBox(): BoundingBox {
		if (this._points.length === 0) {
			return new BoundingBox(new Point(0, 0), 0, 0, this._rotation);
		}

		const minX = Math.min(...this._points.map((point) => point.x()));
		const maxX = Math.max(...this._points.map((point) => point.x()));
		const minY = Math.min(...this._points.map((point) => point.y()));
		const maxY = Math.max(...this._points.map((point) => point.y()));

		return new BoundingBox(new Point(minX, minY), maxX - minX, maxY - minY, this._rotation);
	}

	center(): Point {
		if (this._points.length === 0) {
			return new Point(0, 0);
		}
		return new Point(
			(this._points[0].x() + this._points[this._points.length - 1].x()) / 2,
			(this._points[0].y() + this._points[this._points.length - 1].y()) / 2,
		);
	}

	rotation(): number {
		return this._rotation;
	}

	rotated(angleDegrees: number, center?: Point): Polyline {
		const rotationCenter = center ?? this.center();
		return new Polyline(
			this._points.map((point) => point.rotated(angleDegrees, rotationCenter)),
			this._rotation + angleDegrees,
		);
	}

	reflected(axis: Segment): Polyline {
		return new Polyline(
			this._points.map((point) => point.reflected(axis.start(), axis.end())),
			this._rotation,
		);
	}

	reflectedByHorizontal(centered?: boolean): Polyline {
		const axisY = centered !== false ? this.center().y() : 0;
		return this.reflected(new Segment(new Point(0, axisY), new Point(1, axisY)));
	}

	reflectedByVertical(centered?: boolean): Polyline {
		const axisX = centered !== false ? this.center().x() : 0;
		return this.reflected(new Segment(new Point(axisX, 0), new Point(axisX, 1)));
	}
}
