// create web server
// npm install express --save
const express = require('express')
const app = express()
const port = 3000

// npm install body-parser --save
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// npm install cors --save
const cors = require('cors')
app.use(cors())

// npm install mongoose --save
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/express-demo', {useNewUrlParser: true, useUnifiedTopology: true})

// define schema
const commentSchema = new mongoose.Schema({
  username: String,
  content: String,
  date: { type: Date, default: Date.now }
})

// define model
const Comment = mongoose.model('Comment', commentSchema)

// POST /comments
app.post('/comments', async (req, res) => {
  const comment = new Comment(req.body)
  await comment.save()
  res.send(comment)
})

// GET /comments
app.get('/comments', async (req, res) => {
  const comments = await Comment.find()
  res.send(comments)
})

// GET /comments/:id
app.get('/comments/:id', async (req, res) => {
  const comment = await Comment.findById(req.params.id)
  res.send(comment)
})

// PUT /comments/:id
app.put('/comments/:id', async (req, res) => {
  const comment = await Comment.findByIdAndUpdate(req.params.id, req.body)
  await comment.save()
  res.send(comment)
})

// DELETE /comments/:id
app.delete('/comments/:id', async (req, res) => {
  const comment = await Comment.findByIdAndDelete(req.params.id)
  res.send(comment)
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
