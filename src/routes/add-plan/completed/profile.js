import React from 'react'
import {Column, ProfilePhotosCard, InternalLink} from 'sr-components'
import {Button} from 'components/lib'
import {H2, CappedText} from 'components/typography'
import {Form, FormInput, FormContainer} from 'components/forms'
import {avatarFallback, coverFallback} from 'helpers/images'
import UploadAvatarDialog from 'routes/dialogs/upload-dialog'
import {useDisclosure} from 'react-use-disclosure'
import {Redirect} from 'react-router-dom'
import {updateAccount} from 'api/accounts'
import {useNotification} from 'hooks/useNotification'

const Message = (
  <div className="my-4 text-white">
    If the scholar’s profile is public, it may show up in search results and anyone can contribute.
    Don’t worry,{' '}
    <InternalLink to="/policy" target="_blank">
      we still respect your child’s privacy
    </InternalLink>{' '}
    by anonymizing their name and hiding other personally revealing information.
  </div>
)

function SixthPage({options = []}) {
  const {isOpen: isAvatarOpen, open: openAvatar, close: closeAvatar} = useDisclosure()
  const {isOpen: isCoverOpen, open: openCover, close: closeCover} = useDisclosure()

  const {account = {}} = options
  const [isValid, setIsValid] = React.useState(false)
  const [isPublic, setPublic] = React.useState(true)
  const [redirectToDashboard, setRedirect] = React.useState(false)
  const {success, failed} = useNotification()

  const [photos, setData] = React.useState({
    // should prob move stuff here... or break into two
    beneficiaryAvatarUrl: '',
    beneficiaryCoverPhotoUrl: '',
  })

  const name = `${account.beneficiaryFirstName} ${account.beneficiaryLastName}`

  React.useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  function injectUpdateProfile(d) {
    updateAccount({...d, ...photos, isPublic}, account.hashid)
      .then(() => success('Thank you for updating the scholar profile!'))
      .then(() => setRedirect(true))
      .catch(() =>
        failed(
          'Hmmm. Something went wrong trying to update the scholar profile. Can you try again?',
        ),
      )
  }

  if (redirectToDashboard) {
    return <Redirect to="/dashboard" />
  }

  return (
    <FormContainer className="rounded">
      <Column width={1}>
        <div className="formBox">
          <Form onSubmit={injectUpdateProfile} getIsValid={setIsValid}>
            <CappedText className="mb-4 text-darkGray">Customize the look & feel</CappedText>
            <H2 className="mb-8 text-xl text-mediumGray">
              Give this scholar profile a bit of pizzazz!
            </H2>
            <div className="w-full">
              <ProfilePhotosCard
                avatar={avatarFallback(photos.beneficiaryAvatarUrl)}
                cover={coverFallback(photos.beneficiaryCoverPhotoUrl)}
                setPrivacy={() => setPublic(!isPublic)}
                isPublic={isPublic}
                privacyMessage={Message}
                openAvatarDialog={openAvatar}
                openCoverDialog={openCover}
                removeAvatar={() => setData(prev => ({...prev, beneficiaryAvatarUrl: ''}))}
                removeCover={() => setData(prev => ({...prev, beneficiaryCoverPhotoUrl: ''}))}
              />
            </div>
            <div className="grid grid-cols-1 col-gap-4 my-4 md:grid-cols-2">
              <div className="h-full">
                <FormInput
                  name="beneficiaryAbout"
                  type="textarea"
                  fullHeight
                  placeholder={`Tell us about ${account.beneficiaryFirstName} and why saving for education is important...`}
                />
              </div>
              <div className="space-y-1">
                <FormInput name="beneficiaryCurrentPassion" placeholder="Current passion" />
                <FormInput name="beneficiaryFutureCareer" placeholder="Future career" />
                <FormInput name="beneficiaryFavouriteBook" placeholder="Favorite book" />
                <FormInput name="beneficiaryFirstWord" placeholder="First word" />
              </div>
            </div>
            <div className="flex flex-col justify-end w-full mt-2 mb-8 md:flex-row">
              <Button
                className="w-full md:block md:w-auto"
                variant="secondary"
                type="button"
                onClick={() => setRedirect(true)}
              >
                Skip this step
              </Button>
              <Button
                className="w-full mt-4 md:block md:w-auto md:mt-0 md:ml-4"
                disabled={!isValid}
                type="submit"
              >
                Save profile
              </Button>
            </div>
          </Form>
        </div>
      </Column>
      <UploadAvatarDialog
        isOpen={isAvatarOpen}
        onClose={closeAvatar}
        avatarSrc={photos.beneficiaryAvatarUrl}
        name={name}
        submitPhoto={url => setData(prev => ({...prev, beneficiaryAvatarUrl: url}))}
      />
      <UploadAvatarDialog
        isOpen={isCoverOpen}
        onClose={closeCover}
        name={name}
        submitPhoto={url => setData(prev => ({...prev, beneficiaryCoverPhotoUrl: url}))}
        format="cover"
      />
    </FormContainer>
  )
}

export {SixthPage}
