import React from 'react'
import PropTypes from 'prop-types'

import Flex from '../flex'
import {CappedText, Heading} from '../typography'
import Tooltip, {TOOLTIP_SIZE} from '../form/inputs/_tooltip'
import {currencyFormat} from '../_helpers'

import useDimensions from '../../hooks/useWindowResize'

const Statistic = ({title, value, important, tooltip, name, ...props}) => {
  const {width} = useDimensions()

  // mobile width is 40em with 16px --> 640px
  let position = width < 640 ? 'top-right' : 'top-left'

  return (
    <Flex
      {...props}
      flexDirection="column"
      data-cy={`statistic-${name.replace(/\s+/g, '-').toLowerCase()}-${title}`}
    >
      <Flex
        alignItems="center"
        mb={2}
        style={{
          height: TOOLTIP_SIZE,
        }}
      >
        <CappedText mb={0} color={important ? 'darkGray' : 'mediumGray'}>
          {title}
        </CappedText>
        {tooltip && <Tooltip tooltip={tooltip} position={position} ml={2} />}
      </Flex>
      <Heading
        fontWeight="normal"
        mt={0}
        mb={0}
        as="span"
        textStyle="h3"
        data-cy={`statistic-${name.replace(/\s+/g, '-').toLowerCase()}-${title}-value`}
      >
        {currencyFormat(value)}
      </Heading>
    </Flex>
  )
}

Statistic.defaultProps = {
  title: 'Statistic',
  value: 0,
  important: false,
  tooltip: '',
  name: 'Statistic',
}

Statistic.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number,
  important: PropTypes.bool,
  tooltip: PropTypes.string,
  name: PropTypes.string,
}

export default Statistic
