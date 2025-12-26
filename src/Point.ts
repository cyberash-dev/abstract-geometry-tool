export class Point {
	private readonly _x: number;
	private readonly _y: number;

	constructor(x: number, y: number) {
		this._x = x;
		this._y = y;
	}

	x() {
		return this._x;
	}

	y() {
		return this._y;
	}

	rotated(angleRad: number, center: Point): Point {
		const cosAngle = Math.cos(angleRad);
		const sinAngle = Math.sin(angleRad);
		const offsetX = this.x() - center.x();
		const offsetY = this.y() - center.y();

		return new Point(
			center.x() + offsetX * cosAngle - offsetY * sinAngle,
			center.y() + offsetX * sinAngle + offsetY * cosAngle,
		);
	}

	reflected(axisStart: Point, axisEnd: Point): Point {
		const axisDirectionX = axisEnd.x() - axisStart.x();
		const axisDirectionY = axisEnd.y() - axisStart.y();
		const pointOffsetX = this.x() - axisStart.x();
		const pointOffsetY = this.y() - axisStart.y();

		const dotProduct = pointOffsetX * axisDirectionX + pointOffsetY * axisDirectionY;
		const axisLengthSquared = axisDirectionX * axisDirectionX + axisDirectionY * axisDirectionY;
		const projectionFactor = dotProduct / axisLengthSquared;

		const projectionX = axisStart.x() + projectionFactor * axisDirectionX;
		const projectionY = axisStart.y() + projectionFactor * axisDirectionY;

		return new Point(2 * projectionX - this.x(), 2 * projectionY - this.y());
	}
}
