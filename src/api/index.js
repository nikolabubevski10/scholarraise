import axios from 'axios'
import {camelizeKeys, decamelizeKeys} from 'humps'

import {getTokenFromStorage, clearTokenAndUser} from '../context/user'
import {API_URL, API_BASE} from '../constants/constants'

const baseURL = `${API_URL}${API_BASE}`
const timeout = 40000

export default () => {
  const token = getTokenFromStorage()

  const headers = {'Content-Type': 'application/json'}

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const instance = axios.create({baseURL, timeout, headers})

  // Adds interceptor so we camelize the response and ditch what we don't need
  instance.interceptors.response.use(
    function (res) {
      return camelizeKeys(res?.data?.data) ?? res
    },
    function (error) {
      if ([401].includes(error?.response?.status)) {
        if (
          !window.location?.pathname.includes('/login') &&
          !window.location?.pathname.includes('/scholars/')
        ) {
          clearTokenAndUser()
          window.location.href = '/'
        }
      }
      return Promise.reject(error)
    },
  )

  instance.interceptors.request.use(
    function (req) {
      if (req.data) {
        req.data = decamelizeKeys(req.data, {split: /(?=[A-Z0-9])/})
      }
      return req
    },
    function (error) {
      return Promise.reject(error)
    },
  )

  return instance
}
