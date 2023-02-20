import React from 'react'

import Card from '../card'
import Flex from '../flex'
import Box from '../box'
import {InlineText} from '../typography'
import {SVGIcon} from '../icon'

export default ({title, description, buttons, ...props}) => (
  <Card {...props} p={3}>
    <Flex justifyContent="space-between" alignItems="center">
      <Box
        mr={[2, 3]}
        style={{
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        <InlineText
          fontWeight="bold"
          mb={1}
          style={{display: 'block'}}
          data-cy={`short-card-title-${title.toLowerCase().split(' ').join('-')}`}
        >
          {title}
        </InlineText>
        <InlineText color="mediumGray" data-cy={`short-card-description`}>
          {description}
        </InlineText>
      </Box>
      <Flex>
        {buttons.map(({icon, color, hoverColor, onClick}, index) => (
          <SVGIcon
            Icon={icon}
            color={color}
            hoverColor={hoverColor}
            size={0}
            ml={index !== 0 && 3}
            onClick={onClick}
            data-cy={`short-card-button-${index}`}
          />
        ))}
      </Flex>
    </Flex>
  </Card>
)
