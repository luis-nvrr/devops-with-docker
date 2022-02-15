import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createComment } from '../reducers/blogReducer'
import { Stack, Input, FormControl, FormLabel, Button } from '@chakra-ui/react'

const CommentForm = ({ blog }) => {
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

  const handleCommentFormSubmit = (event) => {
    event.preventDefault()
    const comment = { content }
    setContent('')
    dispatch(createComment(comment, blog))
  }

  const handleContentChange = (event) => {
    setContent(event.target.value)
  }

  return (
    <form onSubmit={handleCommentFormSubmit}>
      <Stack spacing={3}>
        <FormControl isRequired marginTop={2}>
          <FormLabel>Content</FormLabel>
          <Input value={content} onChange={handleContentChange} />
        </FormControl>
        <Button colorScheme="teal" type="submit">
          comment
        </Button>
      </Stack>
    </form>
  )
}

export default CommentForm
