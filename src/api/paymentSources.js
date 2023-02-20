import api from './index'

export const getPaymentSources = () => {
  return api().get('/payment_sources')
}

export function deletePaymentSource(id) {
  return api().delete(`/payment_sources/${id}`)
}

export function showPaymentSource(id) {
  return api().get(`/payment_sources/${id}`)
}

export function createPaymentSource(data) {
  return api().post(`/payment_sources`, data)
}
