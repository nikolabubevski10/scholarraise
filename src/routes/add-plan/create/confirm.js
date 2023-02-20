import React from 'react'
import cn from 'classnames'
import {Column, InteractiveLink, Dialog} from 'sr-components'
import {Form, FormInput, FormContainer} from 'components/forms'
import {H2, H4, CappedText, HR} from 'components/typography'
import {Button} from 'components/lib'
import FormJson from 'routes/add-plan/form'
import {useDisclosure} from 'react-use-disclosure'
import {formatFullDate, formatFullPhone, formatSSN, formatZip} from 'helpers/common'
import {
  PERSON_MY_CHILD,
  PERSON_MY_RELATIVE,
  PERSON_MYSELF,
  PERSON_EXPECTING,
} from './person-types.js'
import {OnboardingTerms} from 'content/onboarding-terms'
import {ReactComponent as IconPencil} from 'assets/icons/pencil-alt-solid.svg'

export function ThirdPage({options}) {
  const {open, isOpen, close} = useDisclosure()
  const {
    onSubmit,
    setStep,
    state,
    values,
    updateConfirmValues,
    checkCompletion,
    uncheckCompletion,
  } = options
  const [isValid, setIsValid] = React.useState(false)
  const [agreed, setAgreed] = React.useState(false)
  const [confirmValues, setConfirmValues] = React.useState()

  const sections = {
    owner: [
      {name: 'Date of birth', values: [formatFullDate(state.step1.birthDate)]},
      {name: 'Phone', values: [formatFullPhone(state.step1.phone)]},
      {name: 'SSN', values: [formatSSN(state.step1.ssnOrTin)]},
      {
        name: 'Address',
        values: [
          state.step1.address1,
          state.step1.address2,
          `${state.step1.city}, ${state.step1.state} ${formatZip(state.step1.zip)}`,
        ],
      },
    ],
    successor: [
      {name: 'Date of birth', values: [formatFullDate(state.step1.successorBirthDate)]},
      {name: 'Email address', values: [state.step1.successorEmailAddress]},
      {name: 'Phone', values: [formatFullPhone(state.step1.successorPhone)]},
    ],
    beneficiary: {
      [PERSON_MY_CHILD]: [
        {name: 'Date of birth', values: [formatFullDate(state.step2.beneficiaryBirthDate)]},
        {name: 'State of residency', values: [state.step2.beneficiaryState]},
        {name: 'SSN', values: [formatSSN(state.step2.beneficiarySsnOrTin)]},
      ],
      [PERSON_MY_RELATIVE]: [
        {name: 'Date of birth', values: [formatFullDate(state.step2.beneficiaryBirthDate)]},
        {name: 'State of residency', values: [state.step2.beneficiaryState]},
        {name: 'SSN', values: [formatSSN(state.step2.beneficiarySsnOrTin)]},
        {name: 'Relationship to Scholar', values: [state.step2.relationshipToBeneficiary]},
        {name: 'College entry year', values: [state.step2.beneficiaryCollegeEntryYear]},
      ],
      [PERSON_MYSELF]: [
        {name: 'College entry year', values: [state.step2.beneficiaryCollegeEntryYear]},
      ],
      [PERSON_EXPECTING]: [
        {name: 'Estimated due date', values: [state.step2.beneficiaryEstimatedDueDate]},
      ],
    },
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    if (agreed && isValid) {
      checkCompletion(3)
    } else {
      uncheckCompletion(3)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid, agreed])

  // Gets form values and update it just for this page (outside onSubmit)
  function getWatch(v) {
    if (JSON.stringify(v) !== JSON.stringify(confirmValues)) {
      setConfirmValues(v)
    }
  }

  React.useEffect(() => {
    updateConfirmValues(confirmValues)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmValues])

  return (
    <FormContainer className="rounded">
      <Column width={1}>
        <div className="formBox">
          <Form onSubmit={onSubmit} getIsValid={setIsValid} getWatch={getWatch}>
            <CappedText className="mb-4 text-darkGray">Step Three</CappedText>
            <H2 className="mb-8 text-mediumGray">Security questions. Safety first, kids!</H2>
            <div className="grid grid-cols-1 row-gap-1 col-gap-4 mb-4 md:grid-cols-3">
              {FormJson.step3.map((entry, index) => {
                if (index % 2 === 0) {
                  return (
                    <div className="md:col-span-2" key={`sec-${entry.name}`}>
                      <FormInput {...entry} key={entry.name} defaultValue={values[entry.name]} />
                    </div>
                  )
                }
                return <FormInput {...entry} key={entry.name} defaultValue={values[entry.name]} />
              })}
            </div>
            <HR />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div>
                <div className="flex flex-row items-center">
                  <CappedText className="text-mediumGray">Account Owner</CappedText>
                  <IconPencil
                    className="w-5 h-5 ml-4 cursor-pointer text-mediumGray"
                    onClick={() => setStep(1)}
                  />
                </div>
                <H4 className="my-4">{`${state.step1.firstName} ${state.step1.lastName}`}</H4>
                {sections.owner.map(section => (
                  <div className="flex flex-col mb-2">
                    <span className="font-bold">{section.name}</span>
                    {section.values.map(value => (
                      <span className={cn(section.name === 'SSN' && 'fs-exclude')}>{value}</span>
                    ))}
                  </div>
                ))}
              </div>
              {state.step1.successorFirstName && (
                <div>
                  <div className="flex flex-row items-center">
                    <CappedText className="text-mediumGray">Sucessor</CappedText>
                    <IconPencil
                      className="w-5 h-5 ml-4 cursor-pointer text-mediumGray"
                      onClick={() => setStep(1)}
                    />
                  </div>
                  <H4 className="my-4">{`${state.step1.successorFirstName} ${state.step1.successorLastName}`}</H4>
                  {sections.successor.map(section => (
                    <div className="flex flex-col mb-2">
                      <span className="font-bold">{section.name}</span>
                      {section.values.map(value => (
                        <span className={cn(section.name === 'SSN' && 'fs-exclude')}>{value}</span>
                      ))}
                    </div>
                  ))}
                </div>
              )}
              <div>
                <div className="flex flex-row items-center">
                  <CappedText className="text-mediumGray">Beneficiary</CappedText>
                  <IconPencil
                    className="w-5 h-5 ml-4 cursor-pointer text-mediumGray"
                    onClick={() => setStep(2)}
                  />
                </div>
                <H4 className="my-4">
                  {`${state.step2.beneficiaryFirstName} ${state.step2.beneficiaryLastName}`}
                </H4>
                {sections.beneficiary[state.step2.personType].map(section => (
                  <div className="flex flex-col mb-2">
                    <span className="font-bold">{section.name}</span>
                    {section.values.map(value => (
                      <span className={cn(section.name === 'SSN' && 'fs-exclude')}>{value}</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div
              className="flex items-center mt-8 mb-4 cursor-pointer"
              onClick={() => setAgreed(!agreed)}
            >
              <input
                type="checkbox"
                className="mr-2 leading-tight form-checkbox"
                checked={agreed}
                defaultChecked={false}
              />
              <span className="text-sm font-bold">
                I've checked my work - we're good to go! I accept the{' '}
                <InteractiveLink
                  onClick={e => {
                    e.stopPropagation()
                    open()
                  }}
                >
                  terms and conditions
                </InteractiveLink>
                .
              </span>
            </div>
            <Button className="w-full mt-2 md:w-auto" disabled={!agreed || !isValid} type="submit">
              Create Plan
            </Button>
          </Form>
        </div>
      </Column>
      <Dialog
        heading="Onboarding disclosure"
        hasBackground
        isOpen={isOpen}
        close={close}
        buttons={{
          right: [
            <Button
              variant="primary"
              className="w-full md:auto"
              onClick={() => {
                setAgreed(true)
                close()
              }}
            >
              I accept
            </Button>,
          ],
        }}
      >
        {OnboardingTerms}
      </Dialog>
    </FormContainer>
  )
}
