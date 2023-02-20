import api from './'

export function getDashboard() {
  return api().get(`/dashboard`)
}

export function getActivity(page, account) {
  if (account) {
    return api().get(`/accounts/${account}/activity?page=${page}`)
  }
  return api().get(`/activity?page=${page}`)
}
