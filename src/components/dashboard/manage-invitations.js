import React, {useState} from 'react'
import {Row, Column, ShortCard, Button, Paragraph} from 'sr-components'
import useSWR from 'swr'

import {useInvitation} from '../../hooks/useInvitation'
import {ReactComponent as IconTrashAlt} from '../../assets/icons/trash-alt-solid.svg'
import {ReactComponent as IconUndo} from '../../assets/icons/undo-solid.svg'

export default function ManageInvitations({account}) {
  const {index, del, resend} = useInvitation()
  const [openAllInvitations, setOpenAllInvitations] = useState(false)

  const {data: invitations, mutate} = useSWR('/invitations', () => index(account?.hashid), {
    suspense: true,
  })

  const last3InvitationsSent = invitations?.slice(0, 3)
  const invitationsToDisplay = openAllInvitations ? invitations : last3InvitationsSent
  const isPlural = invitationsToDisplay?.length > 1
  const dialogHeaderText =
    invitationsToDisplay?.length > 0
      ? `Here ${
          isPlural ? 'are all' : 'is'
        } the invitations you've sent! You can resend or delete ${
          isPlural ? 'them' : 'it'
        } if you want to.`
      : "You haven't sent any invitations yet. How about starting now?"

  return (
    <Row>
      <Column width={1} mt={2}>
        <Paragraph>{dialogHeaderText}</Paragraph>
      </Column>
      {invitationsToDisplay.map(invitation => (
        <Column width={[1, 1 / 2, null, 1 / 3]} mt={[2, null, 0]}>
          <ShortCard
            key={invitation.id}
            mb={3}
            title={invitation.firstName}
            description={invitation.email}
            buttons={[
              {
                icon: IconUndo,
                color: 'mediumGray',
                hoverColor: 'darkGray',
                onClick: () => resend(account.hashid, invitation.hashid),
              },
              {
                icon: IconTrashAlt,
                color: 'error500',
                hoverColor: 'error700',
                onClick: () => del(account.hashid, invitation.hashid).then(() => mutate()),
              },
            ]}
          />
        </Column>
      ))}
      <Column width={1} mt={2}>
        {invitations.length > last3InvitationsSent.length && !openAllInvitations && (
          <Button
            data-cy="view-more-buttom"
            width={[1, null, 'auto']}
            variant="secondary"
            mt={3}
            onClick={() => setOpenAllInvitations(true)}
          >
            View {invitations.length - last3InvitationsSent.length} more
          </Button>
        )}
      </Column>
    </Row>
  )
}
