/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {Heading, Row, Column, Avatar, Flex, InlineText, InteractiveLink} from 'sr-components'
import {avatarFallback} from '../../helpers/images'
import {useSWRInfinite} from 'swr'
import {getActivity} from '../../api/dashboard'

dayjs.extend(relativeTime)

const PAGE_SIZE = 5

export default function RecentActivity({account, openContribution, newContribution}) {
  // makes pagination calls
  const {data, error, mutate, size, setSize} = useSWRInfinite(
    pageNumber => `/activity/${account?.hashid ? account.hashid : 'dashboard'}/page=${pageNumber}`,
    change =>
      getActivity(Number(change.split('=')[1]) + 1, account?.hashid).then(r => r.contributions),
  )

  // this is our data holder
  const contributions = data ? [].concat(...data) : []

  // some states
  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1] < PAGE_SIZE)

  // whenever the account changes, reload!
  useEffect(() => {
    setSize(1)
  }, [account])

  useEffect(() => {
    if (newContribution) {
      if (newContribution.accountId === account?.id) {
        if (data.length > 0) {
          // revisit!
          data[0].push(newContribution)
          mutate()
        }
      } else if (!account) {
        mutate()
      }
    }
  }, [newContribution])

  return (
    <Row>
      <Column width={1} px={0}>
        <Heading as="h4" textStyle="h4" fontWeight={500} mt={0}>
          Recent Activity
        </Heading>
      </Column>
      {isEmpty ? (
        <Column width={1} mb={2} px={0}>
          <InlineText>
            Nobody contributed yet.{' '}
            <InteractiveLink onClick={openContribution}>
              Be the first person to help {account?.beneficiaryFirstName}!
            </InteractiveLink>
          </InlineText>
        </Column>
      ) : null}
      {contributions.map(contribution => (
        <Column width={1} mb={2} key={contribution.hashid} px={0}>
          <Flex justifyContent="space-between">
            <Flex alignItems="center">
              <Avatar size={2} src={avatarFallback(contribution.avatarUrl).image} />
              <InlineText ml={3}>
                <b>{contribution.name}</b> contributed <b>${contribution.amount.toFixed(2)}</b> to{' '}
                <b>{contribution.beneficiaryFirstName}</b>'s plan
                {/* {contribution.contributionRecurrences?.length > 1 &&
                  `, ${contribution.toOwnAccount ? 'your' : 'the'} ${getNumberWithOrdinal(
                    contribution.contributionRecurrences.length
                  )} ${contribution.recurrenceInterval} deposit!`} */}
              </InlineText>
            </Flex>
            <Flex alignItems="center" display={['none', null, 'flex']}>
              <InlineText color="lightGray">{dayjs(contribution.createdAt).fromNow()}</InlineText>
            </Flex>
          </Flex>
        </Column>
      ))}
      {!isReachingEnd && (
        <Column width={1} mt={2} px={0}>
          {isLoadingMore ? (
            <InlineText fontWeight="300" textStyle="link">
              Loading activity...
            </InlineText>
          ) : (
            <InteractiveLink textStyle="link" fontWeight="700" onClick={() => setSize(size + 1)}>
              View more activity...
            </InteractiveLink>
          )}
        </Column>
      )}
    </Row>
  )
}
