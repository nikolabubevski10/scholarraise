import React, {Component} from 'react'
import styled, {css, keyframes} from 'styled-components'

import {Flex, InternalLink, Image, Paragraph} from 'sr-components'
import {SavingsCalculatorConsumer} from './context'

import Inputs from './inputs'
import Results from './results'

import BoomGif from '../../assets/homepage/boomgif.gif'

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`

const StyledSavingsCalculator = styled.div`
  ${props => css`
    width: 100%;
    min-width: 320px;
    border-radius: ${props.theme.radii.normal}px;
    padding: 20px;
    text-align: left;
    ${props.fadeIn &&
    css`
      animation: ${fadeIn} ${props.theme.animations.fast} ease-in;
    `}
    ${props.shadowed === true &&
    css`
      box-shadow: 0px 10px 20px 0px rgba($black, 0.05);
    `};
  `}
`

const EaseMe = styled.div`
  ${props => css`
    animation: ${fadeIn} ${props.theme.animations.lazy} ease-in;
  `}
`

const MAX_CALC_VALUE = 10000000

class SavingsCalculator extends Component {
  checkBoundaries(amount529, savings) {
    return amount529 < MAX_CALC_VALUE && savings < MAX_CALC_VALUE
  }

  render() {
    return (
      <SavingsCalculatorConsumer>
        {context =>
          this.checkBoundaries(context.highlighted529Amount, context.highlightedSavingsAmount) ? (
            <StyledSavingsCalculator shadowed={this.props.shadowed} fadeIn>
              <Inputs {...context} />
              <Results {...context} />
            </StyledSavingsCalculator>
          ) : (
            <StyledSavingsCalculator shadowed={this.props.shadowed}>
              <EaseMe fadeIn>
                <Flex justifyContent="center" alignItems="center">
                  <Image src={BoomGif} />
                </Flex>
                <Paragraph>That's a lot of dough... you broke our calculator!</Paragraph>
                <InternalLink onClick={context.reset}>Reset the calculator?</InternalLink>
              </EaseMe>
            </StyledSavingsCalculator>
          )
        }
      </SavingsCalculatorConsumer>
    )
  }
}

export default SavingsCalculator
