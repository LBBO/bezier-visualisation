import paper from 'paper'
import { binomial } from './Math'

const BernsteinPoly = (n: number, i: number, t: number): number => {
  let binomialResult: number

  try {
    binomialResult = binomial(n, i)
  } catch (e) {
    binomialResult = 0
  }

  return binomialResult * t ** i * (1 - t) ** (n - i)
}

const bezierCurve = (t: number, basePoints: Array<paper.Point>) => {
  let sum = new paper.Point(0, 0)
  const n = basePoints.length - 1

  for (let i = 0; i <= n; i++) {
    sum = sum.add(basePoints[i].clone().multiply(BernsteinPoly(n, i, t)))
  }

  return sum
}

export class BezierCurve extends paper.Group {
  #basePoints: Array<paper.Point>
  #curvePath = new paper.Path()
  #basePointVisualisation = new paper.Group()

  constructor(basePoints: Array<paper.Point>) {
    super()
    this.#basePoints = basePoints.map((point) => point.clone())
    this.addChild(this.#curvePath)
    this.addChild(this.#basePointVisualisation)

    this.createBasePointVisualisations()
    this.createCurve()
  }

  private createCurve() {
    this.#curvePath.removeSegments()
    this.#curvePath.strokeColor = new paper.Color('black')

    const [...curvePoints] = Array(50 + 1)
      .fill(1)
      .map((_, index) => index / 50)
      .map((t) => bezierCurve(t, this.#basePoints))
    curvePoints.forEach((point) => this.#curvePath.add(point))
  }

  private createBasePointVisualisations() {
    this.#basePointVisualisation.remove()

    this.#basePointVisualisation = new paper.Group(
      this.#basePoints.map((point, pointIndex) => {
        const circle = new paper.Path.Circle(point, 3)
        circle.fillColor = new paper.Color('red')
        circle.onMouseDrag = (event: paper.MouseEvent) => {
          event.stop()
          this.basePoints = this.#basePoints.map((currPoint, currIndex) =>
            currIndex === pointIndex
              ? currPoint.clone().add(event.delta)
              : currPoint,
          )
        }

        circle.onClick = (event: paper.MouseEvent & { event: MouseEvent }) => {
          if (event.event.button === 2) {
            event.stop()
            this.basePoints = this.#basePoints.filter(
              (currPoint, currIndex) => currIndex !== pointIndex,
            )
          }
        }

        let oldCursor: string = 'default'
        circle.onMouseEnter = () => {
          oldCursor = circle.project.view.element.style.cursor
          circle.project.view.element.style.cursor = 'pointer'
        }
        circle.onMouseLeave = () => {
          circle.project.view.element.style.cursor = oldCursor
        }

        return circle
      }),
    )
  }

  get degree(): number {
    return this.#basePoints.length - 1
  }

  get basePoints(): Array<paper.Point> {
    return this.#basePoints
  }

  set basePoints(value: Array<paper.Point>) {
    this.#basePoints = value.map((point) => point.clone())
    this.createBasePointVisualisations()
    this.createCurve()
  }
}
