const _ = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) =>
  blogs.reduce((a, blog) => a + blog.likes, 0)

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {}

  let favorite = blogs[0]
  blogs.map((blog) => {
    if (blog.likes > favorite.likes) {
      favorite = blog
    }
  })

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const author = _(blogs)
    .groupBy('author')
    .map((value, author) => ({
      author,
      blogs: value.length,
    }))
    .maxBy('blogs')

  return author
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const author = _(blogs)
    .groupBy('author')
    .map((blogsList, author) => ({
      author,
      likes: _(blogsList).reduce(
        (likes, blog) => likes + blog.likes,
        0,
      ),
    }))
    .maxBy('likes')

  return author
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
