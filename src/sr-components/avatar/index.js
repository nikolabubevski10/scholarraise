import React from 'react'
import styled from 'styled-components'
import {
  border,
  borderRadius,
  backgroundImage,
  display,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
} from 'styled-system'

import Box from '../box'

const Avatar = styled(Box)(
  props => ({
    display: 'inline-block',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
  }),
  border,
  borderRadius,
  backgroundImage,
  display,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
)

Avatar.defaultProps = {
  as: 'div',
  borderRadius: 'round',
}

Avatar.displayName = 'Avatar'

export default ({src, size = 3, ...props}) => (
  <Avatar
    {...props}
    minWidth={size}
    minHeight={size}
    maxWidth={size}
    maxHeight={size}
    backgroundImage={`url(${src})`}
  />
)
