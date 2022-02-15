import React, { useState } from 'react'
import { Stack, Box, Heading, FormControl, FormLabel, Button, Input } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createUser } from '../reducers/userReducer'

const UserForm = () => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const userData = { name, username, password }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRegister = (event) => {
    event.preventDefault()
    dispatch(createUser(userData))
    navigate('/login')
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <Box maxWidth="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" padding={4} boxShadow="md">
      <Stack spacing={6}>
        <Heading size="lg">Create user</Heading>
        <form onSubmit={handleRegister}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input type="text" value={name} placeholder="name" onChange={handleNameChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input type="text" value={username} placeholder="username" onChange={handleUsernameChange} />
          </FormControl>
          <FormControl isRequired marginTop={3}>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} placeholder="password" onChange={handlePasswordChange} />
          </FormControl>
          <Stack orientation="row">
            <Button colorScheme="teal" marginTop={3} type="submit">
              Register
            </Button>
            <Button colorScheme="teal" marginTop={3} onClick={() => navigate('/login')}>
              Back
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  )
}

export default UserForm
