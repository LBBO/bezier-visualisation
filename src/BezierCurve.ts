import paper from 'paper'
import { binomial } from './Math'
import { BasePoints } from './BasePoints'

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
  #basePoints: BasePoints | Array<paper.Point>
  #curvePath = new paper.Path()
  #basePointVisualisation = new paper.Group()

  constructor(basePoints: BasePoints | Array<paper.Point>) {
    super()
    this.#basePoints = basePoints
    this.addChild(this.#curvePath)
    this.addChild(this.#basePointVisualisation)

    if (basePoints instanceof BasePoints) {
      basePoints.addEventListener('update', this.createCurve)
    }

    this.createCurve()
  }

  private createCurve = () => {
    this.#curvePath.removeSegments()
    this.#curvePath.strokeColor = new paper.Color('black')

    const [...curvePoints] = Array(50 + 1)
      .fill(1)
      .map((_, index) => index / 50)
      .map((t) => bezierCurve(t, this.basePoints))
    curvePoints.forEach((point) => this.#curvePath.add(point))
  }

  get degree(): number {
    return this.basePoints.length - 1
  }

  set basePoints(newBasePoints: Array<paper.Point>) {
    if (this.#basePoints instanceof BasePoints) {
      this.#basePoints.points = newBasePoints
    } else {
      this.#basePoints = newBasePoints
      this.createCurve()
    }
  }

  get basePoints(): Array<paper.Point> {
    return this.#basePoints instanceof BasePoints
      ? this.#basePoints.points
      : this.#basePoints
  }
}
