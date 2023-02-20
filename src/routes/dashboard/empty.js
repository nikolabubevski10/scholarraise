import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {
  Row,
  Column,
  Heading,
  Flex,
  CappedText,
  Button,
  InteractiveLink,
  Dialog,
  Paragraph,
} from 'sr-components'

const MigrateDialog = ({isOpen, close}) => {
  const migrateButton = {
    left: [<Button onClick={close}>Migrate my account</Button>],
  }

  return isOpen === true ? (
    <Dialog
      heading="Migrate an existing 529 account"
      buttons={migrateButton}
      hasBackground
      isOpen={isOpen}
      close={close}
    >
      <Paragraph>
        <b>Hey there Sunshine</b> - we're thrilled you've chosen Scholar Raise to manage your 529
        college savings account.
      </Paragraph>
      <Paragraph>
        Currently all 529 account migrations must be done manually. Feel free to send us an message
        and we'll hop right on it!
      </Paragraph>
    </Dialog>
  ) : null
}

// const StartPlanDialog = ({ isOpen, close }) => {
//   return isOpen === true ? (
//     <Dialog heading="Start a plan" hasBackground isOpen={isOpen} close={close}>
//       <Paragraph>
//         To create a new 529 college savings plan, you will need the information on your driver’s
//         license, as well as your social security number - yup, that’s it!
//       </Paragraph>
//       <Paragraph>
//         If you don’t have your scholar’s information yet, that’s okay! You can register yourself as
//         the beneficiary for now.
//       </Paragraph>
//     </Dialog>
//   ) : null;
// };

// const ExistingAccountDialog = ({ isOpen, close }) => {
//   return isOpen === true ? (
//     <Dialog heading="Migrate an account" hasBackground isOpen={isOpen} close={close}>
//       <Paragraph>
//         Already have a 529 college savings plan? No need to roll anything over, we can connect to it
//         so that friends and family contribute.
//       </Paragraph>
//       <Paragraph>Make sure to have your state 529 login information ready for reference.</Paragraph>
//     </Dialog>
//   ) : null;
// };

export default function EmptyDashboard({name}) {
  const history = useHistory()

  // nice place for a state machine :) Or a single variable...
  // kept all three just for disclosure
  const [isModalOpen, openModal] = useState()
  // const [isPlanOpen, openPlan] = useState();
  // const [isMigrateOpen, openMigrate] = useState();

  return (
    <>
      <Row>
        <Column width={1}>
          <Heading as="h2" textStyle="h2" mt={[3, null, 0]}>
            Welcome, {name}!
          </Heading>
        </Column>
      </Row>
      <Row mt={[2, null, 5]}>
        <Column width={[1, null, 1 / 2]}>
          <Flex flexDirection={'column'}>
            <CappedText mt={0} mb={0}>
              Add new plan
            </CappedText>
            <Heading textStyle="h4" fontWeight="normal" color="mediumGray">
              Create your first 529 college savings plan
            </Heading>
            <Button
              data-cy="get-started-new-button"
              variant="primary"
              mt={3}
              width={['100%', 160]}
              onClick={() => history.push('/dashboard/plans/new')}
            >
              Get started
            </Button>
            <InteractiveLink mt={[2, null, 0]} mb={4} onClick={() => openModal(true)}>
              What if I already have a 529 account?
            </InteractiveLink>
          </Flex>
        </Column>
      </Row>
      <MigrateDialog isOpen={isModalOpen} close={() => openModal(false)} />
      {/* <StartPlanDialog isOpen={isPlanOpen} close={() => openPlan(false)} />
      <ExistingAccountDialog isOpen={isMigrateOpen} close={() => openMigrate(false)} /> */}
    </>
  )
}
