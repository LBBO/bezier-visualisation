import React from 'react'
import './App.css'
import { BezierCurveShowcase } from './BezierCurveShowcase'
import { BSplineShowcase } from './BSplineShowcase'

const App = () => (
  <div className="App">
    <BezierCurveShowcase />
    <BSplineShowcase />
  </div>
)

export default App
