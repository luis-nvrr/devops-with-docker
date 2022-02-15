import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { Navigate } from 'react-router'
import CommentForm from './CommentForm'
import {
  Divider,
  Stack,
  Heading,
  Box,
  Button,
  TagLabel,
  InputGroup,
  Text,
  List,
  ListItem,
  ListIcon
} from '@chakra-ui/react'

import { BiComment } from 'react-icons/bi'

const IndividualBlogView = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLikeBlog = (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
  }

  const handleDeleteBlog = (event) => {
    event.preventDefault()
    if (!window.confirm(`Are you sure you want to remove ${blog.title}`)) return
    dispatch(deleteBlog(blog))
  }

  if (!blog) {
    return <Navigate to="/" />
  }

  return (
    <Stack>
      <Box maxWidth="md" borderWidth="1px" borderRadius="lg" overflow="hidden" padding={4} boxShadow="md">
        <Heading size="lg">{blog.title}</Heading>
        <a href={blog.url}>{blog.url}</a>
        <InputGroup alignItems="center">
          <TagLabel>likes:{blog.likes}</TagLabel>
          <Button size="sm" marginLeft={5} onClick={handleLikeBlog} colorScheme="teal">
            Like
          </Button>
        </InputGroup>
        <Text>author: {blog.author}</Text>
        <Stack direction="row">
          {user.username === blog.user.username && (
            <Button size="sm" colorScheme="twitter" onClick={handleDeleteBlog}>
              Remove
            </Button>
          )}
        </Stack>
      </Box>
      <Box maxWidth="md" borderWidth="1px" borderRadius="lg" overflow="hidden" padding={4} boxShadow="md">
        <Stack>
          <Heading size="md">Comments</Heading>
          <CommentForm blog={blog} />
          <Divider />
          <List>
            {blog.comments.map((comment) => (
              <ListItem key={comment.id}>
                <ListIcon as={BiComment} color="green.500" />
                {comment.content}
              </ListItem>
            ))}
          </List>
        </Stack>
      </Box>
    </Stack>
  )
}

export default IndividualBlogView
