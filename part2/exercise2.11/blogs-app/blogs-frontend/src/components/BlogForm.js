import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
// eslint-disable-next-line no-unused-vars
import { Stack, Box, FormControl, Input, FormLabel, Button, Center } from '@chakra-ui/react'

const BlogForm = ({ toggleVisibility }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleBlogFormSubmit = (event) => {
    event.preventDefault()
    const blog = {
      title: title,
      author: author,
      url: url
    }

    dispatch(createBlog(blog))
    clearBlogInfo()
    toggleVisibility()
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const clearBlogInfo = () => {
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <Stack direction="column">
      <form onSubmit={handleBlogFormSubmit}>
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input type="text" placeholder="title" value={title} onChange={handleTitleChange} />
        </FormControl>
        <FormControl isRequired marginTop={3}>
          <FormLabel>Author</FormLabel>
          <Input id="author" placeholder="author" value={author} onChange={handleAuthorChange} />
        </FormControl>
        <FormControl isRequired marginTop={3}>
          <FormLabel>Url</FormLabel>
          <Input id="url" placeholder="url" value={url} onChange={handleUrlChange} />
        </FormControl>
        <Stack marginTop={3} direction="row" justifyContent="center">
          <Button type="button" size="md" colorScheme="teal" variant="outline" onClick={toggleVisibility}>
            Cancel
          </Button>
          <Button colorScheme="teal" type="submit">
            Save
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}

export default BlogForm
