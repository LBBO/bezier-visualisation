import React, { createRef } from 'react'
import paper from 'paper'

type ShowcaseProps = {}
type ShowcaseState = {}

export abstract class Showcase<Props, State> extends React.Component<
  Props & ShowcaseProps,
  State & ShowcaseState
> {
  #ref = createRef<HTMLCanvasElement>()
  protected scope: paper.PaperScope | undefined
  protected setupIsComplete = false

  componentDidMount = () => {
    this.setup()
  }

  componentDidUpdate = () => {
    this.setup()
  }

  protected setup() {
    if (!this.setupIsComplete && this.#ref.current) {
      this.scope = new paper.PaperScope()
      this.scope.setup(this.#ref.current)
      this.setupIsComplete = true
    }
  }

  protected renderChildren = (): React.ReactNode => null

  render = () => (
    <div className={'showcase'}>
      {this.renderChildren()}
      <canvas ref={this.#ref} onContextMenu={(e) => e.preventDefault()} />
    </div>
  )
}
