import { Point } from "./Point";

export class BoundingBox {
	private readonly topLeftPoint: Point;
	private readonly _width: number;
	private readonly _height: number;
	private readonly _rotation: number;

	constructor(topLeftPoint: Point, width: number, height: number, rotation: number = 0) {
		this.topLeftPoint = topLeftPoint;
		this._width = width;
		this._height = height;
		this._rotation = rotation;
	}

	topLeft(): Point {
		return this.topLeftPoint;
	}

	width(): number {
		return this._width;
	}

	height(): number {
		return this._height;
	}

	rotation(): number {
		return this._rotation;
	}

	center(): Point {
		return new Point(
			this.topLeftPoint.x() + this._width / 2,
			this.topLeftPoint.y() + this._height / 2,
		);
	}
}
