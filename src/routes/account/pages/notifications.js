import React from 'react'
import {Row, Column, Note} from 'sr-components'
import useSWR from 'swr'
import parseHTML from 'html-react-parser'
import {useUser} from '../../../context/user'
import {useAppContext} from '../../../context/appContext'
import {useNotification} from '../../../hooks/useNotification'
import {getUserCommunicationOptions, updateUserCommunicationOptions} from '../../../api/user'
import {CappedText} from 'components/typography'

function Notification({options}) {
  const {notification, onClick} = options
  const {id, receivesMail: email, receivesSms: sms} = notification

  return (
    <>
      <span>{parseHTML(notification.notification.name)}</span>
      <input
        type="checkbox"
        className="w-4 h-5 cursor-pointer justify-self-center"
        checked={email}
        onChange={() => onClick(id, !email, sms)}
      />
      <input
        type="checkbox"
        className="w-4 h-5 cursor-pointer justify-self-center"
        checked={sms}
        onChange={() => onClick(id, email, !sms)}
      />
    </>
  )
}

const Notifications = () => {
  const {user} = useUser()
  const {setLoading} = useAppContext()
  const {success, failed} = useNotification()
  const {data, mutate} = useSWR('/notification', () => getUserCommunicationOptions(user.hashid), {
    suspense: true,
  })

  function onClick(id, receivesMail, receivesSms) {
    const notificationToModify = data.find(d => d.id === id)
    const newSettings = {notifications_user: {receivesMail, receivesSms}}

    setLoading(true)
    updateUserCommunicationOptions(id, newSettings)
      .then(() => success('Notification setting updated'))
      .catch(() => failed('We could not update your settings at this time'))
      .finally(() => {
        mutate(
          [...data.filter(d => d.id !== id), {...notificationToModify, receivesMail, receivesSms}],
          true,
        )
        setLoading(false)
      })
  }

  const general =
    data
      ?.filter(n => n.notification.theme === 'general')
      .sort((a, b) => a.notification.id - b.notification.id) ?? []

  const marketing =
    data
      ?.filter(n => n.notification.theme === 'marketing')
      .sort((a, b) => a.notification.id - b.notification.id) ?? []

  return (
    <Row>
      <Column width={[1, null, 2 / 3, 1 / 2]}>
        <div
          className="w-full grid row-gap-4 col-gap-2"
          style={{gridTemplateColumns: 'auto 60px 60px'}}
        >
          <div />
          <CappedText className="justify-self-center text-darkGray">Email</CappedText>
          <CappedText className="justify-self-center text-darkGray">SMS</CappedText>
          <CappedText className="text-darkGray col-span-full">General</CappedText>
          {general.map(notification => (
            <Notification key={notification.id} options={{notification, onClick}} />
          ))}
          <CappedText className="mt-8 text-darkGray col-span-full">Marketing</CappedText>
          {marketing.map(notification => (
            <Notification key={notification.id} options={{notification, onClick}} />
          ))}
        </div>
        <div className="mt-8">
          <Note>
            <b>Note:</b> These settings are only applicable to Scholar Raise. If you need to change
            your notification preferences for NYSaves, you may do so on their website.
          </Note>
        </div>
      </Column>
    </Row>
  )
}

export default Notifications
