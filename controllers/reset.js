const { Session, ReadingList, Blog, User } = require('../models')

const router = require('express').Router()

router.post('/', async (req, res) => {
  await Session.destroy({ where: {} })
  await ReadingList.destroy({ where: {} })
  await Blog.destroy({ where: {} })
  await User.destroy({ where: {} })

  res.status(204).end()
})

module.exports = router