import React from 'react'
import styled, {css, keyframes} from 'styled-components'

import logo from '../../assets/logo-mark.svg'

const heartbeat = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
`

const Container = styled.div`
  ${props => css`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgba(250, 250, 250, 0.75);
    opacity: 1;
    z-index: 90000;
    transition: z-index 200ms step-end, opacity 200ms ease-in-out;
    ${props.notloading &&
    css`
      z-index: -1;
      opacity: 0;
    `}
  `}
`

const Icon = styled.div`
  ${props => css`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80px;
    height: 80px;
    margin-top: -40px;
    margin-left: -40px;
    background-size: cover;
    animation: ${heartbeat} ease-in-out 1s infinite;
    background-image: url(${props.logo});
  `}
`

const Loader = props => {
  return (
    <Container notloading={props.isLoading ? false : true}>
      <Icon logo={logo} />
    </Container>
  )
}

export default Loader
