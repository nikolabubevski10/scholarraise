import React, {useState} from 'react'
import {
  Row,
  Column,
  Heading,
  InteractiveLink,
  Flex,
  Form,
  InlineText,
  ExternalLink,
  Dialog,
  Button,
} from 'sr-components'
import {useInvitation} from '../../hooks/useInvitation'
import ManageInvitations from './manage-invitations'

function ManageInvitationsDialog({account, isOpen, close}) {
  return (
    <Dialog
      heading="Manage Invitations"
      hasBackground
      isOpen={isOpen}
      close={close}
      buttons={{
        right: [
          <Button variant="primary" onClick={() => {}}>
            Back to your plans
          </Button>,
        ],
      }}
    >
      <ManageInvitations account={account} />
    </Dialog>
  )
}

export default function Invitations({account}) {
  const {createBatch} = useInvitation()
  const [isManageDialogOpen, openDialog] = useState()

  function submit(values) {
    createBatch(values.invitations, account.hashid)
  }

  return account ? (
    <Row>
      <Column width={1} px={0}>
        <Flex justifyContent="space-between" width={1} alignItems="center" mt={2}>
          <Heading as="h4" textStyle="h4" fontWeight="500" my={0}>
            Invitations
          </Heading>
          <InteractiveLink onClick={() => openDialog(true)} fontWeight="700">
            Manage existing invitations →
          </InteractiveLink>
        </Flex>
      </Column>
      <Column width={1} px={0}>
        <Form
          mx={-2}
          button="SEND INVITES"
          submit={submit}
          forms={[
            {
              page: [
                {
                  name: `invitations`,
                  type: 'array',
                  button: 'Invite more people',
                  width: 1,
                  validation: {
                    required: false,
                    length: 1,
                  },
                  fields: [
                    {
                      name: 'first_name',
                      type: 'text',
                      placeholder: 'First name',
                      width: [1, null, 1 / 3],
                      validation: {
                        required: true,
                      },
                    },
                    {
                      name: 'email',
                      type: 'email',
                      placeholder: 'Email address',
                      width: [1, null, 2 / 3],
                      validation: {
                        required: true,
                      },
                    },
                  ],
                },
              ],
            },
          ]}
        />
      </Column>
      <Column width={[1, null, 0.5]} px={0}>
        <InlineText fontWeight={300} fontSize="sm" fontStyle="italic" color="mediumGray">
          <i>
            An email will arrive from{' '}
            <ExternalLink href="mailto:info@scholarraise.com">info@scholarraise.com</ExternalLink>!
            But don't worry, we'll never spam your friends or add them to a marketing list.
          </i>{' '}
          😊
        </InlineText>
      </Column>
      <ManageInvitationsDialog
        account={account}
        isOpen={isManageDialogOpen}
        close={() => openDialog(false)}
      />
    </Row>
  ) : null
}
