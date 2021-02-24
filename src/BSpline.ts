import paper from 'paper'
import { BasePoints } from './BasePoints'
import { BezierCurve } from './BezierCurve'

export class BSpline extends paper.Group {
  #degree: number
  #u_i: number[]
  #basePoints: BasePoints

  constructor(degree: number, u_i: number[], basePoints: BasePoints) {
    super()
    this.#degree = degree
    this.#u_i = u_i
    this.#basePoints = basePoints

    if (this.#basePoints.points.length < degree + 1) {
      throw new Error(`too little points`)
    }

    this.#basePoints.addEventListener('update', this.#drawCurve)

    this.#drawCurve()
  }

  #computePoints = () => {
    const points = []

    for (let i = 1; i < this.#basePoints.points.length; i++) {
      const startPoint = this.#basePoints.points[i - 1]
        .clone()
        .add(this.#basePoints.points[i])
        .divide(2)

      points.push(startPoint)
    }

    return points
  }

  #drawCurve = () => {
    this.removeChildren()

    const otherPoints = this.#computePoints()

    this.addChildren(
      otherPoints.map((point) => {
        const circle = new paper.Path.Circle(point, 3)

        circle.fillColor = new paper.Color('green')

        return circle
      }),
    )

    const numberOfSegments = this.#basePoints.points.length - 1

    for (let i = 0; i < numberOfSegments - 1; i++) {
      const start = i * this.#degree

      const startPoint = otherPoints[i]
      const endPoint = otherPoints[i + 1]

      this.addChild(
        new BezierCurve([startPoint, this.#basePoints.points[i + 1], endPoint]),
      )
    }
  }
}
