import React from 'react'
import {Dialog, Paragraph, Column} from 'sr-components'

import {Form, FormInput} from 'components/forms'
import {Button} from 'components/lib'
import {useUser} from 'context/user'
import {useAppContext} from 'context/appContext'
import {useNotification} from 'hooks/useNotification'
import {decodeError} from 'api/errorDecoder.js'

const ChangeEmailDialog = ({isOpen, onClose}) => {
  const {user, update} = useUser()
  const {setLoading} = useAppContext()
  const {success, failed} = useNotification()
  const [isValid, setIsValid] = React.useState(true)

  function submit(email) {
    const msgSuccess = 'We just sent you a verification link to your email.'

    setLoading(true)

    update({user: email})
      .then(() => success(msgSuccess))
      .then(onClose)
      .catch(e => failed(decodeError(e).text))
      .finally(() => setLoading(false))
  }

  return (
    <Dialog
      heading="Change your current account email"
      hasBackground
      isOpen={isOpen}
      close={onClose}
    >
      <Paragraph pl={3} width={[1, null, 1]}>
        This form only changes the email address you use for Scholar Raise. It's important to note
        that this does not change your password for NYSaves, which is linked to Scholar Raise. It's
        not suggested you do this unless you have to.
      </Paragraph>
      <Column width={[1, null, 1 / 2]}>
        <Form onSubmit={submit} getIsValid={setIsValid}>
          <FormInput type="email" name="email" defaultValue={user.email} equired />
          <Button disabled={!isValid}>Change Email</Button>
        </Form>
      </Column>
    </Dialog>
  )
}

export default ChangeEmailDialog
