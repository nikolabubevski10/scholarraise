import React from 'react'
import {
  Box,
  Container,
  Row,
  Column,
  Flex,
  Card,
  Heading,
  Button,
  SVGIcon,
  CappedText,
} from 'sr-components'
import {Link} from 'react-router-dom'
import Tilt from 'react-tilt'
import {detect} from 'detect-browser'

import Calculator from '../../../components/savings-calculator'
import {ReactComponent as IconPlayCircle} from '../../../assets/icons/play-circle-solid.svg'
import stars from '../../../assets/homepage/stars.svg'

const browser = detect()

export default ({playVideo, cta, title}) => (
  <Box
    pb={[5, null, null, 4]}
    bg={['primary700', null, 'transparent']}
    mb={[0, null, 5, 72]}
    style={{position: 'relative'}}
  >
    <Box
      display={['none', null, 'block']}
      bg="primary700"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '150%',
        transform: 'skew(0, -5deg)',
        zIndex: -1,
        overflow: 'hidden',
      }}
    >
      <Box
        bg="rgba(255,255,255,0.1)"
        style={{
          position: 'absolute',
          bottom: -100,
          left: 0,
          width: '100%',
          height: 200,
          transform: 'skew(0, -6deg)',
        }}
      />
      <Box
        bg="rgba(255,255,255,0.1)"
        style={{
          position: 'absolute',
          bottom: -150,
          left: 0,
          width: '100%',
          height: 200,
          transform: 'skew(0, -3deg)',
        }}
      />
    </Box>
    <Box
      display={['none', null, 'block']}
      style={{
        position: 'absolute',
        bottom: -100,
        left: 0,
        width: '100%',
        height: '150%',
        backgroundImage: `url(${stars})`,
        backgroundRepeat: 'repeat',
        zIndex: -1,
        '-webkit-transform-style': 'preserve-3d',
      }}
    />
    <Container paddingTop={[60, null, 80]}>
      <Row>
        <Column width={['90%', null, 1 / 2, 2 / 3]} ml={['5%', null, 'auto']}>
          <Heading
            as="h1"
            textStyle="h1"
            color="white"
            fontFamily="special"
            fontWeight="regular"
            textAlign={['center', null, 'left']}
            mt={[0, null, 48, 5]}
            mb={[4, null, 5]}
            mr={[0, null, null, 4]}
          >
            {title}
          </Heading>
          <Flex
            justifyContent={['flex-start', 'center', 'flex-start']}
            alignItems="center"
            flexDirection={['column', 'row']}
          >
            <Button mb={0} mr={[0, 4]} as={Link} to="/signup?context=save" variant="secondary">
              {cta}
            </Button>
            <Flex
              alignItems="center"
              mt={[4, 0]}
              style={{cursor: 'pointer'}}
              onClick={() => playVideo(true)}
            >
              <SVGIcon mr={2} size="1.5rem" color="white" Icon={IconPlayCircle} />
              <CappedText mb={0} color="white">
                How it works
              </CappedText>
            </Flex>
          </Flex>
        </Column>
        <Column width={['90%', null, 1 / 2, 1 / 3]} ml={['5%', null, 'auto']}>
          <Flex mt={[4, null, 0]} justifyContent={['center', null, 'flex-end']}>
            <Box display={['none', null, 'block']}>
              {browser.name === 'safari' ? (
                <Card variant="paper">
                  <Calculator />
                </Card>
              ) : (
                <Tilt options={{reverse: true, max: 15, scale: 1}}>
                  <Card variant="paper">
                    <Calculator />
                  </Card>
                </Tilt>
              )}
            </Box>
            <Card display={['block', null, 'none']} variant="paper" width={['100%', '80%']}>
              <Calculator />
            </Card>
          </Flex>
        </Column>
      </Row>
    </Container>
  </Box>
)
