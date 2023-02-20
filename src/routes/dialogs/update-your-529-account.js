import React from 'react'
import {Button, Dialog, Paragraph, ExternalLink} from 'sr-components'

// Sync this with backend later? Because right now, all links go through NYSaves
function UpdateYour529AccountDialog({isOpen, onClose}) {
  return (
    <Dialog
      heading="Warning, please read this first!"
      hasBackground
      isOpen={isOpen}
      close={onClose}
      width={[3 / 4, null, 1 / 2]}
      buttons={{
        right: [
          <Button variant="primary" onClick={() => {}}>
            I understand
          </Button>,
        ],
      }}
    >
      <Paragraph>
        Your profile information has been updated here on Scholar Raise. However, please note that
        we don't have the ability to update your information on NYSaves. You will need to do this
        manually at their website at{' '}
        <ExternalLink to="https://www.nysaves.org/nytpl/auth/ll.cs">NYSaves.org</ExternalLink>.
      </Paragraph>
    </Dialog>
  )
}

export default UpdateYour529AccountDialog
