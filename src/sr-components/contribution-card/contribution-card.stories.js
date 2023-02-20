import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, text, select, boolean} from '@storybook/addon-knobs'

import ContributionCard from '.'

import {Column} from '../grid'

const stories = storiesOf('3. Complex|Contribution Card', module)

stories.addDecorator(withKnobs)

stories.add('default', () => {
  const avatar = text('Avatar', 'http://www.ghostofaflea.com/archives/RaptorJesus.jpg', 'Main')
  const name = text('Title', 'Ben Wendel', 'Main')
  const hashId = text('Hash ID', 'od8fgd8i', 'Main')
  const isOwner = boolean('Is owner?', false, 'Main')
  const onContribute = () => console.log('CONTRIBUTE!')
  const onEditRecurring = () => console.log('EDIT RECURRING!')

  const contributions1 = [
    {
      createdAt: 'November 21st, 2019',
      message: 'Congrats on your 10 year anniversary',
      amount: 40,
      name: 'Aunt Kelly',
      recurrenceInterval: 'never',
      isRecurrenceActive: false,
      contributionRecurrences: [
        {
          createdAt: 'November 21st, 2019',
        },
      ],
    },
    {
      createdAt: 'October 3rd, 2019',
      message: 'Happy birthday Ben!',
      amount: 100,
      name: 'Mr Hopper',
      recurrenceInterval: 'yearly',
      isRecurrenceActive: true,
      contributionRecurrences: [
        {
          createdAt: 'October 3rd, 2019',
        },
        {
          createdAt: 'October 3rd, 2018',
        },
        {
          createdAt: 'October 3rd, 2017',
        },
      ],
    },
    {
      createdAt: 'October 1st, 2017',
      message: 'Happy birthday little guy. :)',
      amount: 20,
      name: 'Mike Mascia',
      recurrenceInterval: 'yearly',
      isRecurrenceActive: false,
      contributionRecurrences: [
        {
          createdAt: 'October 1st, 2017',
        },
      ],
    },
  ]

  const contributions2 = [
    {
      createdAt: 'September 27th, 2019',
      message: 'Love you my beautiful son!',
      amount: 1400,
      name: 'Mike Mascia',
      recurrenceInterval: 'never',
      isRecurrenceActive: false,
      contributionRecurrences: [
        {
          createdAt: 'September 27th, 2019',
        },
      ],
    },
    {
      createdAt: 'August 2nd, 2019',
      message: 'Happy birthday Ben!',
      amount: 400,
      name: 'Mike Mascia',
      recurrenceInterval: 'yearly',
      isRecurrenceActive: true,
      contributionRecurrences: [
        {
          createdAt: 'August 2nd, 2019',
        },
        {
          createdAt: 'August 2nd, 2018',
        },
        {
          createdAt: 'August 2nd, 2017',
        },
      ],
    },
    {
      createdAt: 'July 17th, 2017',
      message: 'Transfer of initial balance from TNStars to Scholar Raise',
      amount: 200,
      name: 'Mike Mascia Jr.',
      recurrenceInterval: 'never',
      isRecurrenceActive: false,
      contributionRecurrences: [
        {
          createdAt: 'July 17th, 2017',
        },
      ],
    },
  ]

  return (
    <Column width={1}>
      <ContributionCard
        avatar={avatar}
        name={name}
        hashId={hashId}
        isOwner={isOwner}
        contributions={contributions1}
        onContribute={onContribute}
        onEditRecurring={onEditRecurring}
      />
    </Column>
  )
})
