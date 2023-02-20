import {useUser} from '../context/user'
import {useAppContext} from '../context/appContext'
import {login, signup} from '../api/auth'
import {decodeError} from '../api/errorDecoder'
import {logIntercomUser, trackIntercomEvent} from '../helpers/intercom'
import {useNotification} from './useNotification'

/**
 * Does authentication, login and signup, logs the user out and handles request errors
 */
function useAuth() {
  const {save, logout} = useUser()
  const {setLoading} = useAppContext()
  const {failed} = useNotification()

  async function tryLogin(credentials) {
    setLoading(true)
    try {
      const user = await login(credentials)
      logIntercomUser(user) // Logs the user to intercom
      trackIntercomEvent('logged-in') // tracks login event in intercom
      save(user)
    } catch (e) {
      const err = decodeError(e)
      failed(err.status === 401 ? 'Please check your credentials and try again!' : err.text)
    } finally {
      setLoading(false)
    }
  }

  async function trySignup(credentials) {
    setLoading(true)
    try {
      const user = await signup(credentials)
      logIntercomUser(user)
      trackIntercomEvent('signed-up')
      window.pintrk('track', 'signup') // track pinterest signup event
      save(user)
    } catch (e) {
      const err = decodeError(e)
      failed(err.text)
    } finally {
      setLoading(false)
    }
  }

  return {login: tryLogin, signup: trySignup, logout}
}

export {useAuth}
