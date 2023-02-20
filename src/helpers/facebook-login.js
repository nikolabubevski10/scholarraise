export const facebookLogin = callback => {
  window.FB.login(
    data => {
      if (data.status === 'connected') {
        callback({
          type: 'success',
          data,
        })
      } else {
        callback({
          type: 'error',
          data,
        })
      }
    },
    {scope: 'public_profile, email'},
  )
}
