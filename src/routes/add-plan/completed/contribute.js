import React from 'react'
import {Button} from 'components/lib'
import {H2, CappedText} from 'components/typography'
import {MakeAContribution} from 'routes/contributions/contribute-modal'

function FifthPage({options = {}}) {
  const {account = {}, nextPage} = options

  React.useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <MakeAContribution
      options={{
        className: 'mb-8 rounded shadow-forms',
        onContribute: nextPage,
        account,
        beforeForm: (
          <>
            <CappedText className="mb-4 text-darkGray">Set up an initial deposit</CappedText>
            <H2 className="mb-8 text-xl text-mediumGray">
              The sooner you start saving, the more time your money has to work!
            </H2>
          </>
        ),
        rightButtons: (
          <Button
            className="w-full mt-2 md:mt-0 md:block md:w-auto"
            variant="secondary"
            type="button"
            onClick={nextPage}
          >
            Skip this step
          </Button>
        ),
      }}
    />
  )
}

export {FifthPage}
