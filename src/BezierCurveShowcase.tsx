import React from 'react'
import { Showcase } from './Showcase'
import { BasePoints } from './BasePoints'
import paper from 'paper'
import { BezierCurve } from './BezierCurve'

type Props = {}
type State = {
  shouldAddPointOnClick: boolean
}

export class BezierCurveShowcase extends Showcase<Props, State> {
  #basePoints: BasePoints | undefined
  #curve: BezierCurve | undefined

  state = {
    shouldAddPointOnClick: false,
  }

  setup() {
    if (!this.setupIsComplete) {
      super.setup()
      this.scope!.view.onClick = this.#onCanvasClick
      this.#basePoints = new BasePoints([
        new this.scope!.Point(200, 200),
        new this.scope!.Point(100, 100),
        new this.scope!.Point(300, 100),
        new this.scope!.Point(400, 200),
      ])
      this.#curve = new BezierCurve(this.#basePoints, {
        plotBernsteinCurves: true,
      })
    }
  }

  #onCanvasClick = (event: paper.MouseEvent & { event: MouseEvent }) => {
    if (
      this.state.shouldAddPointOnClick &&
      this.#basePoints &&
      event.event.button === 0
    ) {
      this.#basePoints.points = [...this.#basePoints.points, event.point]
    }
  }

  #onChangeAddPointOnClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ shouldAddPointOnClick: event.target.checked })
  }

  renderChildren = () => {
    return (
      <>
        <h2>Bézier Curves</h2>
        <label>
          <input
            type={'checkbox'}
            checked={this.state.shouldAddPointOnClick}
            onChange={this.#onChangeAddPointOnClick}
          />
          Add point on checked
        </label>
      </>
    )
  }
}
