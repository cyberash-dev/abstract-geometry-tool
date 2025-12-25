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

	rotate(angleRad: number, center: Point): Point {
		const cos = Math.cos(angleRad);
		const sin = Math.sin(angleRad);
		const dx = this.x() - center.x();
		const dy = this.y() - center.y();

		return new Point(center.x() + dx * cos - dy * sin, center.y() + dx * sin + dy * cos);
	}
}
