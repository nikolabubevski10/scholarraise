import React, {useState} from 'react'
import {Avatar, Row, Flex, Column} from 'sr-components'
import {Form, FormInput, InputGroups} from 'components/forms'
import {Button} from 'components/lib'
import {HR} from 'components/typography'
import {avatarFallback} from 'helpers/images'
import UploadAvatarDialog from 'routes/dialogs/upload-dialog'
import UpdateYour529AccountDialog from 'routes/dialogs/update-your-529-account'
import {useUser} from 'context/user'
import {useAppContext} from 'context/appContext'
import {useNotification} from 'hooks/useNotification'
import {clearToNumber, removeInternationalCode} from 'helpers/form-validators'
import States from 'helpers/states'

function Profile() {
  const [modal519, setModal519Open] = useState(false)
  const [open, setOpen] = useState(false)
  const {user, update} = useUser()
  const {setLoading} = useAppContext()
  const {success, failed} = useNotification()
  const [isValid, setIsValid] = React.useState(false)

  const {avatarUrl} = user
  const name = `${user.firstName} ${user.lastName}`

  async function submit(data) {
    const userData = {...data}

    if (user.ssnOrTin) {
      delete userData.ssnOrTin
    }

    if (data.phone) {
      userData.phone = clearToNumber(userData.phone)
      userData.phone = removeInternationalCode(userData.phone)
    }

    setLoading(true)
    update({user: {...userData}})
      .then(() => success('Profile updated'))
      .then(() => user.accounts?.length > 0 && setModal519Open(true))
      .catch(() => failed('Something went wrong when updating your profile. Try again!'))
      .finally(() => {
        setLoading(false)
      })
  }

  const AvatarButtons =
    Boolean(avatarUrl) && avatarUrl !== 'PLACEHOLDER' ? (
      <>
        <Button
          data-cy="replace-avatar-button"
          variant="secondary"
          onClick={() => setOpen(true)}
          mr={[2, null, 3]}
          mb={0}
        >
          Replace
        </Button>
        <Button
          data-cy="remove-avatar-button"
          variant="error"
          onClick={() => update({user: {avatarUrl: ''}})}
          mb={0}
        >
          Remove
        </Button>
      </>
    ) : (
      <Button
        data-cy="upload-avatar-button"
        variant="secondary"
        onClick={() => setOpen(true)}
        mb={0}
      >
        Upload
      </Button>
    )

  return (
    <>
      <Row>
        <Column>
          <Flex alignItems="center" mb={3}>
            <Avatar mr={3} size={[4, null, 6]} src={avatarFallback(avatarUrl).image} />
            {AvatarButtons}
          </Flex>
        </Column>
      </Row>
      <Row>
        <Column width={[1, null, 3 / 4]}>
          <Form onSubmit={submit} getIsValid={setIsValid}>
            <InputGroups>
              <FormInput
                name="firstName"
                placeholder="First name"
                defaultValue={user.firstName}
                validation={{
                  minLength: {value: 2, message: 'Use your full first name'},
                  maxLength: {
                    value: 100,
                    message: 'Your name is too long... can you use abbreviations?',
                  },
                }}
                required
              />
              <FormInput
                name="middleName"
                placeholder="Middle name"
                defaultValue={user.middleName}
                validation={{
                  maxLength: {
                    value: 100,
                    message: 'Your name is too long... can you use abbreviations?',
                  },
                }}
              />
              <FormInput
                name="lastName"
                placeholder="Last name"
                defaultValue={user.lastName}
                validation={{
                  minLength: {value: 2, message: 'Use your full last name'},
                  maxLength: {
                    value: 100,
                    message: 'Your name is too long... can you use abbreviations?',
                  },
                }}
                required
              />
              <FormInput
                name="birthDate"
                type="date"
                placeholder="Date of Birth"
                defaultValue={user.birthDate?.replace?.('-', '/') ?? user.birthDate}
                required
              />
              <FormInput
                name="phone"
                type="phone"
                placeholder="Phone number"
                defaultValue={user.phone}
                required
              />
              <FormInput
                name="ssnOnTin"
                type="ssn"
                placeholder="SSN"
                defaultValue={user.ssnOrTin}
                showSSN={user.ssnOrTin}
                tooltip="The social security number of the account owner (you) is required to open a 529 College Savings Investment Account."
                required
              />
            </InputGroups>
            <HR />
            <InputGroups>
              <div className="md:col-span-2">
                <FormInput
                  name="address_1"
                  placeholder="Address"
                  defaultValue={user.address1}
                  required
                />
              </div>
              <FormInput
                name="address_2"
                placeholder="Address (second line)"
                defaultValue={user.address2}
              />
              <FormInput name="city" placeholder="City" defaultValue={user.city} required />
              <FormInput
                name="state"
                type="select"
                placeholder="State"
                options={States}
                defaultValue={user.state}
                required
              />
              <FormInput
                name="zip"
                type="zip"
                placeholder="Zip code"
                defaultValue={user.zip}
                required
              />
            </InputGroups>
            <Button className="w-full" disabled={!isValid}>
              Save changes
            </Button>
          </Form>
        </Column>
      </Row>
      <UploadAvatarDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        name={name}
        avatarSrc={avatarUrl}
        submitPhoto={avatarUrl => update({user: {avatarUrl}})}
      />
      <UpdateYour529AccountDialog onClose={() => setModal519Open(false)} isOpen={modal519} />
    </>
  )
}

export default Profile
