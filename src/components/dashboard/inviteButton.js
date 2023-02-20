import React, {useState, useRef, useCallback} from 'react'
import {Button, Flex, InlineText, Box, Avatar, SVGIcon} from 'sr-components'
import {ReactComponent as Icon} from '../../assets/icons/caret-down-solid.svg'
import {avatarFallback} from '../../helpers/images'
import {useOnClickOutside} from '../../hooks/useOnClickOutside'
import {themeGet} from 'styled-system'
import {ReactComponent as IconEnvelope} from '../../assets/icons/link-solid.svg'
import {useNotification} from '../../hooks/useNotification'
import * as social from '../../helpers/social-share'
import styled from 'styled-components'
import posed from 'react-pose'

const Content = posed.div({
  open: {height: 'auto', maxHeight: '240px'},
  closed: {height: 0},
})

const UserFlex = styled(Flex)(props => ({
  color: `${themeGet('colors.black')(props)}`,
  '&:hover': {
    color: themeGet('colors.primary')(props),
  },
  transition: `color ${themeGet('animations.fast')(props)} ease-in-out`,
}))

export default function InviteButton({accounts, setContributeAccount}) {
  const {failed, success} = useNotification()
  const [isOpen, open] = useState()
  const ref = useRef()
  useOnClickOutside(
    ref,
    useCallback(() => open(false), []),
  )

  // Social Media buttons stuff
  function notifyError() {
    failed("Your browser is old and doesn't support copying to the clipboard.")
  }

  function notifySuccess() {
    success(
      "We have copied the link to this scholar's profile for you to paste in an email (or wherever you like)!",
    )
  }

  return (
    <Box position="relative" style={{overflow: !isOpen ? 'hidden' : undefined}}>
      <Button
        mr={0}
        mb={[2, null, 0]}
        onClick={() => open(true)}
        data-cy="create-plan-button"
        width={[1, null, 'auto']}
      >
        <Flex
          alignItems="center"
          fontWeight="800"
          color="#fff"
          justifyContent={['center', null, 'flex-start']}
        >
          Invite friends & family
          {accounts?.length > 1 && <Icon height="20px" style={{marginLeft: 16}} />}
        </Flex>
      </Button>
      <Content pose={isOpen ? 'open' : 'closed'}>
        <Box position="absolute" right={4} style={{zIndex: 2000}} width={['100%', null, 'auto']}>
          <Flex
            ref={ref}
            flexDirection="column"
            backgroundColor="#fff"
            width={['100%', null, 'max-content']}
            px={3}
            style={{
              overflow: 'hidden',
              boxShadow: '0px 10px 20px 0px rgba(0, 0, 0, 0.2)',
              borderRadius: 4,
              marginTop: 16,
            }}
          >
            {accounts.map(account => {
              const {beneficiaryFirstName, beneficiaryLastName, hashid} = account
              const name = `${beneficiaryFirstName} ${beneficiaryLastName}`
              const profileUrl = `/scholars/${hashid}/${beneficiaryFirstName}-${beneficiaryLastName[0]}`

              return (
                <UserFlex
                  alignItems="center"
                  style={{overflow: 'hidden', cursor: 'default'}}
                  my={2}
                  justifyContent="space-between"
                >
                  <Flex alignItems="center">
                    <Avatar src={avatarFallback(account.avatarSrc).image} />
                    <InlineText
                      pl={2}
                      style={{
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                      }}
                      fontWeight="700"
                      my={2}
                      color="inherit"
                    >
                      {name}
                    </InlineText>
                  </Flex>
                  <Box ml={[0, 3]}>
                    <Flex justifyContent={['center', 'flex-start']} alignItems="center">
                      <SVGIcon
                        Icon={IconEnvelope}
                        size={1}
                        color="lightGray"
                        hoverColor="mediumGray"
                        onClick={event => {
                          event.preventDefault()
                          social.link(profileUrl, notifySuccess, notifyError)
                        }}
                      />
                    </Flex>
                  </Box>
                </UserFlex>
              )
            })}
          </Flex>
        </Box>
      </Content>
    </Box>
  )
}
