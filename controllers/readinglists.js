const router = require('express').Router()
const { ReadingList, User, Blog } = require('../models')

router.post('/', async (req, res) => {
  const { blogId, userId } = req.body

  if (!blogId) return res.status(400).json({ error: 'missing blog id' })
  if (!userId) return res.status(400).json({ error: 'missing user id' })

  const user = await User.findByPk(userId)
  if (!user) return res.status(404).json({ error: 'user not found' })
  
  const blog = await Blog.findByPk(blogId)
  if (!blog) return res.status(404).json({ error: 'blog not found' })
  

  const reading = await ReadingList.create({ userId, blogId })
  res.status(201).json(reading)
})

module.exports = router