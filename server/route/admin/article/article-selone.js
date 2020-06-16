/**
 * 根据id查询单篇文章
 */

const { Article } = require('../../../model/article')

module.exports = async (req, res) => {
  const { aid } = req.query
  const article = await Article.findOne({ _id: aid }).populate('author').populate('type')
  if (article) return res.send({ status: 200, data: article })
  return res.send({ status: 201, msg: '未查询到该文章' })
}
