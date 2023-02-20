import MyRelativeRelationshipsOptions from './relationships'
import {validatePregnancyDate, validateAdultBirthDate} from 'helpers/form-validators'
import States from 'helpers/states'

const thisYear = new Date().getFullYear()

export const securityQuestions = {
  bank1: [],
  bank2: [],
  bank3: [],
}

const FormJson = {
  step1: {
    personal: [
      {
        name: 'firstName',
        placeholder: 'First name',
        required: true,
        validation: {
          minLength: {
            value: 2,
            message: 'Use your full first name',
          },
        },
      },
      {
        name: 'middleName',
        placeholder: 'Middle name',
      },
      {
        name: 'lastName',
        placeholder: 'Last name',
        required: true,
        validation: {
          minLength: {
            value: 2,
            message: 'Use your full last name',
          },
        },
      },
      {
        type: 'date',
        name: 'birthDate',
        placeholder: 'Date of birth',
        required: true,
        validate: {validateAdultBirthDate},
      },
      {
        type: 'phone',
        name: 'phone',
        placeholder: 'Phone number',
        required: true,
      },
      {
        type: 'ssn',
        name: 'ssnOrTin',
        placeholder: 'SSN',
        required: true,
        tooltip:
          'The social security number of the account owner (you) is required to open a 529 College Savings Investment Account.',
      },
    ],
    addressTop: [
      {name: 'address1', placeholder: 'Address', required: true},
      {name: 'address2', placeholder: 'Address (second line)'},
    ],
    addressBottom: [
      {name: 'city', placeholder: 'City', required: true},
      {
        name: 'state',
        type: 'select',
        placeholder: 'State',
        options: States,
        required: true,
      },
      {name: 'zip', type: 'zip', placeholder: 'Zip code', required: true},
    ],
    successor: [
      {
        name: 'successorFirstName',
        placeholder: 'First name',
        validation: {
          minLength: {
            value: 2,
            message: 'Use the full first name',
          },
        },
      },
      {name: 'successorMiddleName', placeholder: 'Middle name'},
      {
        name: 'successorLastName',
        placeholder: 'Last name',
        validation: {
          minLength: {
            value: 2,
            message: 'Use the full last name',
          },
        },
      },
      {
        type: 'date',
        name: 'successorBirthDate',
        placeholder: 'Date of birth',
      },
      {
        type: 'email',
        name: 'successorEmailAddress',
        placeholder: 'Email address',
      },
      {type: 'phone', name: 'successorPhone', placeholder: 'Phone number'},
    ],
  },
  step2: {
    myChild: [
      {
        name: 'myChild.beneficiaryFirstName',
        placeholder: 'First name',
        required: true,
        validation: {
          minLength: {
            value: 2,
            message: "Use your child's full first name",
          },
        },
      },
      {name: 'myChild.beneficiaryMiddleName', placeholder: 'Middle name'},
      {
        name: 'myChild.beneficiaryLastName',
        placeholder: 'Last name',
        required: true,
        validation: {
          minLength: {
            value: 2,
            message: "Use your child's full last name",
          },
        },
      },
      {
        type: 'date',
        name: 'myChild.beneficiaryBirthDate',
        placeholder: 'Date of birth',
        required: true,
      },
      {
        name: 'myChild.beneficiaryState',
        type: 'select',
        placeholder: 'State',
        options: States,
        required: true,
      },
      {
        type: 'ssn',
        name: 'myChild.beneficiarySsnOrTin',
        placeholder: 'SSN',
        required: true,
        tooltip:
          'The social security number of the beneficiary is required to open a 529 College Savings Investment Account.',
      },
      {
        name: 'myChild.beneficiaryCollegeEntryYear',
        type: 'select',
        placeholder: 'College entry year',
        required: true,
        options: Array.from({length: 31}, (_, index) => ({
          value: thisYear + index,
          label: thisYear + index,
        })),
      },
    ],
    myRelative: [
      {
        name: 'myRelative.beneficiaryFirstName',
        placeholder: 'First name',
        required: true,
        validation: {
          minLength: {
            value: 2,
            message: "Use your child's full first name",
          },
        },
      },
      {name: 'myRelative.beneficiaryMiddleName', placeholder: 'Middle name'},
      {
        name: 'myRelative.beneficiaryLastName',
        placeholder: 'Last name',
        required: true,
        validation: {
          minLength: {
            value: 2,
            message: "Use your child's full last name",
          },
        },
      },
      {
        type: 'date',
        name: 'myRelative.beneficiaryBirthDate',
        placeholder: 'Date of birth',
        required: true,
      },
      {
        name: 'myRelative.beneficiaryState',
        type: 'select',
        placeholder: 'State',
        options: States,
        required: true,
      },
      {
        type: 'ssn',
        name: 'myRelative.beneficiarySsnOrTin',
        placeholder: 'SSN',
        required: true,
        tooltip:
          'The social security number of the beneficiary is required to open a 529 College Savings Investment Account.',
      },
      {
        type: 'select',
        name: 'myRelative.relationshipToBeneficiary',
        placeholder: 'Your relationship to the scholar',
        options: MyRelativeRelationshipsOptions.relationships,
        required: true,
      },
      {
        name: 'myRelative.beneficiaryCollegeEntryYear',
        type: 'select',
        placeholder: 'College entry year',
        required: true,
        options: Array.from({length: 31}, (_, index) => ({
          value: thisYear + index,
          label: thisYear + index,
        })),
      },
    ],
    myself: [
      {
        name: 'myself.beneficiaryCollegeEntryYear',
        type: 'select',
        placeholder: 'College entry year',
        required: true,
        options: Array.from({length: 31}, (_, index) => ({
          value: thisYear + index,
          label: thisYear + index,
        })),
      },
    ],
    expecting: [
      {
        type: 'date',
        name: 'expecting.beneficiaryEstimatedDueDate',
        placeholder: 'Estimated due date',
        required: true,
        validate: {validatePregnancyDate},
      },
    ],
  },
  step3: [
    {
      type: 'select',
      name: 'securityQuestion1',
      placeholder: 'Security question',
      required: true,
      options: securityQuestions.bank1,
    },
    {
      name: 'answerQuestion1',
      placeholder: 'Answer',
      required: true,
    },
    {
      type: 'select',
      name: 'securityQuestion2',
      placeholder: 'Security question',
      required: true,
      options: securityQuestions.bank2,
    },
    {
      name: 'answerQuestion2',
      placeholder: 'Answer',
      required: true,
    },
    {
      type: 'select',
      name: 'securityQuestion3',
      placeholder: 'Security question',
      required: true,
      options: securityQuestions.bank3,
    },
    {
      name: 'answerQuestion3',
      placeholder: 'Answer',
      required: true,
    },
  ],
}

export default FormJson
