import React from 'react'

import {ReactComponent as IconCreditCard} from '../assets/credit-card-solid.svg'
import {ReactComponent as IconUniversity} from '../assets/university-solid.svg'
import {ReactComponent as IconTrash} from '../assets/trash-solid.svg'

import Card from '../card'
import Flex from '../flex'
import Box from '../box'
import {InlineText} from '../typography'
import {SVGIcon} from '../icon'

export default ({type, addedOn, lastFour, onRemove, ...props}) => (
  <Card {...props} p={[3, 4]}>
    <Flex justifyContent="space-between" mb={[5, 6]}>
      <Box
        style={{
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        <Flex alignItems="center" mb={2}>
          <SVGIcon
            Icon={type === 'card' ? IconCreditCard : IconUniversity}
            color="mediumGray"
            size={1}
            mr={2}
          />
          <InlineText fontWeight="bold" fontSize={3} ml={[0, 1]}>
            {type === 'card' ? 'Card' : 'Bank account'}
          </InlineText>
        </Flex>
        <InlineText color="mediumGray">Added on {addedOn}</InlineText>
      </Box>
      <SVGIcon
        Icon={IconTrash}
        color="error500"
        hoverColor="error700"
        size={1}
        onClick={onRemove}
        data-cy={
          type === 'card' ? `payment-card-${lastFour}-remove` : `payment-bank-${lastFour}-remove`
        }
      />
    </Flex>
    <InlineText fontWeight="bold" letterSpacing="crazy" fontSize={3}>
      {type === 'card' ? '**** **** **** ' : '*****'}
      {lastFour}
    </InlineText>
  </Card>
)
