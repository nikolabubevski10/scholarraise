import React, {useState} from 'react'
import posed from 'react-pose'
import styled from 'styled-components'
import {components} from 'react-select'
import {Box, Flex, Avatar, InlineText, InternalLink, SelectInput, ExternalLink} from 'sr-components'
import {avatarFallback} from '../../helpers/images'
import theme from '../../sr-components/theme'

import {ReactComponent as IconPlusLight} from '../../assets/icons/plus-solid.svg'
import {ReactComponent as IconUsersSolid} from '../../assets/icons/users-solid.svg'
import {ReactComponent as IconExternalLink} from '../../assets/icons/external-link-alt-solid.svg'

const OVERVIEW_CONST = 'Overview'
const ACTIVITY_SECTION = 'Activity'
const PROFILE_SECTION = 'Edit Profile'
const INVITATIONS_SECTION = 'Invitations'
const SECTIONS = [ACTIVITY_SECTION, PROFILE_SECTION, INVITATIONS_SECTION]

const MenuContent = posed.div({
  closed: {height: 0},
  open: {height: 'auto'},
})

const LinkedSidebar = styled(Box)(props => ({
  color: props.color,
  fontWeight: 700,
  fontSize: 'larger',
  '&:hover': {
    color: theme.colors.primary700,
  },
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  transition: `color ${theme.animations.fast} ease-in-out`,
}))

function FixedSidebarItem({title, onClick = () => {}, color, Icon, iconSize = '24px'}) {
  return (
    <Flex alignItems="center" style={{cursor: 'pointer'}} onClick={onClick} width={1} pr={2}>
      <Flex
        alignItems="center"
        justifyContent="center"
        backgroundColor="snow"
        borderRadius={9999}
        style={{height: 36, width: 36}}
      >
        <Icon width={iconSize} color="#778f9b" />
      </Flex>
      <LinkedSidebar ml={3} color={color}>
        {title}
      </LinkedSidebar>
    </Flex>
  )
}

function SidebarAccountItem({
  name,
  onClick = () => {},
  avatarSrc,
  openMenu,
  onOpenMenu,
  setAnchor,
  anchor,
  active,
  scholarProfileLink,
}) {
  function handleClick(section) {
    onClick()
    setAnchor({to: section, scroll: true})
  }

  return (
    <Flex
      key={scholarProfileLink}
      style={{cursor: 'pointer'}}
      onClick={onOpenMenu}
      pr={2}
      my={3}
      width={1}
    >
      <Avatar src={avatarFallback(avatarSrc).image} />
      <Flex flexDirection="column" width="100%" style={{overflow: 'hidden'}} pr={2}>
        <InlineText
          fontWeight={700}
          fontSize="larger"
          ml={3}
          lineHeight="36px"
          style={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
          color={active ? 'primary' : '#101b2f'}
          onClick={() => handleClick(ACTIVITY_SECTION)}
        >
          {name}
        </InlineText>
        <Box>
          <MenuContent style={{overflow: 'hidden'}} pose={openMenu}>
            <MenuItems
              onClick={name => handleClick(name)}
              active={active}
              anchor={anchor}
              scholarProfileLink={scholarProfileLink}
            />
          </MenuContent>
        </Box>
      </Flex>
    </Flex>
  )
}

function MenuItems({onClick, active, anchor, scholarProfileLink}) {
  return (
    <Flex flexDirection="column">
      {SECTIONS.map(name => (
        <Flex alignItems="center" onClick={() => onClick(name)}>
          <LinkedSidebar
            color={active && anchor === name ? 'primary' : theme.colors.darkGray}
            my={2}
            ml={[0, null, 3]}
          >
            {name}
          </LinkedSidebar>
        </Flex>
      ))}
      <ExternalLink to={scholarProfileLink}>
        <Flex alignItems="center">
          <LinkedSidebar color={theme.colors.darkGray} fontWeight="700" my={2} ml={[0, null, 3]}>
            <span>View Profile</span>
            <span className="pl-2">
              <IconExternalLink width={16} />
            </span>
          </LinkedSidebar>
        </Flex>
      </ExternalLink>
    </Flex>
  )
}

function UserAvatarAndName({avatar, name}) {
  return (
    <Flex>
      {avatar === OVERVIEW_CONST ? (
        <Flex
          alignItems="center"
          justifyContent="center"
          backgroundColor="snow"
          borderRadius={9999}
          style={{height: 36, width: 36, minWidth: 36, maxWidth: 36}}
        >
          <IconUsersSolid width={24} color="#778f9b" />
        </Flex>
      ) : (
        <Avatar src={avatarFallback(avatar).image} />
      )}
      <Flex flexDirection="column" width="100%" style={{overflow: 'hidden'}} pr={2}>
        <InlineText
          fontWeight={700}
          fontSize="larger"
          ml={3}
          lineHeight="36px"
          style={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
          color="#101b2f"
        >
          {name}
        </InlineText>
      </Flex>
    </Flex>
  )
}

const SingleValue = ({children, data, ...props}) => (
  <components.SingleValue {...props}>
    <UserAvatarAndName avatar={data?.avatarSrc} name={children} />
  </components.SingleValue>
)

const MobileSelectOption = ({innerProps, isDisabled, children, data}) => {
  return !isDisabled ? (
    <Flex {...innerProps} style={{cursor: 'pointer'}} my={2} px={1}>
      <UserAvatarAndName avatar={data?.avatarSrc} name={children} />
    </Flex>
  ) : null
}

function MobileSidebarSelect({accounts, currentAccount, onClick}) {
  return (
    <SelectInput
      styles={{
        singleValue: base => ({
          ...base,
          padding: 0,
          borderRadius: 5,
          color: theme.colors.darkGray,
          display: 'flex',
        }),
        control: base => ({
          ...base,
          height: 60,
        }),
        valueContainer: base => ({
          ...base,
          height: 40,
        }),
      }}
      isClearable={false}
      defaultValue={{value: '', label: 'Overview', avatarSrc: OVERVIEW_CONST}}
      components={{SingleValue, Option: MobileSelectOption}}
      onChange={v => onClick(accounts.find(acc => acc.hashid === v))}
      name="sidebar"
      options={[
        {value: '', label: 'Overview', avatarSrc: OVERVIEW_CONST},
        ...accounts.map(account => ({
          value: account.hashid,
          label: `${account.beneficiaryFirstName} ${account.beneficiaryLastName}`,
          avatarSrc: account.beneficiaryAvatarUrl,
        })),
      ]}
    />
  )
}

export default function Sidebar({dashboard, currentAccount, setAccount, setAnchor, anchor}) {
  const [current, setCurrent] = useState(currentAccount?.hashid)
  const {accounts} = dashboard

  function onClickSidebarItem(account) {
    // will mesh them together for full release
    setAccount(account)
    setCurrent(account?.hashid)
  }

  return accounts?.length > 1 ? (
    <>
      <Box display={['none', null, 'block']}>
        <FixedSidebarItem
          title="Overview"
          Icon={IconUsersSolid}
          color={!currentAccount ? 'primary' : '#101b2f'}
          onClick={() => onClickSidebarItem()}
        />
        {accounts
          .sort((a, b) => b.hashid - a.hashid)
          .map(account => (
            <SidebarAccountItem
              key={account.hashid}
              avatarSrc={account.beneficiaryAvatarUrl}
              name={`${account.beneficiaryFirstName} ${account.beneficiaryLastName}`}
              active={account.hashid === currentAccount?.hashid}
              anchor={anchor?.to}
              setAnchor={setAnchor}
              openMenu={current === account.hashid ? 'open' : 'closed'}
              onOpenMenu={() => setCurrent(account.hashid)}
              onClick={() => onClickSidebarItem(account)}
              scholarProfileLink={`/scholars/${account.hashid}/${account.beneficiaryFirstName}-${account.beneficiaryLastName[0]}`}
            />
          ))}
      </Box>
      <Box display={['block', null, 'none']} my={2}>
        <MobileSidebarSelect
          accounts={dashboard.accounts}
          currentAccount={current}
          onClick={data => onClickSidebarItem(data)}
        />
      </Box>
      <InternalLink to="dashboard/plans/new">
        <FixedSidebarItem
          title="Add new plan"
          color={current === 'Add plan' ? 'primary' : '#B8C1CB'}
          Icon={IconPlusLight}
          iconSize="16px"
        />
      </InternalLink>
      {currentAccount && (
        <Box display={['block', null, 'none']} style={{cursor: 'pointer'}} mt={3}>
          <MenuItems
            active
            anchor={anchor?.to}
            onClick={section => setAnchor({to: section, scroll: true})}
            scholarProfileLink={`/scholars/${currentAccount.hashid}/${currentAccount.beneficiaryFirstName}-${currentAccount.beneficiaryLastName[0]}`}
          />
        </Box>
      )}
    </>
  ) : (
    <Box>
      {dashboard?.accounts.map(account => {
        const {beneficiaryFirstName, beneficiaryLastName, hashid} = account
        let name = `${beneficiaryFirstName} ${beneficiaryLastName}`
        let scholarLink = `/scholars/${hashid}/${beneficiaryFirstName}-${beneficiaryLastName[0]}`

        return (
          <>
            <Box display={['none', null, 'block']} mt={-3}>
              <SidebarAccountItem
                key={account.hashid}
                active
                openMenu="open"
                avatarSrc={account.beneficiaryAvatarUrl}
                name={name}
                anchor={anchor?.to}
                setAnchor={setAnchor}
                onOpenMenu={() => setCurrent(account.hashid)}
                onClick={() => onClickSidebarItem(currentAccount)}
                scholarProfileLink={scholarLink}
              />
            </Box>
            <Box display={['block', null, 'none']} my={2}>
              <UserAvatarAndName avatar={account.beneficiaryAvatarUrl} name={name} />
            </Box>
            <InternalLink to="dashboard/plans/new">
              <FixedSidebarItem
                title="Add new plan"
                color="#B8C1CB"
                Icon={IconPlusLight}
                iconSize="16px"
              />
            </InternalLink>
            <Box display={['block', null, 'none']} style={{cursor: 'pointer'}}>
              <MenuItems
                active
                anchor={anchor?.to}
                onClick={section => setAnchor({to: section, scroll: true})}
                scholarProfileLink={scholarLink}
              />
            </Box>
          </>
        )
      })}
    </Box>
  )
}
