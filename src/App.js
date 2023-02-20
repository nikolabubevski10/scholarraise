import React, {useRef, useEffect} from 'react'
import {withRouter, useHistory} from 'react-router-dom'
import {Header, Footer, Box} from 'sr-components'
import Intercom from 'react-intercom'
import FullStory from 'react-fullstory'
import ReactGA from 'react-ga'

import {FULLSTORY_ID} from './constants/constants'

import {avatarFallback} from './helpers/images'
import Routes from './routes'
import Logo from './assets/logo.svg'
import Loader from './components/loader'

import {useUser, UserProvider} from './context/user'
import {useAppContext, AppContextProvider} from './context/appContext'
import {ToastProvider} from 'react-toast-notifications'
import Notification from 'components/notifications'

import './tailwind.output.css'
import './styles/global.css'
import 'react-datepicker/dist/react-datepicker.css'

const linksHeader = {
  left: [
    {
      title: 'My Plans',
      to: '/dashboard',
      authRequired: true,
    },
    {
      title: 'My Contributions',
      to: '/dashboard/contributions',
      authRequired: true,
    },
    {
      title: 'Blog',
      to: 'https://blog.scholarraise.com/',
      unauthRequired: false,
    },
    {
      title: 'FAQ',
      to: '/faq',
    },
    {
      title: 'Contact',
      onClick: () => window.Intercom('show'),
    },
  ],
  right: [
    {
      title: 'Log In',
      to: '/login',
      unauthRequired: true,
    },
    {
      title: 'Sign Up',
      to: '/signup',
      button: true,
      unauthRequired: true,
    },
  ],
  user: [
    {
      title: 'Profile',
      to: '/dashboard/account/profile',
      authRequired: true,
    },
    {
      title: 'Payment Methods',
      to: '/dashboard/account/payment',
      authRequired: true,
    },
    {
      title: 'Notifications',
      to: '/dashboard/account/notifications',
      authRequired: true,
    },
    {
      title: 'Security',
      to: '/dashboard/account/security',
      authRequired: true,
    },
    {
      title: 'Log Out',
      to: '/logout',
      authRequired: true,
    },
  ],
}

const linksFooter = [
  {
    title: 'Pages',
    links: [
      {
        to: '/',
        title: 'Homepage',
      },
      {
        to: '/login',
        title: 'Login',
        unauthRequired: true,
      },
      {
        to: '/signup',
        title: 'Signup',
        unauthRequired: true,
      },
      {
        to: '/dashboard',
        title: 'My Plans',
        authRequired: true,
      },
      {
        to: '/dashboard/contributions',
        title: 'My Contributions',
        authRequired: true,
      },
    ],
  },
  {
    title: 'Support',
    links: [
      {
        to: 'https://blog.scholarraise.com',
        title: 'Blog',
      },
      {
        to: '/faq',
        title: 'FAQ',
      },
      {
        onClick: () => window.Intercom('show'),
        title: 'Contact',
      },
    ],
  },
  {
    title: 'Social',
    links: [
      {
        to: 'https://www.facebook.com/scholarraise',
        title: 'Facebook',
      },
      {
        to: 'https://twitter.com/scholarraise',
        title: 'Twitter',
      },
      {
        to: 'https://www.instagram.com/scholarraise/',
        title: 'Instagram',
      },
    ],
  },
  {
    title: 'Legal',
    links: [
      {
        to: '/policy',
        title: 'Privacy Policy',
      },
      {
        to: '/terms',
        title: 'Terms of Service',
      },
    ],
  },
]

const variant = ['light', 'dark', 'transparent']
const address = ['818 18th Ave S', 'Floor 10', 'Nashville, TN 37203']
const madeIn = (
  <span>
    Made with
    <span className="mx-2 emoji" role="img" aria-label="love" aria-hidden="false">
      ❤️
    </span>{' '}
    in Nashville, Tennessee
  </span>
)
const copyright = `© ${new Date().getFullYear()} Scholar Raise, Inc.`

const App = props => {
  const pinterestLoader = useRef(false)
  const {isLoading} = useAppContext()
  const {user, token} = useUser()

  const current = props.location.pathname

  const history = useHistory()

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.initialize('UA-107202723-1')
    }
  }, [])

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      return history.listen(location => ReactGA.pageview(location.pathname))
    }
  }, [history])

  if (window.pintrk && user?.email && !pinterestLoader.current) {
    pinterestLoader.current = true
    window.pintrk('load', '2614067993981', {
      em: user.email,
    })
    window.pintrk('page')
  }

  return (
    <ToastProvider
      placement="bottom-left"
      components={{Toast: Notification}}
      autoDismiss
      autoDismissTimeout={5000}
      transitionDuration={700}
    >
      <div className="flex flex-col min-h-screen">
        <Loader isLoading={isLoading} />
        <Intercom
          appID={process.env.NODE_ENV === 'production' ? 'v3ovjmra' : 'ce34h1z8'}
          vertical_padding={22}
          horizontal_padding={22}
        />
        {process.env.NODE_ENV === 'production' && <FullStory org={FULLSTORY_ID} />}
        <Box height={[60, null, 80]}>
          <Header
            logo={Logo}
            currentPath={current}
            links={linksHeader}
            avatar={avatarFallback(user?.avatarUrl).image}
            isLoggedIn={token}
            position="fixed"
          />
        </Box>
        <div className="flex-grow">
          <Routes />
        </div>
        <Footer
          logo={Logo}
          links={linksFooter}
          isLoggedIn={token}
          address={address}
          madeIn={madeIn}
          copyright={copyright}
          variant={variant[1]}
        />
      </div>
    </ToastProvider>
  )
}

export default withRouter(props => (
  <UserProvider>
    <AppContextProvider>
      <App {...props} />
    </AppContextProvider>
  </UserProvider>
))
