import React, {useState} from 'react'
import {Formik, Form as FormikForm} from 'formik'
import constructInitialValues from './_initial'
import constructValidation from './_validation'
import createInput from './_input'
import Steps from './steps'
import WizardCard from './_wizard'

import {Row, Column} from '../grid'
import Box from '../box'
import Button from '../button'
import Flex from '../flex'

import {useAppContext} from 'context/appContext'

let steps

const constructSteps = (forms, values, validation) => {
  const tempSteps = []

  forms.forEach(({title, description, page}, index) => {
    let complete = true
    let fieldsToValidate = page.map(({name}) => name)

    try {
      fieldsToValidate.forEach(field => {
        validation.fields[field].validateSync(values[field])
      })
    } catch {
      complete = false
    }

    tempSteps.push({title, description, complete})
  })

  steps = tempSteps
}

export default ({
  submit,
  button,
  forms,
  showSteps,
  buttonCentered,
  returnData,
  extraButtons = null,
  ...props
}) => {
  const initial = constructInitialValues(forms)
  const validation = constructValidation(forms)
  const isSingle = forms.length === 1
  const initiallyValidPages = forms.map((form, index) => {
    const validator = constructValidation([form])
    return !validator ? true : validator.isValidSync(initial)
  })
  const firstIncompletePage = initiallyValidPages.findIndex(page => page === false)
  const [currentPage, setCurrentPage] = useState(
    firstIncompletePage !== -1 ? firstIncompletePage : forms.length - 1,
  )

  const handleSubmit = (values, {setSubmitting}) => {
    submit(values)
    setSubmitting(false)
  }

  const {isLoading} = useAppContext()

  return (
    <Box {...props}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initial}
        validationSchema={validation}
        isInitialValid={validation.isValidSync(initial)}
      >
        {({isSubmitting, isValid, ...formikProps}) => {
          returnData &&
            returnData(
              validation.isValidSync(formikProps.values),
              formikProps.values,
              validation.describe(),
            )
          return (
            <FormikForm>
              <fieldset disabled={isSubmitting || isLoading}>
                {constructSteps(forms, formikProps.values, validation)}
                {!isSingle && showSteps && (
                  <Steps
                    mb={4}
                    steps={steps}
                    currentPage={currentPage}
                    onChange={page => setCurrentPage(page)}
                  />
                )}
                {forms.map(({page}, index) => {
                  let FormPage = (
                    <Row key={index} mt={isSingle ? 3 : 2}>
                      {page.map(input => createInput(input, formikProps))}
                    </Row>
                  )

                  if (!isSingle) {
                    return (
                      <WizardCard
                        key={`wizard-page-${index}`}
                        index={index}
                        forms={steps.map(({complete}) => complete)}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        submitDisabled={isSubmitting || !isValid}
                        submitButton={button}
                      >
                        {FormPage}
                      </WizardCard>
                    )
                  }

                  return FormPage
                })}
                {isSingle && button && (
                  <Row justifyContent={buttonCentered ? 'center' : 'flex-start'}>
                    <Column width={buttonCentered ? 'auto' : 1}>
                      <Flex flexDirection={['column', null, 'row']}>
                        <Button
                          mt={3}
                          type="submit"
                          disabled={isSubmitting || !isValid || isLoading}
                          data-cy={`form-${button.replace(/\s+/g, '-').toLowerCase()}-button`}
                        >
                          {button}
                        </Button>
                        {extraButtons}
                      </Flex>
                    </Column>
                  </Row>
                )}
              </fieldset>
            </FormikForm>
          )
        }}
      </Formik>
    </Box>
  )
}

export {FormInsert, FormDivider, FormDescription} from './_inserts'
