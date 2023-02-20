import React, {useState} from 'react'
import {Row, Column, CappedText} from 'sr-components'
import {Form, FormInput} from 'components/forms'
import {Button} from 'components/lib'
import ChangeEmailDialog from 'routes/dialogs/change-email-dialog'
import AddPasswordDialog from 'routes/dialogs/add-password'
import {decodeError} from 'api/errorDecoder'
import {useUser} from 'context/user'
import {useAppContext} from 'context/appContext'
import {useNotification} from 'hooks/useNotification'
import {isSamePassword} from 'helpers/form-validators'

const Security = () => {
  const {update, logout} = useUser()
  const {success, failed} = useNotification()
  const {setLoading} = useAppContext()
  const [openAddPasswordDialog, setOpenAddPasswordDialog] = useState(false)
  const [openEmailDialog, setOpenEmailDialog] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [isValid, setIsValid] = useState(false)

  const submitForm = values => {
    setLoading(true)

    update({user: {...values}})
      .then(() => success('Password changed! Please enter your credentials again.'))
      .then(logout)
      .catch(e => failed(decodeError(e).text))
      .finally(() => setLoading(false))
  }

  return (
    <>
      <Row>
        <Column width={[1, 3 / 5, 2 / 5]}>
          <CappedText>Change password</CappedText>
          <Form
            onSubmit={submitForm}
            getWatch={({password}) => setNewPassword(password)}
            getIsValid={setIsValid}
          >
            <div className="grid gap-4">
              <FormInput name="old_password" type="password" placeholder="Old password" required />
              <FormInput
                name="password"
                type="password"
                placeholder="New password"
                validation={{minLength: {value: 2, message: 'Minimum length is 8'}}}
                required
              />
              <FormInput
                name="password_confirmation"
                type="password"
                placeholder="New password (again)"
                validation={{validate: {same: confirm => isSamePassword(newPassword, confirm)}}}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full sm:w-auto sm:mr-4"
              variant="primary"
              disabled={!isValid}
            >
              Save Changes
            </Button>
            <Button
              type="button"
              className="w-full mt-4 sm:mt-0 sm:w-auto"
              variant="secondary"
              onClick={() => setOpenEmailDialog(true)}
            >
              Change Email
            </Button>
          </Form>
        </Column>
      </Row>
      <ChangeEmailDialog isOpen={openEmailDialog} onClose={() => setOpenEmailDialog(false)} />
      <AddPasswordDialog
        isOpen={openAddPasswordDialog}
        onClose={() => setOpenAddPasswordDialog(false)}
      />
    </>
  )
}

export default Security
