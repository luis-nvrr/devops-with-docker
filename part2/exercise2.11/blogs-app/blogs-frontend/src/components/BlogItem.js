import React from 'react'
import { Link } from 'react-router-dom'
import { ListIcon } from '@chakra-ui/react'
import { BiNote } from 'react-icons/bi'

const BlogItem = ({ blog }) => {
  return (
    <Link to={`/blogs/${blog.id}`}>
      <ListIcon as={BiNote} color="green.500" />
      {blog.title} {blog.author}
    </Link>
  )
}

export default BlogItem
