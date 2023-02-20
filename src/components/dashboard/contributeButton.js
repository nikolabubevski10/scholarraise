import React, {useState, useRef, useCallback} from 'react'
import {Button, Flex, InlineText, Box, Avatar} from 'sr-components'
import {ReactComponent as Icon} from '../../assets/icons/caret-down-solid.svg'
import {avatarFallback} from '../../helpers/images'
import {useOnClickOutside} from '../../hooks/useOnClickOutside'
import {themeGet} from 'styled-system'
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

export default function ContributeButton({accounts, setContributeAccount}) {
  const [isOpen, open] = useState()
  const ref = useRef()
  useOnClickOutside(
    ref,
    useCallback(() => open(false), []),
  )

  return (
    <Box position="relative" style={{overflow: !isOpen ? 'hidden' : undefined}}>
      <Button
        mr={[0, null, 3]}
        mb={[2, null, 0]}
        onClick={
          accounts?.length > 1 ? () => open(!isOpen) : () => setContributeAccount(accounts[0])
        }
        data-cy="create-plan-button"
        variant="secondary"
        width={[1, null, 'auto']}
      >
        <Flex alignItems="center" fontWeight="800" justifyContent={['center', null, 'flex-start']}>
          Contribute
          {accounts?.length > 1 && <Icon height="20px" style={{marginLeft: 16}} />}
        </Flex>
      </Button>
      {accounts?.length > 1 && (
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
              {accounts.map(account => (
                <UserFlex
                  alignItems="center"
                  style={{overflow: 'hidden', cursor: 'pointer'}}
                  my={2}
                  onClick={() => {
                    setContributeAccount(account)
                    open(false)
                  }}
                >
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
                    {account.beneficiaryFirstName} {account.beneficiaryLastName}
                  </InlineText>
                </UserFlex>
              ))}
            </Flex>
          </Box>
        </Content>
      )}
    </Box>
  )
}
