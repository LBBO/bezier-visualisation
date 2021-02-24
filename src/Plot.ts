import paper from 'paper'
import randomColor from 'randomcolor'

type Config = {
  xScaleStepSize?: number
}

export class Plot extends paper.Group {
  #minX: number
  #maxX: number
  #stepSize: number
  #config?: Config
  #funcs: Array<(x: number) => number>

  constructor(
    minX: number,
    maxX: number,
    stepSize: number,
    funcs: Array<(x: number) => number>,
    config?: Config,
  ) {
    super()
    this.#minX = minX
    this.#maxX = maxX
    this.#stepSize = stepSize
    this.#funcs = funcs
    this.#config = config

    this.#draw()
  }

  #draw = () => {
    this.removeChildren()
    this.#drawGraphs()
    this.#drawCoordinateSystem()
  }

  #drawCoordinateSystem = () => {
    const coordinateSystem = new paper.Group()
    coordinateSystem.addChild(
      new paper.Path.Line(
        new paper.Point(0, 0),
        new paper.Point(this.#maxX, 0),
      ),
    )
    coordinateSystem.addChild(
      new paper.Path.Line(new paper.Point(0, -0.1), new paper.Point(0, 1.1)),
    )

    const stepSize = this.#config?.xScaleStepSize ?? 1
    coordinateSystem.addChildren(
      Array(this.#maxX / stepSize + 1)
        .fill(1)
        .map((_, index) => {
          const x = this.#minX + stepSize * index
          return new paper.Path.Line(
            new paper.Point(x, -0.1),
            new paper.Point(x, 0.1),
          )
        }),
    )

    coordinateSystem.strokeColor = new paper.Color('grey')
    this.addChild(coordinateSystem)
  }

  #drawGraphs = () => {
    const colors = randomColor({
      count: this.#funcs.length,
      seed: 'abcd',
    }).map((hexString) => new paper.Color(hexString))

    this.#funcs.forEach((func, funcIndex) => {
      const xValues = Array(
        Math.floor((this.#maxX - this.#minX) / this.#stepSize) + 1,
      )
        .fill(1)
        .map((_, index) => this.#minX + index * this.#stepSize)

      const points = xValues
        .map((x) => new paper.Point(x, func(x)))
        .filter((p) => !isNaN(p.x) && !isNaN(p.y))

      const graph = new paper.Path(points)
      graph.closed = false
      graph.strokeColor = colors[funcIndex]
      graph.strokeWidth = 2

      this.addChild(graph)
    })
  }
}
