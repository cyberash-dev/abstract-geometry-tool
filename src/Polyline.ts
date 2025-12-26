import { Point } from "./Point";
import { Segment } from "./Segment";

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

    center(): Point {
		return new Point(
			(this._points[0].x() + this._points[this._points.length - 1].x()) / 2,
			(this._points[0].y() + this._points[this._points.length - 1].y()) / 2,
		);
	}

	reflectedByHorizontal(centered?: boolean): Polyline {
		const axisY = centered ? this.center().y() : 0;

		return this.reflected(new Segment(new Point(0, axisY), new Point(1, axisY)));
	}

	reflectedByVertical(centered?: boolean): Polyline {
		const axisX = centered ? this.center().x() : 0;

		return this.reflected(new Segment(new Point(axisX, 0), new Point(axisX, 1)));
	}
}
