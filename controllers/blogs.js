const router = require('express').Router()

const { Blog, User } = require('../models')
const { tokenExtractor } = require('../util/middleware')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  if (!req.blog) {
    return res.status(404).end()
  }
  next()
}

const userLinkOptions = {
  attributes: { exclude: ['userId'] },
  include: {
    model: User,
    attributes: ['id', 'name', 'username']
  }
}

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll(userLinkOptions)
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  if (!user) {
    return res.status(401).json({ error: 'user not found' })
  }
  
  const blog = await Blog.create({ ...req.body, userId: user.id })
  const created = await Blog.findByPk(blog.id, userLinkOptions)
  res.status(201).json(created)
})

router.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {
  if (req.blog.userId !== req.decodedToken.id) {
    return res.status(401).json({ error: 'only the creator can delete a blog' })
  }
  await req.blog.destroy()
  res.status(204).end()
})

router.put('/:id', blogFinder, async (req, res) => {
  req.blog.likes = req.body.likes
  await req.blog.save()
  const updated = await Blog.findByPk(req.blog.id, userLinkOptions)
  res.json(updated)
})

module.exports = router