import React, {Suspense, lazy} from 'react'
import {Route, Switch} from 'react-router-dom'
import {SWRConfig} from 'swr'

import AuthenticatedRoute from '../components/authenticated-route'
import UnauthenticatedRoute from '../components/unauthenticated-route'
import Loader from '../components/loader'

import Login from './auth/login'
import Logout from './auth/logout'
import Signup from './auth/signup'
import ForgotPassword from './auth/forgot-password'
import PasswordChange from './auth/password-change'
import Account from './account'

import AddPlanFlow from 'routes/add-plan/index'
import ScrollToTop from 'hooks/scrollToTop'

const ScholarProfile = lazy(() => import('./scholar-profile'))
const Contributions = lazy(() => import('./contributions'))
const Homepage = lazy(() => import('./marketing/home'))
const Policy = lazy(() => import('./marketing/policy'))
const Terms = lazy(() => import('./marketing/terms'))
const FAQ = lazy(() => import('./marketing/faq'))
const NotFound = lazy(() => import('./not-found'))

const NewDashboard = lazy(() => import('./dashboard'))

export default props => (
  <Suspense fallback={<Loader isLoading />}>
    <SWRConfig>
      <ScrollToTop />
      <Switch>
        {/* AUTHENTICATION */}
        <UnauthenticatedRoute path="/login" component={Login} />
        <UnauthenticatedRoute path="/signup" component={Signup} />
        <UnauthenticatedRoute path="/forgot-password" component={ForgotPassword} />
        <UnauthenticatedRoute path="/change-password" component={PasswordChange} />
        <AuthenticatedRoute path="/logout" component={Logout} />

        {/* MARKETING */}
        <Route exact path="/" component={Homepage} />
        <Route exact path="/policy" component={Policy} />
        <Route exact path="/terms" component={Terms} />
        <Route exact path="/faq" component={FAQ} />

        {/* DASHBOARD */}
        <AuthenticatedRoute path="/dashboard/plans/new" component={AddPlanFlow} />
        <AuthenticatedRoute exact path="/dashboard" component={NewDashboard} />

        {/* ACCOUNT */}
        <AuthenticatedRoute path="/dashboard/account" component={Account} />

        {/* CONTRIBUTIONS */}
        <AuthenticatedRoute path="/dashboard/contributions" component={Contributions} />

        {/* SCHOLAR */}
        <Route path="/scholars/:id/:name" component={ScholarProfile} />

        {/* PAGE NOT FOUND */}
        <Route component={NotFound} />
      </Switch>
    </SWRConfig>
  </Suspense>
)
