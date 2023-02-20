import React, {useState} from 'react'

import {currencyFormat} from '../_helpers'
import Card from '../card'
import Flex from '../flex'
import Box from '../box'
import Button from '../button'
import {Heading, CappedText, InlineText, InteractiveLink} from '../typography'
import Avatar from '../avatar'
import {SVGIcon} from '../icon'
import theme from '../theme'

import {ReactComponent as IconCaretRight} from '../assets/caret-right-solid.svg'
import {Link} from 'react-router-dom'

const calculateContributions = contributions => {
  let count = 0

  contributions.forEach(({amount, contributionRecurrences}) => {
    count += amount * contributionRecurrences.length
  })

  return count
}

const recurrenceFormat = interval => {
  if (interval === 'weekly') return 'week'
  if (interval === 'biweekly') return 'every 2 weeks'
  if (interval === 'monthly') return 'month'
  if (interval === 'quarterly') return 'every 3 months'
  if (interval === 'yearly') return 'year'

  return 'unknown'
}

const Contribution = ({date, message, amount, contributor}) => (
  <Flex flexDirection={['column', null, 'row']} mb={[3, null, 2]}>
    <InlineText flex={['auto', null, '0 0 220px']}>{date}</InlineText>
    <InlineText
      flex={['auto', null, '0 0 152px']}
      display={['block', null, 'block']}
      fontStyle="italic"
      color="gray"
      mr={2}
    >
      {contributor}
    </InlineText>
    <InlineText display={['none', null, 'block']} fontStyle="italic" color="mediumGray">
      {message}
    </InlineText>
    <InlineText
      fontWeight="bold"
      mt={[1, null, 0]}
      ml={[0, null, 'auto']}
      minWidth={140}
      textAlign={['left', null, 'right']}
    >
      {currencyFormat(amount)}
    </InlineText>
  </Flex>
)

const RecurringContribution = ({
  contributions,
  contributor,
  message,
  amount,
  recurrenceInterval,
  isRecurrenceActive,
  onEditRecurring,
  baseContribution,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const validContributions = contributions.filter(c => c.status)

  const iconTransition = {
    transition: `transform ${theme.animations.fast} ease-in-out`,
  }
  const iconAnimateStyles = isExpanded
    ? {
        transform: 'rotate(90deg)',
        ...iconTransition,
      }
    : iconTransition

  return (
    <Box mb={[3, null, 2]}>
      <Flex flexDirection={['column', null, 'row']}>
        {validContributions.length > 1 && (
          <Flex
            flex={['auto', null, '0 0 220px']}
            alignItems="center"
            onClick={() => setIsExpanded(!isExpanded)}
            style={{cursor: 'pointer', userSelect: 'none'}}
          >
            <InlineText>{validContributions[0].createdAt}</InlineText>
            <SVGIcon
              ml={['auto', 10]}
              color="lightGray"
              size={1}
              Icon={IconCaretRight}
              style={iconAnimateStyles}
            />
          </Flex>
        )}
        {validContributions.length === 1 && (
          <InlineText flex={['auto', null, '0 0 220px']}>
            {validContributions[0].createdAt}
          </InlineText>
        )}
        <InlineText
          flex={['auto', null, '0 0 152px']}
          display={['block', null, 'block']}
          fontStyle="italic"
          color="gray"
          mr={2}
        >
          {contributor}
        </InlineText>
        <InlineText display={['none', null, 'block']} fontStyle="italic" color="mediumGray">
          {message}
        </InlineText>
        <InlineText
          fontWeight="bold"
          mt={[1, null, 0]}
          ml={[0, null, 'auto']}
          minWidth={140}
          textAlign={['left', null, 'right']}
        >
          {currencyFormat(amount)} / {recurrenceFormat(recurrenceInterval)} -{' '}
          {isRecurrenceActive ? (
            <InteractiveLink fontWeight="bold" onClick={() => onEditRecurring(baseContribution)}>
              edit
            </InteractiveLink>
          ) : (
            <InlineText fontWeight="bold" color="error">
              cancelled
            </InlineText>
          )}
        </InlineText>
      </Flex>
      {isExpanded &&
        validContributions.slice(1).map(({createdAt}) => (
          <Flex flexDirection={['column', null, 'row']} mt={2}>
            <InlineText flex={['auto', null, '0 0 220px']} color="mediumGray">
              {createdAt}
            </InlineText>
            <InlineText
              fontWeight="bold"
              color="mediumGray"
              mt={[1, null, 0]}
              ml={[0, null, 'auto']}
            >
              {currencyFormat(amount)}
            </InlineText>
          </Flex>
        ))}
    </Box>
  )
}

export default ({
  avatar,
  name,
  hashId,
  isOwner,
  contributor,
  contributions,
  onContribute,
  onEditRecurring,
  ...props
}) => {
  const totalText = 'Contributed'
  const buttonText = 'Contribute'
  const profileUrl = `/scholars/${hashId}/${name.split(' ').join('-').toLowerCase()}`
  const contributionAmount = calculateContributions(contributions)

  return (
    <Card {...props} p={[3, 4]}>
      <Flex
        flexDirection={['column', 'row']}
        alignItems="center"
        justifyContent={['flex-start', 'space-between']}
      >
        <Flex flexDirection="row" width="100%" alignItems="center" mb={[3, 0]}>
          <Avatar
            src={avatar}
            size={[4, 5]}
            data-cy={`contribution-${name.replace(/\s+/g, '-').toLowerCase()}-avatar`}
          />
          <Box ml={3}>
            <Heading
              fontWeight="normal"
              as="h3"
              textStyle="h3"
              mb={0}
              mt={0}
              data-cy={`contribution-${name.replace(/\s+/g, '-').toLowerCase()}-name`}
            >
              {name}
            </Heading>
            <CappedText
              color="lightGray"
              mb={0}
              data-cy={`contribution-${name.replace(/\s+/g, '-').toLowerCase()}-amount`}
            >
              {totalText}{' '}
              <CappedText color="success">{currencyFormat(contributionAmount)}</CappedText>
            </CappedText>
          </Box>
        </Flex>
        <Flex flexDirection={['column', 'row']} width={['100%', 'auto']}>
          <Button onClick={onContribute} mb={[2, 0]} mr={2}>
            {buttonText}
          </Button>
          <Button onClick={onContribute} mb={0} variant="secondary" to={profileUrl} as={Link}>
            View Profile
          </Button>
        </Flex>
      </Flex>
      <Box mt={3}>
        {contributions.map(contribution => {
          const {
            createdAt,
            message,
            amount,
            name,
            contributionRecurrences,
            recurrenceInterval,
            isRecurrenceActive,
          } = contribution
          if (recurrenceInterval === 'never') {
            return (
              <Contribution date={createdAt} message={message} amount={amount} contributor={name} />
            )
          }

          return (
            <RecurringContribution
              baseContribution={contribution}
              contributions={contributionRecurrences}
              message={message}
              amount={amount}
              contributor={name}
              recurrenceInterval={recurrenceInterval}
              isRecurrenceActive={isRecurrenceActive}
              onEditRecurring={onEditRecurring}
            />
          )
        })}
      </Box>
    </Card>
  )
}
