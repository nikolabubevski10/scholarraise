import React from 'react'
import {Heading, Paragraph, Image} from 'sr-components'

import cookie from '../assets/policy/cookie.gif'

export default () => (
  <>
    <Heading as="h1" textStyle="h1">
      Privacy Policy
    </Heading>
    <Paragraph>
      <b>Last updated: July 13, 2019</b>
    </Paragraph>
    <Paragraph>
      This is where we all agree to be friends. The below basically says we won’t abuse, sell, or be
      reckless with your personal information. We’re reasonable people running an ethical business
      and plan to stay out of the news for that topic.
    </Paragraph>
    <Paragraph>
      Except as otherwise required or permitted by law, any information regarding a Scholar Raise
      account owner or beneficiary will not be shared with anyone other than the account owner, an
      authorized representative, or those employees and/or service providers who access such
      information to provide services to the account owner or beneficiary.
    </Paragraph>
    <Paragraph>
      Scholar Raise will make every reasonable effort to keep your data safe through encryption and
      other modern web security practices. We promise to never sell your information - ever. You
      have the right to completely control and access your data (it is your information after all)
      and may request it at any time and/or request to have it deleted.
    </Paragraph>
    <Paragraph>
      The Scholar Raise website uses cookies (like most sites). We do this to personalize content
      according to your logged-in status on our website, better understand how you’re interacting
      with our social media accounts, and to analyze our traffic for technical improvements. You
      consent to our cookies if you continue to use our website
    </Paragraph>
    <Paragraph>
      If you need to get in touch with Scholar Raise regarding any related issues, requests, or
      concerns please email <a href="mailto:info@scholarraise.com">info@scholarraise.com</a> or call
      615-517-2064.
    </Paragraph>
    <Image src={cookie} />
  </>
)
