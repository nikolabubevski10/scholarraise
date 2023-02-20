import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs} from '@storybook/addon-knobs'
import {sizeKnob, colorKnob} from '../../storybook-helpers'
import {ReactComponent as IconCheck} from '../assets/check-solid.svg'

import {SVGIcon} from './'

const stories = storiesOf('2. Simple|Icon', module)

stories.addDecorator(withKnobs)

stories.add('default', () => {
  const size = sizeKnob('Size', 2, 'Main')
  const color = colorKnob('Color', 'success', 'Main')

  return <SVGIcon Icon={faCheck} size={size} m={3} color={color} />
})

stories.add('as an interactive icon', () => {
  const size = sizeKnob('Size', 2, 'Main')
  const color = colorKnob('Color', 'success', 'Main')
  const hoverColor = colorKnob('Hover color', 'success700', 'Main')

  return (
    <SVGIcon
      Icon={faCheck}
      size={size}
      m={3}
      color={color}
      hoverColor={hoverColor}
      onClick={() => console.log('Very interactive.')}
    />
  )
})
