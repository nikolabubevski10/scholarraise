import React, {Fragment} from 'react'
import CountUp from 'react-countup'
import {Paragraph, Flex, InlineText, Box, Divider, Tooltip} from 'sr-components'

const ResultItem = ({title, tooltip, start, end, rightAligned, boring, isFinal}) => (
  <Flex flexDirection="column" alignItems={rightAligned ? 'flex-end' : 'flex-start'}>
    <Flex alignItems="center" mb={2}>
      <InlineText
        fontWeight="bold"
        color={boring ? 'mediumGray' : 'darkGray'}
        mr={rightAligned ? 0 : 2}
      >
        {title}
      </InlineText>
      {tooltip && <Tooltip tooltip={tooltip} position={rightAligned ? 'left' : 'right'} />}
    </Flex>
    <CountUp start={start} end={end} duration={1} separator="," prefix="$">
      {({countUpRef}) => (
        <InlineText ref={countUpRef} fontSize={5} fontWeight={isFinal ? 'bold' : 'normal'} />
      )}
    </CountUp>
  </Flex>
)

const Results = ({
  highlightedYear,
  interestRate,
  savingsInterestRate,
  highlighted529Amount,
  highlightedSavingsAmount,
  OLD_highlighted529Amount,
  OLD_highlightedSavingsAmount,
}) => (
  <Fragment>
    <Paragraph mb={3}>
      In <strong>{highlightedYear} years</strong>, your account could be worth...
    </Paragraph>
    <Flex justifyContent="space-between" alignItems="flex-end" mb={3}>
      <ResultItem
        title="Scholar Raise"
        start={OLD_highlighted529Amount}
        end={highlighted529Amount}
      />
      <InlineText display={['none', 'block']} color="mediumGray" fontSize={4} mb={1}>
        vs
      </InlineText>
      <ResultItem
        title="Savings account"
        start={OLD_highlightedSavingsAmount}
        end={highlightedSavingsAmount}
        rightAligned
        boring
      />
    </Flex>
    <Divider />
    <Box mt={3}>
      <ResultItem
        title="That's a difference of..."
        start={OLD_highlighted529Amount - OLD_highlightedSavingsAmount}
        end={highlighted529Amount - highlightedSavingsAmount}
        isFinal
      />
    </Box>
  </Fragment>
)

export default Results
