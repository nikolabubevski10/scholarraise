import {IntercomAPI} from 'react-intercom'
import dayjs from 'dayjs'

export const logIntercomUser = user => {
  let userDetails = {
    user_id: user.id,
    name: user.firstName + ' ' + user.lastName,
    email: user.email,
    'First Name': user.firstName,
    'Middle Name': user.middleName,
    'Last Name': user.lastName,
    Gender: user.gender,
    Birthdate: dayjs(user.birthDate, 'MM/DD/YYYY').unix(),
    Avatar: user.avatarUrl,
    phone: user.phone,
    Address1: user.address1,
    Address2: user.address2,
    City: user.city,
    State: user.state,
    Zip: user.zip,
    created_at: dayjs(user.createdAt).unix(),
    updated_at: dayjs(user.updatedAt).unix(),
  }

  IntercomAPI('update', userDetails)
}

export const logIntercomUserAccounts = accounts => {
  // TODO: For now, let's just log the number of accounts
  IntercomAPI('update', {
    'Number of Accounts': accounts.length,
  })
}

export const logIntercomUserContributions = contributions => {
  // TODO: Someday we should do something about this...
  // It will require abstracting out the logic of computing fees and such into a helper, which then needs to be used sitewide
  // This should require a refactor of sorts and potentially extra data coming from the API
  // IntercomAPI('update', contributions);
}

export const trackIntercomEvent = (name, metadata) => {
  IntercomAPI('trackEvent', name, metadata)
  IntercomAPI('update')
}

export const sendIntercomMessage = message => {
  IntercomAPI('showNewMessage', message)
}
