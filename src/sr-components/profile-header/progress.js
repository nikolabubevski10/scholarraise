/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'

import theme from '../theme'

export default ({radius, stroke, value, animated, style}) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (animated) {
      const timeout = setTimeout(() => {
        setProgress(value)
      }, 1000)

      return () => {
        clearTimeout(timeout)
      }
    } else {
      setProgress(value)
    }
  }, [])

  const normalizedRadius = radius - stroke / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (progress / 100) * circumference
  const transition = animated ? 'stroke-dashoffset 1s' : 'none'

  return (
    <div style={style}>
      <svg height="100%" width="100%" viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
        <circle
          fill={theme.colors.transparent}
          stroke={theme.colors.white}
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={theme.colors.primary}
          fill={theme.colors.transparent}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{
            strokeDashoffset,
            transition,
            transformOrigin: '50% 50%',
            transform: 'rotate(-90deg)',
          }}
        />
      </svg>
    </div>
  )
}
