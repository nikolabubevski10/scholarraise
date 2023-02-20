import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, boolean} from '@storybook/addon-knobs'
import {State, Store} from '@sambego/storybook-state'

import Form, {FormInsert, FormDivider, FormDescription} from './'

import {InlineText, InternalLink} from '../typography'

const createPage = (num, multiple, initials = false, validation = true, tooltips = false) => {
  const genInitial = value => (initials ? {initialValue: value} : {})
  const genValidation = value => (validation ? {validation: value} : {})
  const genTooltips = value => (tooltips ? {tooltip: value} : {})

  const multipleOptions = [
    {value: 'chocolate', label: 'Chocolate'},
    {value: 'strawberry', label: 'Strawberry'},
    {value: 'vanilla', label: 'Vanilla'},
  ]

  const page = [
    {
      name: `text_${num}`,
      type: 'text',
      placeholder: 'Full name',
      width: [1, null, 1 / 3],
      ...genInitial('Wesley Belden'),
      ...genValidation({
        min: 2,
        max: 50,
        required: true,
      }),
      ...genTooltips('Make tooltips great again'),
    },
    {
      name: `email_${num}`,
      type: 'email',
      placeholder: 'Email address',
      width: [1, null, 1 / 3],
      ...genInitial('wesley@scholarraise.com'),
      ...genValidation({
        required: true,
      }),
      ...genTooltips('Make tooltips great again'),
    },
    {
      name: `phone_${num}`,
      type: 'phone',
      placeholder: 'Phone number',
      width: [1, null, 1 / 3],
      ...genInitial('6158675309'),
      ...genValidation({
        required: true,
      }),
      ...genTooltips('Make tooltips great again'),
    },
    {
      name: `password_${num}`,
      type: 'password',
      placeholder: 'Password',
      width: [1, null, 1 / 3],
      ...genInitial('helloworld'),
      ...genValidation({
        required: true,
      }),
      ...genTooltips('Make tooltips great again'),
    },
    {
      name: `password_again_${num}`,
      type: 'password',
      placeholder: 'Password (again)',
      width: [1, null, 1 / 3],
      ...genInitial('helloworld'),
      ...genValidation({
        required: true,
        reference: `password_${num}`,
      }),
      ...genTooltips('Make tooltips great again'),
    },
    {
      name: `ssn_${num}`,
      type: 'ssn',
      placeholder: 'Social security number',
      width: [1, null, 1 / 3],
      // hidden: true, // Uncomment this and you'll get a "hidden" SSN input
      ...genInitial('123456789'),
      ...genValidation({
        required: true,
      }),
      ...genTooltips('Make tooltips great again'),
    },
    {
      name: `currency_${num}`,
      type: 'currency',
      placeholder: 'Total contribution',
      width: [1, null, 1 / 3],
      ...genInitial('1234.56'),
      ...genValidation({
        required: true,
      }),
      ...genTooltips('Make tooltips great again'),
    },
    {
      name: `date_${num}`,
      type: 'date',
      placeholder: 'Date (MM-DD)',
      width: [1, null, 1 / 3],
      ...genInitial('05-11'),
      ...genValidation({
        required: true,
      }),
      ...genTooltips('Make tooltips great again'),
    },
    {
      name: `date_yearly_${num}`,
      type: 'date',
      placeholder: 'Date (MM-DD-YYYY)',
      width: [1, null, 1 / 3],
      hasYear: true,
      ...genInitial('05-11-1992'),
      ...genValidation({
        required: true,
      }),
      ...genTooltips('Make tooltips great again'),
    },
    {
      type: (
        <FormInsert mb={3}>
          {({values}) => {
            const paragraphValue = values[`paragraph_${num}`]

            if (paragraphValue) return <InlineText>WOAH... {paragraphValue}</InlineText>

            return <InlineText>Start typing in the paragraph below...</InlineText>
          }}
        </FormInsert>
      ),
    },
    {
      name: `paragraph_${num}`,
      type: 'paragraph',
      placeholder: 'Start typing anything...',
      width: [1],
      ...genInitial("The world is an amazing place, don't you think so?"),
      ...genValidation({
        required: true,
      }),
      ...genTooltips('Make tooltips great again'),
    },
    {
      type: <FormDivider />,
    },
    {
      name: `radio_${num}`,
      type: 'radio',
      label: 'Favorite ice cream flavor?',
      options: multipleOptions,
      width: [1, null, 1 / 3],
      ...genInitial('chocolate'),
      ...genValidation({
        required: true,
      }),
      ...genTooltips('Make tooltips great again'),
    },
    {
      name: `checkboxes_${num}`,
      type: 'checkboxes',
      label: 'What ice cream flavors do you like?',
      options: multipleOptions,
      width: [1, null, 1 / 3],
      ...genInitial(['chocolate', 'vanilla']),
      ...genValidation({
        required: true,
        length: 2,
      }),
      ...genTooltips('Choose at least 2'),
    },
    {
      name: `switch_${num}`,
      type: 'switch',
      off: 'Not to be',
      on: 'To be',
      width: [1, null, 1 / 3],
      ...genInitial(true),
      ...genValidation({
        required: true,
      }),
      ...genTooltips('Make tooltips great again'),
    },
    {
      name: `select_${num}`,
      type: 'select',
      placeholder: 'Select one...',
      options: multipleOptions,
      width: [1, null, 1 / 2],
      ...genInitial('chocolate'),
      ...genValidation({
        required: true,
      }),
      ...genTooltips('Make tooltips great again'),
    },
    {
      name: `multiselect_${num}`,
      type: 'multiselect',
      placeholder: 'Select multiple...',
      options: multipleOptions,
      width: [1, null, 1 / 2],
      ...genInitial(['chocolate', 'vanilla']),
      ...genValidation({
        required: true,
        length: 2,
      }),
      ...genTooltips('Choose at least 2'),
    },
    {
      type: <FormDivider />,
    },
    {
      name: `array_${num}`,
      type: 'array',
      button: 'Add person',
      width: [1],
      ...genInitial([
        {name: 'Patrick Cason', email: 'patrick@scholarraise.com'},
        {name: 'Wesley Belden', email: 'wesley@scholarraise.com'},
      ]),
      ...genValidation({
        required: true,
        length: 2,
      }),
      // There are (currently) no tooltips on the array, tooltips are left up to the fields
      fields: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
          width: [1, null, 1 / 3],
          ...genInitial('Some guy'),
          ...genValidation({
            min: 4,
            max: 20,
            required: true,
          }),
          ...genTooltips('Make tooltips great again'),
        },
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email address',
          width: [1, null, 2 / 3],
          ...genInitial('someguy@example.com'),
          ...genValidation({
            required: true,
          }),
          ...genTooltips('Make tooltips great again'),
        },
      ],
    },
    {
      type: <FormDivider />,
    },
    {
      name: `checkbox_${num}`,
      type: 'checkbox',
      label: (
        <InlineText>
          Please read the <InternalLink to="/">terms and conditions</InternalLink>
        </InlineText>
      ),
      width: [1],
      ...genInitial(true),
      ...genValidation({
        required: true,
      }),
      ...genTooltips('Make tooltips great again'),
    },
  ]

  if (multiple) {
    if (num === 0) {
      page.unshift({
        type: (
          <FormDescription
            title="Step One"
            description="Who is the administrator of this college savings account?"
          />
        ),
      })
    } else if (num === 1) {
      page.unshift({
        type: (
          <FormDescription title="Step Two" description="Who is the account being created for?" />
        ),
      })
    } else if (num === 2) {
      page.unshift({
        type: <FormDescription title="Step Three" description="Great - now wrap it up, buddy!" />,
      })
    }
  }

  return page
}

const stories = storiesOf('2. Simple|Form', module)

const store = new Store({
  singleForm: (iv, v, t) => ({
    submit: values => console.log('SUBMIT', values),
    button: 'Submit form',
    forms: [{page: createPage(0, false, iv, v, t)}],
    returnData: (isValid, values) => console.log('isValid & Values: ', isValid, values),
  }),
  multipleForm: {
    submit: values => console.log('SUBMIT', values),
    button: 'Submit form',
    forms: [
      {
        title: 'Owner(s)',
        description: 'Define the administrators of this 529 account',
        page: createPage(0, true),
      },
      {
        title: 'Scholar',
        description: 'Tell us who the account is going to benefit',
        page: createPage(1, true),
      },
      {
        title: 'Confirm',
        description: 'Answer some security questions and confirm additional details',
        page: createPage(2, true),
      },
    ],
  },
  multipleFormFirstPage: {
    submit: values => console.log('SUBMIT', values),
    button: 'Submit form',
    forms: [
      {
        title: 'Owner(s)',
        description: 'Define the administrators of this 529 account',
        page: createPage(0, true, true),
      },
      {
        title: 'Scholar',
        description: 'Tell us who the account is going to benefit',
        page: createPage(1, true),
      },
      {
        title: 'Confirm',
        description: 'Answer some security questions and confirm additional details',
        page: createPage(2, true),
      },
    ],
  },
  multipleFormComplete: {
    submit: values => console.log('SUBMIT', values),
    button: 'Submit form',
    returnData: (isValid, values) => console.log('isValid & Values: ', isValid, values),
    forms: [
      {
        title: 'Owner(s)',
        description: 'Define the administrators of this 529 account',
        page: createPage(0, true, true),
      },
      {
        title: 'Scholar',
        description: 'Tell us who the account is going to benefit',
        page: createPage(1, true, true),
      },
      {
        title: 'Confirm',
        description: 'Answer some security questions and confirm additional details',
        page: createPage(2, true, true),
      },
    ],
  },
})

stories.addDecorator(withKnobs)

stories.add('default', () => {
  // This requires flipping the value here, it cannot be done as a Storybook control
  const initialValues = false

  const validations = boolean('Should show additional validations?', true, 'Main')
  const tooltips = boolean('Should show tooltips?', false, 'Main')

  return (
    <State store={store}>
      {({singleForm}) => <Form {...singleForm(initialValues, validations, tooltips)} />}
    </State>
  )
})

stories.add('as a form wizard', () => {
  const steps = boolean('Should show steps?', true, 'Main')

  return (
    <State store={store}>{({multipleForm}) => <Form {...multipleForm} showSteps={steps} />}</State>
  )
})

stories.add('as a form wizard with the first page completed', () => {
  const steps = boolean('Should show steps?', true, 'Main')

  return (
    <State store={store}>
      {({multipleFormFirstPage}) => <Form {...multipleFormFirstPage} showSteps={steps} />}
    </State>
  )
})

stories.add('as a complete form wizard', () => {
  const steps = boolean('Should show steps?', true, 'Main')

  return (
    <State store={store}>
      {({multipleFormComplete}) => <Form {...multipleFormComplete} showSteps={steps} />}
    </State>
  )
})
