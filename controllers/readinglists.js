const router = require('express').Router()
const { ReadingList, User, Blog } = require('../models')
const { tokenExtractor } = require('../util/middleware')

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

router.put('/:id', tokenExtractor, async (req, res) => {
  const r = await ReadingList.findByPk(req.params.id)
  if (!r) return res.status(404).json({ error: 'reading list not found' })
  if (r.userId !== req.decodedToken.id) return res.status(403).json({ error: 'only the owner can modify their reading list' })
  
  r.read = req.body.read
  await r.save()
  res.json(r)
})

module.exports = router