import type { Point } from "./Point";

export class Segment {
	private readonly _start: Point;
	private readonly _end: Point;

	constructor(start: Point, end: Point) {
		this._start = start;
		this._end = end;
	}

	start(): Point {
		return this._start;
	}

	end(): Point {
		return this._end;
	}

    length(): number {
        return Math.sqrt((this._end.x() - this._start.x()) ** 2 + (this._end.y() - this._start.y()) ** 2);
    }
}
