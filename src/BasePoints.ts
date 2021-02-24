import paper from 'paper'

export class BasePoints extends paper.Group {
  #basePoints: Array<paper.Point>
  #eventEmitter = new EventTarget()

  constructor(basePoints: Array<paper.Point>) {
    super()
    this.#basePoints = basePoints.map((point) => point.clone())
    this.#update()
  }

  #update = () => {
    this.removeChildren()

    this.addChildren(
      this.#basePoints.map((point, pointIndex) => {
        const circle = new paper.Path.Circle(point, 3)
        circle.fillColor = new paper.Color('red')
        circle.onMouseDrag = (event: paper.MouseEvent) => {
          event.stop()
          this.points = this.#basePoints.map((currPoint, currIndex) =>
            currIndex === pointIndex
              ? currPoint.clone().add(event.delta)
              : currPoint,
          )
        }

        circle.onClick = (event: paper.MouseEvent & { event: MouseEvent }) => {
          if (event.event.button === 2) {
            event.stop()
            this.points = this.#basePoints.filter(
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

  public addEventListener(
    ...params: Parameters<InstanceType<typeof EventTarget>['addEventListener']>
  ) {
    this.#eventEmitter.addEventListener(...params)
  }

  public removeEventListener(
    ...params: Parameters<
      InstanceType<typeof EventTarget>['removeEventListener']
    >
  ) {
    this.#eventEmitter.removeEventListener(...params)
  }

  get points(): Array<paper.Point> {
    return this.#basePoints
  }

  set points(value: Array<paper.Point>) {
    this.#basePoints = value.map((point) => point.clone())
    this.#update()
    this.#eventEmitter.dispatchEvent(new Event('update'))
  }
}
