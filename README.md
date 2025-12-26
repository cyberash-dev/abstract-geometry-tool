# Abstract Rotary Tool

A lightweight TypeScript library for 2D box geometry with rotation and reflection support.

## Features

- **Point** — immutable 2D point with rotation and reflection
- **Segment** — line segment defined by two points
- **Box2D** — axis-aligned bounding box with geometric transformations
- **GroupBox** — container for multiple boxes with group transformations

## Installation

```bash
npm install abstract-rotary-tool
```

## Usage

```typescript
import { Point, Segment, Box2D, GroupBox } from "abstract-rotary-tool";

// Create a box
const box = new Box2D(new Point(0, 0), new Point(100, 50));

// Get center point
const center = box.center();

// Rotate 45° around its center
const rotated = box.rotated(45);

// Rotate around a specific point
const rotatedAroundOrigin = box.rotated(90, new Point(0, 0));

// Reflect over a line
const axis = new Segment(new Point(0, 0), new Point(100, 0));
const reflected = box.reflected(axis);

// Reflect over horizontal/vertical axis through center
const flippedH = box.reflectedByHorizontal();
const flippedV = box.reflectedByVertical();

// Reflect over horizontal/vertical axis through origin
const flippedHOrigin = box.reflectedByHorizontal(false);
const flippedVOrigin = box.reflectedByVertical(false);

// Group multiple boxes
const group = new GroupBox([box1, box2, box3]);
const rotatedGroup = group.rotated(180);
const reflectedGroup = group.reflected(axis);
```

## API

### Point
- `new Point(x, y)` — create a point
- `x()`, `y()` — get coordinates
- `rotate(angleRad, center)` — rotate around center (radians)
- `reflect(axisStart, axisEnd)` — reflect over a line defined by two points

### Segment
- `new Segment(start, end)` — create a segment from two points
- `start()`, `end()` — get endpoints
- `length()` — get segment length

### Box2D
- `new Box2D(topLeft, bottomRight)` — create from corners
- `Box2D.fromTopLeftPointAndSize(topLeft, width, height)` — create from position and size
- `topLeft()`, `bottomRight()` — get corner points
- `center()` — get center point
- `width()`, `height()` — get dimensions
- `rotated(angle, center?)` — rotate by angle in degrees
- `reflected(axis)` — reflect over a line segment
- `reflectedByHorizontal(centered?)` — reflect over horizontal axis (y=0 if centered=false)
- `reflectedByVertical(centered?)` — reflect over vertical axis (x=0 if centered=false)

### GroupBox
- `new GroupBox(boxes)` — create from array of boxes
- `topLeft()`, `bottomRight()` — get bounding box corners
- `center()` — get center point of bounding box
- `width()`, `height()` — get bounding box dimensions
- `rotated(angle, center?)` — rotate all children around group center
- `reflected(axis)` — reflect all children over a line segment
- `reflectedByHorizontal(centered?)` — reflect over horizontal axis
- `reflectedByVertical(centered?)` — reflect over vertical axis

## License

ISC
