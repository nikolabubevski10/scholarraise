import React from 'react'
import styled from 'styled-components'
import {themeGet} from 'styled-system'

import Card from '../card'
import Box from '../box'
import Flex from '../flex'
import Avatar from '../avatar'
import {CappedText} from '../typography'
import Button from '../button'

const CoverCard = styled(Card)(props => ({
  position: 'relative',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  '&:after': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: themeGet('colors.blacks.1')(props),
    content: '""',
  },
}))

CoverCard.defaultProps = {
  ...Card.defaultProps,
  variant: '',
  p: 4,
}

CoverCard.displayName = 'CoverCard'

export default ({
  avatar,
  cover,
  isPublic,
  privacyMessage,
  openAvatarDialog,
  removeAvatar,
  openCoverDialog,
  removeCover,
  setPrivacy,
  ...props
}) => {
  const hasAvatar = avatar.existed
  const hasCover = cover.existed

  return (
    <CoverCard {...props} backgroundImage={`url(${cover.image})`}>
      <Box style={{position: 'relative', zIndex: 1}}>
        <Flex
          flexDirection={['column', 'row']}
          justifyContent="space-between"
          alignItems={['flex-start', 'center']}
        >
          <Flex alignItems="center" mb={[4, 0]}>
            <Avatar src={avatar.image} size={6} mr={3} border="avatar" />
            <Box>
              <CappedText display="block" color="white">
                Avatar
              </CappedText>
              {hasAvatar && (
                <Flex>
                  <Button
                    mb={0}
                    mr={2}
                    variant="secondary"
                    onClick={openAvatarDialog}
                    data-cy="card-replace-avatar"
                    type="button"
                  >
                    Replace
                  </Button>
                  <Button
                    mb={0}
                    type="button"
                    variant="error"
                    onClick={removeAvatar}
                    data-cy="card-remove-avatar"
                  >
                    Remove
                  </Button>
                </Flex>
              )}
              {!hasAvatar && (
                <Button
                  mb={0}
                  type="button"
                  variant="secondary"
                  onClick={openAvatarDialog}
                  data-cy="card-upload-avatar"
                >
                  Upload
                </Button>
              )}
            </Box>
          </Flex>
          <Box>
            <CappedText display="block" color="white">
              Cover
            </CappedText>
            {hasCover && (
              <Flex>
                <Button
                  mb={0}
                  mr={2}
                  type="button"
                  variant="secondary"
                  onClick={openCoverDialog}
                  data-cy="card-replace-cover"
                >
                  Replace
                </Button>
                <Button
                  mb={0}
                  type="button"
                  variant="error"
                  onClick={removeCover}
                  data-cy="card-remove-cover"
                >
                  Remove
                </Button>
              </Flex>
            )}
            {!hasCover && (
              <Button
                mb={0}
                type="button"
                variant="secondary"
                onClick={openCoverDialog}
                data-cy="card-upload-cover"
              >
                Upload
              </Button>
            )}
          </Box>
        </Flex>
        <Box mt={5}>
          <Flex>
            <Button
              mb={0}
              type="button"
              variant={isPublic ? 'primary' : 'secondary'}
              borderRadius="leftNormal"
              onClick={() => setPrivacy(true)}
              data-cy="card-public-button"
            >
              Public
            </Button>
            <Button
              mb={0}
              type="button"
              variant={!isPublic ? 'primary' : 'secondary'}
              borderRadius="rightNormal"
              onClick={() => setPrivacy(false)}
              data-cy="card-private-button"
            >
              Invitation only
            </Button>
          </Flex>
          <Box width={1}>
            {React.cloneElement(privacyMessage, {
              lineHeight: 'title',
              color: 'white',
              mt: 3,
              mb: 0,
            })}
          </Box>
        </Box>
      </Box>
    </CoverCard>
  )
}
