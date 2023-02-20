import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import jsonp from 'jsonp'
import {
  Row,
  Column,
  Button,
  Flex,
  Heading,
  Paragraph,
  Container,
  EmailInput,
  Box,
  InlineText,
} from 'sr-components'
import {useNotification} from '../../../hooks/useNotification'

function SubscribeToNewsletter() {
  const [email, setEmail] = useState()
  const [isSubmitting, setSubmitting] = useState()
  const [status, setStatus] = useState()
  const {success, failed} = useNotification()

  function submit() {
    setSubmitting(true)
    jsonp(
      `https://scholarraise.us16.list-manage.com/subscribe/post-json?u=067c8c2ea96ad0c2aa057c975&id=1ac1309f59&EMAIL=${email}`,
      {
        param: 'c',
      },
      (err, data) => {
        if (data?.msg?.includes('already subscribed')) {
          setStatus('duplicate')
        } else if (err || data.result !== 'success') {
          setStatus('error')
        } else {
          setStatus('success')
        }
        setSubmitting(false)
      },
    )
  }

  useEffect(() => {
    if (status === 'error') {
      failed('Something went wrong... check your email address and try again!')
    } else if (status === 'duplicate') {
      failed('This email is already subscribed!')
    } else if (status === 'success') {
      success(`Successfully subscribed ${email} to our newsletter!`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  return (
    <Flex
      width={[1, 3 / 5, 1]}
      justifyContent="space-between"
      my={3}
      flexDirection={['column', 'row']}
    >
      {status !== 'success' ? (
        <>
          <Box width={1}>
            <EmailInput placeholder="Email address" disabled={isSubmitting} onChange={setEmail} />
          </Box>
          <Button
            disabled={isSubmitting}
            as={Link}
            ml={[0, 2]}
            variant="secondary"
            onClick={submit}
          >
            Subscribe
          </Button>
        </>
      ) : (
        <InlineText fontSize={[2, null, 3]} color="white" py={2}>
          Thank you for subscribing to our newsletter!
        </InlineText>
      )}
    </Flex>
  )
}

export default ({cta}) => (
  <Box bg={['black', null, 'transparent']} pt={[0, null, 196]} style={{position: 'relative'}}>
    <Box
      display={['none', null, 'block']}
      bg="black"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '150%',
        transform: 'skew(0, -4deg)',
        zIndex: -1,
        overflow: 'hidden',
      }}
    >
      <Box
        bg="rgba(255,255,255,0.1)"
        style={{
          position: 'absolute',
          top: -100,
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
          top: -150,
          left: 0,
          width: '100%',
          height: 200,
          transform: 'skew(0, -3deg)',
        }}
      />
    </Box>
    <Container>
      <Row mx={[3, null, 0]}>
        <Column width={[1]} mx={-1} pt={5} pb={4}>
          <Heading as="p" textStyle="h2" fontFamily="special" color="white" textAlign="left">
            All that time scrolling could have been spent saving.
          </Heading>
        </Column>
        <Column width={[1, null, 1 / 2]} mx={-1} mr={4}>
          <Paragraph fontSize={[3, null, 4]} color="snow" mb={[3, null, 4]}>
            No joke - creating an account with Scholar Raise takes less than five minutes.
          </Paragraph>
          <Button as={Link} display="inline-block" to="/signup?context=save">
            {cta}
          </Button>
        </Column>
        <Column width={[0, null, 1 / 12]} mx={-1} />
        <Column width={[1, null, 5 / 12]} mx={-1} py={[4, null, 0]}>
          <Paragraph fontSize={3} color="mediumGray">
            Sign up to receive news, updates, and smart family finance tips.
          </Paragraph>
          <SubscribeToNewsletter />
          <Paragraph fontSize={2} mb={0} mt={-2} color="mediumGray">
            With great power comes great responsibility: We will never share or sell your
            information.
          </Paragraph>
        </Column>
      </Row>
    </Container>
  </Box>
)
