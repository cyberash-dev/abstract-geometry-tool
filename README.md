# Abstract Rotary Tool

A lightweight TypeScript library for 2D box geometry with rotation support.

## Features

- **Point** — immutable 2D point with rotation around any center
- **Box2D** — axis-aligned bounding box with geometric rotation
- **GroupBox** — container for multiple boxes, rotates children around group center

## Installation

```bash
npm install abstract-rotary-tool
```

## Usage

```typescript
import { Point, Box2D, GroupBox } from "abstract-rotary-tool";

// Create a box
const box = new Box2D(new Point(0, 0), new Point(100, 50));

// Rotate 45° around its center
const rotated = box.rotate(45);

// Rotate around a specific point
const rotatedAroundOrigin = box.rotate(90, new Point(0, 0));

// Group multiple boxes
const group = new GroupBox([box1, box2, box3]);
const rotatedGroup = group.rotate(180);
```

## API

### Point
- `new Point(x, y)` — create a point
- `x()`, `y()` — get coordinates
- `rotate(angleRad, center)` — rotate around center (radians)

### Box2D
- `new Box2D(topLeft, bottomRight)` — create from corners
- `Box2D.fromTopLeftPointAndSize(topLeft, width, height)` — create from position and size
- `topLeft()`, `bottomRight()` — get corner points
- `width()`, `height()` — get dimensions
- `rotate(angle, center?)` — rotate by angle in degrees

### GroupBox
- `new GroupBox(boxes)` — create from array of boxes
- `rotate(angle, center?)` — rotate all children around group center

## License

ISC
