import React, { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import paper, { PaperScope } from 'paper'
import { BezierCurve } from './BezierCurve'

const useCanvasSetup = () => {
  const [setupComplete, setSetupComplete] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const canvas = <canvas ref={canvasRef} />
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

  // draw curve
  useEffect(() => {
    if (paperScope) {
      paperScope.project?.clear()
      const curvePath = new paperScope.Path()
      curvePath.strokeColor = new paperScope.Color('black')
      curvePath.strokeWidth = 2
      const basePoints = [
        new paperScope.Point(200, 200),
        new paperScope.Point(100, 100),
        new paperScope.Point(300, 100),
        new paperScope.Point(400, 200),
      ]

      const curve = new BezierCurve(basePoints)
    }
  })

  return <div className="App">{canvas}</div>
}

export default App
