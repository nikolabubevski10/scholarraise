import React from 'react'
import styled from 'styled-components'
import posed from 'react-pose'
import {Flex} from 'sr-components'
import theme from 'sr-components/theme'
import {ReactComponent as IconTimes} from 'sr-components/assets/times-solid.svg'
import {SVGIcon} from 'sr-components/icon'
import {InlineText} from 'sr-components/typography'

const getColors = type => {
  if (type === 'success') {
    return {
      backgroundColor: theme.colors.success100,
      color: theme.colors.success700,
    }
  } else if (type === 'warning') {
    return {
      backgroundColor: theme.colors.warning100,
      color: theme.colors.warning700,
    }
  } else if (type === 'error') {
    return {
      backgroundColor: theme.colors.error100,
      color: theme.colors.error700,
    }
  } else if (type === 'info') {
    return {
      backgroundColor: theme.colors.primary100,
      color: theme.colors.primary700,
    }
  }

  return {backgroundColor: theme.colors.snow, color: theme.colors.darkGray}
}

const getIconColors = type => {
  if (type === 'success') {
    return {
      backgroundColor: theme.colors.success300,
      color: theme.colors.success700,
    }
  } else if (type === 'warning') {
    return {
      backgroundColor: theme.colors.warning300,
      color: theme.colors.warning700,
    }
  } else if (type === 'error') {
    return {
      backgroundColor: theme.colors.error300,
      color: theme.colors.error700,
    }
  } else if (type === 'info') {
    return {
      backgroundColor: theme.colors.primary300,
      color: theme.colors.primary700,
    }
  }

  return {
    backgroundColor: theme.colors.lightGray,
    color: theme.colors.darkGray,
  }
}

const RemoveIconElem = styled(Flex)(props => ({
  backgroundColor: getIconColors(props.appearance).backgroundColor,
  marginLeft: theme.space[2],
  borderRadius: theme.radii.round,
  width: theme.widths[1],
  height: theme.heights[1],
  cursor: 'pointer',
  justifyContent: 'center',
  alignItems: 'center',
}))

const RemoveIcon = props => (
  <RemoveIconElem {...props}>
    <SVGIcon Icon={IconTimes} size={0} color={getIconColors(props.appearance).color} />
  </RemoveIconElem>
)

const NotificationText = styled(InlineText)({
  flex: 1,
})

const Notification = styled(Flex)(props => ({
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: theme.radii.normal,
  width: '100%',
  userSelect: 'none',
  padding: theme.space[2],
  margin: `${theme.space[1]}px 0 0 0`,
  zIndex: theme.zIndicies.notifications,
  ...getColors(props.appearance),
}))

const Pose = posed.div({
  enter: {opacity: 1},
  exit: {opacity: 0},
  transition: {
    duration: parseInt(theme.animations.slow),
    ease: 'easeInOut',
  },
})

const enteringTransitionStates = ['entering', 'entered']

export default ({appearance, children, onDismiss, transitionState}) => (
  <Pose pose={enteringTransitionStates.includes(transitionState) ? 'enter' : 'exit'}>
    <Notification appearance={appearance} width={['100%', '300px']}>
      <NotificationText>{children}</NotificationText>
      <RemoveIcon onClick={onDismiss} appearance={appearance} />
    </Notification>
  </Pose>
)
