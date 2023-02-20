import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, number, text, boolean} from '@storybook/addon-knobs'
import {State, Store} from '@sambego/storybook-state'

import ProfileHeader from '.'

import Dialog from '../dialog'

const stories = storiesOf('3. Complex|Profile Header', module)

const store = new Store({
  isOpen: false,
  dialogMessage: '',
})

stories.addDecorator(withKnobs)

stories.add('default', () => {
  // NOTE: In the real world, this would be controlled by the Y scroll position of the user
  const yPosition = number('Scroll position', 0, {range: true, min: 0, max: 600, step: 1}, 'Main')
  const avatar = text('Avatar', 'http://www.ghostofaflea.com/archives/RaptorJesus.jpg', 'Main')
  const cover = text(
    'Cover',
    'https://images.unsplash.com/photo-1560830223-d372ab97cf38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
    'Main',
  )
  const name = text('Name', 'Sam W.', 'Main')
  const hasEntryYear = boolean('Has entry year?', true, 'Main')
  const entryYear = hasEntryYear ? number('Entry year', 2033, {}, 'Main') : null
  const birthYear = number('Birth year', 2012, {}, 'Main')

  const toggleDialog = message => store.set({isOpen: !store.get('isOpen'), dialogMessage: message})

  return (
    <React.Fragment>
      <State store={store}>
        {({isOpen, dialogMessage}) => (
          <Dialog
            heading={dialogMessage}
            hasBackground
            isOpen={isOpen}
            close={() => toggleDialog('')}
          >
            {dialogMessage}
          </Dialog>
        )}
      </State>
      <ProfileHeader
        yPosition={yPosition}
        avatar={avatar}
        cover={cover}
        name={name}
        entryYear={entryYear}
        birthYear={birthYear}
        openContributionsDialog={() => toggleDialog('Contributions dialog')}
        openRemindersDialog={() => toggleDialog('Reminders dialog')}
      />
    </React.Fragment>
  )
})
