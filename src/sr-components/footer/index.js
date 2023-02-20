import React, {useState} from 'react'
import styled from 'styled-components'
import {themeGet, opacity} from 'styled-system'
import {Link} from 'react-router-dom'

import Links from './_links'

import theme from '../theme'
import {filterLinksBySecurity} from '../_helpers'
import Flex from '../flex'
import Box from '../box'
import Image from '../image'
import {CappedText, Paragraph} from '../typography'
import {Container, Row, Column} from '../grid'

const getVariant = ({variant, ...props}) => {
  if (variant === 'light') {
    return {backgroundColor: themeGet('colors.white')(props)}
  } else if (variant === 'dark') {
    return {backgroundColor: themeGet('colors.black')(props)}
  } else if (variant === 'transparent') {
    return {backgroundColor: 'transparent'}
  }

  return null
}

const FooterContainer = styled(Flex)(props => ({
  width: '100%',
  ...getVariant(props),
}))

const LinksSection = styled(Box)(
  props => ({
    transition: `opacity ${themeGet('animations.fast')(props)} ease-in-out`,
  }),
  opacity,
)

const legal = (
  <Box mt={4}>
    <CappedText color="darkGray">Boring legal stuff...</CappedText>
    <Paragraph color="darkGray">
      Scholar Raise, LLC, a Tennessee Limited Liability Company, is an internet based investment
      advisory service. Our internet-based investment advisory services are designed to assist
      clients in saving for college and are not intended to provide comprehensive tax advice or
      financial planning. Our services are available to U.S. residents only. This website shall not
      be considered a solicitation or offering for any service or product to any person in any
      jurisdiction where such solicitation or offer would be unlawful.
    </Paragraph>
    <Paragraph color="darkGray">
      Please consider your objectives and tax implications before investing with Scholar Raise, LLC.
      All investments and securities involve risk. Scholar Raise does not provide brokerage
      services.
    </Paragraph>
  </Box>
)

export default ({
  logo,
  address,
  madeIn,
  copyright,
  links,
  isLoggedIn,
  variant = 'dark',
  ...props
}) => {
  const [hoveredSection, setHoveredSection] = useState(false)
  const preparedLinks = links.map(link => ({
    ...link,
    links: filterLinksBySecurity(isLoggedIn, link.links),
  }))

  const logoFilter = variant !== 'light' ? 'brightness(0) invert(1)' : ''

  return (
    <FooterContainer {...props} variant={variant} py={[3, null, 5]}>
      <Container>
        <Row mx={[3, null, 0]}>
          <Column width={[1, null, 1 / 3]} mb={[4, null, 0]}>
            <Link to="/">
              <Image src={logo} height={48} mb={2} style={{filter: logoFilter}} />
            </Link>
            {address.map((line, index) => (
              <Paragraph color="mediumGray" mb={0} key={index}>
                {line}
              </Paragraph>
            ))}
          </Column>
          <Column width={[1, null, 2 / 3]}>
            <Flex flexDirection={['column', null, 'row']} justifyContent="space-between">
              {preparedLinks.length > 0 &&
                preparedLinks.map(
                  ({title, links}, index) =>
                    links.length > 0 && (
                      <LinksSection
                        key={index}
                        mb={3}
                        width={[1, null, `${100 / preparedLinks.length}%`]}
                        opacity={
                          !hoveredSection || hoveredSection === title ? 1 : theme.opacities[1]
                        }
                        onMouseEnter={() => setHoveredSection(title)}
                        onMouseLeave={() => setHoveredSection(false)}
                      >
                        <CappedText color="mediumGray">{title}</CappedText>
                        <Links variant={variant} links={links} />
                      </LinksSection>
                    ),
                )}
            </Flex>
          </Column>
          <Column width={1} mt={[3, null, 5]}>
            {madeIn && (
              <Paragraph
                mb={2}
                textAlign={['left', null, 'center']}
                color={variant === 'dark' ? 'white' : 'mediumGray'}
              >
                {madeIn}
              </Paragraph>
            )}
            {copyright && (
              <Paragraph
                mb={0}
                textAlign={['left', null, 'center']}
                fontSize={1}
                color={variant === 'dark' ? 'mediumGray' : 'lightGray'}
              >
                {copyright}
              </Paragraph>
            )}
            {legal}
          </Column>
        </Row>
      </Container>
    </FooterContainer>
  )
}
