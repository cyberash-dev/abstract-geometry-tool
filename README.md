# Abstract Rotary Tool

A lightweight TypeScript library for 2D geometry operations with rotation and reflection support. Perfect for graphics applications, CAD tools, and geometric transformations.

## Features

- **Point** — immutable 2D point with rotation and reflection operations
- **Segment** — line segment defined by two points with length and center calculations
- **Polyline** — sequence of connected points with transformations
- **Rectangle** — rectangle with position, size, and rotation support
- **ShapeGroup** — container for multiple shapes with group transformations
- **BoundingBox** — axis-aligned bounding box with rotation support
- **Shape** — common interface for all transformable shapes
- Fully immutable — all operations return new instances
- TypeScript support with full type definitions
- Comprehensive test coverage (132 tests, 100% code coverage)

## Installation

```bash
npm install abstract-rotary-tool
```

## Usage

### Basic Shapes

```typescript
import { Point, Segment, Polyline, Rectangle, ShapeGroup } from "abstract-rotary-tool";

const point = new Point(10, 20);
console.log(point.x(), point.y());

const segment = new Segment(new Point(0, 0), new Point(10, 0));
console.log(segment.length());
console.log(segment.center());

const polyline = new Polyline([
  new Point(0, 0),
  new Point(10, 10),
  new Point(20, 0)
]);
console.log(polyline.boundingBox());
```

### Rectangle Operations

```typescript
const rect = new Rectangle(new Point(0, 0), new Point(100, 50));

const center = rect.center();
console.log(center.x(), center.y());

const rotated = rect.rotated(45);

const rotatedAroundOrigin = rect.rotated(90, new Point(0, 0));
```

### Reflections

```typescript
const rect = new Rectangle(new Point(0, 0), new Point(100, 50));

const axis = new Segment(new Point(0, 0), new Point(100, 0));
const reflected = rect.reflected(axis);

const flippedH = rect.reflectedByHorizontal();
const flippedV = rect.reflectedByVertical();

const flippedHOrigin = rect.reflectedByHorizontal(false);
const flippedVOrigin = rect.reflectedByVertical(false);
```

### Working with Groups

```typescript
const rect = new Rectangle(new Point(0, 0), new Point(50, 50));
const polyline = new Polyline([
  new Point(60, 0),
  new Point(70, 10),
  new Point(80, 0)
]);

const group = new ShapeGroup([rect, polyline]);

const rotatedGroup = group.rotated(180);
const reflectedGroup = group.reflected(axis);

const box = group.boundingBox();
console.log(box.topLeft(), box.width(), box.height());
```

### Point Transformations

```typescript
const point = new Point(10, 0);

const rotated = point.rotated(90, new Point(0, 0));
console.log(rotated.x(), rotated.y());

const reflected = point.reflected(new Point(0, 0), new Point(1, 1));
console.log(reflected.x(), reflected.y());
```

### Using Utility Functions

```typescript
import { degreesToRadians, radiansToDegrees } from "abstract-rotary-tool";

const radians = degreesToRadians(90);
const degrees = radiansToDegrees(Math.PI / 2);

console.log(radians);
console.log(degrees);
```

## API

### Point
- `new Point(x, y)` — create a point
- `x()`, `y()` — get coordinates
- `rotated(angleDegrees, center)` — rotate around center (degrees)
- `reflected(axisStart, axisEnd)` — reflect over a line defined by two points

### Segment
- `new Segment(start, end)` — create a segment from two points
- `start()`, `end()` — get endpoints
- `length()` — get segment length
- `center()` — get center point (midpoint)
- `boundingBox()` — get bounding box
- `rotated(angleDegrees, center?)` — rotate around center (degrees)
- `reflected(axis)` — reflect over a line segment
- `reflectedByHorizontal(centered?)` — reflect over horizontal axis (y=0 if centered=false)
- `reflectedByVertical(centered?)` — reflect over vertical axis (x=0 if centered=false)

### Polyline
- `new Polyline(points)` — create from array of points
- `points()` — get all points
- `center()` — get center point (midpoint between first and last point)
- `boundingBox()` — get bounding box
- `rotated(angleDegrees, center?)` — rotate all points around center (degrees)
- `reflected(axis)` — reflect all points over a line segment
- `reflectedByHorizontal(centered?)` — reflect over horizontal axis (y=0 if centered=false)
- `reflectedByVertical(centered?)` — reflect over vertical axis (x=0 if centered=false)

### Rectangle
- `new Rectangle(topLeft, bottomRight, rotation?)` — create from corners with optional rotation
- `Rectangle.fromTopLeftPointAndSize(topLeft, width, height, rotation?)` — create from position and size
- `topLeft()`, `bottomRight()` — get corner points
- `center()` — get center point
- `width()`, `height()` — get dimensions
- `boundingBox()` — get bounding box with rotation
- `rotated(angleDegrees, center?)` — rotate by angle in degrees
- `reflected(axis)` — reflect over a line segment
- `reflectedByHorizontal(centered?)` — reflect over horizontal axis (y=0 if centered=false)
- `reflectedByVertical(centered?)` — reflect over vertical axis (x=0 if centered=false)

### ShapeGroup
- `new ShapeGroup(shapes)` — create from array of shapes
- `shapes()` — get all shapes (returns a copy)
- `center()` — get center point of bounding box
- `boundingBox()` — get combined bounding box of all shapes (handles rotation)
- `rotated(angleDegrees, center?)` — rotate all shapes around group center (degrees)
- `reflected(axis)` — reflect all shapes over a line segment
- `reflectedByHorizontal(centered?)` — reflect over horizontal axis
- `reflectedByVertical(centered?)` — reflect over vertical axis

### BoundingBox
- `new BoundingBox(topLeft, width, height, rotation?)` — create bounding box with optional rotation
- `topLeft()` — get top-left corner
- `width()`, `height()` — get dimensions
- `rotation()` — get rotation angle in degrees
- `center()` — get center point

### Shape (interface)
All shapes implement this interface:
- `rotated(angleDegrees, center?)` — rotate shape (degrees)
- `reflected(axis)` — reflect shape over a line
- `reflectedByHorizontal(centered?)` — reflect over horizontal axis
- `reflectedByVertical(centered?)` — reflect over vertical axis
- `boundingBox()` — get bounding box

### Utility Functions
- `degreesToRadians(degrees)` — convert degrees to radians
- `radiansToDegrees(radians)` — convert radians to degrees

## Development

```bash
npm install

npm test

npm run build
```

## Key Concepts

### Immutability
All shapes are immutable. Transformation methods return new instances rather than modifying the original:

```typescript
const rect = new Rectangle(new Point(0, 0), new Point(10, 10));
const rotated = rect.rotated(45);
```

### Rotation
All rotation methods use **degrees** for consistency:
- `Point.rotated(angleDegrees, center)` — rotate point by degrees
- `Segment.rotated(angleDegrees, center?)` — rotate segment by degrees
- `Polyline.rotated(angleDegrees, center?)` — rotate polyline by degrees
- `Rectangle.rotated(angleDegrees, center?)` — rotate rectangle by degrees
- `ShapeGroup.rotated(angleDegrees, center?)` — rotate all shapes by degrees

If you need to work with radians, use the provided utility functions:
```typescript
import { degreesToRadians, radiansToDegrees } from "abstract-rotary-tool";

const angleInDegrees = radiansToDegrees(Math.PI / 2);
const point = new Point(10, 0).rotated(angleInDegrees, new Point(0, 0));
```

### Reflection
All shapes support reflection over arbitrary axes, as well as convenient horizontal and vertical reflections:
- `centered=true` (default): reflects over axis through shape's center
- `centered=false`: reflects over axis through origin (x=0 or y=0)

### Bounding Boxes
Bounding boxes support rotation and are calculated considering rotated shapes. For `ShapeGroup`, the bounding box encompasses all rotated shapes.

## License

ISC
