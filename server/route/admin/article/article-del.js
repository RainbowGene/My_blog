const { Article } = require('../../../model/article')

module.exports = async (req, res) => {
  const { id } = req.query
  console.log(id)
  const del = await Article.findOneAndDelete({ _id: id })
  if (del) return res.send({ status: 200, msg: '删除成功！' })
  return res.send({ status: 201, msg: '删除失败！' })
}
