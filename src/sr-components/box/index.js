import styled from 'styled-components'
import {
  space,
  width,
  fontFamily,
  fontWeight,
  fontSize,
  lineHeight,
  borderRadius,
  color,
  flex,
  order,
  alignSelf,
  display,
  borderLeft,
  position,
  top,
  right,
  maxWidth,
  height,
} from 'styled-system'

const Box = styled('div')(
  {
    boxSizing: 'border-box',
    WebkitFontSmoothing: 'antialiased',
    outline: 0,
  },
  space,
  width,
  fontFamily,
  fontWeight,
  fontSize,
  lineHeight,
  borderRadius,
  color,
  flex,
  order,
  alignSelf,
  display,
  borderLeft,
  position,
  top,
  right,
  maxWidth,
  height,
)

Box.defaultProps = {
  as: 'div',
  fontFamily: 'main',
  fontSize: 2,
  lineHeight: 'normal',
  fontWeight: 'regular',
  color: 'black',
  display: 'block',
}

Box.displayName = 'Box'

export default Box
