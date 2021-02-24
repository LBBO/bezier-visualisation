import React from 'react'
import { Showcase } from './Showcase'
import { BasePoints } from './BasePoints'
import paper from 'paper'
import { BSpline, createEquidistantVector } from './BSpline'
import './BSplineShowcase.scss'

type State = {
  shouldAddPointOnClick: boolean
  degree: number
  baseVector: number[]
}
type Props = {}

export class BSplineShowcase extends Showcase<Props, State> {
  #basePoints: BasePoints | undefined
  #bSpline: BSpline | undefined

  state = {
    shouldAddPointOnClick: false,
    degree: 2,
    // # base points + degree + 1 equidistant values
    baseVector: createEquidistantVector(2, 5),
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

      this.#basePoints.addEventListener('update', () => {
        this.setState({
          baseVector: this.#bSpline?.u_i ?? this.state.baseVector,
        })
      })

      const degree = 2
      const uValues = createEquidistantVector(degree, this.#basePoints.length)

      this.#bSpline = new BSpline(degree, uValues, this.#basePoints)
      this.scope!.project.activeLayer.addChild(this.#bSpline)
    }
  }

  #onCanvasClick = (event: paper.MouseEvent & { event: MouseEvent }) => {
    if (this.state.shouldAddPointOnClick && event.event.button === 0) {
      this.#bSpline?.addPoint(event.point)
    }
  }

  #onChangeAddPointOnClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ shouldAddPointOnClick: event.target.checked })
  }

  #onChangeDegree = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDegree = Math.max(1, parseInt(event.target.value))

    if (this.#bSpline && this.#basePoints) {
      this.#bSpline.degree = newDegree

      const currVectorLength = this.#bSpline.u_i.length
      const expectedLength =
        this.#basePoints.points.length + this.#bSpline.degree + 1

      if (currVectorLength < expectedLength) {
        this.#bSpline.u_i = this.#bSpline.u_i.slice(0, expectedLength)
      }

      this.#bSpline.redraw()

      this.setState({
        degree: this.#bSpline.degree,
        baseVector: this.#bSpline.u_i,
      })
    }
  }

  #onChangeBaseVectorValue = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const parsed = parseInt(event.target.value)

    if (this.#bSpline && !Number.isNaN(parsed)) {
      const newBaseVector = this.#bSpline.u_i.map((currValue, currIndex) =>
        currIndex === index ? parsed : currValue,
      )
      this.#bSpline.u_i = newBaseVector
      this.#bSpline.redraw()

      this.setState({ baseVector: newBaseVector })
    }
  }

  renderChildren = () => {
    return (
      <div className={'controls'}>
        <h2>B-Splines</h2>
        <p>
          Left-clicks create new points; right-clicks remove them. The graph to
          the right shows the "influence polynomials" with two exceptions: the
          large pink curve is the sum of all influences and the blue curve with
          (hopefully two) vertical lines shows where the sum is 1 (i.e. where
          the spline is defined).
        </p>
        {/* Just taking up the grid slot */}
        <div />
        <label>
          <input
            type={'checkbox'}
            checked={this.state.shouldAddPointOnClick}
            onChange={this.#onChangeAddPointOnClick}
          />
          <div>Add point on click inside canvas</div>
        </label>
        <label>
          <input
            type={'number'}
            value={this.state.degree}
            onChange={this.#onChangeDegree}
          />
          <div>Degree of polynomials</div>
        </label>
        <div className="filler" />
        {this.state.baseVector.map((value, index, all) => {
          return (
            <label className={'base-vector-input'} key={index}>
              <span>
                u<sub>{index}</sub> =&nbsp;
              </span>
              <input
                type={'number'}
                value={value}
                min={all[index - 1]}
                max={all[index + 1]}
                onChange={(event) =>
                  this.#onChangeBaseVectorValue(index, event)
                }
              />
            </label>
          )
        })}
      </div>
    )
  }
}
