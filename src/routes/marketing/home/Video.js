import React from 'react'
import YouTube from 'react-youtube'
import {Box} from 'sr-components'

export default ({videoLink, playVideo, isPlayingVideo}) => {
  const overlayProps = {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: '999',
    background: 'rgba(0, 0, 0, 0.5)',
    cursor: 'pointer',
    display: 'block',
  }

  const playerProps = {
    position: 'absolute',
    width: '90%',
    height: '90%',
    top: '5%',
    left: '5%',
  }

  const options = {
    height: '100%',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }

  const onReady = event => {
    if (event.target.h && event.target.h.parentElement) {
      event.target.h.parentElement.style.height = '100%'
    }
  }

  if (isPlayingVideo) {
    return (
      <Box style={overlayProps} onClick={() => playVideo(false)}>
        <Box style={playerProps}>
          <YouTube videoId={videoLink} opts={options} onReady={onReady} />
        </Box>
      </Box>
    )
  }

  return null
}
