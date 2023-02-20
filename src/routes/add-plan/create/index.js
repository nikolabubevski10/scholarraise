import React from 'react'
import {Container, Row, Column, Steps, InteractiveLink} from 'sr-components'
import Page from 'components/page'
import {H1} from 'components/typography'
import StepsDescription from 'routes/add-plan/steps-description.json'
import FormJson, {securityQuestions} from 'routes/add-plan/form.js'
import {useUser} from 'context/user'
import {createAccount, securityAnswers} from 'api/accounts'
import {useNotification} from 'hooks/useNotification'
import {sendIntercomMessage} from 'helpers/intercom'
import {getNYQuestions} from 'api/accounts'

import {FirstPage} from './information'
import {SecondPage} from './scholar'
import {ThirdPage} from './confirm'

function buildInitialState(user) {
  let initialState = {step1: {}, step2: {}, step3: {}}

  // eslint-disable-next-line no-unused-vars
  var success = [
    ...FormJson.step1.personal,
    ...FormJson.step1.addressTop,
    ...FormJson.step1.addressBottom,
  ].forEach(item => (initialState.step1[item.name] = user[item.name]))

  return initialState
}

function validateFirstPage(user) {
  let necessary = [
    ...FormJson.step1.personal,
    ...FormJson.step1.addressTop,
    ...FormJson.step1.addressBottom,
  ].filter(item => item.required)

  const validValues = necessary.filter(
    item => user[item.name] !== undefined && user[item.name] !== null,
  )

  return validValues.length === necessary.length
}

function AddPlan({options = {}}) {
  const {setAccount} = options
  const {user, update} = useUser()
  const isInitialPageFilled = validateFirstPage(user)
  const initialData = buildInitialState(user)
  const [step, setStep] = React.useState(isInitialPageFilled ? 2 : 1)
  const [data, setData] = React.useState(initialData)
  const [completed, setCompleted] = React.useState(new Set([isInitialPageFilled ? 1 : 0]))
  const {success, failed} = useNotification()

  const steps = React.useMemo(
    () => [
      {complete: completed.has(1), ...StepsDescription.step1},
      {complete: completed.has(2), ...StepsDescription.step2},
      {complete: completed.has(3), ...StepsDescription.step3},
    ],
    [completed],
  )

  React.useLayoutEffect(() => {
    window.scrollTo(0, 0)

    // nextjs would handle this so well
    getNYQuestions().then(questions =>
      questions.forEach(q => {
        const {question: label, id: value, bankNumber} = q
        securityQuestions[`bank${bankNumber}`].push({value, label})
      }),
    )
  }, [])

  function checkCompletion(step) {
    setCompleted(prevSet => new Set(prevSet.add(step)))
  }

  function uncheckCompletion(step) {
    setCompleted(prev => new Set([...prev].filter(_step => _step !== step)))
  }

  function handlePage(newData, step) {
    var nextStep = step + 1
    setData({...data, [`step${step}`]: {...data[`step${step}`], ...newData}})
    setStep(nextStep)
    checkCompletion(nextStep)
    window.scrollTo(0, 0)
  }

  function updateConfirmValues(values) {
    setData({...data, step3: {...values}})
  }

  async function handleSubmit(questions) {
    let account = {...data.step1, ...data.step2, userId: user.id}
    let userChanges = {}
    let mustUpdateUser = false

    Object.keys(data.step1).forEach(key => {
      if (user.hasOwnProperty(key) && data.step1[key] !== user[key]) {
        userChanges[key] = data.step1[key]
        mustUpdateUser = true
      }
    })

    try {
      if (mustUpdateUser) {
        // do this silently
        await update({user: {...userChanges}})
      }

      // removes SSN
      if (account.ssnOrTin && account.copySsnOrTinFromUser) {
        delete account.ssnOrTin
      }

      const answers = [1, 2, 3].map(num => ({
        securityQuestionId: questions[`securityQuestion${num}`],
        answer: questions[`answerQuestion${num}`],
      }))

      const newAccount = await createAccount({account})
      success('Congratulations! You just created a new plan!')
      await securityAnswers({
        securityAnswer: {answerBatch: [...answers], accountId: newAccount.id},
      })
      setAccount(newAccount)
    } catch (e) {
      failed('Something went wrong trying to create this new plan. Can you try again?')

      if (e.response?.data) {
        failed(e.response.data?.error)
      }
    }
  }

  return (
    <Page title="Create a new plan">
      <Container my={[4, null, 5]}>
        <Row className="prose">
          <Column width={1}>
            <div className="w=full flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between md:items-center">
              <H1>Create a new plan</H1>
              <InteractiveLink
                onClick={() => {
                  sendIntercomMessage(
                    'Hi Scholar Raise support! I already have a 529 plan. What should I do?',
                  )
                }}
              >
                What if I already have a 529 plan?
              </InteractiveLink>
            </div>
          </Column>
          <Column width={1} mt={[3, null, 5]} mb={4}>
            {/* <Steps> tracks 'newStep' from 0 */}
            <Steps
              steps={steps}
              currentPage={step - 1}
              onChange={newStep => {
                setStep(newStep + 1)
                window.scrollTo(0, 0)
              }}
            />
          </Column>
          {step === 1 && (
            <FirstPage
              options={{
                onSubmit: d => handlePage(d, 1),
                checkCompletion,
                uncheckCompletion,
                values: data.step1,
              }}
            />
          )}
          {step === 2 && (
            <SecondPage
              options={{
                onSubmit: d => handlePage(d, 2),
                values: data.step2,
                checkCompletion,
                uncheckCompletion,
                state: data,
              }}
            />
          )}
          {step === 3 && (
            <ThirdPage
              options={{
                onSubmit: d => {
                  // for completeness...
                  setData({...data, step3: {...data.step3, ...d}})
                  handleSubmit(d)
                },
                setStep,
                state: data,
                values: data.step3,
                updateConfirmValues,
                checkCompletion,
                uncheckCompletion,
              }}
            />
          )}
        </Row>
      </Container>
    </Page>
  )
}

export default AddPlan
