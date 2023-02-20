import React, {Component} from 'react'
import {
  VictoryChart,
  VictoryArea,
  VictoryLine,
  VictoryAxis,
  VictoryVoronoiContainer,
  VictoryLegend,
  VictoryLabel,
  VictoryPortal,
  VictoryScatter,
} from 'victory'

import {SavingsCalculatorConsumer} from './context'
import {formatDollars, formatOrdinal} from 'helpers/contributions'

import {
  animationStyles,
  likelyRangeStyles,
  unlikelyRangeStyles,
  projectedAmountStyles,
  projectedSavingsAmountStyles,
  hoverLineStyles,
  axisStyles,
  legendStyles,
  legendLabelStyles,
  legendDataStyles,
} from './graph-styles'

const VictoryLegendLabel = props => (
  <g>
    <VictoryLabel {...props} style={legendLabelStyles.top} />
    <VictoryLabel {...props} dy={20} text={props.datum.value} style={legendLabelStyles.bottom} />
  </g>
)

const HoverLine = ({settings, x, datum, totalYears}) => {
  const height = settings.height - settings.padding.bottom
  const width = settings.width - settings.padding.right

  let newX = x

  if (datum._x === totalYears) {
    newX = width
  }

  if (datum._x !== 0) {
    return <line x1={newX} x2={newX} y1="0" y2={height} style={hoverLineStyles} />
  }

  return null
}

class Graph extends Component {
  constructor(props) {
    super(props)

    this.state = {
      settings: {
        padding: {top: 0, left: 80, bottom: 80, right: 70},
        width: 1400,
        height: 400,
      },
      ranges: {
        unlikely: {
          top: 1.5,
          bottom: 0.5,
        },
        likely: {
          top: 1.25,
          bottom: 0.75,
        },
      },
      data529: [],
      dataSavings: [],
      year: 0,
      projectedAmount: 0,
      projectedSavingsAmount: 0,
      likelyRange: {
        top: 0,
        bottom: 0,
      },
      unlikelyRange: {
        top: 0,
        bottom: 0,
      },
    }

    this.changeLegendValues = this.changeLegendValues.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.highlighted529Amount !== this.props.highlighted529Amount) {
      const {year} = this.state

      const filterToYears = data => data.filter((month, i) => i % 12 === 0)

      const data529 = filterToYears(this.props.total529Amounts)
      const dataSavings = filterToYears(this.props.totalSavingsAmounts)

      this.setState({
        data529,
        dataSavings,
        ...this.changeLegendValues(data529[year], dataSavings[year]),
      })
    }
  }

  changeLegendValues(value, savingsValue) {
    const {ranges} = this.state

    return {
      projectedAmount: value,
      projectedSavingsAmount: savingsValue,
      likelyRange: {
        top: value * ranges.likely.top,
        bottom: value * ranges.likely.bottom,
      },
      unlikelyRange: {
        top: value * ranges.unlikely.top,
        bottom: value * ranges.unlikely.bottom,
      },
    }
  }

  filterPoints(points, name) {
    return points.filter(p => p.childName === name)[0]
  }

  render() {
    const {totalYears} = this.props

    const {
      settings,
      ranges,
      data529,
      dataSavings,
      year,
      projectedAmount,
      projectedSavingsAmount,
    } = this.state

    const years = year === 1 ? '1 year' : year + ' years'

    const legendData = [
      {
        name: 'Scholar Raise',
        value: formatDollars(projectedAmount),
        symbol: legendDataStyles.account529,
      },
      {
        name: 'Savings account',
        value: formatDollars(projectedSavingsAmount),
        symbol: legendDataStyles.accountSavings,
      },
    ]

    return (
      <div className="savings-calculator-graph">
        <VictoryChart
          padding={settings.padding}
          width={settings.width}
          height={settings.height}
          containerComponent={
            <VictoryVoronoiContainer
              voronoiDimension="x"
              labels={d => ''}
              labelComponent={<HoverLine totalYears={totalYears} settings={settings} />}
              onActivated={p => {
                const acct529 = this.filterPoints(p, 'projected-amount')
                const acctSavings = this.filterPoints(p, 'projected-savings-amount')

                this.setState({
                  year: acct529._x,
                  ...this.changeLegendValues(acct529._y, acctSavings._y),
                })
              }}
            />
          }
        >
          {/* Axes */}
          <VictoryAxis
            tickCount={8}
            tickFormat={t => `${t} YEARS`}
            style={axisStyles.x}
            tickLabelComponent={<VictoryLabel dx={-10} dy={-10} angle={-45} textAnchor="end" />}
          />
          <VictoryAxis
            dependentAxis
            animate={animationStyles}
            tickFormat={t => formatOrdinal(t)}
            tickCount={4}
            style={axisStyles.y}
          />

          {/* 529 account */}
          <VictoryArea
            data={data529}
            style={unlikelyRangeStyles}
            animate={animationStyles}
            y={d => d * ranges.unlikely.top}
            y0={d => d * ranges.unlikely.bottom}
          />
          <VictoryArea
            data={data529}
            style={likelyRangeStyles}
            animate={animationStyles}
            y={d => d * ranges.likely.top}
            y0={d => d * ranges.likely.bottom}
          />
          <VictoryLine
            name="projected-amount"
            data={data529}
            style={projectedAmountStyles.line}
            animate={animationStyles}
          />
          <VictoryScatter
            data={data529}
            size={6}
            style={projectedAmountStyles.scatter}
            animate={animationStyles}
          />

          {/* Savings account */}
          <VictoryLine
            name="projected-savings-amount"
            data={dataSavings}
            style={projectedSavingsAmountStyles.line}
            animate={animationStyles}
          />
          <VictoryScatter
            data={dataSavings}
            size={6}
            style={projectedSavingsAmountStyles.scatter}
            animate={animationStyles}
          />

          {/* Legend */}
          {year !== 0 && (
            <VictoryPortal>
              <VictoryLegend
                x={100}
                y={20}
                borderPadding={{top: 20, left: 20, right: 20, bottom: 10}}
                rowGutter={20}
                padding={100}
                orientation="vertical"
                title={`In ${years} from now...`}
                style={legendStyles}
                data={legendData}
                titleComponent={<VictoryLabel dy={-5} />}
                labelComponent={<VictoryLegendLabel />}
              />
            </VictoryPortal>
          )}
        </VictoryChart>
      </div>
    )
  }
}

export default React.forwardRef((props, ref) => (
  <SavingsCalculatorConsumer>
    {context => <Graph {...context} {...props} ref={ref} />}
  </SavingsCalculatorConsumer>
))
