const mongoose = require('mongoose');

const starSchema = mongoose.Schema({
  username: String,
  docId: { type: mongoose.Schema.Types.ObjectId }
})

// A post has many likes, a like belongs to a POST
const docSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // referencing a model
    docUrl: String,
    title: String,
    description: String,
    star: [starSchema] // embedded schema
  })
 

module.exports = mongoose.model('Doc', docSchema);