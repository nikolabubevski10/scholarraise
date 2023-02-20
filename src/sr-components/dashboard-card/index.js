import React from 'react'
import {Link} from 'react-router-dom'
import {ReactComponent as IconEnvelope} from '../assets/envelope-solid.svg'
import Card from '../card'
import Flex from '../flex'
import Box from '../box'
import Avatar from '../avatar'
import {Heading, InlineText, InternalLink} from '../typography'
import Button from '../button'
import {SVGIcon} from '../icon'
import Statistic from '../statistic'
import {HoverTooltip} from '../form/inputs/_tooltip'
import {currencyFormat} from '../_helpers'

export default ({
  avatar,
  name,
  hashId,
  financials,
  openDepositDialog,
  onCopyProfile,
  pending = 0,
  lastUpdated,
  ...props
}) => {
  const {balance, principal, interest, withdrawals} = financials
  const profileUrl = `/scholars/${hashId}/${name.split(' ').join('-').toLowerCase()}`
  const overviewUrl = `/dashboard/plans/${hashId}/overview`

  const financialsArray = [
    {
      title: 'Balance',
      amount: balance,
    },
    {
      title: 'Principal',
      tooltip: 'The combined amount of money you and others have put into the account.',
      amount: principal,
    },
    {
      title: 'Gains',
      tooltip:
        'Your principal money is invested, and this is the income earned off of your investments. AKA "Free Money"',
      amount: interest,
    },
    {
      title: 'Withdrawal',
      tooltip:
        'Please make your withdrawals through NYSaves. We are working to make this available on Scholar Raise.',
      amount: withdrawals,
    },
  ]

  return (
    <InternalLink to={overviewUrl}>
      <Card {...props} p={4}>
        <Flex flexDirection="column" alignItems="center">
          <Flex
            flexDirection={['column', 'row']}
            alignItems="center"
            justifyContent="space-between"
            width={['auto', '100%']}
            mb={[3, 4]}
          >
            <Flex flexDirection={['column', 'row']} alignItems="center" mb={[3, 0]}>
              <Avatar
                src={avatar}
                size={[4, 5]}
                data-cy={`dashboard-${name.replace(/\s+/g, '-').toLowerCase()}-avatar`}
              />
              <Box ml={[0, 3]} mt={[3, 0]}>
                <InternalLink
                  to={overviewUrl}
                  data-cy={`dashboard-${name.replace(/\s+/g, '-').toLowerCase()}-overview-link`}
                >
                  <Heading
                    textAlign={['center', 'left']}
                    fontWeight={['normal', 'bold']}
                    as="h3"
                    textStyle="h3"
                    mt={0}
                    mb={0}
                    data-cy={`dashboard-${name.replace(/\s+/g, '-').toLowerCase()}-name`}
                  >
                    {name}
                  </Heading>
                </InternalLink>
                <Flex justifyContent={['center', 'flex-start']} alignItems="center">
                  <HoverTooltip
                    tooltip="This will copy a link to your scholar's profile to your clipboard - you can paste it in an email to send to friends and family."
                    position="top"
                    animation="fade"
                  >
                    <SVGIcon
                      Icon={IconEnvelope}
                      size={2}
                      color="lightGray"
                      hoverColor="mediumGray"
                      onClick={event => {
                        event.preventDefault()
                        onCopyProfile(profileUrl)
                      }}
                    />
                  </HoverTooltip>
                </Flex>
              </Box>
            </Flex>
            <Flex alignItems="center">
              <Button
                mb={0}
                onClick={event => {
                  event.preventDefault()
                  openDepositDialog()
                }}
                data-cy={`dashboard-${name.replace(/\s+/g, '-').toLowerCase()}-deposit`}
              >
                Contribute
              </Button>
              <Button
                mb={0}
                ml={3}
                to={profileUrl}
                variant="secondary"
                as={Link}
                data-cy={`dashboard-${name.replace(/\s+/g, '-').toLowerCase()}-profile`}
              >
                View Profile
              </Button>
            </Flex>
          </Flex>
          <Flex
            flexDirection={['column', 'row']}
            alignItems="center"
            justifyContent="space-between"
            width={['auto', '100%']}
          >
            {financialsArray.map(({title, tooltip, amount}, index) => {
              const isLast = financialsArray.length - 1 === index
              const isFirst = index === 0

              return (
                <Statistic
                  key={index}
                  mb={isLast ? 0 : [3, 0]}
                  alignItems={['center', 'flex-start']}
                  width={['auto', null, `${100 / financialsArray.length}%`]}
                  title={title}
                  important={isFirst}
                  value={amount}
                  tooltip={tooltip}
                  name={name}
                />
              )
            })}
          </Flex>
        </Flex>
        <Flex
          flexDirection={['column', 'row']}
          alignItems="center"
          justifyContent="space-between"
          width={['auto', '100%']}
        >
          <InlineText color="mediumGray" lineHeight="title" mt={3} fontSize={[3]}>
            <HoverTooltip
              tooltip="This is the amount of money that's currently on it's way to your account. We expect these funds to clear in 3-5 business days."
              position="top"
              animation="fade"
            >
              Pending: {currencyFormat(pending)}
            </HoverTooltip>
          </InlineText>
          <InlineText color="lightGray" lineHeight="title" mt={3}>
            {lastUpdated && `Last updated ${lastUpdated}`}
          </InlineText>
        </Flex>
      </Card>
    </InternalLink>
  )
}
