import React from 'react'
import CreatePlan from 'routes/add-plan/create'
import CompletePlan from 'routes/add-plan/completed'

function AddPlanFlow() {
  const [account, setAccount] = React.useState()

  if (account) {
    return <CompletePlan options={{account}} />
  }

  return <CreatePlan options={{setAccount}} />
}

export default AddPlanFlow
