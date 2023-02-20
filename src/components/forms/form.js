import React from 'react'
import {useForm, FormProvider} from 'react-hook-form'
import {DevTool} from '@hookform/devtools'

function Form({defaultValues, children, getIsValid, onSubmit, getWatch}) {
  const methods = useForm({defaultValues, mode: 'onBlur', reValidateMode: 'onBlur'})
  const {
    handleSubmit,
    watch,
    control,
    formState: {isValid},
  } = methods

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => getIsValid && getIsValid(isValid), [isValid])

  if (typeof getWatch === 'function') {
    getWatch(watch())
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
      {process.env.NODE_ENV !== 'production' && <DevTool control={control} />}
    </FormProvider>
  )
}

export {Form}
