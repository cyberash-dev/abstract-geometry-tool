import type { Box } from "./Box";
import { Point } from "./Point";

export class GroupBox implements Box {
	private readonly _boxes: Box[] = [];

	constructor(boxes: Box[]) {
		this._boxes = boxes;
	}

	topLeft(): Point {
		return this._boxes.reduce((min, box) => {
			return new Point(
				Math.min(min.x(), box.topLeft().x()),
				Math.min(min.y(), box.topLeft().y()),
			);
		}, this._boxes[0].topLeft());
	}

	bottomRight(): Point {
		return this._boxes.reduce((max, box) => {
			return new Point(
				Math.max(max.x(), box.bottomRight().x()),
				Math.max(max.y(), box.bottomRight().y()),
			);
		}, this._boxes[0].bottomRight());
	}

	width(): number {
		return this.bottomRight().x() - this.topLeft().x();
	}

	height(): number {
		return this.bottomRight().y() - this.topLeft().y();
	}

	rotate(angle: number, center?: Point): GroupBox {
		const rotationCenter =
			center ??
			new Point(
				(this.topLeft().x() + this.bottomRight().x()) / 2,
				(this.topLeft().y() + this.bottomRight().y()) / 2,
			);
		const rotatedChildren = this._boxes.map((child) => child.rotate(angle, rotationCenter));

		return new GroupBox(rotatedChildren);
	}
}
