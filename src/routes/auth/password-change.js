import React from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {Container, Row, Column, Heading, Paragraph} from 'sr-components'
import {Form, FormInput} from 'components/forms'
import {Button} from 'components/lib'
import queryString from 'query-string'
import Page from 'components/page'
import {resetPassword} from 'api/user'
import {isSamePassword} from 'helpers/form-validators'
import {useAppContext} from 'context/appContext'
import {useNotification} from 'hooks/useNotification'

export default function PasswordChange(props) {
  const location = useLocation()
  const history = useHistory()
  const {failed} = useNotification()
  const {setLoading} = useAppContext()
  const [isValid, setIsValid] = React.useState(false)
  const [password, setPassword] = React.useState('')

  function submit(passwords) {
    const {token} = queryString.parse(location.search)
    const msgFailed = 'Your token expired. Please redo the reset password process.'

    setLoading(true)

    resetPassword({user: {...passwords, reset_password_token: token}})
      .then(() => history.push('/login'))
      .catch(() => failed(msgFailed))
      .finally(() => setLoading(false))
  }

  return (
    <Page title="Change Password">
      <Container my={[4, null, 5]}>
        <Row>
          <Column width={[1, 2 / 3, 1 / 2]}>
            <Heading as="h2" textStyle="h2" mt={[3, null, 0]}>
              Change your password
            </Heading>
            <Paragraph color="mediumGray">Type in your new password twice below.</Paragraph>
            <Form
              onSubmit={submit}
              getIsValid={setIsValid}
              getWatch={({password}) => setPassword(password)}
            >
              <FormInput name="password" type="password" placeholder="Password" required />
              <FormInput
                name="password_confirmation"
                type="password"
                placeholder="Password (again)"
                validation={{validate: {same: confirm => isSamePassword(password, confirm)}}}
                required
              />
              <Button className="w-full" disabled={!isValid}>
                Set password
              </Button>
            </Form>
          </Column>
        </Row>
      </Container>
    </Page>
  )
}
