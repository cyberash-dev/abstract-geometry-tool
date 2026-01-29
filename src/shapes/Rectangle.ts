import { BoundingBox } from "../BoundingBox";
import { Point } from "../Point";
import { Segment } from "./Segment";
import type { Shape } from "./Shape";

export class Rectangle implements Shape {
	public readonly topLeftPoint: Point;
	public readonly bottomRightPoint: Point;
	private readonly _rotation: number = 0;

	constructor(topLeft: Point, bottomRight: Point, rotation: number = 0) {
		this.topLeftPoint = topLeft;
		this.bottomRightPoint = bottomRight;
		this._rotation = rotation;
	}

	static fromTopLeftPointAndSize(
		topLeft: Point,
		width: number,
		height: number,
		rotation: number = 0,
	): Rectangle {
		return new Rectangle(
			topLeft,
			new Point(topLeft.x() + width, topLeft.y() + height),
			rotation,
		);
	}

	center(): Point {
		return new Point(
			(this.topLeftPoint.x() + this.bottomRightPoint.x()) / 2,
			(this.topLeftPoint.y() + this.bottomRightPoint.y()) / 2,
		);
	}

	topLeft(): Point {
		return this.topLeftPoint;
	}

	bottomRight(): Point {
		return this.bottomRightPoint;
	}

	width(): number {
		return this.bottomRightPoint.x() - this.topLeftPoint.x();
	}

	height(): number {
		return this.bottomRightPoint.y() - this.topLeftPoint.y();
	}

	boundingBox(): BoundingBox {
		return new BoundingBox(this.topLeftPoint, this.width(), this.height(), this._rotation);
	}

	rotation(): number {
		return this._rotation;
	}

	rotated(angleDegrees: number, pivot?: Point): Rectangle {
		const pivotPoint = pivot ?? this.center();
		const center = this.center();
		const rotatedCenter = center.rotated(angleDegrees, pivotPoint);

		const newTopLeftX = rotatedCenter.x() - this.width() / 2;
		const newTopLeftY = rotatedCenter.y() - this.height() / 2;

		return new Rectangle(
			new Point(newTopLeftX, newTopLeftY),
			new Point(newTopLeftX + this.width(), newTopLeftY + this.height()),
			this._rotation + angleDegrees,
		);
	}

	reflected(axis: Segment): Rectangle {
		const center = this.center();
		const reflectedCenter = center.reflected(axis.start(), axis.end());

		const newTopLeftX = reflectedCenter.x() - this.width() / 2;
		const newTopLeftY = reflectedCenter.y() - this.height() / 2;

		const mirrorAngle = -this._rotation;

		return new Rectangle(
			new Point(newTopLeftX, newTopLeftY),
			new Point(newTopLeftX + this.width(), newTopLeftY + this.height()),
			mirrorAngle,
		);
	}

	reflectedByHorizontal(centered: boolean = true): Rectangle {
		const axisY = centered ? this.center().y() : 0;
		return this.reflected(
			new Segment(new Point(0, axisY), new Point(1, axisY), this._rotation),
		);
	}

	reflectedByVertical(centered: boolean = true): Rectangle {
		const axisX = centered ? this.center().x() : 0;
		return this.reflected(
			new Segment(new Point(axisX, 0), new Point(axisX, 1), this._rotation),
		);
	}
}
