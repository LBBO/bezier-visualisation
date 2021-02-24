import React from 'react'
import { Showcase } from './Showcase'
import { BasePoints } from './BasePoints'
import paper from 'paper'
import { BSpline } from './BSpline'

type State = { shouldAddPointOnClick: boolean }
type Props = {}

export class BSplineShowcase extends Showcase<Props, State> {
  #basePoints: BasePoints | undefined

  state = {
    shouldAddPointOnClick: false,
  }

  setup() {
    if (!this.setupIsComplete) {
      super.setup()
      this.scope!.view.onClick = this.#onCanvasClick
      this.#basePoints = new BasePoints([
        new this.scope!.Point(100, 100),
        new this.scope!.Point(200, 200),
        new this.scope!.Point(300, 100),
        new this.scope!.Point(400, 200),
        new this.scope!.Point(500, 100),
      ])
      this.scope!.project.activeLayer.addChild(
        // new BSpline(2, [0, 1, 2, 3, 4, 5, 6, 7], this.#basePoints),
        // new BSpline(2, [0, 1, 2, 2.8, 3, 3.2, 4, 5], this.#basePoints),
        new BSpline(2, [0, 1, 2, 3, 4, 5, 6, 7], this.#basePoints),
      )
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
        <h2>B-Splines</h2>
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
