import React from 'react'
import styled from 'styled-components'
import {themeGet} from 'styled-system'
import {Link} from 'react-router-dom'

import Flex from '../flex'
import Button from '../button'
import {
  CappedText,
  InternalLink,
  ExternalLink,
  ExternalLinkProps,
  InteractiveLink,
} from '../typography'

const getVariant = ({variant, ...props}) => {
  if (variant === 'light') {
    return {
      color: themeGet('colors.mediumGray')(props),
      '&:hover': {
        color: themeGet('colors.darkGray')(props),
      },
    }
  } else if (variant === 'dark') {
    return {
      color: themeGet('colors.mediumGray')(props),
      '&:hover': {
        color: themeGet('colors.snow')(props),
      },
    }
  } else if (variant === 'transparent') {
    return {
      color: themeGet('colors.lightGray')(props),
      '&:hover': {
        color: themeGet('colors.darkGray')(props),
      },
    }
  } else if (variant === 'current') {
    return {color: themeGet('colors.primary')(props)}
  } else {
    return {
      color: themeGet('colors.lightGray')(props),
      '&:hover': {
        color: themeGet('colors.darkGray')(props),
      },
    }
  }
}

const CappedLink = styled(CappedText)(props => ({
  marginBottom: 0,
  padding: themeGet('space.2')(props),
  transition: `color ${themeGet('animations.fast')(props)} ease-in-out`,
  ...getVariant(props),
}))

export default ({links, toggleMobileMenu, current, isMobile, isUserMenu = false, variant}) => (
  <Flex
    flexDirection={isUserMenu ? 'column' : ['column', null, 'row']}
    alignItems={isUserMenu ? 'flex-end' : 'center'}
    display={isMobile ? ['flex', null, 'none'] : ['none', null, 'flex']}
    data-cy="header-user-links-box"
  >
    {links.map(({to, onClick, title, button}, index) => {
      const CappedTitle = (
        <CappedLink
          variant={to && to === current ? 'current' : variant}
          mr={isUserMenu ? 0 : [0, null, 2]}
        >
          {title}
        </CappedLink>
      )

      const buttonProps = {
        my: 2,
        variant: variant === 'dark' ? 'secondary' : 'primary',
        key: index,
      }

      if (!to && onClick) {
        if (button) {
          return (
            <Button
              onClick={() => {
                toggleMobileMenu(false)
                onClick()
              }}
              {...buttonProps}
              data-cy={`header-${title.replace(/\s+/g, '-').toLowerCase()}-button`}
            >
              {title}
            </Button>
          )
        }

        return (
          <InteractiveLink
            onClick={() => {
              toggleMobileMenu(false)
              onClick()
            }}
            key={index}
            data-cy={`header-${title.replace(/\s+/g, '-').toLowerCase()}-link`}
          >
            {CappedTitle}
          </InteractiveLink>
        )
      } else if (to && !onClick) {
        const isExternal = to.includes('http://') || to.includes('https://')

        if (button) {
          if (isExternal) {
            return (
              <Button
                href={to}
                onClick={() => toggleMobileMenu(false)}
                as="a"
                {...buttonProps}
                {...ExternalLinkProps}
                data-cy={`header-${title.replace(/\s+/g, '-').toLowerCase()}-button`}
              >
                {title}
              </Button>
            )
          }
          return (
            <Button
              to={to}
              onClick={() => toggleMobileMenu(false)}
              as={Link}
              {...buttonProps}
              data-cy={`header-${title.replace(/\s+/g, '-').toLowerCase()}-button`}
            >
              {title}
            </Button>
          )
        }

        const TheLink = isExternal ? ExternalLink : InternalLink

        return (
          <TheLink
            to={to}
            onClick={() => toggleMobileMenu(false)}
            key={index}
            data-cy={`header-${title.replace(/\s+/g, '-').toLowerCase()}-link`}
          >
            {CappedTitle}
          </TheLink>
        )
      }

      return null
    })}
  </Flex>
)
