import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const BlogDetails = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const deleteButtonStyle = {
    backgroundColor: '#008CBA'
  }

  const handleLikeBlog = (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
  }

  const handleDeleteBlog = (event) => {
    event.preventDefault()
    if (!window.confirm(`Are you sure you want to remove ${blog.title}`)) return
    dispatch(deleteBlog(blog))
  }

  return (
    <div>
      <div>title: {blog.title}</div>
      <div className="urlLabel">url: {blog.url}</div>
      <div>
        <label className="likesCountLabel">
          likes: <span className="likesBadge">{blog.likes}</span>
        </label>{' '}
        <button className="likeButton" onClick={handleLikeBlog}>
          like
        </button>
      </div>
      <div>author: {blog.author}</div>
      {user.username === blog.user.username && (
        <button style={deleteButtonStyle} onClick={handleDeleteBlog}>
          remove
        </button>
      )}
    </div>
  )
}
export default BlogDetails
