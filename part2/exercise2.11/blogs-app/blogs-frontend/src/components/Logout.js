import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'
import { Stack, Button, Box, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router'

const Logout = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logoutUser())
    navigate('/login')
  }

  return (
    <Stack alignItems="center" direction="row" spacing={6}>
      <Box>
        <Text color="gray.500">{user.name} is logged in</Text>{' '}
      </Box>
      <Button type="button" onClick={handleLogout} colorScheme="teal">
        logout
      </Button>
    </Stack>
  )
}

export default Logout
