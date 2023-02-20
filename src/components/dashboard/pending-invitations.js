import React, {useState} from 'react'
import useSWR from 'swr'
import {Box, PendingInvitationCard, Dialog, InteractiveLink} from 'sr-components'
import {useInvitation} from '../../hooks/useInvitation'
import {avatarFallback} from '../../helpers/images'
import dayjs from 'dayjs'

function createCardFromData(pending) {
  const {account = {}} = pending
  const {
    beneficiaryFirstName,
    beneficiaryLastName,
    beneficiaryAvatarUrl,
    // this is the only spot where we get Id with a capital i.
    hashId: hashid,
  } = account
  const {user = {}} = account

  const avatar = avatarFallback(beneficiaryAvatarUrl).image
  const ownerName = `${user.firstName} ${user.lastName}`
  const name = `${beneficiaryFirstName} ${beneficiaryLastName}`
  const profileUrl = `/scholars/${hashid}/${beneficiaryFirstName}-${beneficiaryLastName[0]}`
  const timeAgo = dayjs(pending.createdAt).fromNow()

  return (
    <PendingInvitationCard
      avatar={avatar}
      ownerName={ownerName}
      name={name}
      profileUrl={profileUrl}
      timeAgo={timeAgo}
      mb={4}
      mt={[4, null, 0]}
    />
  )
}

function PendingInvitationsDialog({pendingInvitations, isOpen, close}) {
  return (
    <Dialog heading="Pending Invitations" hasBackground isOpen={isOpen} close={close}>
      <Box my={2}>{pendingInvitations.map(createCardFromData)}</Box>
    </Dialog>
  )
}

export default function PendingInvitations() {
  const [isPendingDialogOpen, openDialog] = useState()
  const {pending} = useInvitation()
  const {data: pendingInvitations} = useSWR('/pending/invitations', pending, {suspense: true})

  return pendingInvitations?.length > 0 ? (
    <Box>
      {/* Desktop */}
      <Box display={['none', null, 'block']}>{pendingInvitations.map(createCardFromData)}</Box>
      {/* Mobile */}
      <Box display={['block', null, 'none']} mt={2}>
        <InteractiveLink onClick={() => openDialog(true)}>
          You have {pendingInvitations.length} pending invitation
          {pendingInvitations.length > 1 && 's'}.
        </InteractiveLink>
        <PendingInvitationsDialog
          isOpen={isPendingDialogOpen}
          close={() => openDialog(false)}
          pendingInvitations={pendingInvitations}
        />
      </Box>
    </Box>
  ) : null
}
