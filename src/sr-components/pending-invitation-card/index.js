import React from 'react'
import styled from 'styled-components'
import {themeGet} from 'styled-system'

import Card from '../card'
import Flex from '../flex'
import Avatar from '../avatar'
import {Heading, InternalLink, CappedText, InlineText} from '../typography'

const CappedLink = styled(CappedText)(props => ({
  color: `${themeGet('colors.primary')(props)}`,
  '&:hover': {
    color: themeGet('colors.primary700')(props),
  },
  transition: `color ${themeGet('animations.fast')(props)} ease-in-out`,
}))

export default ({avatar, name, ownerName, timeAgo, profileUrl, ...props}) => (
  <InternalLink to={profileUrl}>
    <Card {...props} p={[3, null, 4]}>
      <Flex
        flexDirection={['column', 'row']}
        alignItems={['flex-start', 'center']}
        justifyContent="space-between"
        width={['auto', '100%']}
      >
        <Flex
          flexDirection={['row']}
          alignItems="center"
          justifyContent="flex-start"
          style={{flexShrink: 0}}
          mb={[3, 0]}
          width={[1, 'auto']}
        >
          <Avatar src={avatar} size={4} />
          <Heading
            textAlign={['center', 'left']}
            fontWeight={['regular']}
            as="h3"
            textStyle="h3"
            ml={3}
            my={0}
          >
            {name}
          </Heading>
        </Flex>
        <InlineText mx={[0, 3, 4]} mb={[3, 0]} color="mediumGray" style={{flexGrow: 1}}>
          Invited by {ownerName} {timeAgo}
        </InlineText>
        <CappedLink mb={0} mt={0} textAlign={['left', 'right']} style={{width: '130px'}}>
          View Profile
        </CappedLink>
      </Flex>
    </Card>
  </InternalLink>
)
