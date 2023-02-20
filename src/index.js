import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import {theme} from 'sr-components'
import {ThemeProvider} from 'styled-components'
import * as Sentry from '@sentry/react'
import {Integrations} from '@sentry/tracing'
import App from './App'

if (process.env.REACT_APP_ENV === 'production') {
  Sentry.init({
    dsn: 'https://3dc6db8b7106444ba6f2d3032d55d32f@o533244.ingest.sentry.io/5652637',
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  })
}

const Application = (
  <ThemeProvider theme={{...theme}}>
    <Router>
      <App />
    </Router>
  </ThemeProvider>
)

ReactDOM.render(Application, document.getElementById('root'))
