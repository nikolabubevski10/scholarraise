import React from 'react'
import styled from 'styled-components'
import {themeGet, minWidth, minHeight, maxWidth, maxHeight} from 'styled-system'

import Box from '../box'

const IconContainer = styled(Box)(
  props => ({
    position: 'relative',
    cursor: props.hoverColor && 'pointer',
    transition: `color ${themeGet('animations.fast')(props)} ease-in-out`,
    '&:hover': {
      color: props.hoverColor
        ? themeGet(`colors.${props.hoverColor}`, props.hoverColor)(props)
        : props.color,
    },
  }),
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
)

IconContainer.displayName = 'IconContainer'

export const SVGIcon = React.forwardRef(({Icon, size = 0, color, hoverColor, ...props}, ref) => {
  return (
    <IconContainer
      ref={ref}
      {...props}
      color={color}
      hoverColor={hoverColor}
      minWidth={size}
      minHeight={size}
      maxWidth={size}
      maxHeight={size}
    >
      <Icon style={{position: 'absolute'}} height="100%" width="100%" />
    </IconContainer>
  )
})
