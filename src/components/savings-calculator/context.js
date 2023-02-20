import React, {Component} from 'react'

const SavingsCalculatorContext = React.createContext()

export class SavingsCalculatorProvider extends Component {
  constructor(props) {
    super(props)

    this.defaultState = {
      // Initial values
      deposits: 100,
      contributions: 50,

      // How often do we incur the previous values?
      depositsPeriod: 1, // monthly
      contributionsPeriod: 1, // monthly

      // What are the average interest rates?
      interestRate: 6,
      savingsInterestRate: 0.1,

      // How many years do we want to calculate?
      totalYears: 18,

      // What year do we want to initially show to the user?
      highlightedYear: 18,

      // Hold all the amounts for a 529 account, savings account, and account without interest
      total529Amounts: [],
      totalSavingsAmounts: [],

      // Hold the highlighted amounts for a 529 account, savings account, and account without interest
      highlighted529Amount: 0,
      highlightedSavingsAmount: 0,

      // Hold the OLD highlighted amounts for a 529 account, savings account, and account without interest
      OLD_highlighted529Amount: 0,
      OLD_highlightedSavingsAmount: 0,
    }

    this.state = {...this.defaultState}

    this.handleUpdate = this.handleUpdate.bind(this)
    this.generateAccountAmounts = this.generateAccountAmounts.bind(this)
    this.runInterestMonthly = this.runInterestMonthly.bind(this)
    this.reset = this.reset.bind(this)
  }

  componentDidMount() {
    this.generateAccountAmounts()
  }

  generateAccountAmounts() {
    const {highlightedYear, interestRate, savingsInterestRate} = this.state

    const total529Amounts = this.runInterestMonthly(interestRate)
    const totalSavingsAmounts = this.runInterestMonthly(savingsInterestRate)

    const highlightedYearIndex = highlightedYear * 12

    this.setState(prevState => ({
      total529Amounts,
      totalSavingsAmounts,
      highlighted529Amount: total529Amounts[highlightedYearIndex],
      highlightedSavingsAmount: totalSavingsAmounts[highlightedYearIndex],
      OLD_highlighted529Amount: prevState.highlighted529Amount,
      OLD_highlightedSavingsAmount: prevState.highlightedSavingsAmount,
    }))
  }

  runInterestMonthly(rate, principal = 0, totalMonths, startingMonth = 0) {
    const {totalYears, deposits, depositsPeriod, contributions, contributionsPeriod} = this.state

    const amounts = [principal]
    const numOfMonths = 12
    const spreadMonths = totalMonths ?? totalYears * numOfMonths - startingMonth

    ;[...Array(spreadMonths)].forEach((_, i) => {
      const currentMonth = i + 1
      let newPrincipal = principal

      if (currentMonth % depositsPeriod === 0 || (depositsPeriod === 0 && currentMonth === 1)) {
        newPrincipal += deposits
      }

      if (currentMonth % contributionsPeriod === 0) {
        newPrincipal += contributions
      }

      principal = newPrincipal * (1 + rate / numOfMonths / 100)

      amounts.push(principal)
    })

    return amounts
  }

  handleUpdate(e) {
    const name = e.target.name
    const value = e.target.value

    if ((name.includes('Period') && !isNaN(value)) || value > 0) {
      this.setState({[name]: +value}, this.generateAccountAmounts)
    } else if (value === '') {
      this.setState({[name]: ''})
    } else {
      this.setState({[name]: 0}, this.generateAccountAmounts())
    }
  }

  reset() {
    this.setState({...this.defaultState}, this.generateAccountAmounts)
  }

  render() {
    return (
      <SavingsCalculatorContext.Provider
        value={{
          runInterestMonthly: this.runInterestMonthly,
          handleUpdate: this.handleUpdate,
          reset: this.reset,
          ...this.state,
        }}
      >
        {this.props.children}
      </SavingsCalculatorContext.Provider>
    )
  }
}

export const SavingsCalculatorConsumer = SavingsCalculatorContext.Consumer
