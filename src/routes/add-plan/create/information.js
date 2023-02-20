import React from 'react'
import {Column} from 'sr-components'
import {Form, FormInput, FormContainer, InputGroups} from 'components/forms'
import {H2, CappedText, HR} from 'components/typography'
import {Button} from 'components/lib'
import {ReactComponent as ChevronRight} from 'assets/icons/chevron-right-solid.svg'
import FormJson from 'routes/add-plan/form'
import {clearToNumber, removeInternationalCode} from 'helpers/form-validators'
import {useUser} from 'context/user'
import {useFormContext} from 'react-hook-form'

/*
 * Successor component that controls the required prop. If any of the successor
 * fields is filled, then all the others fields, except `successorMiddleName`,
 * are required.
 */
function Successor({defaultValues = {}}) {
  const successorKeys = React.useMemo(() => FormJson.step1.successor.map(entry => entry.name), [])
  const [isSuccessorRequired, setSuccessorRequired] = React.useState(false)
  const {formState, trigger} = useFormContext()
  const currentValues = formState.dirtyFields

  const anySuccessorFilled = successorKeys
    .map(successorKey => currentValues[successorKey])
    .find(value => value)

  if (anySuccessorFilled !== isSuccessorRequired) {
    setSuccessorRequired(anySuccessorFilled)
  }

  React.useEffect(() => {
    if (!isSuccessorRequired) {
      trigger(successorKeys)
    }
  }, [isSuccessorRequired, trigger, successorKeys])

  return FormJson.step1.successor.map(entry => (
    <FormInput
      {...entry}
      defaultValue={defaultValues[entry.name]}
      required={entry.name !== 'successorMiddleName' && isSuccessorRequired}
    />
  ))
}

export function FirstPage({options}) {
  const {values, onSubmit, checkCompletion, uncheckCompletion} = options
  const [isValid, setIsValid] = React.useState(false)
  const {user} = useUser()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => (isValid ? checkCompletion(1) : uncheckCompletion(1)), [isValid])

  function handleSubmit(d) {
    const cleanValues = {...d}

    if (!d.ssnOrTin) {
      cleanValues.ssnOrTin = user.ssnOrTin
    }

    if (!cleanValues.ssnOrTin.includes('X')) {
      cleanValues.ssnOrTin = clearToNumber(cleanValues.ssnOrTin)
    }

    cleanValues.phone = clearToNumber(cleanValues.phone)
    cleanValues.phone = removeInternationalCode(cleanValues.phone)
    cleanValues.zip = clearToNumber(cleanValues.zip)

    if (cleanValues.successorPhone) {
      cleanValues.successorPhone = clearToNumber(cleanValues.successorPhone)
      cleanValues.successorPhone = removeInternationalCode(cleanValues.successorPhone)
    }

    onSubmit(cleanValues)
  }

  return (
    <Column width={1}>
      <Form onSubmit={handleSubmit} getIsValid={setIsValid}>
        <div className="flex flex-col w-full md:flex-row">
          <FormContainer className="rounded-l">
            <CappedText className="mb-4 text-darkGray">Step One</CappedText>
            <H2 className="mb-8 text-mediumGray">
              Who is the adult that is creating and managing this plan?
            </H2>
            <InputGroups>
              {FormJson.step1.personal.map(entry => {
                if (entry.name === 'ssnOrTin') {
                  return (
                    <FormInput
                      {...entry}
                      key={entry.name}
                      defaultValue={user.ssnOrTin ?? values.ssnOrTin}
                      showSSN={user.ssnOrTin}
                    />
                  )
                }
                return <FormInput {...entry} key={entry.name} defaultValue={values[entry.name]} />
              })}
            </InputGroups>
            <HR />
            <InputGroups>
              {FormJson.step1.addressTop.map((entry, index) =>
                index === 0 ? (
                  <div className="md:col-span-2" key={`div-${entry.name}`}>
                    <FormInput {...entry} key={entry.name} defaultValue={values[entry.name]} />
                  </div>
                ) : (
                  <FormInput {...entry} key={entry.name} />
                ),
              )}
            </InputGroups>
            <div className="grid grid-cols-1 row-gap-1 col-gap-4 mb-6 md:grid-cols-12">
              {FormJson.step1.addressBottom.map((entry, index) => (
                <div className={`md:col-span-${5 - index}`} key={`div-${entry.name}`}>
                  <FormInput {...entry} key={entry.name} defaultValue={values[entry.name]} />
                </div>
              ))}
            </div>
            <CappedText className="inline text-darkGray">Define a Successor </CappedText>
            <CappedText className="inline text-base text-mediumGray">(Optional)</CappedText>
            <H2 className="mt-4 mb-8 text-mediumGray">
              Who is another parent, guardian, or responsible adult who may assist in managing the
              account?
            </H2>
            <InputGroups>
              <Successor defaultValues={values} />
            </InputGroups>
            <Button
              className="w-full my-4 md:hidden text-trueWhite"
              disabled={!isValid}
              type="submit"
            >
              Next
            </Button>
          </FormContainer>
          <Button
            className="hidden rounded-none rounded-r md:block"
            disabled={!isValid}
            type="submit"
          >
            <ChevronRight className="w-4 h-4 text-trueWhite" />
          </Button>
        </div>
      </Form>
    </Column>
  )
}
