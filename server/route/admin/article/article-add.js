/**
 * 文章添加
 */

const { Article } = require('../../../model/article')

module.exports = async (req, res) => {
  const { id, title, cover, typeval, label, content } = req.body
  const arts = await Article.create({
    title, author: id, cover, type: typeval, label, content
  })
  if (arts) return res.send({ status: 200, msg: '添加成功！' })
  return res.send({ status: 201, msg: '添加失败！' })
}
