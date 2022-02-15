const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})

  const { initialBlogs } = helper
  await Blog.insertMany(initialBlogs)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map((r) => r.title)
    expect(titles).toContain('React patterns')
  })

  test('the unique identifier property of the blog is named id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body

    blogs.map((b) => expect(b.id).toBeDefined())
  })
})

describe('addition of a new blog', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'anon1',
      url: 'www.example.com',
      likes: 12,
    }

    const loginInfo = {
      username: 'root',
      password: 'sekret',
    }

    const loginResponse = await api.post('/api/login').send(loginInfo)

    await api
      .post('/api/blogs')
      .set({ Authorization: `bearer ${loginResponse.body.token}` })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map((r) => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain(
      'async/await simplifies making async calls',
    )
  })

  test('if the likes property is missing it defaults to 0', async () => {
    const blogMissingLikesProperty = {
      title: '"this blog doesn\'t have the like property"',
      author: 'user1234',
      url: 'www.example.com',
    }

    const loginInfo = {
      username: 'root',
      password: 'sekret',
    }

    const loginResponse = await api.post('/api/login').send(loginInfo)

    await api
      .post('/api/blogs')
      .set({ Authorization: `bearer ${loginResponse.body.token}` })
      .send(blogMissingLikesProperty)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const blogs = response.body
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
    blogs.map(
      (b) =>
        expect(b.likes).toBeDefined() &&
        expect(b.likes).toBeGreatherThanOrEqual(0),
    )
  })

  test('a blog without title or missing the url is not added', async () => {
    const newBlog = {
      author: 'someone',
      likes: 2,
    }

    const loginInfo = {
      username: 'root',
      password: 'sekret',
    }

    const loginResponse = await api.post('/api/login').send(loginInfo)

    await api
      .post('/api/blogs')
      .set({ Authorization: `bearer ${loginResponse.body.token}` })
      .send(newBlog)
      .expect(400)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('addition fails with a proper statuscode if the user is not logged in', async () => {
    const newBlog = {
      title: 'User is not logged in',
      author: 'someone',
      url: 'www.example.com',
      likes: 1,
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('invalid token')
  })
})

describe('deletion of a blog', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    const blogs = await helper.blogsInDb()
    await Promise.all(
      blogs.map(async (b) => {
        b.user = user._id.toString()
        user.blogs = user.blogs.concat(b.id.toString())
        await Blog.findByIdAndUpdate(b.id, b, { new: false })
      }),
    )

    await user.save()
  })

  test('an existing blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const deletedBlog = blogsAtStart[0]

    const loginInfo = {
      username: 'root',
      password: 'sekret',
    }

    const loginResponse = await api.post('/api/login').send(loginInfo)

    await api
      .delete(`/api/blogs/${deletedBlog.id}`)
      .set({ Authorization: `bearer ${loginResponse.body.token}` })
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
  })

  test('a non existing id returns statuscode 204', async () => {
    const nonExistingId = await helper.nonExistingId()

    const loginInfo = {
      username: 'root',
      password: 'sekret',
    }

    const loginResponse = await api.post('/api/login').send(loginInfo)

    await api
      .delete(`/api/blogs/${nonExistingId}`)
      .set({ Authorization: `bearer ${loginResponse.body.token}` })
      .expect(204)
  })
})

describe('updating a specific blog', () => {
  test('a valid id returns the updated blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes += 1

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    expect(updatedBlog.body).toEqual(blogToUpdate)
  })

  test('a non-existing id returns 404', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const nonExistingId = await helper.nonExistingId()
    const blogToUpdate = {
      title: 'this will fail',
      author: 'anon12345',
      url: 'fake',
      likes: 20,
    }

    await api
      .put(`/api/blogs/${nonExistingId}`)
      .send(blogToUpdate)
      .expect(404)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toEqual(blogsAtStart)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
