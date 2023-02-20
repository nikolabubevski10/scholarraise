import React, {useState} from 'react'
import styled from 'styled-components'
import {themeGet, height, top} from 'styled-system'
import posed, {PoseGroup} from 'react-pose'
import {Link, useLocation} from 'react-router-dom'

import Hamburger from './_hamburger'
import Links from './_links'

import useWindowScroll from 'hooks/useWindowScroll'

import {filterLinksBySecurity} from '../_helpers'
import Flex from '../flex'
import Box from '../box'
import Image from '../image'
import Avatar from '../avatar'
import Dialog from '../dialog'

const getVariant = ({variant, ...props}) => {
  if (variant === 'light') {
    return {backgroundColor: themeGet('colors.white')(props)}
  } else if (variant === 'dark') {
    return {backgroundColor: themeGet('colors.black')(props)}
  } else if (variant === 'transparent') {
    return {backgroundColor: 'transparent'}
  } else if (variant === 'primary700') {
    return {backgroundColor: themeGet(`colors.primary700`)(props)}
  }

  return null
}

const HeaderContainer = styled(Flex)(
  props => ({
    position: props.position,
    top: 0,
    left: 0,
    width: '100%',
    zIndex: themeGet('zIndicies.header')(props),
    ...getVariant(props),
  }),
  height,
)

const UserLinksBox = posed(
  styled(Box)(
    props => ({
      position: 'absolute',
      padding: themeGet('space.2')(props),
      paddingLeft: themeGet('space.3')(props),
      ...getVariant(props),
    }),
    top,
  ),
)({
  enter: {opacity: 1, right: 0},
  exit: {opacity: 0, right: -100},
})

export default ({
  logo,
  currentPath = '/',
  links,
  avatar,
  isLoggedIn,
  position = 'fixed',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [avatarHovered, setAvatarHovered] = useState(false)

  const headerHeight = [60, null, 80]
  const avatarMouseEvents = {
    onMouseEnter: () => setAvatarHovered(true),
    onMouseLeave: () => setAvatarHovered(false),
  }

  const {scrollY} = useWindowScroll()
  const {pathname} = useLocation()
  const backgroundColorAtTop = pathname === '/' ? 'primary700' : 'transparent'
  const variant = React.useMemo(
    () => (currentPath === '/' && scrollY === 0 ? backgroundColorAtTop : 'light'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPath, scrollY],
  )

  const allLinks = filterLinksBySecurity(isLoggedIn, [...links.left, ...links.user, ...links.right])
  const leftLinks = filterLinksBySecurity(isLoggedIn, links.left)
  const userLinks = filterLinksBySecurity(isLoggedIn, links.user)
  const rightLinks = filterLinksBySecurity(isLoggedIn, links.right)

  const toggleMobileMenu = val => setIsOpen(typeof val !== 'undefined' ? val : !isOpen)

  const logoFilter = variant !== 'light' ? 'brightness(0) invert(1)' : ''

  return (
    <HeaderContainer
      {...props}
      height={headerHeight}
      position={position}
      variant={variant}
      alignItems="center"
      justifyContent="space-between"
      px={3}
    >
      <Flex alignItems="center" style={{height: '100%'}}>
        <Link to="/" style={{height: '50%'}}>
          <Image src={logo} height="100%" mr={[0, null, 3]} style={{filter: logoFilter}} />
        </Link>
        {leftLinks.length > 0 && (
          <Links
            toggleMobileMenu={toggleMobileMenu}
            current={currentPath}
            variant={variant}
            links={leftLinks}
          />
        )}
      </Flex>
      <Flex alignItems="center" style={{height: '100%'}}>
        {rightLinks.length > 0 && (
          <Links
            toggleMobileMenu={toggleMobileMenu}
            current={currentPath}
            variant={variant}
            links={rightLinks}
          />
        )}
        {isLoggedIn && (
          <Flex
            {...avatarMouseEvents}
            mr={[3, null, 0]}
            alignItems="center"
            style={{height: '100%', cursor: 'pointer'}}
            data-cy="header-avatar-menu"
          >
            <Avatar src={avatar} size={[2, null, 3]} />
          </Flex>
        )}
        <Hamburger isOpen={isOpen} onClick={toggleMobileMenu} />
        <PoseGroup>
          {avatarHovered && (
            <UserLinksBox
              key="user-links-box"
              variant={variant === backgroundColorAtTop ? 'light' : variant}
              top={headerHeight}
              display={['none', null, 'block']}
              {...avatarMouseEvents}
              data-cy="header-avatar-links-box"
            >
              <Links
                toggleMobileMenu={toggleMobileMenu}
                current={currentPath}
                variant={variant}
                links={userLinks}
                isUserMenu
              />
            </UserLinksBox>
          )}
        </PoseGroup>
      </Flex>
      <Dialog
        hasBackground
        display={['block', null, 'none']}
        isOpen={isOpen}
        close={() => setIsOpen(!isOpen)}
      >
        <Links
          toggleMobileMenu={toggleMobileMenu}
          current={currentPath}
          variant="light"
          links={allLinks}
          isMobile
        />
      </Dialog>
    </HeaderContainer>
  )
}
