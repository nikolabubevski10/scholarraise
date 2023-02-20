import React, {useState} from 'react'
import styled from 'styled-components'
import {
  themeGet,
  height,
  minHeight,
  minWidth,
  maxHeight,
  maxWidth,
  bottom,
  left,
  opacity,
} from 'styled-system'
import {ReactComponent as IconEnvelope} from '../assets/envelope-solid.svg'
import CircleProgress from './progress'
import theme from '../theme'
import Card from '../card'
import {Container} from '../grid'
import Flex from '../flex'
import Box from '../box'
import Avatar from '../avatar'
import {Heading} from '../typography'
import Button from '../button'
import {HoverTooltip} from '../form/inputs/_tooltip'
import {SVGIcon} from '../icon'

const COVER_BIG = 400
const COVER_SCROLLED = 200
const COVER_AVATAR = 200

const CoverCard = styled(Card)(
  props => ({
    position: 'relative',
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    zIndex: themeGet('zIndicies.profileHeader')(props),
    [props.theme.media.desktop]: {
      position: 'fixed',
      top: 0,
      left: 0,
    },
    '&:after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: themeGet('colors.blacks.1')(props),
      content: '""',
    },
  }),
  height,
)

CoverCard.defaultProps = {
  ...Card.defaultProps,
  variant: '',
  p: [3, null, 0],
}

CoverCard.displayName = 'CoverCard'

const AvatarContainer = styled(Box)(
  props => ({
    position: 'relative',
    [props.theme.media.desktop]: {
      position: 'absolute',
    },
  }),
  minHeight,
  minWidth,
  maxHeight,
  maxWidth,
  bottom,
)

AvatarContainer.defaultProps = {
  ...Box.defaultProps,
  mb: [2, null, 0],
}

const CoverContent = styled(Flex)(
  props => ({
    [props.theme.media.desktop]: {
      position: 'absolute',
    },
  }),
  bottom,
  left,
)

const FadedHeading = styled(Heading)(opacity)

const ContributeButton = styled(Button)(
  props => ({
    [props.theme.media.desktop]: {
      position: 'absolute',
    },
  }),
  bottom,
)

const computeYearValues = (entryYear, birthYear) => {
  const currentYear = new Date().getFullYear()
  const yearsOld = currentYear - birthYear
  const finalEntryYear = entryYear ? entryYear : birthYear + 18
  const yearsTillCollege = Math.max(0, finalEntryYear - currentYear)

  return {
    finalEntryYear,
    yearsOld,
    yearsTillCollege,
  }
}

const getYearsTillCollege = (entryYear, birthYear) => {
  const {yearsTillCollege} = computeYearValues(entryYear, birthYear)
  const adverb = yearsTillCollege !== 1 ? 'years' : 'year'

  return `${yearsTillCollege} ${adverb}`
}

const getProgress = (entryYear, birthYear) => {
  const {finalEntryYear, yearsOld} = computeYearValues(entryYear, birthYear)
  const progress = (yearsOld / (finalEntryYear - birthYear)) * 100

  return progress <= 100 ? progress : 100
}

const getDynamicCoverStyles = scroll => {
  const height = COVER_BIG - scroll
  const relativeProgress = (height - COVER_SCROLLED) / (COVER_BIG - COVER_SCROLLED)
  const normalizedProgress = Math.min(Math.max(relativeProgress, 0), 1)

  const normalizedScale = (a, b, unit = 'px') => `${(b - a) * (normalizedProgress / 1) + a}${unit}`

  return {
    coverCard: {
      height: normalizedScale(COVER_SCROLLED, COVER_BIG),
    },
    avatarContainer: {
      bottom: normalizedScale(20, -30),
      size: normalizedScale(COVER_AVATAR * 0.4, COVER_AVATAR),
    },
    coverContent: {
      bottom: normalizedScale(-7, 40),
      left: normalizedScale(COVER_AVATAR * 0.4 + 20, COVER_AVATAR + 40),
    },
    yearsTillCollege: {
      opacity: normalizedProgress,
    },
    contributeButton: {
      bottom: normalizedScale(26, -34),
    },
  }
}

function SocialMediaButtons({onCopyProfile}) {
  return (
    <Flex justifyContent={['center', 'flex-start']} alignItems="center">
      <HoverTooltip
        tooltip="This will copy a link to your scholar's profile to your clipboard - you can paste it in an email to send to friends and family."
        position="top"
        animation="fade"
      >
        <SVGIcon
          Icon={IconEnvelope}
          size={2}
          color="lightGray"
          hoverColor="mediumGray"
          onClick={event => {
            event.preventDefault()
            onCopyProfile(window.location.href)
          }}
        />
      </HoverTooltip>
    </Flex>
  )
}

export default ({
  yPosition,
  avatar,
  cover,
  name,
  entryYear,
  birthYear,
  openContributionsDialog,
  onCopyProfile,
  isPublic,
  ...props
}) => {
  const styles = getDynamicCoverStyles(yPosition)
  const desktopMatch = window.matchMedia(theme.media.desktop.split('@media screen and ')[1])

  const [isDesktop, setIsDesktop] = useState(desktopMatch.matches)

  desktopMatch.onchange = ({matches}) => {
    setIsDesktop(matches)
  }

  return (
    <CoverCard
      {...props}
      backgroundImage={`url(${cover})`}
      style={{height: isDesktop ? styles.coverCard.height : null}}
    >
      <Container px={2} style={{position: 'relative', zIndex: 1, height: '100%'}}>
        <Flex
          flexDirection={['column', null, 'row']}
          justifyContent="space-between"
          alignItems="center"
        >
          <Flex flexDirection={['column', null, 'row']} alignItems="center">
            <AvatarContainer
              style={{
                minHeight: isDesktop ? styles.avatarContainer.size : null,
                minWidth: isDesktop ? styles.avatarContainer.size : null,
                maxHeight: isDesktop ? styles.avatarContainer.size : null,
                maxWidth: isDesktop ? styles.avatarContainer.size : null,
                bottom: isDesktop ? styles.avatarContainer.bottom : null,
              }}
              minHeight={7}
              minWidth={7}
              maxHeight={7}
              maxWidth={7}
            >
              <Avatar
                src={avatar}
                size={7}
                border="avatar"
                style={{
                  minHeight: isDesktop ? styles.avatarContainer.size : null,
                  minWidth: isDesktop ? styles.avatarContainer.size : null,
                  maxHeight: isDesktop ? styles.avatarContainer.size : null,
                  maxWidth: isDesktop ? styles.avatarContainer.size : null,
                }}
              />
              <CircleProgress
                radius={100}
                stroke={10}
                value={getProgress(entryYear, birthYear)}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
                animated
              />
            </AvatarContainer>
            <CoverContent
              flexDirection="column"
              alignItems={['center', null, 'flex-start']}
              style={{
                bottom: isDesktop ? styles.coverContent.bottom : null,
                left: isDesktop ? styles.coverContent.left : null,
              }}
            >
              <Flex direction="row" alignItems="center" mb={2}>
                <Heading as="h1" textStyle="h3" color="white" mt={0} mb={0}>
                  {name}
                </Heading>
                {isDesktop && isPublic && (
                  <Box ml={3}>
                    <SocialMediaButtons onCopyProfile={onCopyProfile} />
                  </Box>
                )}
              </Flex>
              <FadedHeading
                as="h3"
                textStyle="h4"
                color="lightGray"
                mt={0}
                mb={0}
                style={{
                  opacity: isDesktop ? styles.yearsTillCollege.opacity : null,
                }}
              >
                Headed to college in {getYearsTillCollege(entryYear, birthYear)}
              </FadedHeading>
            </CoverContent>
          </Flex>
          <Flex justifyContent={['center', null, 'flex-end']} mt={[4, null, 0]}>
            <ContributeButton
              onClick={openContributionsDialog}
              mb={0}
              px={[3, null, 5]}
              py={[3, null, 24]}
              style={{
                bottom: isDesktop ? styles.contributeButton.bottom : null,
              }}
              data-cy={`header-contribute-button`}
            >
              Contribute
            </ContributeButton>
          </Flex>
          {!isDesktop && isPublic && (
            <Box mt={3}>
              <SocialMediaButtons onCopyProfile={onCopyProfile} />
            </Box>
          )}
        </Flex>
      </Container>
    </CoverCard>
  )
}
