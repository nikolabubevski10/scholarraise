import React from 'react'

import Card from '../card'
import Box from '../box'
import Flex from '../flex'
import Button from '../button'
import theme from '../theme'

export default ({
  children,
  index,
  forms,
  currentPage,
  setCurrentPage,
  submitDisabled,
  submitButton,
}) => {
  const shouldShowPrevious = currentPage - 1 >= 0
  const shouldShowNext = currentPage + 1 < forms.length
  const shouldShowSubmit = currentPage + 1 === forms.length

  const buttonStyles = where => {
    const styles =
      where === 'submit'
        ? {type: 'submit', variant: 'primary', mb: 0}
        : {
            type: 'button',
            variant: where === 'next' ? 'primary' : 'secondary',
            mb: 0,
          }

    if (shouldShowPrevious && (shouldShowNext || shouldShowSubmit)) {
      if (where === 'previous') {
        styles.width = ['100%', '50%']
        styles.borderRadius = ['normal', `0px 0px 0px ${theme.radii.normal}px`]
        styles.mb = [2, 0]
      } else if (where === 'next' || where === 'submit') {
        styles.width = ['100%', '50%']
        styles.borderRadius = ['normal', `0px 0px ${theme.radii.normal}px 0px`]
      }
    } else {
      styles.width = '100%'
      styles.borderRadius = ['normal', `0px 0px ${theme.radii.normal}px ${theme.radii.normal}px`]
    }

    return styles
  }

  return (
    <Card variant="wizard" style={{display: currentPage === index ? 'block' : 'none'}}>
      <Box p={[0, null, 3]} pb={0}>
        {children}
      </Box>
      <Flex mt={3} flexWrap="wrap">
        {shouldShowPrevious && (
          <Button
            {...buttonStyles('previous')}
            disabled={!forms[currentPage - 1]}
            onClick={() => {
              window.scrollTo(0, 0)
              setCurrentPage(currentPage - 1)
            }}
            data-cy="form-wizard-previous"
          >
            Previous
          </Button>
        )}
        {shouldShowNext && (
          <Button
            {...buttonStyles('next')}
            disabled={!forms[currentPage]}
            onClick={() => {
              window.scrollTo(0, 0)
              setCurrentPage(currentPage + 1)
            }}
            data-cy="form-wizard-next"
          >
            Next
          </Button>
        )}
        {shouldShowSubmit && (
          <Button
            {...buttonStyles('submit')}
            disabled={submitDisabled}
            data-cy="form-wizard-submit"
          >
            {submitButton}
          </Button>
        )}
      </Flex>
    </Card>
  )
}
