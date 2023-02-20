import React from 'react'
import cn from 'classnames'
import {Column} from 'sr-components'
import {Form, FormInput, FormContainer, InputGroups} from 'components/forms'
import {H2, CappedText, HR} from 'components/typography'
import {Button} from 'components/lib'
import {ReactComponent as ChevronRight} from 'assets/icons/chevron-right-solid.svg'
import FormJson from 'routes/add-plan/form'
import {PERSON_MY_CHILD, PERSON_MY_RELATIVE, PERSON_MYSELF, PERSON_EXPECTING} from './person-types'

export function SecondPage({options}) {
  const {onSubmit, values = {}, checkCompletion, uncheckCompletion, state} = options
  const [isValid, setIsValid] = React.useState(false)
  const [person, setPerson] = React.useState(values.personType)

  const buttons = [
    {key: PERSON_MY_CHILD, text: 'My child'},
    {key: PERSON_EXPECTING, text: 'Expecting'},
    {key: PERSON_MYSELF, text: 'Myself'},
    {key: PERSON_MY_RELATIVE, text: 'My relative'},
  ]

  function injectOnSubmit(d) {
    let values = {...d[person]}

    if (person === PERSON_MYSELF || person === PERSON_EXPECTING) {
      values = {
        ...d[person],
        // copying data
        beneficiaryFirstName: state.step1.firstName,
        beneficiaryMiddleName: state.step1.middleName,
        beneficiaryLastName: state.step1.lastName,
        beneficiaryBirthDate: state.step1.birthDate,
        beneficiaryState: state.step1.state,
      }

      if (!state.step1.ssnOrTin?.includes('X')) {
        values.beneficiarySsnOrTin = state.step1.ssnOrTin
      } else {
        values.copySsnOrTinFromUser = true
      }
    }

    if (person === PERSON_MYSELF) {
      values.relationshipToBeneficiary = 'myself'
    }

    if (person === PERSON_EXPECTING) {
      values.relationshipToBeneficiary = 'expecting'
    }

    if (person === PERSON_MY_CHILD) {
      values.relationshipToBeneficiary = 'child'
    }

    onSubmit({...values, personType: person, [person]: {...values}})
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => (person && isValid ? checkCompletion(2) : uncheckCompletion(2)), [isValid])

  return (
    <Column width={1}>
      <Form onSubmit={injectOnSubmit} getIsValid={setIsValid}>
        <div className="flex flex-row">
          <FormContainer className="rounded-l">
            <CappedText className="mb-4 text-darkGray">Step Two</CappedText>
            <H2 className="mb-8 text-mediumGray">Who is the person going to college?</H2>
            <div
              className={cn(
                'flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4',
                person && 'mb-8',
              )}
            >
              {buttons.map((button, index) => (
                <Button
                  key={`button-index-${index}`}
                  type="button"
                  variant={person === button.key ? 'primary' : 'secondary'}
                  onClick={() => setPerson(button.key)}
                >
                  {button.text}
                </Button>
              ))}
            </div>
            {person === PERSON_MY_CHILD && (
              <InputGroups>
                {FormJson.step2[PERSON_MY_CHILD].map(entry => {
                  if (entry.name === `${PERSON_MY_CHILD}.beneficiaryCollegeEntryYear`) {
                    return (
                      <React.Fragment key="myChild.college">
                        <HR className="cols-span-1 md:col-span-3" />
                        <FormInput
                          {...entry}
                          key={entry.name}
                          defaultValue={
                            values?.[PERSON_MY_CHILD]?.[
                              entry.name.replace(`${PERSON_MY_CHILD}.`, '')
                            ]
                          }
                        />
                      </React.Fragment>
                    )
                  }

                  return (
                    <FormInput
                      {...entry}
                      key={entry.name}
                      defaultValue={
                        values?.[PERSON_MY_CHILD]?.[entry.name.replace(`${PERSON_MY_CHILD}.`, '')]
                      }
                    />
                  )
                })}
              </InputGroups>
            )}
            {person === PERSON_MY_RELATIVE && (
              <InputGroups>
                {FormJson.step2[PERSON_MY_RELATIVE].map(entry => {
                  if (entry.name === `${PERSON_MY_RELATIVE}.relationshipToBeneficiary`) {
                    return (
                      <React.Fragment>
                        <HR className="md:col-span-3" />
                        <div className="md:col-span-2">
                          <FormInput
                            {...entry}
                            key={entry.name}
                            defaultValue={
                              values?.[PERSON_MY_RELATIVE]?.[
                                entry.name.replace(`${PERSON_MY_RELATIVE}.`, '')
                              ]
                            }
                          />
                        </div>
                      </React.Fragment>
                    )
                  }
                  return (
                    <FormInput
                      {...entry}
                      key={entry.name}
                      defaultValue={
                        values?.[PERSON_MY_RELATIVE]?.[
                          entry.name.replace(`${PERSON_MY_RELATIVE}.`, '')
                        ]
                      }
                    />
                  )
                })}
              </InputGroups>
            )}
            {person === PERSON_MYSELF && (
              <>
                <div className="space-y-2">
                  <div className="w-full font-extrabold leading-relaxed">
                    Look at you go-getter! Just tell us when you hope to enter college
                  </div>
                  <div className="w-full font-extrabold leading-relaxed text-mediumGray">
                    No worries if your plans change later...
                  </div>
                </div>
                <div className="mt-4">
                  <InputGroups>
                    {FormJson.step2[PERSON_MYSELF].map(entry => (
                      <FormInput
                        {...entry}
                        key={entry.name}
                        defaultValue={
                          values?.[PERSON_MYSELF]?.[entry.name.replace(`${PERSON_MYSELF}.`, '')]
                        }
                      />
                    ))}
                  </InputGroups>
                </div>
              </>
            )}
            {person === PERSON_EXPECTING && (
              <>
                <div className="space-y-4">
                  <div className="w-full font-extrabold leading-relaxed">
                    Hey, congratulations! We're glad you're getting started on saving early.
                  </div>
                  <div className="w-full font-extrabold leading-relaxed text-mediumGray">
                    For now, we have to create the account in your name. Tell us roughly when you're
                    due and we'll reach out to you after that to switch the account to your child.
                  </div>
                </div>
                <div className="mt-4">
                  <InputGroups>
                    {FormJson.step2[PERSON_EXPECTING].map(entry => (
                      <FormInput
                        {...entry}
                        key={entry.name}
                        defaultValue={
                          values?.[PERSON_EXPECTING]?.[
                            entry.name.replace(`${PERSON_EXPECTING}.`, '')
                          ]
                        }
                      />
                    ))}
                  </InputGroups>
                </div>
              </>
            )}
            {person && (
              <Button
                className="w-full my-4 md:hidden text-trueWhite"
                type="submit"
                disabled={!person || !isValid}
              >
                Next
              </Button>
            )}
          </FormContainer>
          <Button
            className="hidden rounded-none rounded-r md:block"
            type="submit"
            disabled={!person || !isValid}
          >
            <ChevronRight className="w-4 h-4 text-trueWhite" />
          </Button>
        </div>
      </Form>
    </Column>
  )
}
