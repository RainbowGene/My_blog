/**
 * 启用/禁用 文章类别
 */
const { Arttype } = require('../../../model/arttype')

module.exports = async (req, res) => {
  const { _id, typeStatus } = req.query
  // console.log(typeStatus)
  if (typeStatus == 1) { // 禁用
    await Arttype.updateOne({ _id: _id }, { typeStatus: 1 })
  } else {
    await Arttype.updateOne({ _id: _id }, { typeStatus: 0 })
  }
  res.send({ status: 200, msg: typeStatus == 0 ? '启用成功！' : '禁用成功！' })
}
