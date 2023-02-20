import React from 'react'
import {Box, Container, Row, Column, Flex, Paragraph, Avatar} from 'sr-components'

export default ({image, signature, quote}) => (
  <Box my={[4, null, 6]}>
    <Container>
      <Row>
        <Column width={['90%', null, 1, '70%']} ml={['5%', null, 0, '15%']}>
          <Flex flexDirection={['column', 'row']} alignItems={['center', 'flex-start']}>
            <Avatar src={image} size={[7, null, 8]} mb={[4, 0]} mr={[null, 3, 4]} />
            <Box>
              <Paragraph fontSize={[3, 4]} color="mediumGray">
                &ldquo;{quote}&rdquo;
              </Paragraph>
              <Paragraph
                mb={0}
                color="darkGray"
                textAlign={['left', 'right']}
                fontWeight="bold"
                fontSize={3}
              >
                {signature}
              </Paragraph>
            </Box>
          </Flex>
        </Column>
      </Row>
    </Container>
  </Box>
)
