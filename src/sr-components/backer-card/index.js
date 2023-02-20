import React from 'react'

import Card from '../card'
import Flex from '../flex'
import {Heading, InlineText, Paragraph} from '../typography'
import Avatar from '../avatar'
import {SVGIcon} from '../icon'
import {HoverTooltip} from '../form/inputs/_tooltip'

import {ReactComponent as IconFlag} from '../assets/flag-solid.svg'

export default ({
  avatar,
  name,
  timeAgo,
  description,
  amount,
  hashId,
  isOwner,
  flagContribution,
  ...props
}) => (
  <Card {...props} p={[3, 4]}>
    <Flex alignItems="center">
      <Avatar
        src={avatar}
        size={[4, null, 5]}
        mr={3}
        data-cy={`backer-${name.replace(/\s+/g, '-').toLowerCase()}-avatar`}
      />
      <Flex
        flexDirection={['column', 'row']}
        justifyContent="space-between"
        alignItems={['flex-start', 'center']}
        width="100%"
      >
        <Heading
          as="h4"
          textStyle="h3"
          mt={0}
          mb={0}
          data-cy={`backer-${name.replace(/\s+/g, '-').toLowerCase()}-name`}
        >
          {name}
        </Heading>
        <Flex>
          {isOwner && (
            <HoverTooltip tooltip="Flag as inappropriate" position="left" animation="fade">
              <SVGIcon
                Icon={IconFlag}
                size={0}
                color="lightGray"
                hoverColor="mediumGray"
                title="Flag as inappropriate"
                alt="Click to flag as inappropriate"
                onClick={() => flagContribution(hashId)}
                mr={2}
              />
            </HoverTooltip>
          )}
          <InlineText
            color="lightGray"
            flex
            data-cy={`backer-${name.replace(/\s+/g, '-').toLowerCase()}-time`}
          >
            {timeAgo}
          </InlineText>
        </Flex>
      </Flex>
    </Flex>
    <Paragraph
      mt={3}
      mb={0}
      color="darkGray"
      data-cy={`backer-${name.replace(/\s+/g, '-').toLowerCase()}-description`}
    >
      {amount > 0 && (
        <>
          <strong>Contributed ${amount}</strong> -{' '}
        </>
      )}
      {description}
    </Paragraph>
  </Card>
)
