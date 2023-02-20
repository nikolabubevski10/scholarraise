import React from 'react'
import {Container, Row, Column, Heading, Paragraph} from 'sr-components'
import {Form, FormInput} from 'components/forms'
import {Button} from 'components/lib'
import Page from 'components/page'
import {forgotPassword} from 'api/user'
import {useAppContext} from 'context/appContext'
import {useNotification} from 'hooks/useNotification'

function ForgotPassword() {
  const {success, failed} = useNotification()
  const {setLoading} = useAppContext()
  const [isValid, setValid] = React.useState(false)

  function submit(email) {
    setLoading(true)

    forgotPassword({user: email})
      .then(() => success("We've sent a reset link to your email"))
      .catch(() => failed('Check if your email is correct'))
      .finally(() => setLoading(false))
  }

  return (
    <Page title="Forgot Password">
      <Container my={[4, null, 5]}>
        <Row>
          <Column width={[1, 2 / 3, 1 / 2]}>
            <Heading as="h2" textStyle="h2" mt={[3, null, 0]}>
              Reset your password
            </Heading>
            <Paragraph color="mediumGray">
              Fill your email address below and we will send you a link to reset your password.
            </Paragraph>
            <Form onSubmit={submit} getIsValid={setValid}>
              <FormInput name="email" type="email" placeholder="Email Address" required />
              <Button className="w-full mt-2 lg:w-auto" disabled={!isValid}>
                Reset password
              </Button>
            </Form>
          </Column>
        </Row>
      </Container>
    </Page>
  )
}

export default ForgotPassword
