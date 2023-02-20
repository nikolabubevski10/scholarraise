import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import {Menu, Heading, Row, Column, Container} from 'sr-components'

import Page from '../../components/page'

import Profile from './pages/profile'
import Notifications from './pages/notifications'
import Security from './pages/security'
import PaymentMethods from './pages/payment-methods'

const pages = [
  {
    title: 'Profile',
    href: 'profile',
  },
  {
    title: 'Payment Methods',
    href: 'payment',
  },
  {
    title: 'Notifications',
    href: 'notifications',
  },
  {
    title: 'Security',
    href: 'security',
  },
]

const Account = props => {
  const acceptablePages = ['profile', 'payment', 'notifications', 'security']
  const matchingPage = props.location.pathname.split('/').pop()
  const currentPage = acceptablePages.includes(matchingPage) ? matchingPage : 'profile'

  return (
    <Page title="Account Settings">
      <Container my={[4, null, 5]}>
        <Row>
          <Column>
            <Heading as="h2" textStyle="h2" mt={[3, null, 0]}>
              My Settings
            </Heading>
          </Column>
        </Row>
        <Row>
          <Column>
            <Menu
              pages={pages}
              onChange={newPage => props.history.push(`${props.match.path}/${newPage}`)}
              current={currentPage}
              mt={[2, null, 5]}
              mb={[4, null, 4]}
            />
          </Column>
        </Row>
        <Switch>
          <Route exact path={'/dashboard/account/profile'} component={Profile} />
          <Route exact path={'/dashboard/account/notifications'} component={Notifications} />
          <Route exact path={'/dashboard/account/security'} component={Security} />
          <Route exact path={'/dashboard/account/payment'} component={PaymentMethods} />
          <Redirect from="/dashboard/account/*" to="/dashboard/account/profile" />
        </Switch>
      </Container>
    </Page>
  )
}

export default Account
