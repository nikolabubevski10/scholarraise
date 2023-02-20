import React from 'react'
import Page from '../../../components/page'

import {Container, Row, Column} from 'sr-components'

import Policy from '../../../content/policy'

export default () => (
  <Page title="Privacy Policy">
    <Container my={[4, null, 5]}>
      <Row>
        <Column width={1}>
          <Policy />
        </Column>
      </Row>
    </Container>
  </Page>
)
