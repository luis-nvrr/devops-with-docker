import React from 'react'
import { Navigate, Link } from 'react-router-dom'
import { ListItem, ListIcon, List, Alert, AlertIcon, Stack, Heading } from '@chakra-ui/react'
import { BiNote } from 'react-icons/bi'

const UserBlogs = ({ user }) => {
  if (!user) {
    return <Navigate to="/users" />
  }

  if (user.blogs.length === 0) {
    return (
      <Alert status="info">
        <AlertIcon />
        There are no blogs here
      </Alert>
    )
  }

  return (
    <Stack>
      <Heading size="lg">Added blogs</Heading>
      <List>
        {user.blogs.map((blog) => (
          <ListItem key={blog.id}>
            <ListIcon as={BiNote} color="green.500" />
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </ListItem>
        ))}
      </List>
    </Stack>
  )
}

export default UserBlogs
