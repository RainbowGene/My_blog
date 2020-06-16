const { Arttype } = require('../../../model/arttype')

module.exports = async (req, res) => {
  const { id } = req.query
  const deltype = await Arttype.findOneAndDelete({ _id: id })
  if (deltype) return res.send({ status: 200, msg: '删除成功！' })
  return res.send({ status: 201, msg: '删除失败！' })
}
