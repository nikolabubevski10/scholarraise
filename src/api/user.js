import api from './'

export function update(hashId, user) {
  return api().put(`/users/${hashId}`, user)
}

export function get(hashId) {
  return api().get(`/users/${hashId}`)
}

export function forgotPassword(data) {
  return api().post('/users/forgotten', data)
}

export function resetPassword(data) {
  return api().put('/users/reset', data)
}

export function getUserCommunicationOptions(hashId) {
  return api().get(`/users/${hashId}/notifications`)
}

export function updateUserCommunicationOptions(notificationId, data) {
  return api().put(`/notifications_users/${notificationId}`, data)
}
