import paper from 'paper'
import { BasePoints } from './BasePoints'
import { Plot } from './Plot'

export const N = (i: number, r: number, u: number, u_i: number[]): number => {
  const setTo0IfNecessary = (n: number) =>
    isNaN(n) || Math.abs(n) === Infinity ? 0 : n

  if (!(u_i[i] <= u && u < u_i[i + r + 1])) {
    return 0
  } else if (r === 0) {
    return u_i[i] <= u && u < u_i[i + 1] ? 1 : 0
  } else {
    const firstCoefficient = (u - u_i[i]) / (u_i[i + r] - u_i[i])
    const secondCoefficient =
      (u_i[i + r + 1] - u) / (u_i[i + r + 1] - u_i[i + 1])
    const firstPart = N(i, r - 1, u, u_i)
    const secondPart = N(i + 1, r - 1, u, u_i)
    let result =
      setTo0IfNecessary(firstCoefficient) * firstPart +
      setTo0IfNecessary(secondCoefficient) * secondPart

    return setTo0IfNecessary(result)
  }
}

const BSplinePoint = (
  u: number,
  degree: number,
  u_i: number[],
  basePoints: Array<paper.Point>,
) => {
  const result = basePoints.reduce(
    (sum, basePoint, index) =>
      sum.add(basePoint.clone().multiply(N(index, degree, u, u_i))),
    new paper.Point(0, 0),
  )

  // console.log(result.toString(), u)

  return result
}

export class BSpline extends paper.Group {
  #degree: number
  #u_i: number[]
  #basePoints: BasePoints
  #curvePath = new paper.Path()

  constructor(degree: number, u_i: number[], basePoints: BasePoints) {
    super()
    this.#degree = degree
    this.#u_i = u_i
    this.#basePoints = basePoints

    if (this.#basePoints.points.length < degree + 1) {
      throw new Error(`too little points`)
    }

    if (
      this.#u_i.length !==
      this.#basePoints.points.length + this.#degree + 1
    ) {
      throw new Error(
        `Wrong amount of u_i; expected ${
          this.#basePoints.points.length + this.#degree + 1
        } but got ${this.#u_i.length}`,
      )
    }

    this.#basePoints.addEventListener('update', this.#drawCurve)

    this.#drawCurve()
  }

  #drawPlot = () => {
    const functions = this.#u_i.map((_, index) => (x: number) =>
      N(index, this.#degree, x, this.#u_i),
    )
    const sumOfAllNs = (x: number) =>
      functions.reduce((sum, func) => sum + func(x), 0)
    const plot = new Plot(this.#u_i[0], this.#u_i[this.#u_i.length - 1], 0.05, [
      sumOfAllNs,
      (x) => {
        return Math.abs(1 - sumOfAllNs(x)) <= 0.001 ? 1 : 0
      },
      ...functions,
    ])
    plot.scale(60)
    plot.scale(1, -1)
    plot.translate(new paper.Point(1000, 100))
    this.addChild(plot)
  }

  get usableUValues() {
    return this.#u_i.slice(this.#degree, -this.#degree)
  }

  #drawCurve = () => {
    this.removeChildren()

    this.#drawPlot()
    this.#drawGuidancePoints()
    this.#curvePath.strokeColor = new paper.Color('black')
    this.#curvePath.removeSegments()

    const minU = Math.min(...this.usableUValues)
    const maxU = Math.max(...this.usableUValues)
    const uValues = Array(100)
      .fill(1)
      .map((_, index, all) => minU + ((maxU - minU) * index) / all.length)

    const points = uValues.map((u) =>
      BSplinePoint(u, this.#degree, this.#u_i, this.#basePoints.points),
    )
    points.forEach((point) => this.#curvePath.add(point))
    this.addChild(this.#curvePath)
  }

  #drawGuidancePoints = () => {
    const otherPoints = this.#u_i.map((u) =>
      BSplinePoint(u, this.#degree, this.#u_i, this.#basePoints.points),
    )

    this.addChildren(
      otherPoints.map((point, index) => {
        const group = new paper.Group()

        const circle = new paper.Path.Circle(point, 3)
        circle.fillColor = new paper.Color('green')

        const text = new paper.PointText(point)
        text.content = `u${index}; t = ${this.#u_i[index + 1]}`

        group.addChild(circle)
        group.addChild(text)
        return group
      }),
    )
  }

  public redraw() {
    this.#drawCurve()
  }

  get u_i() {
    return this.#u_i
  }

  set u_i(newValues) {
    this.#u_i = newValues
  }

  get degree() {
    return this.#degree
  }

  set degree(newDegree) {
    this.#degree = newDegree
  }

  public addPoint(newPoint: paper.Point) {
    this.#u_i = [...this.u_i, Math.max(...this.u_i) + 1]
    this.#basePoints.points = [...this.#basePoints.points, newPoint]
  }
}

export const createEquidistantVector = (
  degree: number,
  numberOfPoints: number,
) =>
  Array(degree + numberOfPoints + 1)
    .fill(1)
    .map((_, index) => index)
