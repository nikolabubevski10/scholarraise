import React from 'react'
import axios from 'axios'
import {Column} from 'sr-components'
import {Button} from 'components/lib'
import {H2, CappedText, HR} from 'components/typography'
import {FormContainer, Form, FormInput} from 'components/forms'
import {ReactComponent as IconPlus} from 'assets/icons/plus-solid.svg'
import {ReactComponent as IconLink} from 'assets/icons/link-solid.svg'
import {ReactComponent as IconGarbage} from 'assets/icons/trash-alt-solid.svg'
import {link} from 'helpers/social-share'
import {createInvitation} from 'api/invitations'
import {useNotification} from 'hooks/useNotification'

function FourthPage({options = {}}) {
  const {account = {}, nextPage} = options
  const [isValid, setIsValid] = React.useState(false)
  const [counter, setCounter] = React.useState(0)
  const [invites, setInvites] = React.useState([counter])
  const {success, failed} = useNotification()

  const firstName = account.beneficiaryFirstName
  const lastName = account.beneficiaryLastName
  const scholarURL = `/scholar/${account.hashid}/${firstName}-${lastName?.[0]}`.toLowerCase()

  React.useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  function addInvite() {
    setInvites(prevInvites => [...prevInvites, counter + 1])
    setCounter(counter + 1)
  }

  function removeInvite(pos) {
    if (invites.length === 1) {
      return
    }

    setInvites(prevInvites => {
      const arr = [...prevInvites]
      arr.splice(pos, 1)
      return arr
    })
  }

  function injectInviteSubmission(d) {
    // submit invitations
    const invitations = invites.map(id => ({
      firstName: d[`firstName_${id}`],
      email: d[`emailAddress_${id}`],
    }))

    axios
      .all(invitations.map(invitation => createInvitation({invitation}, account.hashid)))
      .then(() => success(`Invited ${invitations.length} people`))
      .then(nextPage)
      .catch(() => failed('Oops! Something went wrong. Try sending the invitations again!'))
  }

  return (
    <FormContainer className="rounded">
      <Column width={1}>
        <div className="formBox">
          <Form onSubmit={injectInviteSubmission} getIsValid={setIsValid}>
            <CappedText className="mb-4 text-darkGray">Invite friends & family</CappedText>
            <H2 className="mb-8 text-xl text-mediumGray">
              Let people know they can contribute to {firstName}'
              {firstName?.slice(-1) !== 's' ? 's' : ''} future
            </H2>
            <div className="flex flex-col items-start mb-8 md:flex-row">
              <Button variant="secondary" onClick={() => link(scholarURL)} type="button">
                <span className="flex flex-row items-center">
                  <IconLink className="w-6 h-6 mr-2" />
                  <span className="hidden text-sm md:block">Copy link to profile</span>
                  <span className="text-sm md:hidden">Copy link</span>
                </span>
              </Button>
            </div>
            {invites.map((number, index) => (
              <React.Fragment key={`inv-${number}`}>
                {invites.length > 1 && (
                  <div className="mt-2 mb-3 md:hidden ">
                    <span
                      className="text-red-500 cursor-pointer hover:text-red-900"
                      onClick={() => removeInvite(index)}
                    >
                      Remove from list
                    </span>
                  </div>
                )}
                <div className="grid grid-cols-1 row-gap-1 col-gap-4 mb-4 md:mb-1 md:grid-cols-6">
                  <div className="md:col-span-2">
                    <FormInput
                      name={`firstName_${number}`}
                      placeholder="First name"
                      required
                      validation={{
                        minLength: {value: 2, message: 'Please insert the full first name'},
                      }}
                    />
                  </div>
                  <div className="md:col-span-3">
                    <FormInput
                      name={`emailAddress_${number}`}
                      required
                      placeholder="Email address"
                      type="email"
                    />
                  </div>
                  {invites.length > 1 && (
                    <div className="md:col-span-1">
                      <div className="flex items-center md:h-12 md:my-1">
                        <IconGarbage
                          className="hidden w-4 h-4 cursor-pointer text-lightGray hover:text-mediumGray md:block"
                          onClick={() => removeInvite(index)}
                        />
                      </div>
                    </div>
                  )}
                </div>
                {index + 1 !== invites.length && <HR className="md:hidden" />}
              </React.Fragment>
            ))}
            <div className="flex w-full mb-8 cursor-pointer">
              <div className="flex flex-row items-center" onClick={addInvite}>
                <IconPlus className="w-6 h-6 p-1 rounded-full text-trueWhite bg-mediumGray" />
                <span className="ml-4 font-bold text-mediumGray">Invite more people...</span>
              </div>
            </div>
            <div className="flex flex-col w-full md:flex-row md:items-center">
              <Button
                className="hidden w-full mt-2 md:mt-0 md:block md:w-auto"
                disabled={!isValid}
                type="submit"
              >
                Send invites
              </Button>
              <span className="w-full my-4 italic md:pl-4 md:w-7/12 md:pr-4 md:my-0 lg:w-7/12 xl:w-6/12 text-mediumGray">
                An email will arrive from{' '}
                <a className="text-primary-500" href="mailto:info@scholarraise.com">
                  info@scholarraise.com
                </a>
                . But don't worry, we'll never spam your friends or add them to a marketing list.
                <span role="img" aria-label="happy emoji" className="ml-2 not-italic">
                  😊
                </span>
              </span>
              <Button className="w-full mt-2 md:hidden md:w-auto" disabled={!isValid} type="submit">
                Send invites
              </Button>
              <div className="flex md:flex-grow md:justify-end">
                <Button
                  className="w-full mt-2 md:mt-0 md:block md:w-auto"
                  variant="secondary"
                  type="button"
                  onClick={nextPage}
                >
                  Skip this step
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </Column>
    </FormContainer>
  )
}

export {FourthPage}
