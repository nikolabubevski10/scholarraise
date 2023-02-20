import React, {Component} from 'react'
import styled from 'styled-components'
import {SavingsCalculatorConsumer} from './context'
import {formatDollars} from 'helpers/contributions'
import {Tooltip} from 'sr-components'
import {ReactComponent as IconQuestion} from '../../assets/icons/question-solid'

const StyledWorth = styled.div`
  display: flex;
  flex-direction: column;
  .worth-title {
    margin-bottom: 10px;
    span {
      text-transform: uppercase;
      letter-spacing: 1px;
      font-family: 'Muli', sans-serif;
      font-weight: 800;
      display: block;
      color: #778f9b;
      font-size: 0.9rem;
    }
  }
  .worth-items {
    list-style-type: none;
    margin: 0px;
    padding: 0px;
    &.multiple li {
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0px;
      }
    }
  }

  .tooltip-container {
    display: flex;
    align-items: center;
    .tooltip-icon {
      margin-left: 10px;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border-radius: 1000rem;
      background: #b8c1cb;
      transition: background 200ms ease-in-out;
      &:hover {
        background: #778f9b;
      }
      svg {
        color: #fafafa;
        font-size: 0.65rem;
      }
    }
  }
`

class Worth extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentItem: 0,
      items: [],
      duration: 5000,
    }

    this.changeCurrentItem = this.changeCurrentItem.bind(this)
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
  }

  changeCurrentItem() {
    const {items, currentItem} = this.state

    this.setState({
      currentItem: items.length !== currentItem + 1 ? currentItem + 1 : 0,
    })
  }

  startTimer() {
    if (!this.props.showMultiple) {
      clearInterval(this.timer)

      this.timer = setInterval(this.changeCurrentItem, this.state.duration)
    }
  }

  stopTimer() {
    if (!this.props.showMultiple) {
      clearInterval(this.timer)
    }
  }

  componentDidMount() {
    this.startTimer()
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.highlighted529Amount !== this.props.highlighted529Amount) {
      this.determineWorthItems(this.props.highlighted529Amount)
    }
  }

  determineWorthItems(amount) {
    const allSentences = [
      {
        cost: 80000,
        periodTerm: 'year',
        sentence: time => `That's the complete cost of ${time} at a private university`,
      },
      {
        cost: 35000,
        periodTerm: 'semester',
        sentence: time => `That's the cost of tuition for ${time} at a private university`,
      },
      {
        cost: 40000,
        periodTerm: 'year',
        sentence: time => `That's the complete cost of ${time} at an out-of-state college`,
      },
      {
        cost: 25000,
        periodTerm: 'year',
        sentence: time => `That's the complete cost of ${time} at an in-state college`,
      },
      {
        cost: 12000,
        periodTerm: 'year',
        sentence: time => `That's the cost of room and board for ${time} of college`,
      },
      {
        cost: 4500,
        periodTerm: 'semester',
        sentence: time => `That's the cost of tuition at a 4 year, in-state college for ${time}`,
      },
      {
        cost: 1500,
        periodTerm: 'year',
        sentence: time => `That's the cost of all books and supplies for ${time} of college`,
      },
      {
        cost: 1000,
        periodTerm: 'year',
        sentence: time =>
          `That's the cost of furnishing an average dorm room for ${time} of college`,
      },
    ]

    const computeSentencePossibility = ({cost, periodTerm, sentence}) => {
      const numPeriod = periodTerm === 'year' ? 4 : 8
      const totalCost = cost * numPeriod

      if (amount >= totalCost) {
        const remainder = formatDollars(amount - totalCost)
        const remainderSentence = `, with roughly ${remainder} left over.`

        return sentence('4 years') + remainderSentence
      } else if (amount < totalCost && amount >= cost) {
        const periods = Math.floor(amount / cost)
        const periodsSentence = `${periods} ${periodTerm}` + (periods !== 1 ? 's' : '')

        return sentence(periodsSentence) + '.'
      }

      return null
    }

    const items = []

    allSentences.forEach(sentence => {
      const result = computeSentencePossibility(sentence)

      if (result) {
        items.push(result)
      }
    })

    this.setState({items, currentItem: 0})
  }

  render() {
    const {showMultiple} = this.props
    const {items, currentItem} = this.state

    return (
      <StyledWorth>
        <div className="worth-title tooltip-container">
          <span>To put it in perspective...</span>
          <Tooltip
            tooltip="These projections are based on the <b>current prices</b> of tuition, room & board, books, and supplies."
            position="top"
            trigger="click"
            animation="fade"
            arrow={true}
          >
            <div className="tooltip-icon">
              <IconQuestion />
            </div>
          </Tooltip>
        </div>
        <ul className={showMultiple ? 'worth-items multiple' : 'worth-items'}>
          {showMultiple && items.map((item, index) => <li key={item}>{item}</li>)}
          {!showMultiple && <li>{items[currentItem]}</li>}
        </ul>
      </StyledWorth>
    )
  }
}

export default React.forwardRef((props, ref) => (
  <SavingsCalculatorConsumer>
    {context => <Worth {...context} {...props} ref={ref} />}
  </SavingsCalculatorConsumer>
))
