import React, { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import paper, { PaperScope } from 'paper'
import { BezierCurve } from './BezierCurve'

const useCanvasSetup = () => {
  const [setupComplete, setSetupComplete] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const canvas = (
    <canvas ref={canvasRef} onContextMenu={(e) => e.preventDefault()} />
  )
  const [paperScope, setPaperScope] = useState<InstanceType<
    typeof PaperScope
  > | null>(null)

  useEffect(() => {
    if (canvasRef.current && !setupComplete) {
      const scope = new paper.PaperScope()
      // scope.install(canvasRef.current)
      paper.setup(canvasRef.current)
      // const view = new scope.View()
      setSetupComplete(true)
      setPaperScope(scope)
    }
  }, [canvasRef, setupComplete])

  const onResize = useCallback(() => {}, [])

  useEffect(() => {
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [onResize])

  return { canvas, paperScope }
}

function App() {
  const { canvas, paperScope } = useCanvasSetup()
  const [curve, setCurve] = useState<BezierCurve | undefined>()
  const [addPointOnClick, setAddPointOnClick] = useState(true)

  const onPaperClick = useCallback(
    (event: paper.MouseEvent & { event: MouseEvent }) => {
      // if click was left click and wasn't on a control point
      if (
        curve &&
        addPointOnClick &&
        event.target.className === 'CanvasView' &&
        event.event.button === 0
      ) {
        curve.basePoints = [...curve.basePoints, event.point]
      }
    },
    [addPointOnClick, curve],
  )

  // draw curve
  useEffect(() => {
    if (paperScope) {
      if (!curve) {
        const basePoints = [
          new paperScope.Point(200, 200),
          new paperScope.Point(100, 100),
          new paperScope.Point(300, 100),
          new paperScope.Point(400, 200),
        ]
        setCurve(new BezierCurve(basePoints))
      }

      paper.view.onClick = onPaperClick
    }
  }, [curve, onPaperClick, paperScope])

  return (
    <div className="App">
      <label>
        <input
          type={'checkbox'}
          checked={addPointOnClick}
          onChange={(event) => setAddPointOnClick(event.target.checked)}
        />
        Add point on checked
      </label>
      {canvas}
    </div>
  )
}

export default App
