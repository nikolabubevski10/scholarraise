import React from 'react'

import IconPencilAlt from '../assets/pencil-alt-solid.svg'

import Box from '../box'
import Flex from '../flex'
import {Heading, CappedText, InlineText, Paragraph} from '../typography'
import Button from '../button'
import {SVGIcon} from '../icon'

export default ({title, name, items, message, onChange, ...props}) => {
  const incomplete = (!name || !items || items.length === 0) && message
  const MessageComponent =
    message && typeof message !== 'string' ? message : <Paragraph>{message}</Paragraph>

  const onClick = () => onChange(title)

  return (
    <Box {...props}>
      <Flex alignItems="center">
        <CappedText
          mr={[2, null, 3]}
          mb={0}
          color="mediumGray"
          data-cy={name && `infoList-title-${name.replace(/\s+/g, '-').toLowerCase()}`}
        >
          {title}
        </CappedText>
        <SVGIcon
          Icon={IconPencilAlt}
          color="mediumGray"
          hoverColor="darkGray"
          onClick={onClick}
          data-cy={name && `infoList-edit-${name.replace(/\s+/g, '-').toLowerCase()}`}
        />
      </Flex>
      <Heading
        fontWeight="normal"
        as="span"
        textStyle="h4Static"
        mt={2}
        color={incomplete ? 'mediumGray' : 'black'}
      >
        {name || `No ${title.toLowerCase()} defined`}
      </Heading>
      {!incomplete &&
        items.map(({title, value}, index) => (
          <Box key={index} mb={index < items.length - 1 ? 3 : 0}>
            <InlineText fontWeight="bold">{title}</InlineText>
            <InlineText
              style={{display: 'block'}}
              mt={1}
              data-cy={`infoList-${value}-${name.replace(/\s+/g, '-').toLowerCase()}`}
            >
              {Array.isArray(value)
                ? value.map(line => (
                    <InlineText key={line} style={{display: 'block'}}>
                      {line}
                    </InlineText>
                  ))
                : value}
            </InlineText>
          </Box>
        ))}
      {incomplete && MessageComponent}
      {incomplete && (
        <Button
          onClick={onClick}
          variant="secondary"
          data-cy={`infoList-${title.toLowerCase()}-button`}
        >
          Add {title.toLowerCase()}
        </Button>
      )}
    </Box>
  )
}
