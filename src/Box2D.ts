import type { Box } from "./Box";
import { Point } from "./Point";
import { Segment } from "./Segment";

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

	rotated(angle: number, center?: Point) {
		const rotationCenter =
			center ??
			new Point(
				(this.topLeftPoint.x() + this.bottomRightPoint.x()) / 2,
				(this.topLeftPoint.y() + this.bottomRightPoint.y()) / 2,
			);
		const angleRad = (angle * Math.PI) / 180;
		const topLeft = this.topLeftPoint;
		const bottomRight = this.bottomRightPoint;
		const topRight = new Point(bottomRight.x(), topLeft.y());
		const bottomLeft = new Point(topLeft.x(), bottomRight.y());

		const rotatedCorners = [topLeft, topRight, bottomRight, bottomLeft].map((corner) =>
			corner.rotate(angleRad, rotationCenter),
		);

		const minX = Math.min(...rotatedCorners.map((corner) => corner.x()));
		const maxX = Math.max(...rotatedCorners.map((corner) => corner.x()));
		const minY = Math.min(...rotatedCorners.map((corner) => corner.y()));
		const maxY = Math.max(...rotatedCorners.map((corner) => corner.y()));

		return new Box2D(new Point(minX, minY), new Point(maxX, maxY));
	}

	reflected(axis: Segment): Box2D {
		const topLeft = this.topLeftPoint;
		const bottomRight = this.bottomRightPoint;
		const topRight = new Point(bottomRight.x(), topLeft.y());
		const bottomLeft = new Point(topLeft.x(), bottomRight.y());

		const reflectedCorners = [topLeft, topRight, bottomRight, bottomLeft].map((corner) =>
			corner.reflect(axis.start(), axis.end()),
		);

		const minX = Math.min(...reflectedCorners.map((corner) => corner.x()));
		const maxX = Math.max(...reflectedCorners.map((corner) => corner.x()));
		const minY = Math.min(...reflectedCorners.map((corner) => corner.y()));
		const maxY = Math.max(...reflectedCorners.map((corner) => corner.y()));

		return new Box2D(new Point(minX, minY), new Point(maxX, maxY));
	}

	reflectedByHorizontal(centered: boolean = true): Box2D {
		const axisY = centered ? (this.topLeftPoint.y() + this.bottomRightPoint.y()) / 2 : 0;

		return this.reflected(new Segment(new Point(0, axisY), new Point(1, axisY)));
	}

	reflectedByVertical(centered: boolean = true): Box2D {
		const axisX = centered ? (this.topLeftPoint.x() + this.bottomRightPoint.x()) / 2 : 0;

		return this.reflected(new Segment(new Point(axisX, 0), new Point(axisX, 1)));
	}
}
