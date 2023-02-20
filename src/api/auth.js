import api from '.'

/**
 * API call to authenticate the user
 * @param {Object} data Object in the form `{ user: { email, password } }`
 */
function login(data) {
  return api().post('/users/authenticate', data)
}

/**
 * API call to sign up
 * @param {Object} data Object in the form `{ user : { data } }`
 */
function signup(data) {
  return api().post('/users', data)
}

export {login, signup}
