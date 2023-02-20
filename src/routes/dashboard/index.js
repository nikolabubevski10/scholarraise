import React, {useState, useEffect} from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import ScrollSpy from 'react-scrollspy'
import Page from '../../components/page'
import {
  EditProfile,
  RecentActivity,
  Invitations,
  SideBar,
  Financial,
  ContributeButton,
  InviteButton,
} from '../../components/dashboard'
import {
  Container,
  Box,
  Flex,
  Heading,
  Row,
  Column,
  Paragraph,
  currencyFormat,
  Dialog,
} from 'sr-components'
import {useDashboard} from 'hooks/useDashboard'
import {useUser} from 'context/user'
import {useAppContext} from 'context/appContext'
import Chart from 'components/dashboard/chart'
import PendingInvitations from 'components/dashboard/pending-invitations'
import {scrollToId} from 'helpers/common'
import EmptyDashboard from './empty'
import {sortAndCreateBalances} from 'helpers/data-manipulation'
import {MakeAContribution} from 'routes/contributions/contribute-modal'

dayjs.extend(relativeTime)

export default function Dashboard() {
  const [currentAccount, setCurrentAccount] = useState()
  const [newContribution, setNewContribution] = useState(false)
  const [anchor, setAnchor] = useState(null)
  const [openContributionDialog, setContributionDialogAccount] = useState()
  const {dashboard, mutate, error} = useDashboard()
  const {setLoading} = useAppContext()
  const {user} = useUser()
  const sortedBalances = sortAndCreateBalances(currentAccount?.balances)

  useEffect(() => {
    if (anchor && anchor.scroll) {
      scrollToId(anchor.to)
      setAnchor({...anchor, scroll: false})
    }
  }, [anchor])

  useEffect(() => {
    if (newContribution) {
      const accounts = dashboard.accounts
      accounts.forEach(acc => {
        if (acc.id === newContribution.accountId) {
          let pending = parseFloat(acc.pendingContributions)
          let contributionAmount = parseFloat(newContribution.amount)
          acc.pendingContributions = pending + contributionAmount

          if (acc.hashid === currentAccount?.hashid) {
            setCurrentAccount(acc)
          }
        }
      })
      mutate({accounts, activity: dashboard.activity}, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newContribution])

  useEffect(() => {
    if (dashboard?.accounts?.length === 1) {
      setCurrentAccount(dashboard.accounts[0])
    }
  }, [currentAccount, dashboard])

  const shouldDisplayChart = Boolean(
    currentAccount?.balances?.length > 0 ||
      currentAccount?.pendingContributions ||
      (!currentAccount &&
        dashboard?.accounts.find(
          a => a?.balances?.length > 0 || parseFloat(a?.pendingContributions) > 0,
        )),
  )

  function updateAnchor(el) {
    if (el && currentAccount) {
      setAnchor({to: el.id, scroll: false})
    }
  }

  function handleContributionSuccess(contribution) {
    setNewContribution(contribution)
    setContributionDialogAccount()
    setLoading(false)
  }

  return (
    <Page title="My Plans">
      <Container my={[4, null, 5]}>
        {/* Top */}
        {dashboard?.accounts?.length > 0 ? (
          <ScrollSpy
            items={['Activity', 'Edit Profile', 'Invitations']}
            offset={-80}
            onUpdate={updateAnchor}
            style={{padding: 0}}
          >
            <Row>
              <Column width={1}>
                <PendingInvitations />
                <Flex
                  justifyContent="space-between"
                  alignItems={[null, null, 'center']}
                  flexDirection={['column', null, 'row']}
                  mb={[3, null, 5]}
                >
                  <Heading as="h2" textStyle="h2" mt={[3, null, 0]} mb={[null, null, 0]}>
                    My Plans
                  </Heading>
                  <Flex flexDirection={['column', 'row']}>
                    <Box width={[1, 1 / 2, 'auto']} mr={[0, 3, 0]}>
                      <ContributeButton
                        accounts={dashboard.accounts}
                        setContributeAccount={setContributionDialogAccount}
                      />
                    </Box>
                    <Box width={[1, 1 / 2, 'auto']}>
                      <InviteButton accounts={dashboard.accounts} mb={0} />
                    </Box>
                  </Flex>
                </Flex>
              </Column>
            </Row>
            <Row>
              <Column width={1}>
                {/* Create a Stack container */}
                <Flex flexDirection={['column', null, 'row']} width={1}>
                  <Box
                    width={[1, null, 0.24, 0.2]}
                    position={[null, null, 'sticky']}
                    top={[null, null, 88]}
                    alignSelf={[null, null, 'flex-start']}
                    mb={[4, null, 0]}
                  >
                    <SideBar
                      dashboard={dashboard}
                      currentAccount={currentAccount}
                      setAccount={setCurrentAccount}
                      setAnchor={setAnchor}
                      anchor={anchor}
                    />
                  </Box>
                  <Box
                    width={[1, null, 0.76, 0.8]}
                    borderLeft={[null, null, '2px solid rgb(221, 226, 232)']}
                    pl={[null, null, 3]}
                  >
                    <>
                      <Box id="Activity">
                        {shouldDisplayChart && (
                          <Chart dashboard={dashboard} account={currentAccount} />
                        )}
                      </Box>
                      <Box>
                        <Financial
                          account={currentAccount}
                          financialSummary={currentAccount?.financialSummary}
                          balances={sortedBalances}
                        />
                        {currentAccount && (
                          <Paragraph mt={2}>
                            Pending contributions:{' '}
                            {currencyFormat(currentAccount?.pendingContributions)}
                          </Paragraph>
                        )}
                      </Box>
                    </>
                    <Box mt={currentAccount && currentAccount?.balance?.principal > 0 ? 4 : 0}>
                      <RecentActivity
                        account={currentAccount}
                        openContribution={() => setContributionDialogAccount(currentAccount)}
                        newContribution={newContribution}
                      />
                    </Box>
                    <Box mt={4} id="Edit Profile">
                      <EditProfile
                        account={currentAccount}
                        mutate={mutate}
                        error={error}
                        dashboard={dashboard}
                      />
                    </Box>
                    <Box mt={4} id="Invitations">
                      <Invitations account={currentAccount} />
                    </Box>
                  </Box>
                </Flex>
                <Dialog
                  isOpen={!!openContributionDialog}
                  close={() => setContributionDialogAccount()}
                  heading="Make a contribution"
                  width={[1, null, 2 / 3, 1 / 2]}
                >
                  <MakeAContribution
                    options={{
                      account: openContributionDialog,
                      onContribute: handleContributionSuccess,
                      classNames: {'p-10': false, 'p-0': true, 'mt-5': true},
                      formClassNames: {'md:grid-cols-3': false, 'md:grid-cols-2': true},
                    }}
                  />
                </Dialog>
              </Column>
            </Row>
          </ScrollSpy>
        ) : (
          <EmptyDashboard name={user.firstName} />
        )}
      </Container>
    </Page>
  )
}
