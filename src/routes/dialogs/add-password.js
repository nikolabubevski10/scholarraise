import React from 'react'
import {Dialog, Paragraph, Box} from 'sr-components'
import {Form, FormInput} from 'components/forms'
import {Button} from 'components/lib'
import {decodeError} from 'api/errorDecoder'
import {useUser} from 'context/user'
import {useAppContext} from 'context/appContext'
import {useNotification} from 'hooks/useNotification'
import {isSamePassword} from 'helpers/form-validators'

const ChangeEmailDialog = ({isOpen, onClose}) => {
  const {update} = useUser()
  const {setLoading} = useAppContext()
  const {failed} = useNotification()

  const [isValid, setIsValid] = React.useState(false)
  const [password, setPassword] = React.useState('')

  function submit(data) {
    setLoading(true)
    update({user: data})
      .then(onClose)
      .catch(e => failed(decodeError(e).text))
      .finally(() => setLoading(false))
  }

  return (
    <Dialog heading="Add a password to your account" hasBackground isOpen={isOpen} close={onClose}>
      <Paragraph>
        In case you want to disconnect your Facebook account, you must set a password in order to
        have access to your account.
      </Paragraph>
      <Box width={[1, null, 1 / 2]}>
        <Form
          onSubmit={submit}
          getIsValid={setIsValid}
          getWatch={({password}) => setPassword(password)}
        >
          <FormInput
            className="w-full md:w-1/2"
            name="password"
            type="password"
            placeholder="Password"
            validation={{minLength: {value: 2, message: 'Minimum length is 8'}}}
            required
          />
          <FormInput
            className="w-full md:w-1/2"
            name="password_confirmation"
            placeholder="Password (again)"
            validation={{validate: {same: confirm => isSamePassword(password, confirm)}}}
            required
          />
          <Button disabled={!isValid} className="w-full sm:w-auto">
            Set account password
          </Button>
        </Form>
      </Box>
    </Dialog>
  )
}

export default ChangeEmailDialog
