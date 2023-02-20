import React, {Component} from 'react'
import {withRouter} from 'react-router'
import Helmet from 'react-helmet'

import {SITE_URL, FACEBOOK_APP_ID} from '../../constants/constants'

const defaultTitle = 'Scholar Raise'
const defaultDescription =
  'Scholar Raise is a crowdfunding service that helps you save for your child’s future college education. See what you could save!'
const defaultImage = `${SITE_URL}/images/logo.jpg`
const defaultTwitter = '@scholarraise'
const defaultSep = ' | '

class Page extends Component {
  getMetaTags(
    {
      title,
      description,
      image = defaultImage,
      contentType,
      twitter,
      noCrawl,
      published,
      updated,
      category,
      tags,
    },
    pathname,
  ) {
    const theTitle = title ? (title + defaultSep + defaultTitle).substring(0, 60) : defaultTitle
    const theDescription = description ? description.substring(0, 155) : defaultDescription

    const metaTags = [
      {itemprop: 'name', content: theTitle},
      {itemprop: 'description', content: theDescription},
      {itemprop: 'image', content: image},
      {name: 'description', content: theDescription},
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:site', content: defaultTwitter},
      {name: 'twitter:title', content: theTitle},
      {name: 'twitter:description', content: theDescription},
      {name: 'twitter:creator', content: twitter || defaultTwitter},
      {name: 'twitter:image', content: image},
      {property: 'og:title', content: theTitle},
      {property: 'og:type', content: contentType || 'website'},
      {property: 'og:url', content: SITE_URL + pathname},
      {property: 'og:image', content: image},
      {property: 'og:description', content: theDescription},
      {property: 'og:site_name', content: defaultTitle},
      {property: 'fb:app_id', content: FACEBOOK_APP_ID},
    ]

    if (noCrawl) {
      metaTags.push({name: 'robots', content: 'noindex, nofollow'})
    }

    if (published) {
      metaTags.push({name: 'article:published_time', content: published})
    }
    if (updated) {
      metaTags.push({name: 'article:modified_time', content: updated})
    }
    if (category) {
      metaTags.push({name: 'article:section', content: category})
    }
    if (tags) {
      metaTags.push({name: 'article:tag', content: tags})
    }

    return metaTags
  }

  render() {
    const {children, id, className, ...rest} = this.props

    return (
      <div id={id} className={className}>
        <Helmet
          htmlAttributes={{
            lang: 'en',
            itemscope: undefined,
            itemtype: `http://schema.org/${rest.schema || 'WebPage'}`,
          }}
          title={rest.title ? rest.title + defaultSep + defaultTitle : defaultTitle}
          link={[
            {
              rel: 'canonical',
              href: SITE_URL + this.props.location.pathname,
            },
          ]}
          meta={this.getMetaTags(rest, this.props.location.pathname)}
        />
        {children}
      </div>
    )
  }
}

export default withRouter(Page)
