import is from 'is_js'

export const isAShittyBrowser = is.ie() || is.opera() || is.safari() || is.mobile() || is.tablet()
