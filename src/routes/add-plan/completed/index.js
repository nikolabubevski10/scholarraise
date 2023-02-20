import React from 'react'
import {Container, Row, Column, Steps} from 'sr-components'
import Page from 'components/page'
import {H1} from 'components/typography'
import StepsDescription from 'routes/add-plan/steps-description'

import {FourthPage} from './invite'
import {FifthPage} from './contribute'
import {SixthPage} from './profile'

function CompletedPlan({options = {}}) {
  const {account = {}} = options
  const [step, setStep] = React.useState(1)
  const [completed, setCompleted] = React.useState(0)

  const steps = React.useMemo(
    () => [
      {complete: completed > 1, ...StepsDescription.step4},
      {complete: completed > 2, ...StepsDescription.step5},
      {complete: completed > 3, ...StepsDescription.step6},
    ],
    [completed],
  )

  React.useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  function handlePage(step) {
    var nextStep = step + 1
    setStep(nextStep)
    setCompleted(nextStep)
    window.scrollTo(0, 0)
  }

  return (
    <Page title="Create a new plan">
      <Container my={[4, null, 5]}>
        <Row className="prose">
          <Column width={1}>
            <div className="w=full flex flex-row justify-between items-center">
              <H1>Your plan has been created!</H1>
            </div>
          </Column>
          <Column width={1} mt={[4, null, 5]} mb={4}>
            {/* <Steps> tracks 'newStep' from 0 */}
            <Steps
              steps={steps}
              startingStepNumber={3}
              currentPage={step - 1}
              onChange={newStep => {
                setStep(newStep + 1)
                window.scrollTo(0, 0)
              }}
            />
          </Column>
          {step === 1 && (
            <FourthPage options={{setCompleted, account, nextPage: () => handlePage(1)}} />
          )}
          {step === 2 && (
            <FifthPage options={{account, setCompleted, nextPage: () => handlePage(2)}} />
          )}
          {step === 3 && (
            <SixthPage options={{account, nextPage: () => handlePage(3), setCompleted}} />
          )}
        </Row>
      </Container>
    </Page>
  )
}

export default CompletedPlan
