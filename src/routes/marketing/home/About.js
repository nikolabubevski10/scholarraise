import React from 'react'
import {Box, Container, Row, Column, Heading, Paragraph, Button, Image} from 'sr-components'
import {Link} from 'react-router-dom'

import tablet from '../../../assets/homepage/tablet.png'
import {ReactComponent as IconPlayCircle} from '../../../assets/icons/play-circle-solid.svg'

export default ({playVideo, cta, title, description}) => (
  <Box pb={[null, null, 72, 96]} mt={[5, null, 6, 128]}>
    <Container>
      <Row>
        <Column width={['90%', null, 1 / 2, 7 / 12]} ml={['5%', null, 'auto']}>
          <Heading as="h2" textStyle="h2" fontFamily="special">
            {title}
          </Heading>
          {description.map((paragraph, i) => (
            <Paragraph key={i} color="mediumGray" fontSize={3}>
              {paragraph}
            </Paragraph>
          ))}
          <Button display="inline-block" mb={0} mt={2} as={Link} to="/signup?context=save">
            {cta}
          </Button>
        </Column>
        <Column width={['90%', '70%', 1 / 2, 5 / 12]} ml={['5%', '15%', 'auto']} mt={4}>
          <Box display={['none', null, null, 'block']} style={{position: 'relative'}}>
            <Image
              src={tablet}
              alt="Scholar Raise"
              style={{
                transform: 'scale(1.5) translate(20px, -40px)',
                transformOrigin: 'top left',
              }}
            />
            <Box
              color="primary"
              bg="white"
              borderRadius="round"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                height: 64,
                width: 64,
                transform: 'translate(-50%, -50%)',
                marginTop: -20,
                marginLeft: 120,
                cursor: 'pointer',
              }}
              onClick={() => playVideo(true)}
            >
              <IconPlayCircle width={64} />
            </Box>
          </Box>
          <Box display={['none', null, 'block', 'none']} style={{position: 'relative'}}>
            <Image
              src={tablet}
              alt="Scholar Raise"
              style={{
                transform: 'scale(1.5) translate(20px, 0px)',
                transformOrigin: 'top left',
              }}
            />
            <Box
              color="primary"
              bg="white"
              borderRadius="round"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                height: 64,
                width: 64,
                transform: 'translate(-50%, -50%)',
                marginTop: 70,
                marginLeft: 120,
                cursor: 'pointer',
              }}
              onClick={() => playVideo(true)}
            >
              <IconPlayCircle width={64} />
            </Box>
          </Box>
          <Box display={['block', null, 'none']} style={{position: 'relative'}}>
            <Image src={tablet} alt="Scholar Raise" />
            <Box
              color="primary"
              bg="white"
              borderRadius="round"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                height: 64,
                width: 64,
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer',
              }}
              onClick={() => playVideo(true)}
            >
              <IconPlayCircle width={64} />
            </Box>
          </Box>
        </Column>
      </Row>
    </Container>
  </Box>
)
