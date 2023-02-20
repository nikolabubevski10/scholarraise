import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, text} from '@storybook/addon-knobs'
import {State, Store} from '@sambego/storybook-state'

import ProfilePhotosCard from './'

import Dialog from '../dialog'
import {Paragraph, InternalLink} from '../typography'

const stories = storiesOf('3. Complex|Profile Photos Card', module)

const store = new Store({
  isOpen: false,
  dialogMessage: '',
  isPublic: true,
})

stories.addDecorator(withKnobs)

stories.add('default', () => {
  const avatar = text('Avatar', 'http://www.ghostofaflea.com/archives/RaptorJesus.jpg', 'Main')
  const cover = text(
    'Cover',
    'https://images.unsplash.com/photo-1560830223-d372ab97cf38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
    'Main',
  )

  const message = (
    <Paragraph>
      If the scholar’s profile is public, it may show up in search results and anyone can
      contribute. Don’t worry,{' '}
      <InternalLink to="/">we still respect your child’s privacy</InternalLink> by anonymizing their
      name and hiding other personally revealing information.
    </Paragraph>
  )

  const toggleDialog = message => store.set({isOpen: !store.get('isOpen'), dialogMessage: message})

  return (
    <State store={store}>
      {({isOpen, dialogMessage, isPublic}) => (
        <React.Fragment>
          <Dialog
            heading={dialogMessage}
            hasBackground
            isOpen={isOpen}
            close={() => toggleDialog('')}
          >
            {dialogMessage}
          </Dialog>
          <ProfilePhotosCard
            avatar={avatar === '' ? {image: '', existed: false} : {image: avatar, existed: true}}
            cover={cover === '' ? {image: '', existed: false} : {image: cover, existed: true}}
            isPublic={isPublic}
            privacyMessage={message}
            openAvatarUpload={() => toggleDialog('Avatar upload dialog')}
            openAvatarRemove={() => toggleDialog('Avatar remove dialog')}
            openCoverUpload={() => toggleDialog('Cover upload dialog')}
            openCoverRemove={() => toggleDialog('Cover remove dialog')}
            onIsPublicChange={value => {
              console.log('IS PUBLIC?', value)

              // NOTE: This is only for Storybook, you'll need to handle this yourself
              store.set({isPublic: value})
            }}
          />
        </React.Fragment>
      )}
    </State>
  )
})
