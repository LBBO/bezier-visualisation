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

    if (((this.#basePoints.points.length - 1) / this.#degree) % 1 !== 0) {
      throw new Error(`won't work, sorry`)
    }

    this.#basePoints.addEventListener('update', this.#drawCurve)

    this.#drawCurve()
  }

  #drawCurve = () => {
    this.removeChildren()

    const numberOfSegments = (this.#basePoints.points.length - 1) / this.#degree
    for (let i = 0; i < numberOfSegments; i++) {
      const start = i * this.#degree

      this.addChild(
        new BezierCurve(
          this.#basePoints.points.slice(start, start + this.#degree + 1),
        ),
      )
    }
  }
}
