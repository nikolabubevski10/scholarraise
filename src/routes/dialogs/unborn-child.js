import React from 'react'
import {Button, Dialog, Paragraph} from 'sr-components'

const UnbornChild = ({isOpen, onClose}) => {
  return (
    <Dialog
      heading="Common Questions"
      hasBackground={true}
      isOpen={isOpen}
      close={onClose}
      buttons={{
        right: [
          <Button variant="primary" onClick={() => {}}>
            I understand
          </Button>,
        ],
      }}
    >
      <Paragraph>
        Good idea getting started! This is a good option if you’re getting started early or if you
        have your hands full after birth and don’t have your kid’s SSN yet. The IRS allows you to
        change the beneficiary on the 529 plan account to a{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.savingforcollege.com/article/how-to-transfer-529-plan-funds-to-a-sibling"
        >
          qualifying family member
        </a>{' '}
        without tax consequences.
      </Paragraph>
    </Dialog>
  )
}

export default UnbornChild
