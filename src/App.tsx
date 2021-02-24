import React, { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import paper, { PaperScope } from 'paper'

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

const factorial = (n: number): number => {
  if (n < 0 || n % 1 !== 0) {
    throw new Error(`Invalid value n = ${n} for computing n!`)
  } else {
    let product = 1

    for (let i = 1; i <= n; i++) {
      product *= i
    }

    return product
  }
}

const binomial = (n: number, k: number): number =>
  factorial(n) / (factorial(k) * factorial(n - k))

const BernsteinPoly = (n: number, i: number, t: number): number => {
  let binomialResult: number

  try {
    binomialResult = binomial(n, i)
  } catch (e) {
    console.log(e)
    binomialResult = 0
  }

  return binomialResult * t ** i * (1 - t) ** (n - i)
}

const bezierCurve = (t: number, basePoints: Array<paper.Point>) => {
  let sum = new paper.Point(0, 0)
  const n = basePoints.length - 1

  for (let i = 0; i <= n; i++) {
    sum = sum.add(basePoints[i].clone().multiply(BernsteinPoly(n, i, t)))
  }

  return sum
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

      basePoints.forEach((point) => {
        const circle = new paperScope.Path.Circle(point, 3)
        circle.fillColor = new paperScope.Color('red')
        circle.onMouseDrag = (event: paper.MouseEvent) => {
          circle.position.add(event.delta)
        }
      })

      const [...curvePoints] = Array(50 + 1)
        .fill(1)
        .map((_, index) => index / 50)
        .map((t) => bezierCurve(t, basePoints))
      curvePoints.forEach((point) => curvePath.add(point))

      // const rect = new paperScope.Path.Rectangle(
      //   new paperScope.Point(10, 10),
      //   new paperScope.Point(100, 100),
      // )
      // rect.fillColor = new paperScope.Color('black')
      // paperScope.view.update()
    }
  })

  return <div className="App">{canvas}</div>
}

export default App
