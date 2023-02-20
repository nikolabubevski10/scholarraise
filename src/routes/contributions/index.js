import React from 'react'
import {
  Row,
  Column,
  Container,
  ContributionCard,
  Heading,
  Flex,
  SVGIcon,
  Dialog,
} from 'sr-components'
import {useDisclosure} from 'react-use-disclosure'

import Page from 'components/page'
import {useContribution} from 'hooks/useContribution'
import ErrorBoundary from 'components/error-handling'
import {useUser} from 'context/user'
import {MakeAContribution} from './contribute-modal'
import {avatarFallback} from 'helpers/images'
import {formatDate, extractHashIdFromURL, parseMoney} from 'helpers/common'

import {ReactComponent as IconPiggyBank} from '../../assets/icons/piggy-bank-solid.svg'

function NoContributions() {
  return (
    <Row>
      <Column width={1}>
        <Flex alignItems="center" mt={[3, null, 4]}>
          <SVGIcon Icon={IconPiggyBank} size={5} mr={3} color="mediumGray" />
          <Heading textStyle="h4" fontWeight="normal" mb={[0]} mt={[0]}>
            You haven't made any contributions to a scholar in need.
          </Heading>
        </Flex>
      </Column>
    </Row>
  )
}

function ContributionList({contributions, onContribute, onEditRecurring}) {
  let contributionsGroupedByAccountId = contributions
    .map(contribution => ({
      ...contribution,
      createdAt: formatDate(contribution.createdAt),
      contributionRecurrences: contribution.contributionRecurrences?.map(recurrent => ({
        ...recurrent,
        createdAt: formatDate(contribution.createdAt),
      })),
      amount: contribution.toOwnAccount
        ? contribution.amount
        : parseMoney(contribution.amount)
            // This calculation removes the fee from the amount.
            // This must be updated when the API serves the amount without the fee
            .divide((1.0 + process.env.REACT_APP_SR_FEE) * 100)
            .multiply(100),
    }))
    .reduce((contributionsPerAccount, contribution) => {
      contributionsPerAccount[contribution.accountId] = [
        ...(contributionsPerAccount[contribution.accountId] || []),
        contribution,
      ]
      return contributionsPerAccount
    }, {})

  return (
    <Row mt={[3, null, 4]}>
      {Object.keys(contributionsGroupedByAccountId).map(accId => {
        const contributionsToAccount = contributionsGroupedByAccountId[accId]
        const {
          beneficiaryAvatarUrl,
          beneficiaryFirstName,
          beneficiaryLastName,
          toOwnAccount,
          accountUrl,
        } = contributionsToAccount[0]
        return (
          <Column width={1} mb={4}>
            <ContributionCard
              avatar={avatarFallback(beneficiaryAvatarUrl).image}
              name={`${beneficiaryFirstName} ${beneficiaryLastName}`}
              hashId={extractHashIdFromURL(accountUrl)}
              isOwner={toOwnAccount}
              contributions={contributionsToAccount}
              onContribute={() =>
                onContribute({toOwnAccount, accountUrl, beneficiaryFirstName, beneficiaryLastName})
              }
              onEditRecurring={onEditRecurring}
            />
          </Column>
        )
      })}
    </Row>
  )
}

function Contributions() {
  const {user, token} = useUser()
  const {contributions, refresh} = useContribution()
  const {open, isOpen, close} = useDisclosure()
  const [account, setAccount] = React.useState()
  const [contribution, setContribution] = React.useState()

  React.useEffect(() => {
    if (!isOpen && (account || contribution)) {
      open()
    }
  }, [isOpen, open, account, contribution])

  function handleClose() {
    setContribution()
    setAccount()
    close()
  }

  function setupAccountToContribute({
    accountUrl = '',
    beneficiaryFirstName,
    beneficiaryLastName,
    toOwnAccount,
  }) {
    const partsAccountUrl = accountUrl.split('/')
    const hashid = partsAccountUrl?.pop()

    setAccount({
      userId: toOwnAccount ? user.id : -1,
      hashid,
      beneficiaryFirstName,
      beneficiaryLastName,
    })
  }

  async function updateAndClose() {
    return await refresh().then(handleClose)
  }

  return (
    <Page title="My Contributions">
      <Container my={[4, null, 5]}>
        <Row>
          <Column width={1}>
            <Flex
              width={[1, null, 1]}
              flexDirection={['column', null, 'row']}
              justifyContent={['flex-start', null, 'space-between']}
              alignItems={['flex-start', null, 'center']}
            >
              <Heading as="h2" textStyle="h2" mt={[3, null, 0]} mb={[null, null, 0]}>
                My Contributions
              </Heading>
            </Flex>
          </Column>
        </Row>
        <ErrorBoundary
          fallback={
            <div>
              There was an error loading the contributions list. Please try again in a few minutes!
            </div>
          }
        >
          {contributions && contributions.length === 0 ? (
            <NoContributions />
          ) : (
            <ContributionList
              contributions={contributions}
              onContribute={setupAccountToContribute}
              onEditRecurring={setContribution}
              token={token}
            />
          )}
        </ErrorBoundary>
        <Dialog
          isOpen={isOpen}
          close={handleClose}
          heading={
            account
              ? `Make a new contribution to ${account?.beneficiaryFirstName}`
              : `Update your recurring contribution to ${contribution?.beneficiaryFirstName}`
          }
          width={[1, null, 2 / 3, 1 / 2]}
        >
          <MakeAContribution
            options={{
              account: account,
              editing: contribution,
              onContribute: updateAndClose,
              onCancel: updateAndClose,
              onEdit: updateAndClose,
              classNames: {'p-10': false, 'p-0': true, 'mt-5': true},
              formClassNames: account && {
                'md:grid-cols-3': false,
                'md:grid-cols-2': true,
              },
            }}
          />
        </Dialog>
      </Container>
    </Page>
  )
}

export default Contributions
