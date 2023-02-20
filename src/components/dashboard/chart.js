import React from 'react'
import {Box, Avatar} from 'sr-components'
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryScatter,
  VictoryArea,
  VictoryGroup,
} from 'victory'
import theme from 'sr-components/theme'
import {format} from 'd3-format'
import {scaleLinear} from 'd3-scale'
import {max} from 'd3-array'
import {Checkbox} from 'components/lib'
import {avatarFallback} from 'helpers/images'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'

dayjs.extend(customParseFormat)
dayjs.extend(utc)
dayjs.extend(quarterOfYear)

const CHART_BACKGROUND_COLOR = '#f9f9f9'
const AXIS_STYLE = ({rotateAxis315deg = true} = {}) => ({
  axis: {stroke: ''},
  grid: {stroke: theme.colors.darkGray},
  tickLabels: {
    fontFamily: theme.fonts.main,
    fontSize: 14,
    fontWeight: 700,
    color: theme.colors.darkGray,
    angle: rotateAxis315deg ? 45 : null,
    textAnchor: rotateAxis315deg ? 'start' : null,
  },
})

const lineColors = ['primary500', 'error500', 'success500', 'warning500', 'warning500', 'darkGray']
const innerColors = [
  'primary300',
  'error300',
  'success300',
  'warning300',
  'warning300',
  'mediumGray',
]
const outerColors = [
  'primary100',
  'error100',
  'success100',
  'warning100',
  'warning100',
  'lightGray',
]

function genDatesForGraphFromWeeks(weeksToAdd) {
  return dayjs.utc().add(weeksToAdd, 'weeks').valueOf()
}

function extractTypeAmountAndWeeksOfCharges(contribution, totalWeeks) {
  const extracted = {
    type: contribution.recurrenceInterval,
    value: contribution.amount,
    weeksOfNextCharges: {},
  }

  const today = dayjs.utc()
  const last = dayjs.utc(today).add(totalWeeks, 'week').date(30)

  let timeToAdd = extracted.type === 'biweekly' ? 2 : 1
  let timeUnit
  switch (extracted.type) {
    case 'monthly':
      timeUnit = 'month'
      break
    case 'quarterly':
      timeUnit = 'quarter'
      break
    case 'yearly':
      timeUnit = 'year'
      break
    default:
      timeUnit = 'week'
  }

  const mostRecentValidContribution = contribution.contributionRecurrences.find(c => c.status)

  let current = dayjs.utc(mostRecentValidContribution?.contributionData)
  let weekNumber = last.diff(current, 'week')

  // for monthly, quarterly and yearly
  while (current.isBefore(last)) {
    extracted.weeksOfNextCharges = {
      ...extracted.weeksOfNextCharges,
      [weekNumber]: contribution.amount,
    }

    current = current.add(timeToAdd, timeUnit)
    weekNumber = last.diff(current, 'week')
  }

  return extracted
}

function calculateProjection(rate = 0, startingPrincipal = 0, totalMonths = 0, recurrent = []) {
  let principal = startingPrincipal
  let today = dayjs.utc()
  let totalWeeks = today.add(totalMonths, 'months').diff(today, 'week')

  const parsedContributions = recurrent.map(r => extractTypeAmountAndWeeksOfCharges(r, totalWeeks))

  const amounts = Array.from({length: totalWeeks}, (_, index) => {
    let recurrent = parsedContributions
      .map(c => c.weeksOfNextCharges[index + 1] ?? 0.0)
      .reduce((old, amount) => old + amount, 0.0)
    principal = (principal + recurrent) * (1 + rate / 52 / 100)
    return principal
  })
  return amounts
}

function calculateGraphData({principal, totalMonths, recurrent}) {
  const highest = calculateProjection(8, principal, totalMonths, recurrent)
  const high = calculateProjection(7, principal, totalMonths, recurrent)
  const normal = calculateProjection(6, principal, totalMonths, recurrent)
  const low = calculateProjection(5, principal, totalMonths, recurrent)
  const lowest = calculateProjection(4, principal, totalMonths, recurrent)

  let LineData = normal.map((value, i) => ({
    x: genDatesForGraphFromWeeks(i),
    y: value,
  }))

  let InnerAreaData = high.map((value, i) => ({
    x: genDatesForGraphFromWeeks(i),
    y: value,
    y0: low[i],
  }))

  let OuterAreaData = highest.map((value, i) => ({
    x: genDatesForGraphFromWeeks(i),
    y: value,
    y0: lowest[i],
  }))

  return [LineData, InnerAreaData, OuterAreaData]
}

function changeDashForSlashInDates(date) {
  if (typeof date === 'string') {
    return date.replace(/-/g, '/')
  }

  return date
}

function MobileBar({color, width}) {
  return (
    <svg width="100%" height={36}>
      <rect x={0} y={0} width={width} height="100%" rx={4} fill={color} />
    </svg>
  )
}

function prettyFormat(value) {
  if (value === 0) return '$0'

  if (value / 1000 < 100) return format('$.2s')(value) // shows 25k instead of 25.5k

  return format('$.3s')(value)
}

function MobileLegends({maxValue, scale}) {
  if (parseInt(maxValue) === 0) {
    return (
      <div className="absolute " style={{width: '100%', direction: 'rtl'}}>
        <span className="mr-2 font-semibold text-mediumGray">$0</span>
      </div>
    )
  }

  const rangeValues = [0, maxValue * 0.25, maxValue * 0.5, maxValue * 0.75, maxValue]

  return rangeValues.map((value, index) => (
    <div
      key={`mobile-legend-value-${value}`}
      className="absolute"
      style={{width: `calc((100% - 52px) * ${0.25 * index} + 52px)`, direction: 'rtl'}}
    >
      <span className="mr-2 font-semibold text-mediumGray">{prettyFormat(value)}</span>
    </div>
  ))
}

function MobileAxis() {
  return Array.from({length: 5}, (_, index) => (
    <div
      className="absolute border-l-2"
      style={{
        width: `calc((100% - 52px) * (1 - .25 * ${index})`,
        height: 'calc(100% - 1.5rem)',
        right: 0,
      }}
    />
  ))
}

const Chart = React.memo(({dashboard, account}) => {
  const shouldDisplayArea = Boolean(account?.hashid)
  const dateFormat = 'YYYY/MM/DD'
  const birthdateFormat = account?.beneficiaryBirthDate ? 'MM/DD/YYYY' : undefined
  const utc = dayjs.utc()
  const [showRecurrentDeposits, setDeposits] = React.useState(true)
  const [showRecurrentExternal, setExternal] = React.useState(false)
  const avatarSize = 12

  let DataArrays = []

  let i = 0
  let total_length = account ? 1 : dashboard.accounts.length
  let firstBalance

  for (; i < total_length; i++) {
    let acc = account ? account : dashboard.accounts[i]
    if (acc?.balances?.length || acc?.pendingContributions) {
      let allBalances = acc?.balances?.length
        ? acc.balances
            .slice()
            .sort(
              (a, b) =>
                dayjs.utc(changeDashForSlashInDates(b.asOfDate), dateFormat).valueOf() -
                dayjs.utc(changeDashForSlashInDates(a.asOfDate), dateFormat).valueOf(),
            )
        : undefined

      let latestBalance = parseFloat(allBalances?.[0].balance) || 0
      let pendingContributions = parseFloat(acc.pendingContributions) || 0

      let principal = latestBalance + pendingContributions

      if (principal) {
        let collegeYear = acc.beneficiaryCollegeEntryYear
          ? dayjs.utc(
              `${changeDashForSlashInDates(acc.beneficiaryCollegeEntryYear)}/11/31`,
              dateFormat,
            )
          : dayjs
              .utc(changeDashForSlashInDates(acc.beneficiaryBirthDate), birthdateFormat)
              .add(18, 'year')
              .month(10)
              .day(31)
        let totalMonths = collegeYear.diff(utc, 'month')

        if (totalMonths <= 0) {
          collegeYear = utc.year() + 1
          totalMonths = dayjs.utc(`${collegeYear}/11/30`, 'YYYY/MM/DD').diff(utc, 'month')
        }

        let recurrent = acc.contributions.filter(c => c.isRecurrenceActive)

        if (!showRecurrentDeposits) {
          recurrent = recurrent.filter(c => !c.toOwnAccount)
        }

        if (!showRecurrentExternal) {
          recurrent = recurrent.filter(c => c.toOwnAccount)
        }

        DataArrays.push([
          ...calculateGraphData({
            principal,
            totalMonths,
            recurrent,
          }),
          acc.beneficiaryAvatarUrl,
          acc.hashid,
          latestBalance,
          collegeYear.year(),
        ])

        // add scraped data:
        let lineValues = DataArrays[DataArrays.length - 1][0]
        let balancesLength = acc?.balances?.length

        for (let j = 0; j < balancesLength; j++) {
          let balanceRecord = acc.balances[j]
          lineValues.unshift({
            x: dayjs.utc(changeDashForSlashInDates(balanceRecord.asOfDate), dateFormat).valueOf(),
            y: Number(balanceRecord.balance),
          })
        }

        // log the first balance if earlier than prev account
        const newFirstBalance = allBalances?.[allBalances.length - 1]
        if (
          newFirstBalance &&
          (!firstBalance || dayjs.utc(newFirstBalance).isBefore(firstBalance))
        ) {
          firstBalance = newFirstBalance
        }
      }
    }
  }

  if (!DataArrays.length) return null

  const firstBalanceDate = firstBalance && dayjs.utc(firstBalance.asOfDate).valueOf()

  let xAxisValues = [new Date().valueOf()]
  let xAxisLabels = ['Today']
  let xAxisDomain = [firstBalanceDate || new Date().valueOf()]
  const scale = scaleLinear()
    .domain([0, max(DataArrays, ([d]) => d[d.length - 1].y)])
    .range([0, 100])
  const maxDomainValue = scale.domain()[1]

  DataArrays.forEach(accountData => {
    const LineData = accountData[0]
    const lastDate = LineData[LineData.length - 1].x
    const yearLabel = dayjs.utc(lastDate).format('YYYY')

    if (!xAxisLabels.includes(yearLabel)) {
      xAxisValues.push(lastDate.valueOf())
      xAxisLabels.push(yearLabel)

      if (dayjs(xAxisDomain[1]).isBefore(dayjs(lastDate))) {
        xAxisDomain[1] = lastDate.valueOf()
      }
    }
  })

  return (
    <div className="mb-8 lg:mb-4">
      <Box display={['none', null, 'block']}>
        <VictoryChart
          key={new Date().valueOf()}
          style={{
            background: {
              fill: CHART_BACKGROUND_COLOR,
              stroke: theme.colors.snow,
              strokeWidth: 4,
            },
          }}
          width={700}
          height={300}
          padding={{left: 60, top: 5, bottom: 60, right: 2}}
          domainPadding={{x: [40, 40], y: [0, 40]}}
          singleQuadrantDomainPadding
        >
          <VictoryAxis tickValues={xAxisValues} tickFormat={xAxisLabels} style={AXIS_STYLE()} />
          <VictoryAxis
            dependentAxis
            tickCount={5}
            tickFormat={prettyFormat}
            style={AXIS_STYLE({rotateAxis315deg: false})}
          />
          {DataArrays.map(([Line, InnerArea, OuterArea, avatarSrc, hashId], index) => (
            <VictoryGroup name={`group-chart-${hashId}`} key={`chart-${hashId}`}>
              {shouldDisplayArea && (
                <VictoryArea
                  data={OuterArea}
                  style={{
                    data: {
                      fill: theme.colors[outerColors[index % outerColors.length]],
                      stroke: 'unset',
                      opacity: 0.7,
                    },
                  }}
                />
              )}
              {shouldDisplayArea && (
                <VictoryArea
                  data={InnerArea}
                  style={{
                    data: {
                      fill: theme.colors[innerColors[index % innerColors.length]],
                      stroke: 'unset',
                      opacity: 0.7,
                    },
                  }}
                />
              )}
              <VictoryLine
                style={{
                  data: {stroke: theme.colors[lineColors[index % lineColors.length]]},
                }}
                data={Line}
                scale={{x: 'time', y: 'linear'}}
                domain={{x: xAxisDomain, y: [0]}}
                interpolation="basis"
              />
              <VictoryScatter
                data={[Line[Line.length - 1]]}
                size={7.5}
                style={{
                  data: {fill: theme.colors[lineColors[index % lineColors.length]]},
                }}
              />
              <VictoryScatter
                data={[Line[Line.length - 1]]}
                dataComponent={
                  <image
                    href={avatarFallback(avatarSrc).image}
                    style={{
                      clipPath: `circle(${avatarSize / 2}px at 50% 50%`,
                      transform: `translate(-6px, -6px)`,
                      width: avatarSize,
                      height: avatarSize,
                    }}
                  />
                }
                standalone
              />
            </VictoryGroup>
          ))}
        </VictoryChart>
      </Box>
      <div className="relative block lg:hidden">
        <div className="h-6">
          <MobileLegends maxValue={maxDomainValue} />
        </div>
        <div>
          <MobileAxis />
        </div>
        <div className="w-full py-6 mb-4 space-y-4">
          {DataArrays.map(
            ([Line, _inner, _outer, avatarSrc, hashId, latestBalance, collegeEntryYear], index) => (
              <div>
                <div className="flex flex-row flex-no-wrap w-full" key={`mobile-chart-${hashId}`}>
                  <div className="mr-4">
                    <Avatar src={avatarFallback(avatarSrc).image} />
                  </div>
                  <div className="relative w-full">
                    <div className="absolute w-full">
                      <MobileBar
                        color={theme.colors[outerColors[index % outerColors.length]]}
                        width={`${scale(Line[Line.length - 1].y)}%`}
                      />
                    </div>
                    <div className="absolute w-full">
                      <MobileBar
                        color={theme.colors[lineColors[index % lineColors.length]]}
                        width={`calc(1px + ${scale(latestBalance)}%)`}
                      />
                    </div>
                  </div>
                </div>
                <div style={{marginLeft: 56, opacity: 0.99}}>
                  <span className="w-auto text-xs bg-trueWhite text-darkGray">
                    Expected graduation: {collegeEntryYear}
                  </span>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
      <div className="block mb-4 space-y-2 lg:hidden">
        <div className="flex flex-row items-center mr-4">
          <div className="w-5 h-5 mr-2 rounded-md bg-primary-500" />
          <span className="text-sm font-bold text-darkGray">Today's value</span>
        </div>
        <div className="flex flex-row items-center ">
          <div className="w-5 h-5 mr-2 rounded-md bg-primary-100" />
          <span className="text-sm font-bold text-darkGray">Value by graduation</span>
        </div>
      </div>
      <Checkbox className="cursor-pointer" onChange={setDeposits} defaultChecked>
        Include my recurring deposits
      </Checkbox>
      <Checkbox className="cursor-pointer" onChange={setExternal}>
        Include recurring contributions from others
      </Checkbox>
    </div>
  )
})

export default Chart
