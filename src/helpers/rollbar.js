import Rollbar from 'rollbar'

export const rollbar = new Rollbar({
  accessToken: 'bd922c59a6d94e50ad5fe490572919aa',
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: process.env.NODE_ENV === 'production',
  payload: {
    environment: process.env.NODE_ENV,
  },
})
