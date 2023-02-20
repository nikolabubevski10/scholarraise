import React from 'react'
import Page from '../../../components/page'

import {Container, Row, Column} from 'sr-components'

import FAQ from '../../../content/faq'

export default () => (
  <Page title="Frequently Asked Questions">
    <Container my={[4, null, 5]}>
      <Row>
        <Column width={1}>
          <FAQ />
        </Column>
      </Row>
    </Container>
  </Page>
)
