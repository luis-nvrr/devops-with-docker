const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  blog: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Comment', commentSchema)
