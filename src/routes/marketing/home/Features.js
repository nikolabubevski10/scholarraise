import React from 'react'
import {Box, Container, Row, Column, Flex, Heading, Paragraph} from 'sr-components'

export default ({features}) => (
  <Box mt={[4, null, 6]}>
    <Container>
      {features.map(({title, description, icons, visual}, i) => (
        <Row mt={[4, null, 6]} key={i}>
          <Column width={['90%', null, 1, 2 / 3]} ml={['5%', null, 'auto']}>
            <Heading as="h3" textStyle="h2" color="darkGray" fontFamily="special">
              {title}
            </Heading>
            {description.map((paragraph, i) => (
              <Paragraph key={i} color="mediumGray" fontSize={3} mr={[0, null, null, 4]}>
                {paragraph}
              </Paragraph>
            ))}
            <Flex
              flexDirection={['column', null, 'row', 'column']}
              justifyContent={['flex-start', null, 'space-between', 'flex-start']}
            >
              {icons.map(({title, icon}, i) => {
                const Icon = icon

                return (
                  <Flex key={i} alignItems="center" mt={i === 0 ? 0 : [2, null, 0, 2]}>
                    <Box color="primary" mr={3}>
                      <Icon width={32} height={32} />
                    </Box>
                    <Paragraph mt={0} mb={0} fontSize={3} fontWeight="bold" color="darkGray">
                      {title}
                    </Paragraph>
                  </Flex>
                )
              })}
            </Flex>
          </Column>
          <Column
            display={['none', null, null, 'block']}
            width={[null, null, null, 1 / 3]}
            ml="auto"
          >
            {visual}
          </Column>
        </Row>
      ))}
    </Container>
  </Box>
)
