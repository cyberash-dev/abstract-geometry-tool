import type { Box } from "./Box";
import { Point } from "./Point";

export class Box2D implements Box {
	public readonly topLeftPoint: Point;
	public readonly bottomRightPoint: Point;

	constructor(topLeft: Point, bottomRight: Point) {
		this.topLeftPoint = topLeft;
		this.bottomRightPoint = bottomRight;
	}

	static fromTopLeftPointAndSize(topLeft: Point, width: number, height: number): Box2D {
		return new Box2D(topLeft, new Point(topLeft.x() + width, topLeft.y() + height));
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

	rotate(angle: number, center?: Point) {
		const rotationCenter =
			center ??
			new Point(
				(this.topLeftPoint.x() + this.bottomRightPoint.x()) / 2,
				(this.topLeftPoint.y() + this.bottomRightPoint.y()) / 2,
			);
		const angleRad = (angle * Math.PI) / 180;
		const tl = this.topLeftPoint;
		const br = this.bottomRightPoint;
		const tr = new Point(br.x(), tl.y());
		const bl = new Point(tl.x(), br.y());

		const corners = [tl, tr, br, bl].map((p) => p.rotate(angleRad, rotationCenter));

		const minX = Math.min(...corners.map((p) => p.x()));
		const maxX = Math.max(...corners.map((p) => p.x()));
		const minY = Math.min(...corners.map((p) => p.y()));
		const maxY = Math.max(...corners.map((p) => p.y()));

		return new Box2D(new Point(minX, minY), new Point(maxX, maxY));
	}
}
