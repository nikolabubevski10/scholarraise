import React, {useState, useEffect} from 'react'

import VideoPlayer from './Video'
import Hero from './Hero'
import About from './About'
import Features from './Features'
import Founder from './Founder'
import PreFooter from './PreFooter'

import Page from '../../../components/page'
import {SavingsCalculatorProvider} from '../../../components/savings-calculator/context'

import content from '../../../content/homepage'

export default () => {
  const {videoLink, CTAText, hero, about, features, founder} = content
  const [isPlayingVideo, setIsPlayingVideo] = useState(false)

  useEffect(() => {
    // track pinterest page visit and lead events
    setTimeout(() => window.pintrk('track', 'pagevisit'), 5000)
    setTimeout(() => window.pintrk('track', 'lead'), 30000)
  }, [])

  const videoInfo = {
    videoLink,
    playVideo: status => setIsPlayingVideo(status),
    isPlayingVideo,
  }

  return (
    <Page>
      <SavingsCalculatorProvider>
        <VideoPlayer {...videoInfo} />
        <Hero {...hero} cta={CTAText} playVideo={videoInfo.playVideo} />
        <About {...about} cta={CTAText} playVideo={videoInfo.playVideo} />
        <Features features={features} />
        <Founder {...founder} />
        <PreFooter cta={CTAText} />
      </SavingsCalculatorProvider>
    </Page>
  )
}
