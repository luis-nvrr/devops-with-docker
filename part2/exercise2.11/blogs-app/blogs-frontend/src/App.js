/* eslint-disable quotes */
import React from 'react'

import Notification from './components/Notification'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import UsersView from './components/UsersView'
import IndividualBlogView from './components/IndividualBlogView'
import Menu from './components/Menu'
import UserBlogs from './components/UserBlogs'
import UserForm from './components/UserForm'

import { useSelector, useDispatch } from 'react-redux'
import { Route, Routes, useMatch, Navigate } from 'react-router-dom'
import { initialize as initializeUser } from './reducers/userReducer'
import { initialize as initializeBlog } from './reducers/blogReducer'
import { Box, Stack, Heading } from '@chakra-ui/react'

const App = () => {
  const loggedUser = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  const userMatch = useMatch('/users/:id')
  const userMatched = userMatch ? users.find((user) => user.id === userMatch.params.id) : null

  const blogMatch = useMatch('/blogs/:id')
  const blogMatched = blogMatch ? blogs.find((blog) => blog.id === blogMatch.params.id) : null

  React.useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlog())
  }, [])

  return (
    <Box>
      <Notification />
      {!loggedUser ? (
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Routes>
            <Route path="/register" element={<UserForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Stack>
      ) : (
        <Box>
          <Menu />
          <Box padding={4}>
            <Routes>
              <Route path="/users/:id" element={<UserBlogs user={userMatched} />} />
              <Route path="/blogs/:id" element={<IndividualBlogView blog={blogMatched} />} />
              <Route path="/users" element={<UsersView />} />
              <Route
                path="/blogs"
                element={
                  <Stack direction="column">
                    <Box maxWidth="md" borderWidth="1px" borderRadius="lg" overflow="hidden" padding={4} boxShadow="md">
                      <Heading size="lg">Create new Blog</Heading>
                      <Togglable buttonLabel="New Blog">
                        <BlogForm />
                      </Togglable>
                    </Box>
                    <Box maxWidth="md" borderWidth="1px" borderRadius="lg" overflow="hidden" padding={4} boxShadow="md">
                      <BlogList />
                    </Box>
                  </Stack>
                }
              />
              <Route path="*" element={<Navigate to="/blogs" />} />
            </Routes>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default App
