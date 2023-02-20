import React from 'react'
import {Redirect} from 'react-router-dom'
import {Container, Row, Column, Heading, Paragraph, InternalLink} from 'sr-components'
import Page from 'components/page'
import {Form, FormInput} from 'components/forms'
import {Button} from 'components/lib'
import {useAuth} from 'hooks/useAuth'
import {useUser} from 'context/user'
import {isSamePassword} from 'helpers/form-validators'

const Signup = props => {
  const {signup} = useAuth()
  const {token} = useUser()
  const [isValid, setIsValid] = React.useState(false)
  const [password, setPassword] = React.useState('')
  const [terms, checkTerms] = React.useState(false)

  const hasSearch = props.location.search

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (token) {
    return <Redirect to="/dashboard" />
  }

  return (
    <Page title="Signup">
      <Container my={[4, null, 5]}>
        <Row>
          <Column width={[1, 2 / 3, 1 / 2]}>
            <Heading as="h2" textStyle="h2" mt={[3, null, 0]}>
              Let's get the ball rolling!
            </Heading>
            <Paragraph color="mediumGray">
              There's no time like the present. Start saving for your scholar with big dreams!
            </Paragraph>
            <Form
              onSubmit={values => signup({user: values})}
              getIsValid={setIsValid}
              getWatch={({password}) => setPassword(password)}
            >
              <div className="grid grid-cols-1 row-gap-1 col-gap-4 md:grid-cols-2">
                <FormInput name="firstName" placeholder="Your first Name" required />
                <FormInput name="lastName" placeholder="Your last Name" required />
              </div>
              <FormInput name="email" type="email" placeholder="Email address" required />
              <div className="grid grid-cols-1 row-gap-1 col-gap-4 md:grid-cols-2">
                <FormInput
                  name="password"
                  type="password"
                  placeholder="Password"
                  validation={{minLength: {value: 8, message: 'Minimum length is 8'}}}
                  required
                />
                <FormInput
                  name="password_confirmation"
                  type="password"
                  placeholder="Password (again)"
                  validation={{validate: {same: confirm => isSamePassword(password, confirm)}}}
                  required
                />
              </div>
              <div
                className="relative flex items-center w-full pr-8 mt-2"
                onClick={() => checkTerms(!terms)}
              >
                <input
                  type="checkbox"
                  className="w-4 h-5 cursor-pointer justify-self-center"
                  checked={terms}
                  defaultChecked={false}
                  required
                />
                <span className="ml-2">
                  I agree with the{' '}
                  <InternalLink to="/terms" target="_blank">
                    terms of service
                  </InternalLink>
                  , of course...
                </span>
                <span
                  className="absolute text-3xl font-extrabold leading-5 text-error-500"
                  style={{right: 16}}
                >
                  *
                </span>
              </div>
              <Button className="w-full mt-8 md:w-auto" disabled={!isValid || !terms}>
                Sign up
              </Button>
            </Form>
            <div className="mt-8 space-y-4">
              <div>
                <InternalLink to="/forgot-password">Forgot your password?</InternalLink>
              </div>
              <div>
                <InternalLink to={!!hasSearch ? `/login${hasSearch}` : '/login'}>
                  Already have an account?
                </InternalLink>
              </div>
            </div>
          </Column>
        </Row>
      </Container>
    </Page>
  )
}

export default Signup
