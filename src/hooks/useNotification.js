import React from 'react'
import {useToasts} from 'react-toast-notifications'

export function useNotification() {
  const {addToast} = useToasts()

  const success = React.useCallback(
    function successToast(message) {
      addToast(message, {appearance: 'success'})
    },
    [addToast],
  )

  const failed = React.useCallback(
    function failedToast(message) {
      addToast(message, {appearance: 'error'})
    },
    [addToast],
  )

  return {success, failed}
}
