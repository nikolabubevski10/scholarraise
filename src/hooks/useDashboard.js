import useSWR from 'swr'
import {getDashboard} from '../api/dashboard'

export function useDashboard() {
  const {data: dashboard, mutate, error} = useSWR('/accounts/dashboard', getDashboard, {
    suspense: true,
  })

  return {dashboard, mutate, error}
}
