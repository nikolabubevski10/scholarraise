import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, text} from '@storybook/addon-knobs'

import PendingInvitationsCard from './'

const stories = storiesOf('3. Complex|Pending Invitations Card', module)

stories.addDecorator(withKnobs)

stories.add('default', () => {
  const avatar = text('Avatar', 'http://www.ghostofaflea.com/archives/RaptorJesus.jpg', 'Main')
  const name = text('Name', 'Sam Wilkes', 'Main')
  const ownerName = text('Owner', 'Michelle', 'Main')
  const hashId = text('Hash ID', 'od8fgd8i', 'Main')
  const timeAgo = text('Time ago', 'a few seconds ago', 'Main')

  return (
    <PendingInvitationsCard
      avatar={avatar}
      ownerName={ownerName}
      name={name}
      profileUrl={`/scholar-profile/${hashId}`}
      timeAgo={timeAgo}
    />
  )
})
