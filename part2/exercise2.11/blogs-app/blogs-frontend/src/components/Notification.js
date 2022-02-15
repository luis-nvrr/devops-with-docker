import React from 'react'
import { useSelector } from 'react-redux'
import { Alert, AlertIcon } from '@chakra-ui/react'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification.message) {
    return <div></div>
  }

  return (
    <Alert status={notification.type}>
      <AlertIcon />
      {notification.message}
    </Alert>
  )
}

export default Notification
