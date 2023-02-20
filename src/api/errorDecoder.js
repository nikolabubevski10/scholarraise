function decodeError(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return {
      status: error.response.data?.status ?? error.response.status,
      text:
        error.response.data?.error ??
        error.response.data?.errors[0] ??
        'Oops! Something went wrong.',
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest
    return {
      status: 'NETWORK',
      text: 'Check your internet connection.',
    }
  } else {
    // Something happened in setting up the request that triggered an Error
    return {
      status: 'INTERNAL',
      text: 'Oops! Please report this error.',
    }
  }
}

export {decodeError}
