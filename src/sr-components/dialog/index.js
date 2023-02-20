import React from 'react'
import styled from 'styled-components'
import {themeGet} from 'styled-system'
import posed, {PoseGroup} from 'react-pose'
import {ReactComponent as IconTimes} from '../assets/times-solid.svg'

import theme from '../theme'
import Card from '../card'
import Flex from '../flex'
import Box from '../box'
import {Heading as BaseHeading} from '../typography'
import {SVGIcon} from '../icon'

const DIALOG_PADDING = 4

const Background = styled(Box)(props => ({
  position: 'fixed',
  zIndex: themeGet('zIndicies.dialog')(props),
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: themeGet('colors.blacks.1')(props),
}))

const PosedBackground = posed(Background)({
  enter: {opacity: 1},
  exit: {
    opacity: 0,
    delay: parseInt(theme.animations.fast),
  },
  transition: {
    duration: parseInt(theme.animations.fast),
    ease: 'easeInOut',
  },
})

const Dialog = styled(Card)(props => ({
  position: 'fixed',
  zIndex: themeGet('zIndicies.dialog')(props),
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}))

Dialog.defaultProps = {
  ...Card.defaultProps,
  width: ['100%', '90%', '75%'],
}

Dialog.displayName = 'Dialog'

const PosedDialog = posed(Dialog)({
  enter: {
    opacity: 1,
    delay: parseInt(theme.animations.fast),
  },
  exit: {opacity: 0},
  transition: {
    duration: parseInt(theme.animations.fast),
    ease: 'easeInOut',
  },
})

const DialogContainer = styled(Flex)(props => ({
  flexDirection: 'column',
  padding: themeGet(`space.${DIALOG_PADDING}`)(props),
  maxHeight: '100vh',
  overflowX: 'hidden',
  overflowY: 'auto',
}))

const DialogTop = styled(Flex)({
  justifyContent: 'space-between',
})

DialogTop.defaultProps = {
  ...Flex.defaultProps,
  flexDirection: ['column-reverse', 'row'],
  alignItems: ['flex-start', 'center'],
}

DialogTop.displayName = 'DialogTop'

const Heading = styled(BaseHeading)({})

Heading.defaultProps = {
  ...BaseHeading.defaultProps,
  as: 'span',
  textStyle: 'h3',
  mb: 0,
  mt: 0,
}

Heading.displayName = 'Heading'

const Content = styled(Box)({
  flexGrow: 1,
})

Content.defaultProps = {
  ...Box.defaultProps,
  mt: [2, 3],
  mb: [3, 4],
}

Content.displayName = 'Content'

const Buttons = styled(Flex)({
  justifyContent: 'space-between',
})

Buttons.defaultProps = {
  ...Flex.defaultProps,
  flexDirection: ['column', 'row'],
}

Buttons.displayName = 'Buttons'

const ButtonSide = styled(Box)({display: 'flex'})

const CloseButton = styled(SVGIcon)(props => ({
  cursor: 'pointer',
  '& > svg': {
    color: themeGet('colors.snow')(props),
    transition: `color ${themeGet('animations.fast')(props)} ease-in-out`,
  },
  '&:hover > svg': {
    color: themeGet('colors.mediumGray')(props),
  },
}))

CloseButton.defaultProps = {
  ...SVGIcon.defaultProps,
  size: 2,
  Icon: IconTimes,
  mx: ['auto', 0],
  my: [DIALOG_PADDING, 0],
}

CloseButton.displayName = 'CloseButton'

const handleClose = (closeFunc, onClose) => {
  closeFunc()

  if (onClose && typeof onClose === 'function') {
    onClose()
  }
}

const generateButtons = (buttons, closeFunc, onClose) => {
  if (!buttons) return {}

  const mappedButtons = (buttons, side) =>
    buttons && Array.isArray(buttons) && buttons.length > 0
      ? buttons.map((button, index) => {
          const commonProps = {
            key: `${side}-${index}`,
            mb: [1, 0],
            onClick: () => {
              button.props.onClick()

              handleClose(closeFunc, onClose)
            },
          }

          return React.cloneElement(
            button,
            side === 'left' ? {...commonProps, mr: [0, 3]} : {...commonProps, ml: [0, 3]},
          )
        })
      : null

  return {
    leftButtons: <ButtonSide mb={[2, 0]}>{mappedButtons(buttons.left, 'left')}</ButtonSide>,
    rightButtons: <ButtonSide mb={[-1, 0]}>{mappedButtons(buttons.right, 'right')}</ButtonSide>,
  }
}

export default ({
  isOpen,
  close,
  onOpen,
  onClose,
  heading,
  buttons,
  hasBackground = true,
  display,
  children,
  ...props
}) => {
  if (isOpen && onOpen && typeof onOpen === 'function') {
    onOpen()
  }

  const {leftButtons, rightButtons} = generateButtons(buttons, close, onClose)

  return (
    <PoseGroup flipMove={false}>
      {isOpen && hasBackground && (
        <PosedBackground
          key="background"
          display={display}
          onClick={() => handleClose(close, onClose)}
        />
      )}
      {isOpen && (
        <PosedDialog {...props} display={display} key="dialog">
          <DialogContainer>
            <DialogTop>
              <Heading data-cy="dialog-title">{heading}</Heading>
              <CloseButton
                onClick={() => handleClose(close, onClose)}
                data-cy="dialog-close-button"
              />
            </DialogTop>
            <Content>{children}</Content>
            {leftButtons && rightButtons && (
              <Buttons>
                {leftButtons}
                {rightButtons}
              </Buttons>
            )}
          </DialogContainer>
        </PosedDialog>
      )}
    </PoseGroup>
  )
}
