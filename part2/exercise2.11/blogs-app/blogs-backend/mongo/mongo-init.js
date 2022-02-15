db.createUser({
  user: 'admin',
  pwd: 'admin',
  roles: [
    {
      role: 'dbOwner',
      db: 'blogs',
    },
  ],
})

db.createCollection('blogs')
