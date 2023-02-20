import React from 'react'
import Page from '../../../components/page'

import {Container, Row, Column} from 'sr-components'

import Terms from '../../../content/terms'

export default () => (
  <Page title="Terms of Service">
    <Container my={[4, null, 5]}>
      <Row>
        <Column width={1}>
          <Terms />
        </Column>
      </Row>
    </Container>
  </Page>
)
