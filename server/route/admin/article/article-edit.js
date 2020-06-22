const { Article } = require('../../../model/article')

module.exports = async (req, res) => {
  const { aid, id, title, cover, typeval, label, content } = req.body
  const art = await Article.updateOne({ _id: aid }, { title, author: id, cover, type: typeval, label, content })
  return res.send({ status: 200, msg: art ? '修改成功!' : '修改失败!' })
}
