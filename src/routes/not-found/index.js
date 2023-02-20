import React from 'react'

import {Container, Row, Column, Heading, Paragraph, InternalLink, Image, Flex} from 'sr-components'
import Page from '../../components/page'
import Logo from '../../assets/logo-mark.svg'

const PageNotFound = () => {
  return (
    <Page title="Signup">
      <Container my={[4, null, 5]}>
        <Row>
          <Column width={1}>
            <Flex flexDirection="column" alignItems="center">
              <Image src={Logo} height={200} style={{transform: 'rotate(180deg)'}} />
              <Heading as="h2" textStyle="h2" mt={[3, null, 0]}>
                This doesn't deserve an A+
              </Heading>
              <Paragraph>
                We can't find that page. Perhaps you were looking for{' '}
                <InternalLink to="/">our homepage</InternalLink>?
              </Paragraph>
            </Flex>
          </Column>
        </Row>
      </Container>
    </Page>
  )
}

export default PageNotFound
