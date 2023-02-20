import {SITE_URL} from '../constants/constants'
import {writeText} from 'clipboard-polyfill'

export const twitter = (url, name) => {
  const hashtags = 'scholarraise'
  const quote = `My future scholar ${name} is raising money for their college education!`

  return window.open(
    `https://twitter.com/share?url=${encodeURIComponent(
      `${SITE_URL}${url}`,
    )}&via=scholarraise&hashtags=${encodeURIComponent(hashtags)}&text=${encodeURIComponent(quote)}`,
  )
}

export const link = async (text, notifySuccess, notifyError) => {
  return await writeText(`${SITE_URL}${text}`).then(notifySuccess).catch(notifyError)
}
