import React from 'react'
import {Container, Row, Column, Paragraph, Heading, InternalLink} from 'sr-components'
import Page from 'components/page'
import {Form, FormInput} from 'components/forms'
import {Button} from 'components/lib'
import {useAuth} from 'hooks/useAuth'

const Login = () => {
  const {login} = useAuth()
  const [isValid, setIsValid] = React.useState(false)

  return (
    <Page title="Login">
      <Container my={[4, null, 5]}>
        <Row>
          <Column width={[1, 2 / 3, 1 / 2]}>
            <Heading as="h2" textStyle="h2" mt={[3, null, 0]}>
              Welcome back!
            </Heading>
            <Paragraph color="mediumGray">
              Your children will thank you for this some day...
            </Paragraph>
            <Form onSubmit={values => login({user: values})} getIsValid={setIsValid}>
              <FormInput type="email" name="email" placeholder="Email address" required />
              <FormInput type="password" name="password" placeholder="Password" required />
              <Button className="w-full md:w-auto" disabled={!isValid}>
                Log in
              </Button>
            </Form>
            <div className="mt-8 space-y-4">
              <div>
                <InternalLink to="/forgot-password">Forgot your password?</InternalLink>
              </div>
              <div>
                <InternalLink to="/signup">Don't have an account?</InternalLink>
              </div>
            </div>
          </Column>
        </Row>
      </Container>
    </Page>
  )
}

export default Login
