import { BoundingBox } from "../BoundingBox";
import { Point } from "../Point";
import { Segment } from "./Segment";
import type { Shape } from "./Shape";

export class ShapeGroup implements Shape {
	private readonly _shapes: Shape[];
	private readonly _rotation: number;

	constructor(shapes: Shape[], rotation: number = 0) {
		this._shapes = shapes;
		this._rotation = rotation;
	}

	shapes(): Shape[] {
		return [...this._shapes];
	}

	boundingBox(): BoundingBox {
		if (this._shapes.length === 0) {
			return new BoundingBox(new Point(0, 0), 0, 0, this._rotation);
		}

		const allCorners: Point[] = [];

		for (const shape of this._shapes) {
			const bbox = shape.boundingBox();
			const bboxWidth = bbox.width();
			const bboxHeight = bbox.height();
			const rotation = bbox.rotation();
			const center = shape.center();

			const halfWidth = bboxWidth / 2;
			const halfHeight = bboxHeight / 2;

			const localCorners: Point[] = [
				new Point(center.x() - halfWidth, center.y() - halfHeight),
				new Point(center.x() + halfWidth, center.y() - halfHeight),
				new Point(center.x() + halfWidth, center.y() + halfHeight),
				new Point(center.x() - halfWidth, center.y() + halfHeight),
			];

			if (rotation !== 0) {
				allCorners.push(...localCorners.map((corner) => corner.rotated(rotation, center)));
			} else {
				allCorners.push(...localCorners);
			}
		}

		const worldMinX = Math.min(...allCorners.map((p) => p.x()));
		const worldMaxX = Math.max(...allCorners.map((p) => p.x()));
		const worldMinY = Math.min(...allCorners.map((p) => p.y()));
		const worldMaxY = Math.max(...allCorners.map((p) => p.y()));

		const groupCenter = new Point((worldMinX + worldMaxX) / 2, (worldMinY + worldMaxY) / 2);

		if (this._rotation !== 0) {
			const rotatedBack = allCorners.map((corner) =>
				corner.rotated(-this._rotation, groupCenter),
			);
			const minX = Math.min(...rotatedBack.map((p) => p.x()));
			const maxX = Math.max(...rotatedBack.map((p) => p.x()));
			const minY = Math.min(...rotatedBack.map((p) => p.y()));
			const maxY = Math.max(...rotatedBack.map((p) => p.y()));

			return new BoundingBox(new Point(minX, minY), maxX - minX, maxY - minY, this._rotation);
		} else {
			return new BoundingBox(
				new Point(worldMinX, worldMinY),
				worldMaxX - worldMinX,
				worldMaxY - worldMinY,
				this._rotation,
			);
		}
	}

	center(): Point {
		const box = this.boundingBox();

		return new Point(box.topLeft().x() + box.width() / 2, box.topLeft().y() + box.height() / 2);
	}

	rotation(): number {
		return this._rotation;
	}

	rotated(angleDegrees: number, center?: Point): ShapeGroup {
		const rotationCenter = center ?? this.center();
		return new ShapeGroup(
			this._shapes.map((shape) => shape.rotated(angleDegrees, rotationCenter)),
			this._rotation + angleDegrees,
		);
	}

	reflected(axis: Segment): ShapeGroup {
		return new ShapeGroup(
			this._shapes.map((shape) => shape.reflected(axis)),
			this._rotation,
		);
	}

	reflectedByHorizontal(centered?: boolean): ShapeGroup {
		const axisY = centered !== false ? this.center().y() : 0;
		const axis = new Segment(new Point(0, axisY), new Point(1, axisY));

		return new ShapeGroup(
			this._shapes.map((shape) => shape.reflected(axis)),
			this._rotation,
		);
	}

	reflectedByVertical(centered?: boolean): ShapeGroup {
		const axisX = centered !== false ? this.center().x() : 0;
		const axis = new Segment(new Point(axisX, 0), new Point(axisX, 1));

		return new ShapeGroup(
			this._shapes.map((shape) => shape.reflected(axis)),
			this._rotation,
		);
	}
}
