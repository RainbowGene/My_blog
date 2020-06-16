const { Article } = require('../../../model/article')

module.exports = async (req, res) => {
  const { id, title, cover, typeval, label, content } = req.body
  const art = await Article.updateOne({ title, author: id, cover, type: typeval, label, content })
  return res.send({ status: 200, msg: art ? '修改成功!' : '修改失败!' })
}
