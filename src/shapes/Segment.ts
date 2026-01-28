import { BoundingBox } from "../BoundingBox";
import { Point } from "../Point";
import type { SegmentLike, Shape } from "./Shape";

export class Segment implements Shape {
	private readonly _start: Point;
	private readonly _end: Point;
	private readonly _rotation: number = 0;

	constructor(start: Point, end: Point, rotation: number = 0) {
		this._start = start;
		this._end = end;
		this._rotation = rotation;
	}

	start(): Point {
		return this._start;
	}

	end(): Point {
		return this._end;
	}

	length(): number {
		return Math.sqrt(
			(this._end.x() - this._start.x()) ** 2 + (this._end.y() - this._start.y()) ** 2,
		);
	}

	center(): Point {
		return new Point(
			(this._start.x() + this._end.x()) / 2,
			(this._start.y() + this._end.y()) / 2,
		);
	}

	boundingBox(): BoundingBox {
		const minX = Math.min(this._start.x(), this._end.x());
		const maxX = Math.max(this._start.x(), this._end.x());
		const minY = Math.min(this._start.y(), this._end.y());
		const maxY = Math.max(this._start.y(), this._end.y());
		return new BoundingBox(new Point(minX, minY), maxX - minX, maxY - minY, this._rotation);
	}

	rotation(): number {
		return this._rotation;
	}

	rotated(angleDegrees: number, center?: Point): Segment {
		const rotationCenter = center ?? this.center();
		return new Segment(
			this._start.rotated(angleDegrees, rotationCenter),
			this._end.rotated(angleDegrees, rotationCenter),
			this._rotation + angleDegrees,
		);
	}

	reflected(axis: SegmentLike): Segment {
		return new Segment(
			this._start.reflected(axis.start(), axis.end()),
			this._end.reflected(axis.start(), axis.end()),
			this._rotation,
		);
	}

	reflectedByHorizontal(centered?: boolean): Segment {
		const axisY = centered !== false ? this.center().y() : 0;
		const axis = new Segment(new Point(0, axisY), new Point(1, axisY));
		return this.reflected(axis);
	}

	reflectedByVertical(centered?: boolean): Segment {
		const axisX = centered !== false ? this.center().x() : 0;
		const axis = new Segment(new Point(axisX, 0), new Point(axisX, 1));
		return this.reflected(axis);
	}
}
