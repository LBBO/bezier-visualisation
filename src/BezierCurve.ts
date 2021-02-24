import paper from 'paper'
import { binomial } from './Math'
import { BasePoints } from './BasePoints'
import { Plot } from './Plot'

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

type Config = { plotBernsteinCurves?: boolean }

export class BezierCurve extends paper.Group {
  #basePoints: BasePoints | Array<paper.Point>
  #curvePath = new paper.Path()
  #basePointVisualisation = new paper.Group()
  #config: Config = {}
  #plot?: Plot

  constructor(basePoints: BasePoints | Array<paper.Point>, config?: Config) {
    super()
    this.#basePoints = basePoints
    this.addChild(this.#curvePath)
    this.addChild(this.#basePointVisualisation)
    if (config) {
      this.#config = config
    }

    if (basePoints instanceof BasePoints) {
      basePoints.addEventListener('update', this.drawCurve)
    }

    this.drawCurve()
  }

  private drawCurve = () => {
    this.#curvePath.removeSegments()
    this.#curvePath.strokeColor = new paper.Color('black')

    const [...curvePoints] = Array(50 + 1)
      .fill(1)
      .map((_, index) => index / 50)
      .map((t) => bezierCurve(t, this.basePoints))
    curvePoints.forEach((point) => this.#curvePath.add(point))

    this.#plotBernsteinCurves()
  }

  #plotBernsteinCurves = () => {
    this.#plot?.remove()

    if (this.#config.plotBernsteinCurves) {
      const functions = this.basePoints.map((_, index) => (x: number) =>
        BernsteinPoly(this.degree, index, x),
      )
      const sumOfAllNs = (x: number) =>
        functions.reduce((sum, func) => sum + func(x), 0)

      const plot = new Plot(
        0,
        1,
        0.05,
        [
          sumOfAllNs,
          (x) => {
            return Math.abs(1 - sumOfAllNs(x)) <= 0.001 ? 1 : 0
          },
          ...functions,
        ],
        { xScaleStepSize: 0.1 },
      )
      plot.scale(500, 150)
      plot.scale(1, -1)
      plot.translate(new paper.Point(1000, 100))
      this.addChild(plot)
      this.#plot = plot
    }
  }

  get degree(): number {
    return this.basePoints.length - 1
  }

  set basePoints(newBasePoints: Array<paper.Point>) {
    if (this.#basePoints instanceof BasePoints) {
      this.#basePoints.points = newBasePoints
    } else {
      this.#basePoints = newBasePoints
      this.drawCurve()
    }
  }

  get basePoints(): Array<paper.Point> {
    return this.#basePoints instanceof BasePoints
      ? this.#basePoints.points
      : this.#basePoints
  }
}
